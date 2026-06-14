"use client";

import { useEffect, useRef } from "react";

export default function BlackHoleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars: { x: number; y: number; size: number; speed: number; brightness: number }[] = [];
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
        brightness: Math.random(),
      });
    }

    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw stars
      stars.forEach((star) => {
        const twinkle = Math.sin(time * 2 + star.brightness * 10) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 210, 255, ${twinkle * 0.8})`;
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height + 5) {
          star.y = -5;
          star.x = Math.random() * canvas.width;
        }
      });

      // Accretion disk (behind the black hole)
      const diskInner = 80;
      const diskOuter = 220;
      const diskTilt = 0.25;

      for (let i = 0; i < 60; i++) {
        const r = diskInner + (diskOuter - diskInner) * (i / 60);
        const thickness = 12 * (1 - i / 60) + 4;
        const angle = time * 0.5 + i * 0.02;

        const gradient = ctx.createRadialGradient(cx, cy, r - thickness, cx, cy, r + thickness);
        gradient.addColorStop(0, `rgba(255, 140, 50, ${0.01 * (1 - i / 60)})`);
        gradient.addColorStop(0.5, `rgba(255, 100, 30, ${0.04 * (1 - i / 60)})`);
        gradient.addColorStop(1, `rgba(255, 60, 10, ${0.01 * (1 - i / 60)})`);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, diskTilt);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 0.3, 0, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      }

      // Bright accretion ring particles
      for (let i = 0; i < 80; i++) {
        const angle = (i / 80) * Math.PI * 2 + time * 0.8;
        const dist = diskInner + 30 + Math.sin(i * 0.5 + time) * 20;
        const px = cx + Math.cos(angle) * dist;
        const py = cy + Math.sin(angle) * dist * diskTilt;
        const size = Math.sin(angle + time) * 1.5 + 1.5;
        const alpha = Math.sin(angle + time * 2) * 0.3 + 0.5;

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 180, 80, ${alpha})`;
        ctx.fill();
      }

      // Front accretion disk (in front of the black hole, lower half)
      for (let i = 0; i < 40; i++) {
        const r = diskInner + (diskOuter - diskInner) * (i / 40);
        const thickness = 8 * (1 - i / 40) + 2;
        const angle = time * 0.5 + i * 0.02;

        const gradient = ctx.createRadialGradient(cx, cy, r - thickness, cx, cy, r + thickness);
        gradient.addColorStop(0, `rgba(255, 120, 40, ${0.02 * (1 - i / 40)})`);
        gradient.addColorStop(0.5, `rgba(255, 80, 20, ${0.06 * (1 - i / 40)})`);
        gradient.addColorStop(1, `rgba(255, 40, 5, ${0.02 * (1 - i / 40)})`);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, diskTilt);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 0.3, 0, Math.PI * 0.05, Math.PI * 0.95);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      }

      // Event horizon (the black hole itself)
      const eventHorizonGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70);
      eventHorizonGrad.addColorStop(0, "rgba(0, 0, 0, 1)");
      eventHorizonGrad.addColorStop(0.7, "rgba(0, 0, 0, 1)");
      eventHorizonGrad.addColorStop(0.85, "rgba(10, 5, 20, 0.95)");
      eventHorizonGrad.addColorStop(1, "rgba(30, 10, 50, 0.3)");
      ctx.beginPath();
      ctx.arc(cx, cy, 70, 0, Math.PI * 2);
      ctx.fillStyle = eventHorizonGrad;
      ctx.fill();

      // Photon ring (bright ring around event horizon)
      for (let i = 0; i < 120; i++) {
        const angle = (i / 120) * Math.PI * 2 + time * 0.3;
        const dist = 72 + Math.sin(angle * 3 + time) * 2;
        const px = cx + Math.cos(angle) * dist;
        const py = cy + Math.sin(angle) * dist;
        const alpha = Math.sin(angle * 2 + time * 3) * 0.3 + 0.6;
        const size = Math.sin(angle + time * 2) * 0.8 + 1;

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 220, 180, ${alpha})`;
        ctx.fill();
      }

      // Gravitational lensing effect (distortion ring)
      const lensGrad = ctx.createRadialGradient(cx, cy, 68, cx, cy, 90);
      lensGrad.addColorStop(0, "rgba(255, 200, 150, 0.15)");
      lensGrad.addColorStop(0.3, "rgba(255, 150, 100, 0.08)");
      lensGrad.addColorStop(0.6, "rgba(200, 100, 200, 0.04)");
      lensGrad.addColorStop(1, "rgba(100, 50, 200, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.fillStyle = lensGrad;
      ctx.fill();

      // Outer glow
      const outerGlow = ctx.createRadialGradient(cx, cy, 100, cx, cy, 400);
      outerGlow.addColorStop(0, "rgba(255, 120, 50, 0.06)");
      outerGlow.addColorStop(0.3, "rgba(200, 80, 150, 0.03)");
      outerGlow.addColorStop(0.6, "rgba(100, 50, 200, 0.01)");
      outerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 400, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // Jet streams (top and bottom)
      for (let j = 0; j < 2; j++) {
        const dir = j === 0 ? -1 : 1;
        for (let i = 0; i < 50; i++) {
          const yOff = i * 8 * dir;
          const spread = Math.abs(yOff) * 0.03;
          const jetX = cx + Math.sin(time * 3 + i * 0.2) * spread;
          const jetY = cy + yOff;
          const alpha = Math.max(0, 0.15 - Math.abs(yOff) * 0.0008);
          const size = 1.5 + Math.sin(time * 2 + i) * 0.5;

          ctx.beginPath();
          ctx.arc(jetX, jetY, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150, 180, 255, ${alpha})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse at center, #0a0510 0%, #020008 50%, #000000 100%)" }}
    />
  );
}
