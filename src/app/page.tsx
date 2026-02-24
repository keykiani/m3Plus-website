import type { Metadata } from "next";
import { getMarkdownFile, getTestimonials } from "@/lib/markdown";
import { siteConfig } from "@/lib/siteConfig";
import HeroSection from "@/components/sections/HeroSection";
import LumaEventSection from "@/components/sections/LumaEventSection";
import TestimonialBlock from "@/components/sections/TestimonialBlock";
import JourneyCards from "@/components/sections/JourneyCards";
import MissionCTA from "@/components/sections/MissionCTA";

export const metadata: Metadata = {
  title: "Home",
  description:
    "M3+ Mutual Mentoring — Connect with designers at every level through mentorship, events, and community support.",
};

export default async function HomePage() {
  const [{ data: home }, testimonials] = await Promise.all([
    getMarkdownFile("pages/home.md"),
    getTestimonials(),
  ]);

  const testimonial1 = testimonials[0] ?? null;
  const testimonial2 = testimonials[1] ?? null;

  const h = home as {
    heroHeadline: string;
    heroSubtext: string;
    heroCtaLabel: string;
    heroCtaHref: string;
    heroImageAlt: string;
    nextEventLabel: string;
    missionLabel: string;
    missionHeadline: string;
    missionBody: string;
    missionCtaLabel: string;
    missionCtaHref: string;
    journeyHeadline: string;
    journeyCards: { title: string; image: string; imageAlt: string }[];
  };

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────────── */}
      <HeroSection
        headline={h.heroHeadline}
        subtext={h.heroSubtext}
        ctaLabel={h.heroCtaLabel}
        ctaHref={h.heroCtaHref}
        imageAlt={h.heroImageAlt}
        imageSrc="/images/hero.jpg"
      />

      {/* ── 2. Luma Event Embed — auto-updates when calendar URL is set ── */}
      <LumaEventSection
        embedUrl={siteConfig.lumaEmbedUrl}
        sectionLabel={h.nextEventLabel}
      />

      {/* ── 3. First Testimonial ─────────────────────────────────────── */}
      {testimonial1 && (
        <TestimonialBlock testimonial={testimonial1} bgVariant="light" />
      )}

      {/* ── 4. How M3+ Supports Your Journey (image cards) ───────────── */}
      <JourneyCards
        headline={h.journeyHeadline}
        cards={h.journeyCards}
      />

      {/* ── 5. Second Testimonial ────────────────────────────────────── */}
      {testimonial2 && (
        <TestimonialBlock testimonial={testimonial2} bgVariant="sky" />
      )}

      {/* ── 6. Mission CTA ───────────────────────────────────────────── */}
      <MissionCTA
        label={h.missionLabel}
        headline={h.missionHeadline}
        body={h.missionBody}
        ctaLabel={h.missionCtaLabel}
        ctaHref={h.missionCtaHref}
      />
    </>
  );
}
