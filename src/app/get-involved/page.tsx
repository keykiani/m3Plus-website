import type { Metadata } from "next";
import { Linkedin, GraduationCap, Compass, Heart } from "lucide-react";
import { getMarkdownFile, getTestimonials } from "@/lib/markdown";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import TestimonialBlock from "@/components/sections/TestimonialBlock";
import GetInvolvedForm from "@/components/forms/GetInvolvedForm";
import NewsletterForm from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Join M3+ as a mentor, volunteer, or guide. Find your role in our design community.",
};

// Map icon name strings from content to Lucide components
const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap size={32} className="text-primary" aria-hidden="true" />,
  HandHeart: <Heart size={32} className="text-primary" aria-hidden="true" />,
  Compass: <Compass size={32} className="text-primary" aria-hidden="true" />,
};

export default async function GetInvolvedPage() {
  const [{ data: page }, testimonials] = await Promise.all([
    getMarkdownFile("pages/get-involved.md"),
    getTestimonials(),
  ]);

  const p = page as {
    heroHeadline: string;
    heroSubtext: string;
    platformsHeadline: string;
    platforms: { name: string; description: string; buttonLabel: string; url: string }[];
    rolesHeadline: string;
    rolesSubtext: string;
    roles: { title: string; icon: string; description: string }[];
    formHeadline: string;
    formSubtext: string;
    contributionOptions: string[];
    sponsorsHeadline: string;
    sponsorsBody: string;
    sponsorCtaLabel: string;
    sponsorCtaHref: string;
    newsletterHeadline: string;
    newsletterSubtext: string;
  };

  const testimonial = testimonials[0] ?? null;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-cream section-pad relative overflow-hidden">
        {/* Decorative flower accents */}
        <span aria-hidden="true" className="absolute top-8 right-12 text-blue-flower text-6xl opacity-30 select-none">✿</span>
        <span aria-hidden="true" className="absolute bottom-8 left-8 text-blue-flower text-4xl opacity-20 select-none">✿</span>
        <div className="container-content max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 leading-tight mb-6">
            {p.heroHeadline}
          </h1>
          <p className="text-xl text-neutral-700 font-body leading-relaxed">
            {p.heroSubtext}
          </p>
        </div>
      </section>

      {/* ── Social Platforms ──────────────────────────────────────── */}
      <section className="bg-neutral-100 section-pad">
        <div className="container-content">
          <SectionHeader title={p.platformsHeadline} centered className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {p.platforms?.map((platform) => (
              <div key={platform.name} className="bg-white rounded-card border border-neutral-200 p-8 flex flex-col gap-4 shadow-card">
                <div className="flex items-center gap-3">
                  {platform.name === "LinkedIn" ? (
                    <Linkedin size={28} className="text-primary" aria-hidden="true" />
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-primary" aria-hidden="true">
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                    </svg>
                  )}
                  <h3 className="font-heading font-bold text-xl text-neutral-900">{platform.name}</h3>
                </div>
                <p className="text-neutral-700 font-body flex-1">{platform.description}</p>
                <Button variant="primary" href={platform.url} external size="sm">
                  {platform.buttonLabel}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community Roles ───────────────────────────────────────── */}
      <section className="bg-sky section-pad">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                title={p.rolesHeadline}
                subtitle={p.rolesSubtext}
                className="mb-0"
              />
            </div>
            <div className="space-y-4">
              {p.roles?.map((role) => (
                <div key={role.title} className="bg-white rounded-card p-6 flex items-start gap-4 shadow-card">
                  <div className="shrink-0 w-12 h-12 rounded-btn bg-primary/10 flex items-center justify-center">
                    {iconMap[role.icon] ?? <GraduationCap size={24} className="text-primary" />}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-neutral-900 mb-1">{role.title}</h3>
                    <p className="text-neutral-700 font-body text-sm leading-relaxed">{role.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonial ───────────────────────────────────────────── */}
      {testimonial && <TestimonialBlock testimonial={testimonial} bgVariant="light" />}

      {/* ── Application Form ──────────────────────────────────────── */}
      <section id="apply" className="bg-sky section-pad">
        <div className="container-content max-w-2xl">
          <SectionHeader
            title={p.formHeadline}
            subtitle={p.formSubtext}
            className="mb-10"
          />
          <GetInvolvedForm contributionOptions={p.contributionOptions ?? []} />
        </div>
      </section>

      {/* ── Sponsors ──────────────────────────────────────────────── */}
      <section className="bg-neutral-100 section-pad">
        <div className="container-content text-center">
          <SectionHeader
            title={p.sponsorsHeadline}
            subtitle={p.sponsorsBody}
            centered
            className="mb-8"
          />
          {/* Sponsor logo placeholders — replace with real logos */}
          <div className="flex flex-wrap justify-center gap-6 mb-8" aria-label="Sponsor logos">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-20 h-20 rounded-full bg-success/20 border-2 border-success/30 flex items-center justify-center"
                aria-label={`Sponsor ${i}`}
              >
                <span className="text-success/40 font-heading font-bold text-xs">LOGO</span>
              </div>
            ))}
          </div>
          <Button variant="primary" href={p.sponsorCtaHref} external size="md">
            {p.sponsorCtaLabel}
          </Button>
        </div>
      </section>

      {/* ── Newsletter Signup ─────────────────────────────────────── */}
      <section id="newsletter" className="bg-cream section-pad">
        <div className="container-content max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-neutral-900 mb-3">
            {p.newsletterHeadline}
          </h2>
          <p className="text-neutral-700 font-body mb-6">{p.newsletterSubtext}</p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
