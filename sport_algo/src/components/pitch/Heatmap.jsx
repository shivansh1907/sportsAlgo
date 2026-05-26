import { useRef, useEffect } from 'react';

export default function Heatmap({ zones = [], pitchLength = 105, pitchWidth = 68 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || zones.length === 0) return;

    const ctx = canvas.getContext('2d');
    const cw = canvas.width;
    const ch = canvas.height;

    // Clear previous render
    ctx.clearRect(0, 0, cw, ch);

    // Use additive blending so overlapping zones glow brighter
    ctx.globalCompositeOperation = 'lighter';

    zones.forEach(({ x, y, intensity }) => {
      // Convert pitch coords (meters) to canvas pixels
      const px = (x / pitchLength) * cw;
      const py = (y / pitchWidth) * ch;
      const radius = 30 + intensity * 40; // hot zones are bigger

      // Color ramp: blue → yellow → red based on intensity
      const r = Math.round(59 + intensity * 180);   // 59 → 239
      const g = Math.round(130 - intensity * 60);    // 130 → 70
      const b = Math.round(246 - intensity * 220);   // 246 → 26

      const gradient = ctx.createRadialGradient(px, py, 0, px, py, radius);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${intensity * 0.6})`);
      gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${intensity * 0.2})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Reset blending mode
    ctx.globalCompositeOperation = 'source-over';
  }, [zones, pitchLength, pitchWidth]);

  return (
    <canvas
      ref={canvasRef}
      width={420}
      height={272}
      className="absolute inset-0 w-full h-full rounded pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
