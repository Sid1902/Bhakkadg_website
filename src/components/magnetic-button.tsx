"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import type { ReactNode, MouseEvent } from "react";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "outline-light";
  className?: string;
};

export function MagneticButton({ href, children, variant = "solid", className = "" }: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 whitespace-nowrap";
  const variants = {
    solid: "bg-primary text-primary-foreground hover:bg-[#edbd70]",
    outline: "border-2 border-brand-navy/70 text-brand-navy hover:border-primary hover:text-primary",
    "outline-light": "border-2 border-brand-cream/60 text-brand-cream hover:border-primary hover:text-primary",
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    </motion.div>
  );
}
