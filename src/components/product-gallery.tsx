"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { ImageLightbox } from "@/components/image-lightbox";

type ProductGalleryProps = {
  images: string[];
  alt: string;
  accent: string;
};

export function ProductGallery({ images, alt, accent }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const current = images[Math.min(active, images.length - 1)];

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label="Open image gallery, zoom and browse"
        className="group relative aspect-video w-full cursor-zoom-in overflow-hidden rounded-[1.75rem] bg-white"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] opacity-60 blur-2xl"
          style={{ background: `radial-gradient(60% 60% at 50% 50%, ${accent}55, transparent 75%)` }}
        />
        <Image
          key={current}
          src={current}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 600px"
          priority
          className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10"
        />
        <span
          aria-hidden
          className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
        >
          <Expand size={16} />
        </span>
      </button>

      <ImageLightbox
        images={images}
        alt={alt}
        index={active}
        onIndexChange={setActive}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />

      {images.length > 1 && (
        <div
          role="tablist"
          aria-label="Product images"
          className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1"
        >
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`View image ${i + 1} of ${images.length}`}
              onClick={() => setActive(i)}
              className="relative aspect-square w-12 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition-colors sm:w-14"
              style={{ borderColor: i === active ? accent : "var(--border)" }}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
