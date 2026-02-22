import type { SiteConfig, NavLink } from "./types";

/** Static site configuration — edit this file to update nav, contact info, and social links */
export const siteConfig: SiteConfig = {
  name: "M3+ Mutual Mentoring",
  tagline: "Connect. Grow. Lead.",
  description:
    "M3+ bridges the gap between networking and mentorship through community-driven events, mutual mentorship, and resources for designers at every level.",
  email: "hello@m3plus.org", // Update with real email
  socialLinks: {
    linkedin: "https://linkedin.com/company/m3plus",  // Update with real URL
    slack: "https://m3plus.slack.com",                // Update with real URL
    instagram: "https://instagram.com/m3plus",        // Update with real URL
  },
  formspreeId: "YOUR_FORMSPREE_ID", // Replace after creating Formspree account at formspree.io
};

/** Main navigation links */
export const navLinks: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Get Involved", href: "/get-involved" },
];
