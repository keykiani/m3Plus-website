# M3+ Mutual Mentoring — Website

Next.js website for [M3+ Mutual Mentoring](https://m3plus.org), built with TypeScript, Tailwind CSS, and Markdown-based content management.

---

## Quick Start (Local Development)

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

## Project Structure

```
m3plus-website/
├── content/                  ← EDIT THESE to update site content
│   ├── pages/                  Page copy (hero text, mission, etc.)
│   ├── events/
│   │   ├── upcoming/           Add new upcoming events here
│   │   └── archive/            Past events with resources
│   ├── team/                   Team member profiles
│   ├── testimonials/           Community quotes
│   └── photos/albums.md        Photo gallery metadata
├── public/
│   ├── images/                 ← ADD IMAGES HERE
│   │   ├── team/               Team headshots
│   │   ├── events/             Event photos & thumbnails
│   │   └── logos/              Sponsor logos
│   └── resources/              PDFs for download
├── src/
│   ├── app/                    Pages (Next.js App Router)
│   ├── components/
│   │   ├── layout/             Navbar, Footer, NewsletterPopUp
│   │   ├── ui/                 Button, Card, SectionHeader, Badge
│   │   ├── sections/           HeroSection, TestimonialBlock, etc.
│   │   └── forms/              ContactForm, GetInvolvedForm
│   ├── lib/
│   │   ├── markdown.ts         Content loading utilities
│   │   ├── siteConfig.ts       ← Edit nav links, social URLs, email
│   │   └── types.ts            TypeScript interfaces
│   └── styles/globals.css      Global styles + font import
└── tailwind.config.ts          Design tokens (colors, fonts, spacing)
```

---

## Editing Content (No Code Required)

### Update page text
Edit files in `content/pages/` — each file has YAML frontmatter fields at the top.

### Add a new upcoming event
Create `content/events/upcoming/your-event-name.md`:
```yaml
---
title: "Your Event Title"
date: "2025-10-30"
displayDate: "Thursday, October 30"
time: "6:00 PM – 8:30 PM"
location: "5445 Legacy Dr, Plano, Texas"
description: "Short description of the event."
image: "/images/events/your-event.jpg"
registerUrl: "https://lu.ma/your-event-link"
isUpcoming: true
year: 2025
---
```

### Move an event to the archive
1. Move the `.md` file from `content/events/upcoming/` to `content/events/archive/`
2. Set `isUpcoming: false`
3. Add `pdfUrl`, `slideshowUrl`, and `resourceLinks` fields

### Add a team member
Create `content/team/firstname-lastname.md`:
```yaml
---
name: "First Last"
title: "Their Role"
bio: "A short bio paragraph."
photo: "/images/team/firstname-lastname.jpg"
order: 6
---
```
Add their photo to `public/images/team/`.

### Add a testimonial
Create `content/testimonials/testimonial-3.md`:
```yaml
---
quote: "The full quote goes here."
boldPhrase: "phrase to bold"
author: "Person's Name"
role: "Their Role / Title"
photo: "/images/testimonials/their-photo.jpg"
order: 3
---
```

---

## One-time Setup Tasks

### 1. Set up Formspree (contact + application forms)
1. Go to [formspree.io](https://formspree.io) → create a free account
2. Create a new form → copy the form ID (e.g. `xpwzqkjr`)
3. Open `src/lib/siteConfig.ts` and replace `YOUR_FORMSPREE_ID`

### 2. Replace the logo
1. Export your logo from Figma as SVG
2. Replace the SVG content in `src/components/ui/M3Logo.tsx`
   (Instructions are in the file comments)

### 3. Update social links and contact info
Edit `src/lib/siteConfig.ts`:
```ts
socialLinks: {
  linkedin: "https://linkedin.com/company/your-real-url",
  slack: "https://your-workspace.slack.com/join/...",
}
```

### 4. Add real images
Upload images to `public/images/` and update the `image` fields in content files.
Recommended sizes:
- Hero image: 1200×900px
- Event thumbnails: 800×600px
- Team photos: 500×500px (square)

---

## Deployment (Netlify)

1. Push code to GitHub
2. Go to [Netlify](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Select your repository
4. Build settings (auto-detected):
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. Click **Deploy site**

Netlify will auto-deploy every time you push to `main`.

### Environment variables (Netlify)
No env vars are required for basic operation. Add these if needed:
- `NEXT_PUBLIC_FORMSPREE_ID` — optional if you want to manage it outside code

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server locally |
| `npm run lint` | Run ESLint |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Content | Markdown + gray-matter |
| Forms | React Hook Form + Formspree |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Manrope (headings), Gill Sans (body) |
| Hosting | Netlify |

---

## Need Help?

- For content questions: see `content/` folder — each file has comments
- For design changes: edit `tailwind.config.ts` for colors/fonts
- For layout changes: edit components in `src/components/`
- For new pages: add a folder under `src/app/` with a `page.tsx`
