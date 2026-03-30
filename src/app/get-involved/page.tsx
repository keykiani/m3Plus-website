import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, Compass, Heart } from "lucide-react";
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
      <section className="bg-sky grid-bg section-pad relative">
        {/* Mobile: Single SVG clover */}
        <img
          src="/images/m3clover.svg"
          alt=""
          aria-hidden="true"
          className="lg:hidden absolute -top-20 -left-20 w-80 h-80 opacity-60 pointer-events-none select-none"
        />
        {/* Desktop: PNG clovers */}
        <img
          src="/images/m3clover.png"
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute -top-20 -left-20 w-80 h-80 opacity-60 pointer-events-none select-none"
        />
        <img
          src="/images/m3clover.png"
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute -top-10 -right-32 w-96 h-96 opacity-50 pointer-events-none select-none"
        />
        <div className="container-content max-w-3xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-neutral-900 leading-tight mb-4 text-center">
            {p.heroHeadline}
          </h1>
          <p className="text-lg md:text-xl text-black font-body leading-relaxed max-w-2xl mx-auto">
            {p.heroSubtext}
          </p>
        </div>
      </section>

      {/* ── Social Platforms (overlapping hero) ────────────────────── */}
      <section className="bg-sky relative -mt-24">
        <div className="container-content relative z-20 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mx-auto">
            {p.platforms?.map((platform) => {
              const logoMap: Record<string, string> = {
                LinkedIn: "/images/linkedIn_logo.png",
                Slack: "/images/slack_logo.png",
                Luma: "/images/luma_logo.png",
              };
              return (
                <div key={platform.name} className="bg-cream border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center bg-white shrink-0">
                      <Image
                        src={logoMap[platform.name] || ""}
                        alt={`${platform.name} logo`}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-neutral-900">{platform.name}</h3>
                  </div>
                  <p className="text-neutral-700 font-body flex-1">{platform.description}</p>
                  <Button variant="primary" href={platform.url} external size="sm">
                    {platform.buttonLabel}
                  </Button>
                </div>
              );
            })}
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
