"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, ChevronDown } from "lucide-react";

const inquiryTypes = ["General Enquiry", "Retailer", "Stockist", "Distributor", "Bulk Order", "Other"];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // NOTE: no backend/email service wired up yet — this simulates a submission.
    // Hook this up to an API route / form service (e.g. Formspree, Resend) before going live.
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-3xl border border-primary/30 bg-primary/5 px-8 py-16 text-center"
      >
        <CheckCircle2 className="text-primary" size={38} />
        <h3 className="mt-5 font-heading text-xl font-bold">Thanks for reaching out!</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          We&apos;ve received your message and will get back to you shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-semibold text-primary underline underline-offset-4"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="name" required placeholder="Your name" />
        <Field label="Email" name="email" type="email" required placeholder="you@example.com" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" placeholder="+91 00000 00000" />
        <div>
          <label htmlFor="inquiryType" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            I&apos;m reaching out as a
          </label>
          <div className="relative">
            <select
              id="inquiryType"
              name="inquiryType"
              className="w-full appearance-none rounded-xl border border-border bg-background/60 px-4 py-3 pr-10 text-sm outline-none transition-colors focus:border-primary/60 min-h-11"
              defaultValue={inquiryTypes[0]}
            >
              {inquiryTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us a little about what you're looking for..."
          className="w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary/60"
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[#edbd70] disabled:opacity-60"
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Sending...
            </motion.span>
          ) : (
            <motion.span key="idle" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Send Message <Send size={15} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full min-h-11 rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary/60"
      />
    </div>
  );
}
