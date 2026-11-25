"use client";

import type { SVGProps } from "react";
import { motion } from "framer-motion";

export function StampBadge({
  label = "WORLD\nEXPLORER",
  rotate = -12,
  tone = "dark",
  className = "",
}: {
  label?: string;
  rotate?: number;
  tone?: "dark" | "light";
  className?: string;
}) {
  const lines = label.split("\n");
  const toneClass =
    tone === "light"
      ? "border-brand-cream/50 bg-white/10 text-brand-cream"
      : "border-brand-navy/35 bg-background/90 text-brand-navy";
  return (
    <div
      className={`stamp-badge flex h-24 w-24 flex-col items-center justify-center text-center shadow-md sm:h-28 sm:w-28 ${toneClass} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      {lines.map((line, i) => (
        <span key={i} className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] sm:text-xs">
          {line}
        </span>
      ))}
      <span className="mt-1 text-primary">✦</span>
    </div>
  );
}

const kernelSpots = [
  { top: "4%", left: "8%", size: 12, delay: 0 },
  { top: "-2%", left: "42%", size: 16, delay: 0.5 },
  { top: "10%", left: "88%", size: 11, delay: 1 },
  { top: "55%", left: "-4%", size: 13, delay: 1.5 },
  { top: "70%", left: "95%", size: 14, delay: 0.8 },
  { top: "92%", left: "20%", size: 10, delay: 0.3 },
];

export function FloatingKernels({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 z-10 ${className}`} aria-hidden>
      {kernelSpots.map((k, i) => (
        <motion.span
          key={i}
          className="absolute rounded-[45%] bg-[radial-gradient(circle_at_30%_30%,#fff8e6,#e8d3a0)] shadow-sm"
          style={{ top: k.top, left: k.left, width: k.size, height: k.size * 0.85 }}
          animate={{ y: [0, -14, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 4, delay: k.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function FlightPath(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 60" fill="none" aria-hidden {...props}>
      <path
        d="M2 50 Q 60 -10 198 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="1 10"
        strokeLinecap="round"
      />
      <g transform="translate(190, 16) rotate(20)">
        <path
          d="M0 4 L10 0 L14 2 L6 6 L7 10 L4 9 L2 5 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

export function WorldMapDots({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      aria-hidden
      style={{
        maskImage: "radial-gradient(60% 60% at 50% 50%, black 40%, transparent 90%)",
        WebkitMaskImage: "radial-gradient(60% 60% at 50% 50%, black 40%, transparent 90%)",
      }}
    >
      <defs>
        <pattern id="mapDots" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="1.2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="400" height="200" fill="url(#mapDots)" />
    </svg>
  );
}
