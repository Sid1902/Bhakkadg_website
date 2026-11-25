import { ArrowUpRight, ShieldCheck, Wind, Leaf } from "lucide-react";
import { flavours } from "@/lib/flavours";
import { MagneticButton } from "@/components/magnetic-button";
import { Reveal } from "@/components/reveal";
import { PackVisual } from "@/components/pack-visual";
import { GradientBlob } from "@/components/gradient-blob";
import { Newsletter } from "@/components/newsletter";
import Link from "next/link";
import Image from "next/image";

const features = [
  { icon: Leaf, title: "Made with Rice Bran Oil", body: "Zero palm oil used" },
  { icon: ShieldCheck, title: "Premium Quality", body: "Finest ingredients, best taste" },
  { icon: Wind, title: "Air Popped", body: "Light, crunchy, never fried" },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* ---------- HERO ---------- */}
      <section className="navy-band relative isolate overflow-hidden">
        {/* Text: stacked above the image on mobile, overlaid on the left from sm+ */}
        <div className="relative z-10 px-6 pt-12 pb-6 text-center sm:absolute sm:inset-0 sm:flex sm:items-center sm:px-0 sm:py-0 sm:text-left">
          <div className="container-brand sm:py-20">
            <div className="sm:max-w-lg lg:max-w-xl">
              <HeroCopy />
            </div>
          </div>
        </div>

        {/* Banner image: sized to the artwork's own ~7:3 ratio above sm so wide
            screens don't reveal more of the image's width than its height and
            stretch the gap between the text and the bowl; a min-h floor keeps
            tablet widths from getting too short before the ratio takes over. */}
        <div className="relative aspect-[16/9] w-full sm:aspect-[7/3] sm:min-h-[480px]">
          <Image
            src="/images/products/hero-banner.png"
            alt="A bowl of BHAKKADG popcorn with a butter splash, surrounded by flight paths and world landmarks"
            fill
            sizes="100vw"
            priority
            className="object-cover object-right sm:object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 hidden sm:block"
            style={{ background: "linear-gradient(90deg, #021438CC 0%, #02143866 38%, transparent 62%)" }}
          />
        </div>
      </section>

      {/* ---------- FEATURE STRIP ---------- */}
      <section className="border-y border-border bg-white/60 py-10">
        <div className="container-brand">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-14 sm:gap-y-6">
            {features.map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                  <item.icon size={20} />
                </div>
                <div className="min-w-0">
                  <p className="whitespace-nowrap font-heading text-sm font-bold text-brand-navy">{item.title}</p>
                  <p className="whitespace-nowrap text-xs text-muted-foreground">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FEATURED FLAVOURS ---------- */}
      <section className="relative pt-14 pb-24 sm:pt-16 sm:pb-28">
        <div className="container-brand">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                Best Sellers
              </p>
              <h2 className="mt-4 font-heading text-4xl font-bold text-brand-navy sm:text-5xl">
                Featured Flavours
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <MagneticButton href="/flavours" variant="outline">
                Explore All Flavours <ArrowUpRight size={16} />
              </MagneticButton>
            </Reveal>
          </div>

          <div className="no-scrollbar mt-14 -mx-6 flex snap-x snap-proximity gap-5 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
            {flavours.map((f, i) => (
              <Reveal key={f.slug} delay={i * 0.06} className="w-[62vw] shrink-0 snap-center sm:w-auto">
                <Link href={`/flavours/${f.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-sm">
                    <PackVisual
                      flavour={f}
                      rounded="rounded-[1.5rem]"
                      className="!aspect-[4/5]"
                      sizes="(max-width: 640px) 62vw, (max-width: 1024px) 30vw, 320px"
                    />
                  </div>
                  <p className="mt-3 text-center font-heading text-base font-bold text-brand-navy">
                    {f.displayName}
                  </p>
                  <p className="text-center text-xs text-muted-foreground">{f.tasteTags.join(" · ")}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- LET'S STAY CONNECTED ---------- */}
      <section className="container-brand pb-24 sm:pb-28">
        <Reveal>
          <div className="navy-band noise-overlay relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center sm:px-16">
            <GradientBlob className="-left-20 -top-20 h-72 w-72" colors={["#E2AA4E", "#E2AA4E"]} />
            <GradientBlob className="-right-20 -bottom-20 h-72 w-72" colors={["#E2AA4E", "#E2AA4E"]} />
            <div className="relative">
              <h2 className="mx-auto max-w-lg font-heading text-3xl font-bold text-balance sm:text-4xl">
                Let&apos;s Stay Connected
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-brand-cream/70">
                Get updates on new flavours, offers, and where to find BHAKKADG'S near you.
              </p>
              <div className="mx-auto mt-8 max-w-md">
                <Newsletter />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function HeroCopy() {
  return (
    <div className="text-center sm:text-left">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          World Inspired Flavours - Crafted in India.
        </span>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="mt-6 font-heading text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-brand-cream sm:text-5xl lg:text-6xl">
          Discover the <span className="text-primary">World's</span> Favourite Flavours.
        </h1>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-brand-cream/70 sm:mx-0">
          Inspired by global flavours. Small batch made with premium ingredients, zero
          shortcuts ever.
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
          <MagneticButton href="/flavours">
            Explore Flavours <ArrowUpRight size={16} />
          </MagneticButton>
          <MagneticButton href="/contact" variant="outline-light">
            Become a Stockist/Distributor
          </MagneticButton>
        </div>
      </Reveal>
    </div>
  );
}
