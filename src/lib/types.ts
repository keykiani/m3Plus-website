// ─── Site & Navigation ────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  email: string;
  socialLinks: {
    linkedin?: string;
    slack?: string;
    instagram?: string;
    twitter?: string;
  };
  formspreeId: string; // Formspree endpoint ID for contact form
  /**
   * Luma embed URL for the homepage "Next Event" section.
   *
   * Use your CALENDAR embed URL (not a single event URL) so it auto-updates
   * every time you post a new event in Luma:
   *
   *   How to get it:
   *   1. Go to your Luma calendar → Settings → Share → Embed
   *   2. Copy the embed src URL — it looks like:
   *      https://lu.ma/embed/calendar/CAL_xxxxxxxxxxxxxxxx/simple
   *   3. Paste it here.
   *
   * Until you switch to the calendar URL, the single-event URL below works
   * as a placeholder (it just won't auto-update).
   */
  lumaEmbedUrl: string;
}

// ─── Events ───────────────────────────────────────────────────────────────

export interface Event {
  slug: string;
  title: string;
  date: string;         // ISO date string e.g. "2025-08-28"
  displayDate: string;  // Human-readable e.g. "Thursday, August 28"
  time?: string;        // e.g. "6:00 PM – 8:30 PM"
  location?: string;
  description: string;
  image?: string;       // Path relative to /public
  registerUrl?: string;
  isUpcoming: boolean;
  year: number;
  // Archive-only fields
  slideshowUrl?: string;
  pdfUrl?: string;
  resourceLinks?: ResourceLink[];
}

export interface ResourceLink {
  emoji: string;
  title: string;
  description: string;
  buttonLabel: string;
  url: string;
}

// ─── Team ─────────────────────────────────────────────────────────────────

export interface TeamMember {
  slug: string;
  name: string;
  title: string;
  bio: string;
  photo?: string; // Path relative to /public
  order: number;
}

// ─── Testimonials ─────────────────────────────────────────────────────────

export interface Testimonial {
  slug: string;
  quote: string;
  boldPhrase?: string; // A phrase within the quote to bold
  author: string;
  role: string;
  photo?: string;
  order: number;
}

// ─── Photo Albums ─────────────────────────────────────────────────────────

export interface PhotoAlbum {
  eventSlug: string;
  eventTitle: string;
  photos: Photo[];
}

export interface Photo {
  src: string;      // Path relative to /public
  alt: string;
  width: number;
  height: number;
}

// ─── Programs / Roles ─────────────────────────────────────────────────────

export interface Role {
  title: string;
  icon: string;     // Lucide icon name
  description: string;
}

// ─── Generic Markdown Page ────────────────────────────────────────────────

export interface MarkdownPage {
  content: string;  // Rendered HTML string
  data: Record<string, unknown>; // Frontmatter fields
}
