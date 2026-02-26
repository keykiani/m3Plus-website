import type { Metadata } from "next";
import { getMarkdownFile, getTeamMembers, getTestimonials } from "@/lib/markdown";
import Image from "next/image";
import {
  CheckCircle2,
  Shield,
  Target,
  Users,
} from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import Avatar from "@/components/ui/Avatar";
import Accordion from "@/components/ui/Accordion";
import TestimonialBlock from "@/components/sections/TestimonialBlock";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about M3+ Mutual Mentoring — our mission, values, team, and the community we're building.",
};

export default async function AboutPage() {
  const [{ data: about }, teamMembers, testimonials] = await Promise.all([
    getMarkdownFile("pages/about.md"),
    getTeamMembers(),
    getTestimonials(),
  ]);

  const a = about as {
    heroLabel:       string;
    heroHeadline:    string;
    heroSubtext:     string;
    whatIsHeadline:  string;
    whatIsBody:      string;
    whatIsImage:     string;
    whatIsImageAlt:  string;
    whatIsCtaLabel:  string;
    whatIsCtaHref:   string;
    missionImage:    string;
    missionImageAlt: string;
    missionHeadline: string;
    missionBody:     string;
    values:          { text: string; style: string }[];
    faqHeadline:     string;
    faqs:            { question: string; answer: string }[];
  };

  const testimonial1 = testimonials[0] ?? null;
  const testimonial2 = testimonials[1] ?? null;

  // Map value card style names → Tailwind classes (Figma value cards)
  const valueCardStyles: Record<string, string> = {
    yellow:  "bg-secondary        border border-secondary-dark/30",
    green:   "bg-success-subtle   border border-success/20",
    outline: "bg-white            border-2 border-neutral-200",
  };

  // Icon paired to each value by index (Lucide icons)
  const valueIcons = [
    <Users key="users"         size={22} className="text-foreground" aria-hidden="true" />,
    <Shield key="shield"       size={22} className="text-foreground" aria-hidden="true" />,
    <Target key="target"       size={22} className="text-foreground" aria-hidden="true" />,
    <CheckCircle2 key="check"  size={22} className="text-success"    aria-hidden="true" />,
  ];

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-sky section-pad">
        <div className="container-content">
          <p className="text-sm font-heading font-bold tracking-widest uppercase text-primary mb-3">
            {a.heroLabel}
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground leading-tight max-w-2xl mb-4">
            {a.heroHeadline}
          </h1>
          <p className="text-xl text-neutral font-body leading-relaxed max-w-xl">
            {a.heroSubtext}
          </p>
        </div>
      </section>

      {/* ── What is M3+? ──────────────────────────────────────────── */}
      <section className="bg-neutral-100 section-pad">
        <div className="container-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader title={a.whatIsHeadline} className="mb-6" />
            <p className="text-neutral font-body text-lg leading-relaxed mb-8">
              {a.whatIsBody}
            </p>
            <Button variant="primary" href={a.whatIsCtaHref}>
              {a.whatIsCtaLabel}
            </Button>
          </div>
          <div className="relative aspect-[4/3] rounded-card overflow-hidden bg-sky shadow-card">
            {a.whatIsImage && (
              <Image
                src={a.whatIsImage}
                alt={a.whatIsImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </div>
        </div>
      </section>

      {/* ── Testimonial 1 ─────────────────────────────────────────── */}
      {testimonial1 && <TestimonialBlock testimonial={testimonial1} />}

      {/* ── Mission ───────────────────────────────────────────────── */}
      <section className="bg-cream section-pad">
        <div className="container-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-card overflow-hidden bg-sky shadow-card">
            {a.missionImage && (
              <Image
                src={a.missionImage}
                alt={a.missionImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </div>
          <div>
            <p className="text-sm font-heading font-bold tracking-widest uppercase text-primary mb-2">
              Our Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight mb-6">
              {a.missionHeadline}
            </h2>
            <p className="text-neutral font-body text-lg leading-relaxed">
              {a.missionBody}
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonial 2 ─────────────────────────────────────────── */}
      {testimonial2 && <TestimonialBlock testimonial={testimonial2} bgVariant="sky" />}

      {/* ── Our Values ────────────────────────────────────────────── */}
      <section className="bg-neutral-100 section-pad">
        <div className="container-content">
          <SectionHeader title="Our Values" centered className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {a.values?.map((v, i) => (
              <div
                key={i}
                className={`rounded-card p-8 flex items-start gap-4 ${valueCardStyles[v.style] ?? "bg-white border border-neutral-200"}`}
              >
                <span className="mt-0.5 shrink-0">{valueIcons[i % valueIcons.length]}</span>
                <p className="font-body text-lg text-foreground leading-relaxed">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Team ──────────────────────────────────────────────── */}
      <section className="bg-cream section-pad">
        <div className="container-content">
          <SectionHeader title="Our Team" className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <article
                key={member.slug}
                className="bg-white rounded-card border border-neutral-200 overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                {/* Photo area — Avatar fills if no image */}
                <div className="relative aspect-square bg-primary-subtle flex items-center justify-center">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <Avatar name={member.name} size="xl" />
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-heading font-bold text-lg text-foreground mb-0.5">
                    {member.name}
                  </h3>
                  <p className="text-primary font-body text-sm font-semibold mb-3">
                    {member.title}
                  </p>
                  <p className="text-neutral font-body text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── Figma Accordion (blue header + ChevronDown) ────── */}
      <section className="bg-neutral-100 section-pad">
        <div className="container-content max-w-3xl mx-auto">
          <SectionHeader title={a.faqHeadline} className="mb-10" />
          {a.faqs && (
            <Accordion
              items={a.faqs}
              variant="bold"
            />
          )}
        </div>
      </section>
    </>
  );
}
