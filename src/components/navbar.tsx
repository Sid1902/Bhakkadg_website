"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Mail, Phone, ShoppingBag } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { MagneticButton } from "@/components/magnetic-button";
import { InstagramGlyph, FacebookGlyph, XGlyph } from "@/components/social-icons";
import { useCart } from "@/lib/cart-context";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`navy-band sticky top-0 z-50 w-full transition-shadow duration-300 ${
        scrolled || open ? "shadow-[0_8px_30px_rgba(16,27,48,0.35)]" : ""
      }`}
    >
      <div className="container-brand flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5 font-heading text-xl font-extrabold tracking-tight text-brand-cream">
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white transition-transform duration-300 group-hover:rotate-12">
            <Image src="/images/logo-icon.jpeg" alt="" fill sizes="40px" className="object-cover" />
          </span>
          <span>
            BHAKKADG'S
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide transition-colors ${
                  active ? "text-primary" : "text-brand-cream/75 hover:text-brand-cream"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 h-px w-full bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/cart"
            aria-label="View cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-brand-cream transition-colors hover:border-primary hover:text-primary"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <MagneticButton href="/contact" className="!px-6 !py-2.5 text-xs">
            Get In Touch
          </MagneticButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/cart"
            aria-label="View cart"
            className="relative z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-brand-cream"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-brand-cream"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Full-screen mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="navy-band fixed inset-0 z-[60] flex flex-col md:hidden"
          >
            <div className="h-20 shrink-0" aria-hidden />

            <nav className="container-brand flex flex-1 flex-col justify-center gap-2 pb-16">
              {navLinks.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-[56px] items-center border-b border-white/10 font-heading text-3xl font-bold ${
                        active ? "text-primary" : "text-brand-cream"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 + navLinks.length * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex min-h-[56px] w-full items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground"
                >
                  Get In Touch
                </Link>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="container-brand flex shrink-0 items-center justify-between border-t border-white/10 py-6"
            >
              <div className="flex flex-col gap-2 text-xs text-brand-cream/65">
                <a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-2">
                  <Mail size={14} className="text-primary" /> {site.email}
                </a>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex min-h-11 items-center gap-2">
                  <Phone size={14} className="text-primary" /> {site.phone}
                </a>
              </div>
              <div className="flex gap-2.5">
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
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-brand-cream/70"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
