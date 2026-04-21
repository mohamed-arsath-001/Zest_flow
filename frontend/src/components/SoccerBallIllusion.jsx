import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * SoccerBallIllusion — A Three.js animation of a truncated icosahedron (soccer ball).
 * Themed with the project's red palette.
 */
const SoccerBallIllusion = () => {
  const mountRef = useRef(null);
  const pRef = useRef({
    effectStrength: 1,
    duration: 8,
    revolutions: 1
  });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.01,
      100
    );

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent
    mount.appendChild(renderer.domElement);
    
    cam.position.set(0, 0, 1.2); // Moved slightly back for "larger" effect if needed
    cam.updateProjectionMatrix();

    const baseE = cam.projectionMatrix.elements.slice();
    const { vertices, edges } = makeTruncatedIcosahedron();
    const S = 0.45; // Increased size (from 0.28 to 0.45)
    const model = new THREE.Group();

    scene.add(model);

    // Using the project's red color: #ff3b2e
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xff3b2e,
      transparent: true,
      opacity: 0.4, // Subtle background effect
    });

    for (const [i, j] of edges) {
      const [ix, iy, iz] = vertices[i];
      const [jx, jy, jz] = vertices[j];
      const g = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(ix * S, iy * S, iz * S),
        new THREE.Vector3(jx * S, jy * S, jz * S),
      ]);

      model.add(new THREE.Line(g, lineMat));
    }


    // animation loop
    const t0 = performance.now() / 1000;
    let raf;

    const tick = () => {
      raf = requestAnimationFrame(tick);

      const t = performance.now() / 1000 - t0;
      const { effectStrength, duration, revolutions } = pRef.current;
      const cos = Math.cos((t * Math.PI * 2) / duration) * effectStrength;

      const e = baseE.slice(); 

      e[14] = -1 + 0.4 * cos;
      e[11] = -1 * cos;
      e[15] = 1 - cos;

      cam.projectionMatrix.fromArray(e);
      cam.projectionMatrixInverse.copy(cam.projectionMatrix).invert();
      model.rotation.y = ((t * 360 * revolutions) / duration) * (Math.PI / 180);
      renderer.render(scene, cam);
    };
    tick();

    const onResize = () => {
      if (!mount) return;
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      cam.aspect = mount.clientWidth / mount.clientHeight;
      cam.updateProjectionMatrix();
      baseE.splice(0, 16, ...cam.projectionMatrix.elements);
    };
    
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="soccer-ball-illusion"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6
      }}
    />
  );
};

// Helper Functions

function makeTruncatedIcosahedron() {
  const phi = (1 + Math.sqrt(5)) / 2;
  const raw = [];
  const evenPerms = (a, b, c) => [
    [a, b, c],
    [c, a, b],
    [b, c, a]
  ];
  const getTripletVariants = (val) => (val === 0 ? [0] : [val, -val]);
  const signCombos = (triplets) => {
    const out = [];
    for (const [a, b, c] of triplets) {
      for (const x of getTripletVariants(a)) {
        for (const y of getTripletVariants(b)) {
          for (const z of getTripletVariants(c)) {
            out.push([x, y, z]);
          }
        }
      }
    }
    return out;
  };

  raw.push(
    ...signCombos(evenPerms(0, 1, 3 * phi)),
    ...signCombos(evenPerms(2, 1 + 2 * phi, phi)),
    ...signCombos(evenPerms(1, 2 + phi, 2 * phi))
  );

  const seen = new Set();
  const vertices = [];
  for (const v of raw) {
    const k = v.map(c => c.toFixed(8)).join(",");
    if (!seen.has(k)) {
      seen.add(k);
      vertices.push(v);
    }
  }

  const maxR = Math.max(...vertices.map(v => Math.hypot(v[0], v[1], v[2])));
  const norm = vertices.map(v => [v[0] / maxR, v[1] / maxR, v[2] / maxR]);
  let minD = Infinity;

  for (let i = 0; i < norm.length; i++) {
    for (let j = i + 1; j < norm.length; j++) {
      const [ix, iy, iz] = norm[i];
      const [jx, jy, jz] = norm[j];
      const d = Math.hypot(ix - jx, iy - jy, iz - jz);
      if (d < minD) minD = d;
    }
  }

  const edges = [];
  for (let i = 0; i < norm.length; i++) {
    for (let j = i + 1; j < norm.length; j++) {
      const [ix, iy, iz] = norm[i];
      const [jx, jy, jz] = norm[j];
      const d = Math.hypot(ix - jx, iy - jy, iz - jz);
      if (d < minD * 1.05) edges.push([i, j]);
    }
  }
  return { vertices: norm, edges };
}

export default SoccerBallIllusion;
