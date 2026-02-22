import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsletterPopUp from "@/components/layout/NewsletterPopUp";
import { siteConfig } from "@/lib/siteConfig";

// ─── Fonts ────────────────────────────────────────────────────────────────
// Manrope is loaded via @import in globals.css (browser-side, no build-time fetch).
// Gill Sans is a system font — loaded via CSS font stack in tailwind.config.ts.

// ─── Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    description: siteConfig.description,
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[200] bg-yellow text-navy px-4 py-2 rounded-btn font-heading font-bold"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />

        {/* Newsletter popup — shown on first visit after a delay */}
        <NewsletterPopUp />
      </body>
    </html>
  );
}
