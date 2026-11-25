import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Flame, Utensils, CalendarHeart, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";
import { flavours, getFlavour, getSizes } from "@/lib/flavours";
import { Reveal } from "@/components/reveal";
import { ProductGallery } from "@/components/product-gallery";
import { Meter } from "@/components/meter";
import { MagneticButton } from "@/components/magnetic-button";
import { AddToCart } from "@/components/add-to-cart";

export function generateStaticParams() {
  return flavours.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const flavour = getFlavour(slug);
  if (!flavour) return {};
  return {
    title: `${flavour.displayName} — BHAKKADG'S`,
    description: flavour.description,
  };
}

function tasteScore(tags: string[]) {
  return Math.min(5, Math.max(3, tags.length + 2));
}

export default async function FlavourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = flavours.findIndex((f) => f.slug === slug);
  if (index === -1) notFound();

  const f = flavours[index];
  const prev = flavours[(index - 1 + flavours.length) % flavours.length];
  const next = flavours[(index + 1) % flavours.length];

  // Placeholder gallery until real front/back/lifestyle shots are supplied per flavour.
  const frontImage = `/images/products/${f.slug}.png`;
  const galleryImages = f.images && f.images.length > 0 ? f.images : [frontImage, frontImage, frontImage];

  return (
    <div>
      {/* ---------- BREADCRUMB ---------- */}
      <div className="container-brand pt-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/flavours" className="transition-colors hover:text-primary">
            Flavours
          </Link>
          <ChevronRight size={12} />
          <span className="font-medium text-brand-navy">{f.displayName}</span>
        </nav>
      </div>

      {/* ---------- MAIN ---------- */}
      <section className="container-brand pt-6 pb-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ProductGallery
              images={galleryImages}
              alt={`${f.displayName} popcorn — ${f.tagline}`}
              accent={f.colors.accent}
            />
          </Reveal>

          <div>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {f.city}
            </p>
            <h1 className="mt-2 font-heading text-4xl font-extrabold text-balance text-brand-navy sm:text-5xl">
              {f.displayName}
            </h1>
            <p className="mt-2 text-lg font-medium text-muted-foreground">{f.tagline}</p>

            <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">{f.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {f.tasteTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                  style={{ backgroundColor: f.colors.accent, color: f.colors.accentForeground }}
                >
                  <Sparkles size={11} /> {tag}
                </span>
              ))}
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-navy"
                style={{ backgroundColor: `${f.colors.accentSoft}40` }}
              >
                <Flame size={11} /> Spice {f.spiceLevel}/5
              </span>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Meter label="Spice Level" value={f.spiceLevel} color={f.colors.accent} />
              <Meter label="Taste Intensity" value={tasteScore(f.tasteTags)} color={f.colors.accent} />
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-secondary/60 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <Utensils size={14} /> Best Pairing
                </div>
                <p className="mt-2 text-sm font-medium text-brand-navy">{f.pairing}</p>
              </div>
              <div className="rounded-2xl border border-border bg-secondary/60 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <CalendarHeart size={14} /> Best Occasion
                </div>
                <p className="mt-2 text-sm font-medium text-brand-navy">{f.occasion}</p>
              </div>
            </div>

            {/* ---------- SIZES & PRICE ---------- */}
            <div className="mt-10">
              <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-brand-navy">
                Pack Sizes
              </h2>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {getSizes(f).map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-brand-navy"
                  >
                    {s.label}
                    <span className="ml-2 text-muted-foreground">₹{s.price}</span>
                  </div>
                ))}
              </div>
              <AddToCart slug={f.slug} sizes={getSizes(f)} />
            </div>

            <div className="mt-9">
              <MagneticButton href="/contact">Become a Stockist/Distributor</MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PREV / NEXT ---------- */}
      <section className="container-brand pb-24">
        <div className="grid grid-cols-2 gap-4 border-t border-border pt-8">
          <Link
            href={`/flavours/${prev.slug}`}
            className="group flex items-center gap-3 rounded-2xl border border-border p-4 transition-colors hover:border-primary/50"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-brand-navy transition-colors group-hover:border-primary/60 group-hover:text-primary">
              <ArrowLeft size={16} />
            </span>
            <span className="min-w-0">
              <span className="block text-xs text-muted-foreground">Previous</span>
              <span className="block truncate text-sm font-semibold text-brand-navy">{prev.displayName}</span>
            </span>
          </Link>
          <Link
            href={`/flavours/${next.slug}`}
            className="group flex items-center justify-end gap-3 rounded-2xl border border-border p-4 text-right transition-colors hover:border-primary/50"
          >
            <span className="min-w-0">
              <span className="block text-xs text-muted-foreground">Next</span>
              <span className="block truncate text-sm font-semibold text-brand-navy">{next.displayName}</span>
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-brand-navy transition-colors group-hover:border-primary/60 group-hover:text-primary">
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
