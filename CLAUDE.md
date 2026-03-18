# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Next.js dev server on `http://localhost:3000` |
| `npm run build` | Build for production (outputs to `.next/`) |
| `npm run start` | Run production build locally (requires `npm run build` first) |
| `npm run lint` | Run ESLint checks |

## Architecture Overview

**M3+ Website** is a Next.js 14 content-driven website built with TypeScript and Tailwind CSS. The architecture emphasizes content separation from code: most changes happen in Markdown files, not in React components.

### Content Flow

1. **Markdown files** in `content/` store all site data (events, team, testimonials, pages) with YAML frontmatter
2. **`src/lib/markdown.ts`** provides utilities to read and parse Markdown collections
3. **React components** in `src/components/` consume this data and render pages
4. **Next.js App Router** pages in `src/app/` compose sections together

### Core Responsibilities

- **`src/lib/markdown.ts`**: Generic Markdown reader with functions like `getUpcomingEvents()`, `getTeamMembers()`, `getTestimonials()`. Handles both single-file reads and directory scans with sorting/filtering.
- **`src/lib/siteConfig.ts`**: Single source of truth for site-wide config — navigation links, contact info, social URLs, Formspree ID, Luma embed URL. Edit this for nav changes or contact details.
- **`src/lib/types.ts`**: All TypeScript interfaces (`Event`, `TeamMember`, `Testimonial`, `PhotoAlbum`, etc.). When adding new content types, define the interface here first.
- **`src/lib/utils.ts`**: Small utility functions for class merging and date formatting.
- **`tailwind.config.ts`**: Design tokens — colors (primary, secondary, tertiary, neutral, semantic states), fonts (Manrope for headings, Gill Sans for body), spacing, shadows, animations. Update here for visual changes.

### Component Organization

- **`src/components/layout/`**: `Navbar`, `Footer`, `NewsletterPopUp` — shared across all pages
- **`src/components/ui/`**: Reusable primitives — `Button`, `Card`, `Badge`, `M3Logo`, `Accordion`, etc.
- **`src/components/sections/`**: Self-contained sections — `HeroSection`, `TestimonialBlock`, `EventPreviewCard`, `JourneyCards`, `MissionCTA`, etc.
- **`src/components/forms/`**: Form wrappers — `ContactForm`, `GetInvolvedForm`, `NewsletterForm`. All use React Hook Form + Formspree integration.

### Pages (App Router)

- **`src/app/page.tsx`**: Homepage — hero, mission, testimonials, upcoming events, CTA
- **`src/app/about/page.tsx`**: About page — team roster, mission/values
- **`src/app/events/page.tsx`**: Events listing (upcoming + archived)
- **`src/app/events/[slug]/page.tsx`**: Single event detail page with resources/registration
- **`src/app/events/[slug]/photos/page.tsx`**: Event photo gallery
- **`src/app/get-involved/page.tsx`**: Call-to-action page with involvement options

## Content Management Patterns

All content lives in `content/` with YAML frontmatter. When adding content:

1. **Events**: Create `.md` files in `content/events/upcoming/` or `content/events/archive/`
2. **Team**: Create `.md` files in `content/team/` with `order` field for sort order
3. **Testimonials**: Create `.md` files in `content/testimonials/` with `order` field
4. **Pages**: Edit YAML frontmatter in `content/pages/` for site copy

All Markdown is parsed server-side using `gray-matter` (YAML extraction) and `remark` (Markdown → HTML conversion).

## Key Design Decisions

### 1. Server-Side Markdown Loading
- Content files are read at build time / request time using `fs.readFileSync()` in `getMarkdownFile()`
- No database — simpler deployment, content in Git
- When content changes, rebuild/restart required (fine for small, editorial team)

### 2. Formspree Integration
- Contact forms submit to Formspree API (`src/components/forms/`)
- Formspree ID is configured in `siteConfig.ts`
- No backend needed — third-party handles email delivery

### 3. Tailwind Design Tokens
- All colors, fonts, spacing defined in `tailwind.config.ts` under `theme.extend`
- Named color aliases (primary, secondary, tertiary, neutral, semantic states) match Figma design system
- Legacy numbered keys (neutral.900, neutral.700, etc.) kept for backward compatibility

### 4. Content Sorting
- Events sorted by date (`getUpcomingEvents()` → ascending, `getArchiveEvents()` → descending)
- Team/testimonials sorted by `order` field (if missing, defaults to 99)
- Ensures predictable ordering without manual component-level filtering

## Common Development Tasks

### Add a New Page
1. Create a folder under `src/app/` (e.g., `src/app/resources/`)
2. Add `page.tsx` with React component
3. Add route to `navLinks` in `siteConfig.ts` if it should appear in nav
4. Create corresponding content file(s) in `content/pages/` if needed

### Add a New Content Type
1. Create TypeScript interface in `src/lib/types.ts`
2. Add loader function in `src/lib/markdown.ts` (following `getUpcomingEvents()` pattern)
3. Create `content/<type>/` directory and `.md` files
4. Create component(s) in `src/components/sections/` to render the data

### Update Styling/Colors
- Edit `tailwind.config.ts` colors section to change design tokens
- Tailwind classes auto-update across the site (no component-level changes needed)
- For one-off styles, use Tailwind utility classes in component JSX

### Update Navigation/Links
- Edit `navLinks` and social links in `src/lib/siteConfig.ts`
- Update `email` field for contact info
- Update `formspreeId` if switching Formspree accounts
- Update `lumaEmbedUrl` for the homepage event widget

## Stack Details

| Layer | Tech | Notes |
|-------|------|-------|
| **Framework** | Next.js 14 (App Router) | Server components by default; client components marked with `'use client'` |
| **Language** | TypeScript | Strict mode recommended; all data types defined in `src/lib/types.ts` |
| **Styling** | Tailwind CSS + PostCSS | Autoprefixer included; fonts loaded in `src/styles/globals.css` |
| **Content** | Markdown (gray-matter) | YAML frontmatter + Markdown body parsed to HTML |
| **Forms** | React Hook Form + Formspree | Client-side validation; server submission to Formspree |
| **Animations** | Framer Motion | Used in `HeroSection`, `TestimonialBlock`, `NewsletterPopUp` |
| **Icons** | Lucide React | 500+ icon library; components pull from here |
| **Image Gallery** | yet-another-react-lightbox | Used on event photo pages |
| **Hosting** | Netlify (or any static host) | Builds from `main` branch; publishes `.next` output |

## Deployment

Production builds are static and deploy to Netlify:
- **Build command**: `npm run build` (outputs to `.next/`)
- **Publish directory**: `.next/`
- **Auto-deploy**: On push to `main`
- **Environment**: No required env vars for basic operation (Formspree ID is in code)

## Debugging Patterns

### Content Not Loading?
- Check file path in `content/` matches the loader function's `relativeDir`
- Verify YAML frontmatter syntax (indent with spaces, not tabs)
- Ensure `.md` file extension is lowercase

### Styling Not Applying?
- Check Tailwind scan paths in `tailwind.config.ts` `content` array — may need to add new file patterns
- Restart dev server after adding new files (`npm run dev`)
- Verify color/class name matches `tailwind.config.ts` definitions

### Forms Not Submitting?
- Check `formspreeId` in `siteConfig.ts` is a valid Formspree endpoint
- Verify form component uses `siteConfig.formspreeId` correctly
- Test Formspree account still active (may have free-tier email limits)

### Build Failures?
- Check TypeScript errors: `npm run build` shows them before Netlify deploy fails
- Verify all Markdown files have valid frontmatter
- Check `.eslintrc.json` for lint rules; adjust or fix violations
