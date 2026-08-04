import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import dynamic from "next/dynamic";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/siteConfig";
import { organizationSchema, webSiteSchema } from "@/lib/schema";

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

// Origin of the Luma embed, so the preconnect hint can't drift from the URL
// it's meant to warm up.
const lumaOrigin = new URL(siteConfig.lumaEmbedUrl).origin;

const defaultTitle = `${siteConfig.name} — ${siteConfig.tagline}`;

// ─── Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // Required for canonical URLs, OG images, and the sitemap to resolve to
  // absolute URLs. Without it Next.js silently drops them.
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.name}`,
    default: defaultTitle,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
    url: "/",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
        {/* Preconnect to the Luma embed origin to reduce connection latency.
            Derived from siteConfig.lumaEmbedUrl rather than hardcoded, so the
            hint can't drift from the URL it's meant to warm up — it previously
            pointed at lu.ma while the embed loads from luma.com. */}
        <link rel="preconnect" href={lumaOrigin} />
        <link rel="preconnect" href={lumaOrigin} crossOrigin="anonymous" />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={webSiteSchema()} />
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
