"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useRef, type ReactNode } from "react";
import { getFlavour, getSizes } from "@/lib/flavours";

export type CartItem = {
  slug: string;
  sizeLabel: string;
  qty: number;
};

type CartAction =
  | { type: "add"; item: CartItem }
  | { type: "updateQty"; slug: string; sizeLabel: string; qty: number }
  | { type: "remove"; slug: string; sizeLabel: string }
  | { type: "clear" }
  | { type: "hydrate"; items: CartItem[] };

const STORAGE_KEY = "bhakkadgs-cart";

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "hydrate":
      return action.items;
    case "add": {
      const existing = state.find(
        (i) => i.slug === action.item.slug && i.sizeLabel === action.item.sizeLabel
      );
      if (existing) {
        return state.map((i) =>
          i === existing ? { ...i, qty: i.qty + action.item.qty } : i
        );
      }
      return [...state, action.item];
    }
    case "updateQty":
      return state
        .map((i) =>
          i.slug === action.slug && i.sizeLabel === action.sizeLabel
            ? { ...i, qty: action.qty }
            : i
        )
        .filter((i) => i.qty > 0);
    case "remove":
      return state.filter((i) => !(i.slug === action.slug && i.sizeLabel === action.sizeLabel));
    case "clear":
      return [];
    default:
      return state;
  }
}

export type ResolvedCartItem = CartItem & { name: string; price: number; lineTotal: number };

type CartContextValue = {
  items: CartItem[];
  resolvedItems: ResolvedCartItem[];
  count: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  updateQty: (slug: string, sizeLabel: string, qty: number) => void;
  removeItem: (slug: string, sizeLabel: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const isFirstPersist = useRef(true);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", items: JSON.parse(raw) });
    } catch {
      // ignore unreadable/corrupt storage
    }
  }, []);

  useEffect(() => {
    // Skip the mount run so the initial empty state doesn't overwrite storage before hydration lands.
    if (isFirstPersist.current) {
      isFirstPersist.current = false;
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore write failures (e.g. private browsing quota)
    }
  }, [items]);

  const resolvedItems = useMemo<ResolvedCartItem[]>(() => {
    return items.flatMap((item) => {
      const flavour = getFlavour(item.slug);
      if (!flavour) return [];
      const size = getSizes(flavour).find((s) => s.label === item.sizeLabel);
      if (!size) return [];
      return [{ ...item, name: flavour.displayName, price: size.price, lineTotal: size.price * item.qty }];
    });
  }, [items]);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => resolvedItems.reduce((sum, i) => sum + i.lineTotal, 0),
    [resolvedItems]
  );

  const value: CartContextValue = {
    items,
    resolvedItems,
    count,
    subtotal,
    addItem: (item) => dispatch({ type: "add", item }),
    updateQty: (slug, sizeLabel, qty) => dispatch({ type: "updateQty", slug, sizeLabel, qty }),
    removeItem: (slug, sizeLabel) => dispatch({ type: "remove", slug, sizeLabel }),
    clear: () => dispatch({ type: "clear" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
