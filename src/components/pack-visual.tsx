import Image from "next/image";
import type { Flavour } from "@/lib/flavours";

type PackVisualProps = {
  flavour: Flavour;
  className?: string;
  priority?: boolean;
  sizes?: string;
  rounded?: string;
};

/**
 * Cinematic 16:9 product scene shots (not transparent packshots) —
 * framed as a clean, full-bleed banner. Native images are already 16:9,
 * so object-cover never actually crops anything at the intended aspect.
 */
export function PackVisual({
  flavour,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 800px",
  rounded = "rounded-[1.75rem]",
}: PackVisualProps) {
  return (
    <div className={`group relative aspect-video w-full overflow-hidden ${rounded} ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-90"
        style={{
          background: `radial-gradient(60% 60% at 50% 50%, ${flavour.colors.accent}55, transparent 75%)`,
        }}
      />
      <Image
        src={`/images/products/${flavour.slug}.png`}
        alt={`${flavour.displayName} popcorn — ${flavour.tagline}`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${rounded} ring-1 ring-inset ring-white/10`}
      />
    </div>
  );
}
