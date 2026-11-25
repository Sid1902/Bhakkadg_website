"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Next's App Router doesn't reliably reset scroll position when navigating
 * between routes that share the same dynamic segment (e.g. /flavours/[slug]
 * to another /flavours/[slug]) — it treats it as an in-place update rather
 * than a new page. This forces every route change back to the top.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
