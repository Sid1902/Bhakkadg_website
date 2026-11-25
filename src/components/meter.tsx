"use client";

import { motion } from "framer-motion";

export function Meter({
  label,
  value,
  max = 5,
  color,
}: {
  label: string;
  value: number;
  max?: number;
  color: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-wider opacity-80">
        <span>{label}</span>
        <span>
          {value}/{max}
        </span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: max }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="h-1.5 flex-1 origin-left rounded-full"
            style={{
              backgroundColor: i < value ? color : "rgba(28,43,69,0.12)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
