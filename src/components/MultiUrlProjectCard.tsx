"use client";

import { useEffect, useRef, useState } from "react";
import type { MultiUrlProject } from "@/data/projects";

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M7 17L17 7M9 7h8v8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function MultiUrlProjectCard({
  project,
}: {
  project: MultiUrlProject;
}) {
  const [active, setActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const handleOutsideClick = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setActive(false);
      }
    };
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => document.removeEventListener("pointerdown", handleOutsideClick);
  }, [active]);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setActive(true);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setActive(false);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) return;
    setActive((prev) => !prev);
  };

  return (
    <div
      ref={cardRef}
      className="glass-card relative flex flex-col justify-between rounded-3xl p-6 cursor-pointer transition-colors hover:border-white/30"
      onClick={handleCardClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className={`flex h-full flex-col justify-between transition-opacity duration-300 ${active ? "opacity-0" : ""}`}
      >
        <div>
          <h2 className="text-h2 font-semibold">{project.title}</h2>
          <p className="mt-3 text-body text-[var(--color-muted)]">
            {project.description}
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="social-button inline-flex items-center rounded-full px-3 py-1 text-muted uppercase tracking-[0.2em]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 transition-opacity duration-300 ${active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="social-button inline-flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-body transition-colors hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
          >
            <span>{link.label}</span>
            <ArrowIcon />
          </a>
        ))}
      </div>
    </div>
  );
}
