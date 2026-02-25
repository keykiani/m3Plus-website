import type { SiteConfig, NavLink } from "./types";

/** Static site configuration — edit this file to update nav, contact info, and social links */
export const siteConfig: SiteConfig = {
  name: "M3+ Mutual Mentoring",
  tagline: "Connect. Grow. Lead.",
  description:
    "M3+ bridges the gap between networking and mentorship through community-driven events, mutual mentorship, and resources for designers at every level.",
  email: "team@m3plus.org", // Update with real email
  socialLinks: {
    linkedin: "https://www.linkedin.com/company/m3plusmentoring/",  // Update with real URL
    slack: "https://join.slack.com/t/m3plus/shared_invite/zt-3qyjg994i-auPL8RoIY3ilA_ia2mO5Aw",                // Update with real URL
    instagram: "https://instagram.com/m3plus",        // Update with real URL
  },
  lumaEmbedUrl: "https://lu.ma/embed/event/evt-60waSBmcS6OG9hI/simple",
  formspreeId: "https://formspree.io/f/meelpojy", // Replace after creating Formspree account at formspree.io
};

/** Main navigation links */
export const navLinks: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Get Involved", href: "/get-involved" },
];
