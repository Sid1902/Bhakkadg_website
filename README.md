# BHAKKADG'S — Premium Popcorn Showcase Site

A premium, globally-inspired product showcase site for **BHAKKADG'S** popcorn — built with Next.js (App Router), Tailwind CSS v4, shadcn/ui and Framer Motion.

This is a **showcase site**, not an ecommerce store: there's no cart, checkout, or login. Its job is to introduce the brand, showcase the 5 flavours, and drive retailers/customers to get in touch.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** for styling, with a custom flavour-driven design system
- **shadcn/ui** for base primitives (button, etc.) — extendable with any [21st.dev](https://21st.dev/community/components) registry component via `npx shadcn@latest add "<21st.dev url>"`
- **Framer Motion** for scroll reveals, hover/magnetic interactions, and page transitions
- **lucide-react** for icons (note: this installed version dropped brand logos like Instagram/Facebook/X — hand-rolled outline glyphs live in `src/components/social-icons.tsx`)

## Project Structure

```
src/
  app/
    layout.tsx          Root layout — fonts, Navbar, Footer, Back-to-top
    page.tsx             Home
    about/page.tsx        About
    products/page.tsx      Products grid
    flavours/page.tsx      Per-flavour themed sections (chameleon theming)
    contact/page.tsx       Contact form, FAQ, newsletter
    globals.css           Design tokens, brand utilities, animations
  components/            Shared UI (Navbar, Footer, ProductCard, PackVisual, etc.)
  lib/
    flavours.ts          All flavour data — description, ingredients, spice/taste, colors
    site.ts               Site-wide constants — nav links, contact info, socials
public/                  Static assets (see Images section below)
```

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Images — Replacing Placeholders

**No product photography is wired in yet.** Every pack shown on the site (`PackVisual` component) is a stylised CSS/SVG stand-in generated from each flavour's real brand colours — it's a placeholder, not a template graphic.

To swap in your real pack photography:

1. Export each pack as a transparent PNG (packshot on transparent background works best).
2. Drop them into `public/images/products/` using these exact filenames:
   - `thai-chilli.png`
   - `classic-butter.png`
   - `portugal-peri-peri.png`
   - `italian-cheese.png`
   - `indian-masala.png`
3. In `src/components/pack-visual.tsx`, replace the placeholder markup with a Next.js `<Image src={\`/images/products/${flavour.slug}.png\`} .../>`.

Add your logo to `public/images/logo.svg` (or `.png`) and swap it into the "B" mark in `src/components/navbar.tsx`.

## Content — Replacing Placeholders

Some content was written to keep the build moving and is clearly placeholder:

- **Contact details** (`src/lib/site.ts`) — email, phone, address, social links are placeholders. Update with real details.
- **Testimonials** (`src/app/about/page.tsx`) — labeled "Placeholder Customer", swap for real reviews.
- **Contact form & newsletter** — both are front-end only right now (no backend). Wire `src/components/contact-form.tsx` and `src/components/newsletter.tsx` up to an email/API service (e.g. Resend, Formspree, a Next.js API route) before launch.
- **Google Map** — the Contact page has a placeholder map panel; swap for a real embed once you have a confirmed address.

## Deploying

**Vercel (recommended, zero-config for Next.js):**

```bash
npm i -g vercel
vercel
```

**Static/other hosts:** run `npm run build` then `npm run start`, or use `next export`-compatible hosting if you convert to static export (note: the contact form's client-side interactivity still works either way; only a real backend endpoint requires a server).

## Future Improvements

- Wire the contact form and newsletter signup to a real backend/email service
- Swap all placeholder pack visuals and testimonials for real assets/content
- Add real Google Maps embed once address is confirmed
- Consider adding a blog/recipes section for SEO
- If/when ecommerce is introduced: flavour data in `src/lib/flavours.ts` is already structured per-product, making it straightforward to extend with pricing, variants and a cart later
