"use client";

import { useState, type FormEvent } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";

export function Newsletter() {
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // NOTE: placeholder only — wire up to an email/newsletter provider before launch.
    setDone(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Mail className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-brand-cream/50" size={16} />
        <input
          type="email"
          required
          disabled={done}
          placeholder="Enter your email"
          className="w-full rounded-full border border-white/20 bg-white/10 py-3.5 pr-4 pl-11 text-sm text-brand-cream outline-none transition-colors placeholder:text-brand-cream/50 focus:border-primary/70 disabled:opacity-60"
        />
      </div>
      <button
        type="submit"
        disabled={done}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[#edbd70] disabled:opacity-70"
      >
        {done ? (
          <>
            Subscribed <Check size={15} />
          </>
        ) : (
          <>
            Notify Me <ArrowRight size={15} />
          </>
        )}
      </button>
    </form>
  );
}
