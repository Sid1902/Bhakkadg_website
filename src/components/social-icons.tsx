import type { SVGProps } from "react";

const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function InstagramGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M14 21v-8h2.6l.4-3H14V8.2c0-.9.3-1.5 1.6-1.5H17V4.1C16.7 4 15.8 4 14.7 4c-2.2 0-3.7 1.3-3.7 3.8V10H8.5v3H11v8h3Z" />
    </svg>
  );
}

export function XGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4l7.2 8.6L4.4 20H7l5-5.6L16 20h4l-7.5-8.9L19.6 4H17l-4.6 5.2L8 4H4Z" />
    </svg>
  );
}

export function WhatsAppGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
      <path d="M8.3 8.6c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.4.2.5.6 1.6.7 1.7.1.1.1.3 0 .5-.1.2-.2.3-.3.4-.2.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.6-.7.8-.9.2-.2.4-.2.6-.1l1.5.7c.2.1.4.2.4.4.1.2.1 1-.3 1.4s-1.5 1-2.9.4c-1.7-.7-3.5-2.1-4.8-3.8-1.2-1.6-1.6-2.9-1.5-3.3.1-.4.7-1.4.9-1.9Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
