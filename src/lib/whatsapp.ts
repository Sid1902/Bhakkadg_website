import { site } from "@/lib/site";

export type OrderLine = {
  name: string;
  size: string;
  qty: number;
  price: number;
};

/** Digits-only number as required by wa.me (no "+", spaces or dashes). */
export function getWhatsAppNumber(): string {
  return site.phone.replace(/\D/g, "");
}

export function buildOrderMessage(lines: OrderLine[], total: number): string {
  const itemLines = lines
    .map((l, i) => `${i + 1}. ${l.name} (${l.size}) x${l.qty} — ₹${l.price * l.qty}`)
    .join("\n");

  return `Hi ${site.name}! I'd like to order:\n\n${itemLines}\n\nTotal: ₹${total}`;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}
