"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
  density: 12000,
  minNodes: 45,
  maxNodes: 200,
  edgePadding: 20,
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const clamp01 = (value: number) => clamp(value, 0, 1);

const exponentialKeys: Array<keyof NetworkSettings> = [
  "density",
  "minNodes",
  "maxNodes",
];

const interpolateLinear = (from: number, to: number, t: number) =>
  from + (to - from) * t;

const interpolateExponential = (from: number, to: number, t: number) =>
  from > 0 && to > 0 ? from * Math.pow(to / from, t) : interpolateLinear(from, to, t);

const interpolateSettings = (
  baseSettings: NetworkSettings,
  minSettings: Partial<NetworkSettings> | undefined,
  maxSettings: Partial<NetworkSettings> | undefined,
  position: number
) => {
  const t = clamp01(position);
  const result = { ...baseSettings };
  const keys = new Set<string>([
    ...Object.keys(minSettings ?? {}),
    ...Object.keys(maxSettings ?? {}),
  ]);
  for (const key of keys) {
    if (!(key in baseSettings)) continue;
    const typedKey = key as keyof NetworkSettings;
    const minValue = minSettings?.[typedKey];
    const maxValue = maxSettings?.[typedKey];
    const from = typeof minValue === "number" ? minValue : baseSettings[typedKey];
    const to = typeof maxValue === "number" ? maxValue : baseSettings[typedKey];
    if (exponentialKeys.includes(typedKey)) {
      result[typedKey] = interpolateExponential(from, to, t);
    } else {
      result[typedKey] = interpolateLinear(from, to, t);
    }
  }
  return result;
};

type NetworkBackgroundCanvasProps = {
  settings?: Partial<NetworkSettings>;
  className?: string;
  showFps?: boolean;
  onFpsUpdate?: (fps: number) => void;
  staticBackground?: boolean;
};

