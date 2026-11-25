import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { ScrollToTop } from "@/components/scroll-to-top";
import { CartProvider } from "@/lib/cart-context";

const heading = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BHAKKADG'S — Pop the World",
  description:
    "BHAKKADG'S is a premium, globally-inspired popcorn brand. Thai Chilli, Classic Butter Flavour, Portugal Peri-Peri, Italian Cheese and Indian Masala — small-batch, bold-flavoured popcorn made for bhakkads everywhere.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>
          <ScrollToTop />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
        </CartProvider>
      </body>
    </html>
  );
}
