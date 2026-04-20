import React, { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0; // Mouse X, Y
    let rx = 0, ry = 0; // Ring X, Y
    let rafId = null;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      rx = lerp(rx, mx, 0.1);
      ry = lerp(ry, my, 0.1);

      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;

      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;

      rafId = requestAnimationFrame(animate);
    };

    const onMouseEnter = () => {
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.opacity = "0.3";
    };

    const onMouseLeave = () => {
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.opacity = "0.5";
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();

    const interactives = document.querySelectorAll("a, button, .nav-link, .feature-tag");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>
    </>
  );
};

export default CustomCursor;
