"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";

type ImageLightboxProps = {
  images: string[];
  alt: string;
  index: number;
  onIndexChange: (index: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.75;

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function ImageLightbox({ images, alt, index, onIndexChange, open, onOpenChange }: ImageLightboxProps) {
  const hasMultiple = images.length > 1;

  const goTo = useCallback(
    (nextIndex: number) => {
      onIndexChange((nextIndex + images.length) % images.length);
    },
    [images.length, onIndexChange],
  );

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[90] bg-black/95 transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup
          aria-label={`${alt} — image ${index + 1} of ${images.length}`}
          className="fixed inset-0 z-[90] flex flex-col outline-none transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
        >
          {/* Top bar */}
          <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 text-brand-cream sm:px-6 sm:py-4">
            <span className="font-heading text-xs font-semibold tracking-[0.15em] text-brand-cream/70">
              {hasMultiple ? `${index + 1} / ${images.length}` : null}
            </span>
            <div className="flex items-center gap-1.5">
              <Dialog.Close
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center rounded-full text-brand-cream transition-colors hover:bg-white/10"
              >
                <X size={20} />
              </Dialog.Close>
            </div>
          </div>

          {/* Image stage: keyed by index so zoom/pan state resets whenever the active image changes */}
          <LightboxStage key={index} src={images[index]} alt={alt}>
            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  aria-label="Previous image"
                  className="absolute top-1/2 left-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-brand-cream transition-colors hover:bg-black/60 sm:left-4"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  aria-label="Next image"
                  className="absolute top-1/2 right-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-brand-cream transition-colors hover:bg-black/60 sm:right-4"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </LightboxStage>

          {/* Thumbnail strip */}
          {hasMultiple && (
            <div className="no-scrollbar flex shrink-0 justify-center gap-2.5 overflow-x-auto px-4 py-4">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  aria-label={`View image ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => goTo(i)}
                  className="relative aspect-square w-12 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition-colors"
                  style={{ borderColor: i === index ? "var(--primary)" : "transparent" }}
                >
                  <Image src={src} alt="" fill sizes="56px" className="object-contain" />
                </button>
              ))}
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

type LightboxStageProps = {
  src: string;
  alt: string;
  children?: React.ReactNode;
};

function LightboxStage({ src, alt, children }: LightboxStageProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [interacting, setInteracting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchState = useRef<{ startDist: number; startZoom: number } | null>(null);
  const dragState = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);

  const clampPan = useCallback((next: { x: number; y: number }, z: number) => {
    const el = containerRef.current;
    if (!el || z <= 1) return { x: 0, y: 0 };
    const maxX = (el.clientWidth * (z - 1)) / 2;
    const maxY = (el.clientHeight * (z - 1)) / 2;
    return {
      x: Math.min(maxX, Math.max(-maxX, next.x)),
      y: Math.min(maxY, Math.max(-maxY, next.y)),
    };
  }, []);

  const zoomTo = useCallback(
    (next: number) => {
      const z = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, next));
      setZoom(z);
      setPan((p) => clampPan(p, z));
    },
    [clampPan],
  );

  // Non-passive wheel listener so we can preventDefault to stop page scroll while zooming.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      zoomTo(zoom - e.deltaY * 0.0025 * zoom);
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoom, zoomTo]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "+" || e.key === "=") zoomTo(zoom + ZOOM_STEP);
      else if (e.key === "-" || e.key === "_") zoomTo(zoom - ZOOM_STEP);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zoom, zoomTo]);

  function handleDoubleClick() {
    zoomTo(zoom > 1 ? 1 : 2.5);
  }

  function handlePointerDown(e: React.PointerEvent) {
    (e.target as Element).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      pinchState.current = { startDist: distance(a, b), startZoom: zoom };
      dragState.current = null;
      setInteracting(true);
    } else if (pointers.current.size === 1 && zoom > 1) {
      dragState.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
      setInteracting(true);
    }
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinchState.current) {
      const [a, b] = Array.from(pointers.current.values());
      const ratio = distance(a, b) / pinchState.current.startDist;
      zoomTo(pinchState.current.startZoom * ratio);
    } else if (dragState.current) {
      const dx = e.clientX - dragState.current.startX;
      const dy = e.clientY - dragState.current.startY;
      setPan(clampPan({ x: dragState.current.panX + dx, y: dragState.current.panY + dy }, zoom));
    }
  }

  function handlePointerUp(e: React.PointerEvent) {
    pointers.current.delete(e.pointerId);

    if (pointers.current.size < 2) pinchState.current = null;

    if (pointers.current.size === 1 && zoom > 1) {
      const [p] = Array.from(pointers.current.values());
      dragState.current = { startX: p.x, startY: p.y, panX: pan.x, panY: pan.y };
    } else {
      dragState.current = null;
    }

    if (pointers.current.size === 0) setInteracting(false);
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-0 flex-1 touch-none overflow-hidden select-none"
      onDoubleClick={handleDoubleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ cursor: zoom > 1 ? (interacting ? "grabbing" : "grab") : "zoom-in" }}
    >
      <div
        className="absolute inset-4 sm:inset-10"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transition: interacting ? "none" : "transform 150ms ease-out",
        }}
      >
        <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" draggable={false} />
      </div>

      <div className="absolute top-3 right-20 flex items-center gap-1.5 sm:top-4 sm:right-24">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            zoomTo(zoom - ZOOM_STEP);
          }}
          disabled={zoom <= MIN_ZOOM}
          aria-label="Zoom out"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-brand-cream transition-colors hover:bg-black/60 disabled:opacity-30"
        >
          <Minus size={18} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            zoomTo(zoom + ZOOM_STEP);
          }}
          disabled={zoom >= MAX_ZOOM}
          aria-label="Zoom in"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-brand-cream transition-colors hover:bg-black/60 disabled:opacity-30"
        >
          <Plus size={18} />
        </button>
      </div>

      {children}
    </div>
  );
}
