import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { flavours } from "@/lib/flavours";
import { InstagramGlyph, FacebookGlyph, XGlyph } from "@/components/social-icons";

function VegSymbol() {
  return (
    <svg
      viewBox="0 0 16 16"
      width={12}
      height={12}
      className="shrink-0"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="14" height="14" rx="2" fill="#FFFFFF" stroke="#3FA34D" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="4" fill="#3FA34D" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="navy-band relative overflow-hidden">
      <div className="container-brand relative grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="font-heading text-2xl font-extrabold tracking-tight text-brand-cream">
            BHAKKADG'S
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-cream/65">
            {site.subTagline} Made for every Flavour chaser.
          </p>
          <div className="mt-6 flex gap-3">
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-brand-cream/70 transition-colors hover:border-primary/60 hover:text-primary"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">Quick Links</p>
          <ul className="mt-5 space-y-3 text-sm text-brand-cream/65">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-brand-cream">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">Flavours</p>
          <ul className="mt-5 space-y-3 text-sm text-brand-cream/65">
            {flavours.map((f) => (
              <li key={f.slug}>
                <Link href={`/flavours/${f.slug}`} className="transition-colors hover:text-brand-cream">
                  {f.displayName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">Contact</p>
          <ul className="mt-5 space-y-3 text-sm text-brand-cream/65">
            <li className="flex items-start gap-2.5">
              <Mail size={15} className="mt-0.5 shrink-0 text-primary" />
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-brand-cream">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={15} className="mt-0.5 shrink-0 text-primary" />
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-brand-cream">
                {site.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
              <span>{site.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10 py-6">
        <div className="container-brand flex flex-col items-center justify-between gap-3 text-xs text-brand-cream/55 sm:flex-row">
          <p>© {new Date().getFullYear()} BHAKKADG'S. All rights reserved.</p>
          <p>FSSAI Lic. No. {site.fssaiLicense}</p>
          <p className="flex items-center gap-1.5">
            <VegSymbol />
            100% Vegetarian
          </p>
        </div>
      </div>
    </footer>
  );
}
