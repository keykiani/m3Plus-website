import type { SiteConfig, NavLink } from "./types";

/** Static site configuration — edit this file to update nav, contact info, and social links */
export const siteConfig: SiteConfig = {
  name: "M3+ Mutual Mentoring",
  tagline: "Connect. Grow. Lead.",
  description:
    "M3+ bridges the gap between networking and mentorship through community-driven events, mutual mentorship, and resources for designers at every level.",
  // Canonical origin for every absolute URL on the site (metadataBase, Open
  // Graph, sitemap). Must be the URL that serves the site directly: the apex
  // m3plus.org 301s to www, and pointing canonicals at a redirect wastes a hop
  // on every page. Override with NEXT_PUBLIC_SITE_URL in Netlify if it moves.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.m3plus.org").replace(/\/$/, ""),
  email: "team@m3plus.org", // Update with real email
  socialLinks: {
    linkedin: "https://www.linkedin.com/company/m3plusmentoring/",  // Update with real URL
    slack: "https://join.slack.com/t/m3plus/shared_invite/zt-3qyjg994i-auPL8RoIY3ilA_ia2mO5Aw",                // Update with real URL
    instagram: "https://instagram.com/m3plus",        // Update with real URL
  },
  lumaEmbedUrl: "https://luma.com/embed/calendar/cal-eA49a38rdSDAFZD/events",
  formspreeId: "https://formspree.io/f/meelpojy", // Replace after creating Formspree account at formspree.io
};

/**
 * Default Open Graph image, for any page that declares its own `openGraph`.
 *
 * Next.js REPLACES the parent `openGraph` object rather than deep-merging it,
 * so a page that sets `openGraph: { title, url }` silently loses the layout's
 * `images` and ships with no share image. Spread this into every page-level
 * openGraph block that should use the default card.
 */
export const defaultOgImages = [
  {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: `${siteConfig.name} — ${siteConfig.tagline}`,
  },
];

/** Main navigation links */
export const navLinks: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Get Involved", href: "/get-involved" },
];
