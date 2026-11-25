"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { buildOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "@/components/social-icons";

export default function CartPage() {
  const { resolvedItems, subtotal, updateQty, removeItem } = useCart();

  const whatsappUrl = buildWhatsAppUrl(
    buildOrderMessage(
      resolvedItems.map((i) => ({ name: i.name, size: i.sizeLabel, qty: i.qty, price: i.price })),
      subtotal
    )
  );

  if (resolvedItems.length === 0) {
    return (
      <div className="container-brand py-24 text-center">
        <h1 className="font-heading text-3xl font-extrabold text-brand-navy">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Add a flavour to get started.</p>
        <Link
          href="/flavours"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[#edbd70]"
        >
          <ArrowLeft size={16} /> Browse Flavours
        </Link>
      </div>
    );
  }

  return (
    <div className="container-brand py-16">
      <h1 className="font-heading text-4xl font-extrabold text-brand-navy">Your Cart</h1>

      <div className="mt-8 divide-y divide-border rounded-3xl border border-border bg-card">
        {resolvedItems.map((item) => (
          <div key={`${item.slug}-${item.sizeLabel}`} className="flex items-center gap-4 p-5">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-secondary">
              <Image src={`/images/products/${item.slug}.png`} alt={item.name} fill sizes="64px" className="object-cover" />
            </div>

            <div className="flex-1">
              <p className="font-heading text-sm font-bold text-brand-navy">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                {item.sizeLabel} — ₹{item.price} each
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-border px-2 py-1.5">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => updateQty(item.slug, item.sizeLabel, item.qty - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-brand-navy hover:text-primary"
              >
                <Minus size={14} />
              </button>
              <span className="w-5 text-center text-sm font-semibold text-brand-navy">{item.qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => updateQty(item.slug, item.sizeLabel, item.qty + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-brand-navy hover:text-primary"
              >
                <Plus size={14} />
              </button>
            </div>

            <p className="w-16 text-right text-sm font-semibold text-brand-navy">₹{item.lineTotal}</p>

            <button
              type="button"
              aria-label="Remove item"
              onClick={() => removeItem(item.slug, item.sizeLabel)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:text-destructive"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-end gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-heading text-lg font-bold text-brand-navy">Total: ₹{subtotal}</p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-[#edbd70]"
        >
          <WhatsAppGlyph width={18} height={18} /> Buy Now via WhatsApp
        </a>
      </div>

      <p className="mt-4 text-right text-xs text-muted-foreground">
        We don&apos;t process payments on the site yet — you&apos;ll confirm your order and pay directly with us on WhatsApp.
      </p>
    </div>
  );
}
