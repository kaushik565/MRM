import React, { useRef, useState, useLayoutEffect } from 'react';
/**
 * Scales children down (never up) to fit within viewport without scroll.
 * Leaves a margin for breathing space. Uses ResizeObserver for responsiveness.
 */
export default function FitToViewport({ children, margin = 12 }) {
  // Allow slides to opt out of scaling entirely via a "noScale" prop.
  if (children && children.props && children.props.noScale) {
    return <div>{children}</div>;
  }
  const ref = useRef(null);
  const [scale, setScale] = useState(1);
  const recompute = () => {
    const el = ref.current;
    if (!el) return;
    // Reset transform to get natural size
    el.style.transform = 'none';
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const availW = vw - margin * 2;
    const availH = vh - margin * 2;
    const next = Math.min(1, availW / rect.width, availH / rect.height);
    setScale(next);
  };
  useLayoutEffect(() => {
    recompute();
    const ro = new ResizeObserver(() => recompute());
    if (ref.current) ro.observe(ref.current);
    window.addEventListener('resize', recompute);
    return () => { ro.disconnect(); window.removeEventListener('resize', recompute); };
  }, []);
  return (
    <div ref={ref} style={{ transform: `scale(${scale})`, transformOrigin: 'top center', transition: 'transform .25s ease' }}>
      {children}
    </div>
  );
}
