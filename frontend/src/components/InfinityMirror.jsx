import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * InfinityMirror — A compact Three.js cube-in-cube infinity mirror
 * Themed in the hero's crimson/red palette (#e8001c, #ff3b2e)
 * Placed in the bottom-left corner of the hero section.
 * No GUI, no orbit controls — purely decorative, auto-rotating.
 */
const InfinityMirror = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ── Scene ──────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = null; // Transparent — hero bg shows through

    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(5, 3.5, 7);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      stencil: true,
      alpha: true, // Transparent canvas
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Fully transparent clear
    mount.appendChild(renderer.domElement);

    // ── Realtime Cube Reflection ───────────────────────────────────────────
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512, {
      type: THREE.HalfFloatType,
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter,
    });
    const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
    scene.add(cubeCamera);

    // ── Neon Frame Geometry Builder ────────────────────────────────────────
    function mergeBufferGeometries(geometries) {
      // Manual merge for compatibility (no BufferGeometryUtils dependency)
      let totalVertices = 0;
      let totalIndices = 0;
      geometries.forEach((g) => {
        totalVertices += g.attributes.position.count;
        if (g.index) totalIndices += g.index.count;
      });

      const positions = new Float32Array(totalVertices * 3);
      const normals = new Float32Array(totalVertices * 3);
      const indices = totalIndices > 0 ? new Uint32Array(totalIndices) : null;

      let vOffset = 0;
      let iOffset = 0;
      let vertexBase = 0;

      geometries.forEach((g) => {
        const pos = g.attributes.position.array;
        const nor = g.attributes.normal ? g.attributes.normal.array : null;
        positions.set(pos, vOffset * 3);
        if (nor) normals.set(nor, vOffset * 3);
        if (g.index && indices) {
          const idx = g.index.array;
          for (let i = 0; i < idx.length; i++) {
            indices[iOffset++] = idx[i] + vertexBase;
          }
        }
        vertexBase += g.attributes.position.count;
        vOffset += g.attributes.position.count;
      });

      const merged = new THREE.BufferGeometry();
      merged.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      merged.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
      if (indices) merged.setIndex(new THREE.BufferAttribute(indices, 1));
      return merged;
    }

    function createNeonGeometry(size, thickness) {
      const geometries = [];
      const half = size / 2;
      const cylinderGeo = new THREE.CylinderGeometry(thickness, thickness, size, 8);
      const sphereGeo = new THREE.SphereGeometry(thickness, 8, 8);

      const edgePositions = [
        [0, half, half, 0, 0, Math.PI / 2],
        [0, half, -half, 0, 0, Math.PI / 2],
        [0, -half, half, 0, 0, Math.PI / 2],
        [0, -half, -half, 0, 0, Math.PI / 2],
        [half, 0, half, 0, 0, 0],
        [half, 0, -half, 0, 0, 0],
        [-half, 0, half, 0, 0, 0],
        [-half, 0, -half, 0, 0, 0],
        [half, half, 0, Math.PI / 2, 0, 0],
        [half, -half, 0, Math.PI / 2, 0, 0],
        [-half, half, 0, Math.PI / 2, 0, 0],
        [-half, -half, 0, Math.PI / 2, 0, 0],
      ];

      edgePositions.forEach((pos) => {
        const cyl = cylinderGeo.clone();
        const matrix = new THREE.Matrix4().makeRotationFromEuler(
          new THREE.Euler(pos[3], pos[4], pos[5])
        );
        matrix.setPosition(pos[0], pos[1], pos[2]);
        cyl.applyMatrix4(matrix);
        geometries.push(cyl);
      });

      const cornerPositions = [
        [half, half, half],
        [half, half, -half],
        [half, -half, half],
        [half, -half, -half],
        [-half, half, half],
        [-half, half, -half],
        [-half, -half, half],
        [-half, -half, -half],
      ];

      cornerPositions.forEach((pos) => {
        const sph = sphereGeo.clone();
        const matrix = new THREE.Matrix4().setPosition(pos[0], pos[1], pos[2]);
        sph.applyMatrix4(matrix);
        geometries.push(sph);
      });

      return mergeBufferGeometries(geometries);
    }

    // ── Materials (Crimson/Red theme) ───────────────────────────────────────
    const OUTER_COLOR = 0xe8001c; // Hero red
    const INNER_COLOR = 0xff3b2e; // Hero accent red

    const maskMaterial = new THREE.MeshBasicMaterial({
      colorWrite: false,
      depthWrite: false,
      stencilWrite: true,
      stencilRef: 1,
      stencilFunc: THREE.AlwaysStencilFunc,
      stencilZPass: THREE.ReplaceStencilOp,
      side: THREE.DoubleSide,
    });

    const outerNeonMat = new THREE.MeshBasicMaterial({
      color: OUTER_COLOR,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      stencilWrite: true,
      stencilRef: 1,
      stencilFunc: THREE.EqualStencilFunc,
    });

    const innerNeonMat = new THREE.MeshBasicMaterial({
      color: INNER_COLOR,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      stencilWrite: true,
      stencilRef: 1,
      stencilFunc: THREE.EqualStencilFunc,
    });

    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const centerMirrorMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 1.0,
      roughness: 0.0,
      envMap: cubeRenderTarget.texture,
      envMapIntensity: 0.12,
      depthWrite: true,
      side: THREE.DoubleSide,
      stencilWrite: true,
      stencilRef: 1,
      stencilFunc: THREE.EqualStencilFunc,
    });

    const instanceMirrorMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 1.0,
      roughness: 0.0,
      envMap: cubeRenderTarget.texture,
      envMapIntensity: 0.12,
      depthWrite: true,
      side: THREE.DoubleSide,
      stencilWrite: true,
      stencilRef: 1,
      stencilFunc: THREE.EqualStencilFunc,
    });

    // ── Scene Graph ────────────────────────────────────────────────────────
    const outerGroup = new THREE.Group();
    const innerGroup = new THREE.Group();
    scene.add(outerGroup);
    outerGroup.add(innerGroup);

    const outerSize = 4;
    const innerSize = 1.8;

    const maskCube = new THREE.Mesh(
      new THREE.BoxGeometry(outerSize, outerSize, outerSize),
      maskMaterial
    );
    maskCube.renderOrder = 0;
    outerGroup.add(maskCube);

    const outerGlass = new THREE.Mesh(
      new THREE.BoxGeometry(outerSize, outerSize, outerSize),
      glassMaterial
    );
    outerGlass.renderOrder = 4;
    outerGroup.add(outerGlass);

    const innerSolidGeo = new THREE.BoxGeometry(
      innerSize - 0.002,
      innerSize - 0.002,
      innerSize - 0.002
    );
    const centerSolidMesh = new THREE.Mesh(innerSolidGeo, centerMirrorMaterial);
    centerSolidMesh.renderOrder = 1;
    innerGroup.add(centerSolidMesh);

    // ── Instanced Grid ─────────────────────────────────────────────────────
    const gridRange = 4;
    const totalInstances = Math.pow(gridRange * 2 + 1, 3);

    const outerGeo = createNeonGeometry(outerSize, 0.012);
    const innerGeo = createNeonGeometry(innerSize, 0.009);

    const outerInstanced = new THREE.InstancedMesh(outerGeo, outerNeonMat, totalInstances);
    const innerInstanced = new THREE.InstancedMesh(innerGeo, innerNeonMat, totalInstances);
    const innerSolidInstanced = new THREE.InstancedMesh(
      innerSolidGeo,
      instanceMirrorMaterial,
      totalInstances
    );

    innerSolidInstanced.renderOrder = 1;
    outerInstanced.renderOrder = 2;
    innerInstanced.renderOrder = 2;

    outerGroup.add(outerInstanced);
    outerGroup.add(innerInstanced);
    outerGroup.add(innerSolidInstanced);

    // ── Pre-calculate Grid Data ────────────────────────────────────────────
    const gridData = [];
    let idxCounter = 0;
    for (let i = -gridRange; i <= gridRange; i++) {
      for (let j = -gridRange; j <= gridRange; j++) {
        for (let k = -gridRange; k <= gridRange; k++) {
          const isCenter = i === 0 && j === 0 && k === 0;
          const dist = Math.abs(i) + Math.abs(j) + Math.abs(k);
          gridData.push({
            idx: idxCounter++,
            i, j, k,
            isCenter,
            x: i * outerSize,
            y: j * outerSize,
            z: k * outerSize,
            sx: i % 2 === 0 ? 1 : -1,
            sy: j % 2 === 0 ? 1 : -1,
            sz: k % 2 === 0 ? 1 : -1,
            dist,
          });
        }
      }
    }

    // ── Per-instance Color (fade with distance) ────────────────────────────
    const colorHelper = new THREE.Color();
    const decay = 0.88;
    const outerC = new THREE.Color(OUTER_COLOR);
    const innerC = new THREE.Color(INNER_COLOR);

    for (const d of gridData) {
      const fade = Math.pow(decay, d.dist);
      colorHelper.copy(outerC).multiplyScalar(fade);
      outerInstanced.setColorAt(d.idx, colorHelper);
      colorHelper.copy(innerC).multiplyScalar(fade);
      innerInstanced.setColorAt(d.idx, colorHelper);
    }
    outerInstanced.instanceColor.needsUpdate = true;
    innerInstanced.instanceColor.needsUpdate = true;

    // ── Matrix helpers ─────────────────────────────────────────────────────
    const positionMatrix = new THREE.Matrix4();
    const scaleMatrix = new THREE.Matrix4();
    const mirrorMatrix = new THREE.Matrix4();
    const rotationMatrix = new THREE.Matrix4();
    const innerFinal = new THREE.Matrix4();
    const zeroMatrix = new THREE.Matrix4().makeScale(0, 0, 0);

    function updateGrid() {
      rotationMatrix.makeRotationFromEuler(innerGroup.rotation);
      for (let i = 0; i < totalInstances; i++) {
        const d = gridData[i];
        positionMatrix.makeTranslation(d.x, d.y, d.z);
        scaleMatrix.makeScale(d.sx, d.sy, d.sz);
        mirrorMatrix.multiplyMatrices(positionMatrix, scaleMatrix);

        if (d.isCenter) {
          outerInstanced.setMatrixAt(i, mirrorMatrix);
          innerFinal.multiplyMatrices(mirrorMatrix, rotationMatrix);
          innerInstanced.setMatrixAt(i, innerFinal);
          innerSolidInstanced.setMatrixAt(i, zeroMatrix);
          continue;
        }

        outerInstanced.setMatrixAt(i, mirrorMatrix);
        innerFinal.multiplyMatrices(mirrorMatrix, rotationMatrix);
        innerInstanced.setMatrixAt(i, innerFinal);
        innerSolidInstanced.setMatrixAt(i, innerFinal);
      }

      outerInstanced.instanceMatrix.needsUpdate = true;
      innerInstanced.instanceMatrix.needsUpdate = true;
      innerSolidInstanced.instanceMatrix.needsUpdate = true;
    }

    // ── Animation Loop ─────────────────────────────────────────────────────
    const rotSpeed = 0.003;
    let animId;

    function animate() {
      animId = requestAnimationFrame(animate);

      outerGroup.rotation.x += rotSpeed;
      outerGroup.rotation.y += rotSpeed * 0.8;
      innerGroup.rotation.y -= rotSpeed * 1.5;
      innerGroup.rotation.z -= rotSpeed * 1.2;

      // Reflection pass
      outerNeonMat.stencilFunc = THREE.AlwaysStencilFunc;
      innerNeonMat.stencilFunc = THREE.AlwaysStencilFunc;
      instanceMirrorMaterial.stencilFunc = THREE.AlwaysStencilFunc;
      maskCube.visible = false;
      centerSolidMesh.visible = false;
      updateGrid();
      cubeCamera.update(renderer, scene);

      // Main render pass
      maskCube.visible = true;
      centerSolidMesh.visible = true;
      outerNeonMat.stencilFunc = THREE.EqualStencilFunc;
      innerNeonMat.stencilFunc = THREE.EqualStencilFunc;
      instanceMirrorMaterial.stencilFunc = THREE.EqualStencilFunc;
      updateGrid();

      renderer.render(scene, camera);
    }

    animate();

    // ── Resize ─────────────────────────────────────────────────────────────
    const resizeObserver = new ResizeObserver(() => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(mount);

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="hero-infinity-mirror"
      ref={mountRef}
    />
  );
};

export default InfinityMirror;
