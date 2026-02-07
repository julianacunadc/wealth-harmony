import { useRef, useEffect } from "react";

interface PointCloudSphereProps {
  size?: number;
  className?: string;
  breathing?: boolean; // true = active breathing (processing), false = resting palpitation
}

const PointCloudSphere = ({ size = 200, className = "", breathing = false }: PointCloudSphereProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    // Generate sphere points using fibonacci sphere
    const numPoints = 120;
    const points: { x: number; y: number; z: number; color: string }[] = [];
    
    const colors = [
      "hsla(252, 80%, 72%, ALPHA)",  // Soft Violet
      "hsla(230, 70%, 65%, ALPHA)",  // Indigo
      "hsla(252, 60%, 78%, ALPHA)",  // Light Violet
      "hsla(25, 85%, 65%, ALPHA)",   // Warm Orange (subtle)
    ];

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      points.push({
        x: Math.cos(theta) * radiusAtY,
        y: y,
        z: Math.sin(theta) * radiusAtY,
        color: colors[i % colors.length],
      });
    }

    const baseRadius = size * 0.35;
    let startTime = performance.now();

    const render = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      ctx.clearRect(0, 0, size, size);

      const rotationSpeed = breathing ? 0.15 : 0.08;
      const angle = elapsed * rotationSpeed;

      // Breathing: ebb and flow of dot spacing
      const breathCycle = breathing
        ? Math.sin(elapsed * 0.8) * 0.12  // faster, larger breath
        : Math.sin(elapsed * (Math.PI / 3)) * 0.03; // slow 6s palpitation
      const currentRadius = baseRadius * (1 + breathCycle);

      // Sort by z for depth ordering
      const projected = points.map((p) => {
        // Rotate around Y axis
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const rx = p.x * cosA + p.z * sinA;
        const rz = -p.x * sinA + p.z * cosA;
        // Slight tilt on X axis
        const tiltAngle = 0.3;
        const cosT = Math.cos(tiltAngle);
        const sinT = Math.sin(tiltAngle);
        const ry = p.y * cosT - rz * sinT;
        const rz2 = p.y * sinT + rz * cosT;

        // Individual dot breathing offset
        const dotBreath = breathing
          ? Math.sin(elapsed * 1.2 + p.x * 3 + p.y * 2) * 0.04
          : Math.sin(elapsed * 0.5 + p.x * 2 + p.y * 2) * 0.015;
        const dotRadius = currentRadius * (1 + dotBreath);

        const screenX = size / 2 + rx * dotRadius;
        const screenY = size / 2 + ry * dotRadius;
        const depth = rz2; // -1 to 1

        return { screenX, screenY, depth, color: p.color };
      });

      projected.sort((a, b) => a.depth - b.depth);

      for (const pt of projected) {
        const depthNorm = (pt.depth + 1) / 2; // 0 (back) to 1 (front)
        const alpha = 0.25 + depthNorm * 0.65;
        const dotSize = 1.5 + depthNorm * 2.5;
        const glowSize = dotSize * 2.5;

        const color = pt.color.replace("ALPHA", String(alpha));
        const glowColor = pt.color.replace("ALPHA", String(alpha * 0.3));

        // Glow
        ctx.beginPath();
        ctx.arc(pt.screenX, pt.screenY, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glowColor;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(pt.screenX, pt.screenY, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animRef.current);
  }, [size, breathing]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size }}
    />
  );
};

export default PointCloudSphere;
