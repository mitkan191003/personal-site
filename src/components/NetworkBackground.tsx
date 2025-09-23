"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type NetworkSettings = {
  maxDistance: number;
  dotRadius: number;
  dotOpacity: number;
  lineOpacity: number;
  baseSpeed: number;
  drift: number;
  maxSpeed: number;
  density: number;
  minNodes: number;
  maxNodes: number;
  edgePadding: number;
};

const defaultSettings: NetworkSettings = {
  maxDistance: 150,
  dotRadius: 1.4,
  dotOpacity: 0.5,
  lineOpacity: 0.5,
  baseSpeed: 24,
  drift: 1.2,
  maxSpeed: 42,
  density: 18000,
  minNodes: 45,
  maxNodes: 200,
  edgePadding: 20,
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

type NetworkBackgroundProps = {
  settings?: Partial<NetworkSettings>;
  className?: string;
};

export default function NetworkBackground({
  settings,
  className,
}: NetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const merged = { ...defaultSettings, ...settings };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let animationFrame = 0;
    let lastTime = 0;

    const createNodes = () => {
      const area = width * height;
      const count = clamp(
        Math.round(area / merged.density),
        merged.minNodes,
        merged.maxNodes
      );
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * merged.baseSpeed,
        vy: (Math.random() - 0.5) * merged.baseSpeed,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createNodes();
    };

    const draw = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgba(255, 255, 255, ${merged.dotOpacity})`;

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        ctx.beginPath();
        ctx.arc(node.x, node.y, merged.dotRadius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j += 1) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.hypot(dx, dy);
          if (dist > merged.maxDistance) continue;
          const alpha = 1 - dist / merged.maxDistance;
          ctx.strokeStyle = `rgba(255, 107, 53, ${alpha * merged.lineOpacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        node.x += node.vx * delta;
        node.y += node.vy * delta;

        node.vx += (Math.random() - 0.5) * merged.drift * delta;
        node.vy += (Math.random() - 0.5) * merged.drift * delta;
        node.vx = clamp(node.vx, -merged.maxSpeed, merged.maxSpeed);
        node.vy = clamp(node.vy, -merged.maxSpeed, merged.maxSpeed);

        if (node.x < -merged.edgePadding) node.x = width + merged.edgePadding;
        if (node.x > width + merged.edgePadding) node.x = -merged.edgePadding;
        if (node.y < -merged.edgePadding) node.y = height + merged.edgePadding;
        if (node.y > height + merged.edgePadding) node.y = -merged.edgePadding;
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [merged.baseSpeed, merged.density, merged.dotOpacity, merged.dotRadius, merged.drift, merged.edgePadding, merged.lineOpacity, merged.maxDistance, merged.maxNodes, merged.maxSpeed, merged.minNodes]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 opacity-70 ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}