function NetworkBackgroundCanvas({
  settings,
  className,
  showFps = false,
  onFpsUpdate,
  staticBackground = false,
}: NetworkBackgroundCanvasProps) {
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
    let lastFpsTime = 0;
    let frames = 0;
    let fps = 0;
    const shouldAnimate = !staticBackground;

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

    const renderScene = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgba(255, 255, 255, ${merged.dotOpacity})`;

      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, merged.dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      const gridCols = 4;
      const gridRows = 4;
      const cellWidth = Math.max(width / gridCols, 1);
      const cellHeight = Math.max(height / gridRows, 1);
      const grid: number[][] = Array.from(
        { length: gridCols * gridRows },
        () => []
      );

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        const cx = clamp(Math.floor(node.x / cellWidth), 0, gridCols - 1);
        const cy = clamp(Math.floor(node.y / cellHeight), 0, gridRows - 1);
        grid[cy * gridCols + cx].push(i);
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        const cx = clamp(Math.floor(node.x / cellWidth), 0, gridCols - 1);
        const cy = clamp(Math.floor(node.y / cellHeight), 0, gridRows - 1);

        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            const nx = cx + dx;
            const ny = cy + dy;
            if (nx < 0 || nx >= gridCols || ny < 0 || ny >= gridRows) continue;
            const cell = grid[ny * gridCols + nx];
            for (const otherIndex of cell) {
              if (otherIndex <= i) continue;
              const other = nodes[otherIndex];
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
        }
      }
    };

    const updateFps = (time: number) => {
      frames += 1;
      if (!lastFpsTime) lastFpsTime = time;
      const fpsWindow = time - lastFpsTime;
      if (fpsWindow >= 500) {
        fps = (frames * 1000) / fpsWindow;
        frames = 0;
        lastFpsTime = time;
        onFpsUpdate?.(fps);
      }
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
      if (staticBackground) {
        renderScene();
      }
    };

    const draw = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (showFps) {
        updateFps(time);
      }

      renderScene();

      if (!staticBackground) {
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
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (shouldAnimate) {
      animationFrame = window.requestAnimationFrame(draw);
    } else {
      renderScene();
      if (showFps) {
        animationFrame = window.requestAnimationFrame(function tick(time) {
          updateFps(time);
          animationFrame = window.requestAnimationFrame(tick);
        });
      }
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [
    merged.baseSpeed,
    merged.density,
    merged.dotOpacity,
    merged.dotRadius,
    merged.drift,
    merged.edgePadding,
    merged.lineOpacity,
    merged.maxDistance,
    merged.maxNodes,
    merged.maxSpeed,
    merged.minNodes,
    showFps,
    onFpsUpdate,
    staticBackground,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 opacity-70 ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

type NetworkBackgroundProps = {
  className?: string;
  minNetworkSettings?: Partial<NetworkSettings>;
  maxNetworkSettings?: Partial<NetworkSettings>;
  defaultSliderPosition?: number;
};

const STORAGE_KEY = "network-background-options";

export default function NetworkBackground({
  className,
  minNetworkSettings,
  maxNetworkSettings,
  defaultSliderPosition = 0.5,
}: NetworkBackgroundProps) {
  const clampedDefaultPosition = clamp01(defaultSliderPosition);
  const [sliderPosition, setSliderPosition] = useState(clampedDefaultPosition);
  const [showFps, setShowFps] = useState(false);
  const [staticBackground, setStaticBackground] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [fps, setFps] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setHasLoaded(true);
      return;
    }
    try {
      const parsed = JSON.parse(stored) as {
        sliderPosition?: number;
        showFps?: boolean;
        staticBackground?: boolean;
      };
      if (typeof parsed.sliderPosition === "number") {
        setSliderPosition(clamp01(parsed.sliderPosition));
      } else {
        setSliderPosition(clampedDefaultPosition);
      }
      if (typeof parsed.showFps === "boolean") {
        setShowFps(parsed.showFps);
      }
      if (typeof parsed.staticBackground === "boolean") {
        setStaticBackground(parsed.staticBackground);
      }
    } catch {
      setSliderPosition(clampedDefaultPosition);
    } finally {
      setHasLoaded(true);
    }
  }, [clampedDefaultPosition]);

  useEffect(() => {
    if (!hasLoaded || typeof window === "undefined") return;
    const payload = {
      sliderPosition,
      showFps,
      staticBackground,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [sliderPosition, showFps, staticBackground, hasLoaded]);

  const interpolatedSettings = useMemo(
    () =>
      interpolateSettings(
        defaultSettings,
        minNetworkSettings,
        maxNetworkSettings,
        sliderPosition
      ),
    [minNetworkSettings, maxNetworkSettings, sliderPosition]
  );

  return (
    <>
      <NetworkBackgroundCanvas
        settings={interpolatedSettings}
        showFps={showFps}
        onFpsUpdate={setFps}
        staticBackground={staticBackground}
        className={className}
      />
      <div className="fixed bottom-6 right-6 z-20">
        <div className="relative flex flex-col items-end gap-3">
          {optionsOpen ? (
            <div
              id="background-options"
              className="glass-card w-[min(86vw,320px)] rounded-2xl px-5 py-4"
            >
              <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                <span>Background Options</span>
                <button
                  type="button"
                  onClick={() => setOptionsOpen(false)}
                  className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-secondary)]"
                >
                  Close
                </button>
              </div>
              <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                Intensity
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={sliderPosition}
                  onChange={(event) =>
                    setSliderPosition(Number(event.target.value))
                  }
                  className="h-2 w-full cursor-pointer accent-[var(--color-secondary)]"
                />
              </label>
              <label className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                <input
                  type="checkbox"
                  checked={staticBackground}
                  onChange={(event) => setStaticBackground(event.target.checked)}
                  className="h-4 w-4 cursor-pointer accent-[var(--color-secondary)]"
                />
                Static Background
              </label>
              <label className="mt-3 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                <input
                  type="checkbox"
                  checked={showFps}
                  onChange={(event) => setShowFps(event.target.checked)}
                  className="h-4 w-4 cursor-pointer accent-[var(--color-secondary)]"
                />
                FPS Counter
              </label>
              {showFps ? (
                <div className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  FPS: {Math.round(fps)}
                </div>
              ) : null}
            </div>
          ) : null}
          <button
            type="button"
            onClick={() => setOptionsOpen((open) => !open)}
            aria-expanded={optionsOpen}
            aria-controls="background-options"
            className="glass-card rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-secondary)]"
          >
            Background Options
          </button>
        </div>
      </div>
    </>
  );
}
