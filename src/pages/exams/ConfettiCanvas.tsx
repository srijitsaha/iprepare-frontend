import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  rotation: number;
  size: number;
  color: string;
  gravity: number;
  rotationSpeed: number;
}

export const ConfettiCanvas: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let pieces: Particle[] = [];
    const numberOfPieces = 35;
    let lastUpdateTime = Date.now();

    const colors = ['#FFD700', '#FFBF00', '#FFFFFF', '#454747', '#FFE066'];

    const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

    const resize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const update = () => {
      const now = Date.now();
      const dt = Math.min(now - lastUpdateTime, 50);

      for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i];
        if (p.y > canvas.height + 20) {
          pieces.splice(i, 1);
          continue;
        }
        p.y += p.gravity * dt;
        p.rotation += p.rotationSpeed * dt;
      }

      while (pieces.length < numberOfPieces) {
        pieces.push({
          x: Math.random() * canvas.width,
          y: -20,
          rotation: Math.random() * 360,
          size: Math.random() * 7 + 4,
          color: randomColor(),
          gravity: Math.random() * 0.08 + 0.04,
          rotationSpeed: Math.random() * 0.2 - 0.1,
        });
      }

      lastUpdateTime = now;
      draw();
      animFrameId = requestAnimationFrame(update);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
    };

    update();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameId);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      id="confetti"
    />
  );
};