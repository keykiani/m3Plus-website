```
███╗   ███╗██████╗    ██╗
████╗ ████║╚════██╗  ╚═╝
██╔████╔██║ █████╔╝  ██╗
██║╚██╔╝██║ ╚═══██╗  ╚═╝
██║ ╚═╝ ██║██████╔╝  ██╗
╚═╝     ╚═╝╚═════╝   ╚═╝
```

> **Connect. Grow. Lead.**

M3+ Mutual Mentoring bridges the gap between networking and mentorship through community-driven events, peer support, and resources for designers at every level.

🌐 [m3plus.org](https://m3plus.org) · 📧 [team@m3plus.org](mailto:team@m3plus.org) · [LinkedIn](https://www.linkedin.com/company/m3plusmentoring/) · [Instagram](https://instagram.com/m3plus) · [Slack](https://join.slack.com/t/m3plus/shared_invite/zt-3qyjg994i-auPL8RoIY3ilA_ia2mO5Aw)

---

## 📌 Quick Navigation

| I want to… | Jump to |
|---|---|
| Add a new upcoming event | [→ Add an event](#add-an-upcoming-event) |
| Archive a past event | [→ Archive an event](#archive-a-past-event) |
| Update page text | [→ Update page copy](#update-page-copy) |
| Add a team member | [→ Add team member](#add-a-team-member) |
| Add a testimonial | [→ Add a testimonial](#add-a-testimonial) |
| Add images | [→ Images guide](#add-images) |
| Set up the project locally | [→ Local setup](#local-setup) |
| Deploy to Netlify | [→ Deployment](#deployment) |
| Transfer ownership | [→ Handoff](#-handoff--ownership) |

---

## About This Repo

This is the source code for the M3+ Mutual Mentoring website. It's built with **Next.js 14** and **TypeScript**, styled with **Tailwind CSS**, and content is managed through plain **Markdown files** — no database or CMS required.

Most day-to-day changes (events, team, testimonials, page copy) happen entirely in the `content/` folder without touching any code.

---

## ✏️ For Content Editors
*No coding required for any of the tasks below.*

### Add an Upcoming Event

Upcoming events are managed entirely through **Luma** — no file changes needed.

1. Go to [lu.ma/m3plus](https://lu.ma/m3plus) and sign in
2. Create a new event in the M3+ calendar
3. The event will appear automatically on the website's Events page

The Luma calendar embed updates in real time. No code edits or markdown files required.

---

### Archive a Past Event

After an event has taken place, add it to the archive so the community can access photos and resources:

1. **Copy the template:** Duplicate `content/events/archive/_template.md` and rename it to match the event (e.g., `my-event-name.md`). The slug (filename without `.md`) becomes the URL: `/events/my-event-name`.

2. **Fill in the required fields:**

```yaml
---
title: "Your Event Title"
date: "2025-10-30"           # Used for sorting — YYYY-MM-DD format
displayDate: "Thursday, October 30"
time: "6:00 PM – 8:30 PM"
location: "5445 Legacy Dr, Plano, Texas"
description: "A short description of the event."
isUpcoming: false
year: 2025
image: "/images/events/your-event-slug.jpg"   # Optional thumbnail
---
```

3. **Add Google Drive links** (fill these in after uploading to Drive):

```yaml
# Upload photos to a Drive folder, set sharing to "Anyone with the link", paste URL here:
photosDriveUrl: "https://drive.google.com/drive/folders/..."

# Upload slides/handouts to a Drive folder, paste URL here:
resourcesDriveUrl: "https://drive.google.com/drive/folders/..."

# For the slideshow viewer — paste the Google Slides share URL:
# (The site automatically embeds it as an interactive slideshow)
slideshowUrl: "https://docs.google.com/presentation/d/.../edit?usp=sharing"
```

4. **Commit and push to GitHub** → Netlify deploys automatically.

> See `content/events/archive/_template.md` for the full list of optional fields with inline documentation.

---

### Update Page Copy

Each page has a corresponding Markdown file in `content/pages/` with YAML fields at the top. Edit the values to update text on the live site:

| Page | File |
|---|---|
| Homepage | `content/pages/home.md` |
| About | `content/pages/about.md` |
| Get Involved | `content/pages/get-involved.md` |

---

### Add a Team Member

Create `content/team/firstname-lastname.md`:

```yaml
---
name: "First Last"
title: "Their Role"
bio: "A short bio paragraph."
photo: "/images/team/firstname-lastname.png"
order: 6
---
```

Add their headshot to `public/images/team/` using the same filename. The `order` field controls their position on the About page (lower = earlier).

---

### Add a Testimonial

Create `content/testimonials/testimonial-3.md`:

```yaml
---
quote: "The full quote goes here."
boldPhrase: "phrase to bold within the quote"
author: "Person's Name"
role: "Their Role / Title"
photo: "/images/testimonials/their-photo.jpg"
order: 3
---
```

Add their photo to `public/images/testimonials/`.

---

### Add Images

Upload images to the appropriate folder under `public/images/`:

| Image type | Folder | Format | Recommended size |
|---|---|---|---|
| Homepage hero | `public/images/` | JPG | 1200 × 900 px (4:3) |
| Events page hero | `public/images/` | JPG | 800 × 600 px (4:3) |
| Event thumbnails | `public/images/events/` | JPG | 800 × 600 px (4:3) |
| Team headshots | `public/images/team/` | PNG | 500 × 500 px (square) |
| Testimonial photos | `public/images/testimonials/` | JPG | 400 × 400 px (square) |
| Site Squad portraits | `public/images/squad/` | JPG | 400 × 400 px (square) |
| Sponsor logos | `public/images/sponsors/` | PNG (transparent bg) | 200 × 200 px (square) |

> **Event photos and slideshows are hosted on Google Drive — not in this repo.** Paste the Drive folder URL into the event's `photosDriveUrl` / `resourcesDriveUrl` fields instead.

Image filenames must match exactly what's written in the `image:` or `photo:` field of the content file.

---

## 🛠 For Developers

### Local Setup

**Requirements:** Node.js 18+, npm

```bash
# 1. Clone the repo
git clone https://github.com/keykiani/m3Plus-website.git
cd m3Plus-website

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Project Structure

```
m3plus-website/
├── content/                  ← Edit these to update site content
│   ├── pages/                  Page copy (hero text, mission, etc.)
│   ├── events/
│   │   ├── upcoming/           Deprecated — upcoming events are now managed via Luma
│   │   └── archive/            Past events with Google Drive links + resources
│   │       └── _template.md    Copy this when archiving a new event
│   ├── team/                   Team member profiles
│   └── testimonials/           Community quotes
├── public/
│   ├── images/                 ← Add images here
│   │   ├── team/               Team headshots
│   │   ├── events/             Event thumbnails only (photos hosted on Drive)
│   │   ├── squad/              Site Squad portrait photos
│   │   ├── sponsors/           Sponsor logo files
│   │   └── logos/              Brand logo files
│   └── resources/              PDFs and downloadable files
└── src/
    ├── app/                    Pages (Next.js App Router)
    │   ├── site-squad/         Hidden "Made by Site Squad" page (linked from footer)
    │   └── events/[slug]/      Archive event detail + photos pages
    ├── components/
    │   ├── layout/             Navbar, Footer, NewsletterPopUp
    │   ├── ui/                 Button, Card, Badge, M3Logo, SectionHeader
    │   ├── sections/           HeroSection, LumaEventSection, TestimonialBlock…
    │   └── forms/              ContactForm, GetInvolvedForm, NewsletterForm
    ├── lib/
    │   ├── markdown.ts         Content loading utilities
    │   ├── siteConfig.ts       ← Nav links, social URLs, email, Formspree ID, Luma URL
    │   ├── types.ts            TypeScript interfaces for all content types
    │   └── utils.ts            Class merge + date formatting helpers
    ├── styles/globals.css      Global styles and font imports
    └── tailwind.config.ts      ← Design tokens (colors, fonts, spacing)
```

---

### Key Files to Know

| File | What to edit it for |
|---|---|
| `src/lib/siteConfig.ts` | Nav links, social URLs, contact email, Formspree ID, Luma embed URL |
| `src/lib/types.ts` | Adding new content types — define the interface here first |
| `src/lib/markdown.ts` | Content loaders — add new `get*()` functions here for new content types |
| `tailwind.config.ts` | Colors, fonts, spacing, shadows — the design token source of truth |
| `src/app/site-squad/page.tsx` | Update Site Squad member names, photos, and links directly in this file |
| `src/app/get-involved/page.tsx` | Swap sponsor logo placeholders for real `<Image>` components when logos are ready |

---

### One-Time Setup Tasks

#### 1. Wire up the real logo
1. Export the M3+ logo from Figma as an SVG
2. Open `src/components/ui/M3Logo.tsx` and replace the placeholder SVG path data with the exported SVG code
3. Logo files are available in `public/images/logos/` as a reference

#### 2. Confirm Formspree is connected
1. Log in to [formspree.io](https://formspree.io) and verify the form endpoint is active
2. The form ID is set in `src/lib/siteConfig.ts` → `formspreeId`

#### 3. Verify social links
All social URLs and the contact email are in `src/lib/siteConfig.ts` → `socialLinks` and `email`.

#### 4. Add sponsor logos
When sponsor logos are ready:
1. Add PNG files (transparent background, 200 × 200 px min) to `public/images/sponsors/`
2. In `src/app/get-involved/page.tsx`, replace the CSS placeholder circles (lines ~172–182) with `<Image>` components pointing to those files

#### 5. Complete the Site Squad page
1. Add portrait photos (square, 400 × 400 px min) to `public/images/squad/`
2. Update the `squadMembers` array in `src/app/site-squad/page.tsx` with each member's name, role, photo path, and link

---

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run ESLint checks |

---

### Deployment

The site auto-deploys to Netlify on every push to `main`.

**To set up Netlify for the first time:**
1. Push the repo to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Select the repository
4. Confirm build settings (auto-detected):
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. Click **Deploy site**

No environment variables are required for basic operation.

---

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Content | Markdown + gray-matter (YAML frontmatter) |
| Forms | React Hook Form + Formspree |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Manrope (headings), Gill Sans (body) |
| Event calendar | Luma embed (auto-updating) |
| Hosting | Netlify |

---

## 🤝 Handoff & Ownership

### Who does what

| Task | Role |
|---|---|
| Add upcoming events | Content — create in Luma, no code needed |
| Archive past events | Content — copy template, fill in Drive links, push to GitHub |
| Update team, testimonials, page copy | Content — edit markdown files, no code needed |
| Update nav links, social URLs, email | Developer (edit `siteConfig.ts`) |
| Change colors or fonts | Developer (edit `tailwind.config.ts`) |
| Add new pages or components | Developer |
| Add sponsor logos | Developer (swap placeholders in `get-involved/page.tsx`) |
| Update Site Squad page | Developer (edit `site-squad/page.tsx` directly) |
| Deploy the site | Automatic on push to `main` |

### Accounts to transfer

When handing off to a new maintainer, transfer access to:

| Account | Used for |
|---|---|
| **GitHub** — `keykiani/m3Plus-website` | Code hosting and auto-deploy trigger |
| **Netlify** | Hosting and deployment |
| **Formspree** | Contact form and Get Involved form submissions |
| **Luma** — [lu.ma/m3plus](https://lu.ma/m3plus) | Upcoming event calendar (auto-embeds on website) |
| **Google Drive** | Event photos and slideshows (linked from archive event pages) |
| **Figma** | Design assets and logo source files |

### If something looks broken

| Symptom | Where to look |
|---|---|
| Upcoming events not showing | Check the Luma calendar at lu.ma/m3plus — confirm events are published. Also verify `lumaEmbedUrl` in `siteConfig.ts` is a calendar embed URL, not a single-event URL. |
| Archive event photos not working | Confirm `photosDriveUrl` in the event's `.md` file is set and shared as "Anyone with the link" |
| Slideshow not embedding | Paste the Google Slides share URL (`.../edit?usp=sharing`) into `slideshowUrl` — the site converts it automatically |
| Content not showing up | Check YAML frontmatter in `content/` — watch for tabs vs spaces |
| Images not loading | Verify the filename in `image:` / `photo:` matches exactly what's in `public/images/` |
| Forms not submitting | Check `formspreeId` in `siteConfig.ts`; verify the Formspree account is active |
| Build failing on Netlify | Run `npm run build` locally to see the TypeScript or lint error before deploying |
| Styles not applying | Restart the dev server after adding new files; check class names match `tailwind.config.ts` |
