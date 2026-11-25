import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, BadgeCheck } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { FaqAccordion } from "@/components/faq-accordion";
import { Newsletter } from "@/components/newsletter";
import { InstagramGlyph, FacebookGlyph, XGlyph } from "@/components/social-icons";

export const metadata: Metadata = {
  title: "Contact — BHAKKADG'S",
  description: "Get in touch with BHAKKADG'S — retailers, distributors and fellow bhakkads all welcome.",
};

const details = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Address", value: site.address, href: undefined },
  { icon: Clock, label: "Response Time", value: "Within 3-4 business days", href: undefined },
];

export default function ContactPage() {
  return (
    <div>
      <section className="relative overflow-hidden pt-14 pb-16 sm:pt-16">
        <div className="container-brand relative max-w-2xl">
          <Reveal>
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Let&apos;s Talk
            </p>
            <h1 className="mt-5 font-heading text-5xl font-extrabold leading-tight text-balance sm:text-6xl">
              Get In Touch
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Retailer, distributor, or just a fellow popcorn lover with a question — we&apos;d love to
              hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-brand pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="rounded-[2rem] border border-border bg-card/40 p-7 sm:p-10">
            <h2 className="font-heading text-2xl font-bold">Send us a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill out the form and our team will get back to you shortly.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="rounded-[2rem] border border-border bg-card/40 p-7 sm:p-10">
              <h3 className="font-heading text-lg font-bold">Contact Details</h3>
              <ul className="mt-6 space-y-5">
                {details.map((d) => (
                  <li key={d.label} className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <d.icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {d.label}
                      </p>
                      {d.href ? (
                        <a href={d.href} className="text-sm font-medium transition-colors hover:text-primary">
                          {d.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{d.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex gap-3 border-t border-border pt-6">
                {[
                  { icon: InstagramGlyph, href: site.social.instagram, label: "Instagram" },
                  { icon: FacebookGlyph, href: site.social.facebook, label: "Facebook" },
                  { icon: XGlyph, href: site.social.x, label: "X" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative flex min-h-[220px] flex-1 items-center justify-center overflow-hidden rounded-[2rem] border border-border bg-card/40">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(28,43,69,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(28,43,69,0.12) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative flex flex-col items-center gap-2 text-center">
                <MapPin className="text-primary" size={26} />
                <p className="text-sm font-medium">{site.address}</p>
                <p className="text-xs text-muted-foreground">Map embed coming soon</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="container-brand pb-24">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-primary">FAQ</p>
          <h2 className="mt-4 font-heading text-4xl font-bold sm:text-5xl">Common Questions</h2>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-12 max-w-2xl">
          <FaqAccordion />
        </Reveal>
      </section>

      {/* ---------- NEWSLETTER ---------- */}
      <section className="container-brand pb-28">
        <Reveal>
          <div className="navy-band noise-overlay relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center sm:px-16">
            <h2 className="mx-auto max-w-lg font-heading text-3xl font-bold text-balance sm:text-4xl">
              Be first to know when BHAKKADG'S goes online
            </h2>
            <p className="mx-auto mt-3 max-w-md text-brand-cream/70 text-sm">
              No spam — just launch news, new flavours, and where to find us.
            </p>
            <div className="mx-auto mt-8 max-w-md">
              <Newsletter />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- COMPANY INFORMATION ---------- */}
      <section className="container-brand pb-24">
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-[1.75rem] border border-border bg-card/40 px-8 py-7 text-center sm:flex-row sm:text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BadgeCheck size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Company Information
              </p>
              <p className="mt-1 text-sm font-medium text-brand-navy">
                Manufactured &amp; Marketed by Bhagwati Food Works
              </p>
              <p className="text-sm text-muted-foreground">FSSAI Lic. No. {site.fssaiLicense}</p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
