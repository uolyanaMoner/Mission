import React, { useEffect, useRef } from "react";

export default function SnowCanvas() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const numParticles = 150;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 4 + 1,
        d: Math.random() * numParticles,
        color: `rgba(${255}, ${255 - Math.random() * 50}, ${255}, ${0.8})`,
        speed: Math.random() * 1 + 0.5,
      });
    }

    let angle = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.shadowColor = "white";
        ctx.shadowBlur = 3;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        ctx.fill();
      }
      update();
    };

    const update = () => {
      angle += 0.01;
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2 * p.speed;
        p.x += Math.sin(angle) * 2;

        if (p.x > canvas.width + 5 || p.x < -5 || p.y > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = -10;
          p.r = Math.random() * 4 + 1;
          p.speed = Math.random() * 1 + 0.5;
          p.color = `rgba(${255}, ${255 - Math.random() * 50}, ${255}, ${0.8})`;
        }
      }
    };

    const interval = setInterval(draw, 33);

    window.addEventListener("resize", setCanvasSize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
}
