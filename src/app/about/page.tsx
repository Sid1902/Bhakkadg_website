import type { Metadata } from "next";
import { Compass, Target, Sparkles, ShieldCheck, Quote } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { GradientBlob } from "@/components/gradient-blob";
import { MagneticButton } from "@/components/magnetic-button";

export const metadata: Metadata = {
  title: "About Us — BHAKKADG'S",
  description:
    "The story behind BHAKKADG'S — small batch, globally-inspired popcorn made for every bhakkad chasing bold flavour.",
};

const SHOW_JOURNEY = false;

const journey = [
  {
    year: "The Thought",
    title: "Why flavour deserves a passport",
    body: "We started with one belief — that the world's boldest flavours already exist, fully formed, in the cities that created them. Our job was never to invent new tastes. It was to bring the real ones home.",
  },
  {
    year: "The Recipe",
    title: "Five cities, one bowl",
    body: "Instead of one safe flavour, we bottled the food memories of five cities — Bangkok, Paris, Lisbon, Rome, Mumbai — into a single honest snack.",
  },
  {
    year: "The Batch",
    title: "Small-batch, on purpose",
    body: "We kept production small so every bag stays fresh and every seasoning blend stays true — no compromises for scale, not yet.",
  },
  {
    year: "Today",
    title: "From one kitchen to shelves everywhere",
    body: "What started as an idea is now a full lineup of bold flavours — open to retailers, distributors, and anyone ready to bring BHAKKADG'S home.",
  },
];

const quality = [
  {
    icon: ShieldCheck,
    title: "100% Vegetarian",
    body: "Every flavour is certified vegetarian, made with honest, recognisable ingredients.",
  },
  {
    icon: Sparkles,
    title: "Small batch popped",
    body: "We pop in controlled small batches so every kernel gets evenly seasoned and stays crisp.",
  },
  {
    icon: Compass,
    title: "Globally inspired recipes",
    body: "Each seasoning blend is built around the real culinary identity of the city that inspired it.",
  },
  {
    icon: Target,
    title: "Perfectly Seasoned",
    body: "Expertly blended to deliver bold, balanced flavour in every bite.",
  },
];

const testimonials = [
  {
    id: "t1",
    quote: "The Portugal Peri-Peri is unlike anything else on the shelf — tangy, smoky, and properly addictive.",
    name: "Sara",
    role: "Verified Buyer",
  },
  {
    id: "t2",
    quote: "Finally a popcorn brand that tastes like it was made by people who actually love food.",
    name: "Dhruv",
    role: "Verified Buyer",
  },
  {
    id: "t3",
    quote: "Classic Butter is now a permanent fixture at our movie nights.",
    name: "Abhishek K.",
    role: "Verified Buyer",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden pt-14 pb-16 sm:pt-16">
        <GradientBlob className="-left-24 top-0 h-96 w-96" colors={["#4A2359", "#4A2359"]} />
        <div className="container-brand relative max-w-3xl">
          <Reveal>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-primary">Our Story</p>
            <h1 className="mt-5 font-heading text-5xl font-extrabold leading-tight sm:text-6xl">
              Every Great Flavour
              <br />
              has an origin.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Long before it reached our popcorn, it was shaped by the people, traditions, and
              culture that made it unforgettable. We believe that when a flavour has a story, it
              deserves to be respected.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              That&apos;s why every recipe we create stays true to the spirit of its homeland
              while delivering the perfect crunch in every bite. We don&apos;t chase trends or
              create flavours for the sake of variety. We celebrate the originals. Every pack is
              our tribute to the places where these iconic flavours became what they are today.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-heading text-2xl font-bold text-balance text-brand-navy sm:text-3xl">
              Because great popcorn isn&apos;t just about how it tastes.
              <br className="hidden sm:block" /> It&apos;s about where that taste comes from.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- VISION / MISSION ---------- */}
      <section className="container-brand pt-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-border bg-card/50 p-9">
              <Compass className="text-primary" size={28} />
              <h2 className="mt-5 font-heading text-2xl font-bold">Our Vision</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                To become most trusted food brand delivering exceptional quality while celebrating authentic origins of flavours.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-border bg-card/50 p-9">
              <Target className="text-primary" size={28} />
              <h2 className="mt-5 font-heading text-2xl font-bold">Our Mission</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Turn ordinary snacking into a small adventure, honest recipes, quality ingredients,
                and flavours from around the world in every handful.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- JOURNEY (hidden for now — flip to true to re-enable) ---------- */}
      {SHOW_JOURNEY && (
        <section className="relative overflow-hidden bg-card/40 py-24">
          <div className="container-brand">
            <Reveal className="max-w-xl">
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                The Journey
              </p>
              <h2 className="mt-4 font-heading text-4xl font-bold sm:text-5xl">From an idea to your snack table</h2>
            </Reveal>

            <div className="relative mt-16 grid gap-8 md:grid-cols-4">
              <div className="absolute top-6 left-0 hidden h-px w-full bg-gradient-to-r from-primary/60 via-primary/20 to-transparent md:block" />
              {journey.map((step, i) => (
                <Reveal key={step.year} delay={i * 0.08}>
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-background font-heading text-sm font-bold text-primary">
                      {i + 1}
                    </div>
                    <p className="mt-5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {step.year}
                    </p>
                    <h3 className="mt-2 font-heading text-lg font-bold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- QUALITY / MANUFACTURING ---------- */}
      <section className="container-brand pt-8 pb-24">
        <Reveal className="max-w-xl">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Quality & Craft
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold sm:text-5xl">Made with care, not Shortcuts</h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quality.map((item) => (
            <RevealItem key={item.title}>
              <div className="group h-full rounded-3xl border border-border bg-card/50 p-7 transition-colors duration-300 hover:border-primary/40">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <item.icon size={19} />
                </div>
                <h3 className="mt-5 font-heading text-base font-bold">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ---------- TESTIMONIALS (placeholder) ---------- */}
      <section className="relative overflow-hidden bg-card/40 pt-16 pb-24">
        <GradientBlob className="right-0 top-0 h-80 w-80" colors={["#E2AA4E", "#E2AA4E"]} />
        <div className="container-brand relative">
          <Reveal className="max-w-xl">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Why People Love Us
            </p>
            <h2 className="mt-4 font-heading text-4xl font-bold sm:text-5xl">In their Own Words...</h2>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <RevealItem key={t.id}>
                <div className="h-full rounded-3xl border border-border bg-background/50 p-7">
                  <Quote className="text-primary/60" size={22} />
                  <p className="mt-4 text-sm leading-relaxed text-foreground/85">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-5 font-heading text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="container-brand pt-16 pb-24 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold text-balance sm:text-4xl">
            Want to taste the full story?
          </h2>
          <div className="mt-8">
            <MagneticButton href="/flavours">Explore Our Flavours</MagneticButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
