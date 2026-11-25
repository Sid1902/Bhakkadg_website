"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

type Size = { label: string; price: number };

export function AddToCart({ slug, sizes }: { slug: string; sizes: Size[] }) {
  const { addItem } = useCart();
  const [sizeLabel, setSizeLabel] = useState(sizes[0]?.label ?? "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (!sizeLabel) return;
    addItem({ slug, sizeLabel, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2.5">
      {sizes.length > 1 && (
        <select
          value={sizeLabel}
          onChange={(e) => setSizeLabel(e.target.value)}
          className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-medium text-brand-navy"
        >
          {sizes.map((s) => (
            <option key={s.label} value={s.label}>
              {s.label} — ₹{s.price}
            </option>
          ))}
        </select>
      )}

      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-2 py-1.5">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="flex h-7 w-7 items-center justify-center rounded-full text-brand-navy hover:text-primary"
        >
          <Minus size={14} />
        </button>
        <span className="w-5 text-center text-sm font-semibold text-brand-navy">{qty}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQty((q) => q + 1)}
          className="flex h-7 w-7 items-center justify-center rounded-full text-brand-navy hover:text-primary"
        >
          <Plus size={14} />
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[#edbd70]"
      >
        <ShoppingBag size={15} />
        {added ? "Added!" : "Add to Cart"}
      </button>
    </div>
  );
}
