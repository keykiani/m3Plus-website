import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import dynamic from "next/dynamic";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/lib/siteConfig";

// Manrope loaded at build time — no render-blocking Google Fonts request.
// Gill Sans is a system font stack in tailwind.config.ts.
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

// Lazy-load the newsletter popup — it's never visible on initial paint.
const NewsletterPopUp = dynamic(
  () => import("@/components/layout/NewsletterPopUp"),
  { ssr: false }
);

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
    <html lang="en" className={manrope.variable}>
      <head>
        {/* Preconnect to Luma embed origin to reduce connection latency */}
        <link rel="preconnect" href="https://lu.ma" />
      </head>
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
