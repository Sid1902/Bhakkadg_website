import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { flavours } from "@/lib/flavours";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { GradientBlob } from "@/components/gradient-blob";
import { MagneticButton } from "@/components/magnetic-button";
import { PackVisual } from "@/components/pack-visual";

export const metadata: Metadata = {
  title: "Flavours — BHAKKADG'S",
  description:
    "Every BHAKKADG'S popcorn flavour in one place — Thai Chilli, Classic Butter Flavour, Portugal Peri-Peri, Italian Cheese and Indian Masala.",
};

export default function FlavoursPage() {
  return (
    <div>
      <section className="relative overflow-hidden pt-12 pb-8 sm:pt-14">
        <GradientBlob className="-left-16 top-0 h-48 w-48" colors={["#E2AA4E", "#E2AA4E"]} />
        <div className="container-brand relative max-w-2xl">
          <Reveal>
            <h1 className="font-heading text-5xl font-extrabold leading-tight text-balance sm:text-6xl">
              Our Flavours
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Five cities, five signature flavours. Tap a pack to explore it in detail.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-brand pb-24">
        <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
          {flavours.map((f) => (
            <RevealItem key={f.slug}>
              <Link href={`/flavours/${f.slug}`} className="group block focus-visible:outline-none">
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] shadow-sm ring-1 ring-black/[0.03] transition-transform duration-300 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-primary">
                  <PackVisual
                    flavour={f}
                    rounded="rounded-[1.5rem]"
                    className="!aspect-square"
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 280px"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 flex items-end justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: f.colors.accent, color: f.colors.accentForeground }}
                    >
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-center font-heading text-base font-bold text-brand-navy sm:text-left">
                  {f.displayName}
                </p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="container-brand pb-28">
        <Reveal>
          <div className="navy-band noise-overlay relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center sm:px-16">
            <h2 className="mx-auto max-w-xl font-heading text-3xl font-bold text-balance sm:text-4xl">
              Want to stock BHAKKADG'S in your store?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-brand-cream/70">
              We work with retailers and distributors across formats — reach out for pack sizes,
              pricing and bulk orders.
            </p>
            <div className="mt-8 flex justify-center">
              <MagneticButton href="/contact">
                Become a Stockist/Distributor <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
