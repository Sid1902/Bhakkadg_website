"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Are BHAKKADG'S products vegetarian?",
    a: "Yes — every BHAKKADG'S flavour is 100% vegetarian.",
  },
  {
    q: "Where can I buy BHAKKADG'S popcorn?",
    a: "We're currently onboarding retail partners. Reach out via the contact form and we'll point you to your nearest stockist, or help you become one.",
  },
  {
    q: "Do you offer bulk or wholesale orders?",
    a: "Yes, we work with distributors and retailers on bulk orders. Select \"Distributor / Bulk Order\" in the contact form and our team will follow up.",
  },
  {
    q: "How spicy are the spicy flavours?",
    a: "Thai Chilli and Indian Masala both sit at 4/5 on our spice meter — bold, but not punishing. Portugal Peri-Peri is a milder 3/5.",
  },
  {
    q: "Is there an online store yet?",
    a: "Yes! Add your favourite flavours to the cart and hit \"Buy Now via WhatsApp\" — we'll confirm your order and take payment directly over chat.",
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-3xl border border-border bg-card">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              id={`faq-trigger-${i}`}
              className="flex min-h-[56px] w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-heading text-sm font-semibold sm:text-base">{item.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                <Plus size={14} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
