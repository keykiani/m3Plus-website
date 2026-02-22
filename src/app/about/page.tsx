import type { Metadata } from "next";
import { getMarkdownFile, getTeamMembers, getTestimonials } from "@/lib/markdown";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import TestimonialBlock from "@/components/sections/TestimonialBlock";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about M3+ Mutual Mentoring — our mission, values, team, and the community we're building.",
};

export default async function AboutPage() {
  const [{ data: about }, teamMembers, testimonials] = await Promise.all([
    getMarkdownFile("pages/about.md"),
    getTeamMembers(),
    getTestimonials(),
  ]);

  const a = about as {
    heroLabel: string;
    heroHeadline: string;
    heroSubtext: string;
    whatIsHeadline: string;
    whatIsBody: string;
    whatIsImage: string;
    whatIsImageAlt: string;
    whatIsCtaLabel: string;
    whatIsCtaHref: string;
    missionImage: string;
    missionImageAlt: string;
    missionHeadline: string;
    missionBody: string;
    values: { text: string; style: string }[];
    faqHeadline: string;
    faqs: { question: string; answer: string }[];
  };

  const testimonial1 = testimonials[0] ?? null;
  const testimonial2 = testimonials[1] ?? null;

  // Value card color mapping
  const valueStyles: Record<string, string> = {
    yellow: "bg-yellow border-neutral-900",
    green: "bg-success/20 border-neutral-900",
    outline: "bg-white border-2 border-neutral-900",
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-sky section-pad">
        <div className="container-content">
          <p className="text-sm font-heading font-bold tracking-widest uppercase text-primary mb-3">
            {a.heroLabel}
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 leading-tight max-w-2xl mb-4">
            {a.heroHeadline}
          </h1>
          <p className="text-xl text-neutral-700 font-body leading-relaxed max-w-xl">
            {a.heroSubtext}
          </p>
        </div>
      </section>

      {/* ── What is M3+? ──────────────────────────────────────────── */}
      <section className="bg-neutral-100 section-pad">
        <div className="container-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader title={a.whatIsHeadline} className="mb-6" />
            <p className="text-neutral-700 font-body text-lg leading-relaxed mb-8">
              {a.whatIsBody}
            </p>
            <Button variant="primary" href={a.whatIsCtaHref}>
              {a.whatIsCtaLabel}
            </Button>
          </div>
          <div className="relative aspect-[4/3] rounded-card overflow-hidden bg-sky shadow-card">
            {a.whatIsImage && (
              <Image src={a.whatIsImage} alt={a.whatIsImageAlt} fill className="object-cover" sizes="50vw" />
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
              <Image src={a.missionImage} alt={a.missionImageAlt} fill className="object-cover" sizes="50vw" />
            )}
          </div>
          <div>
            <p className="text-sm font-heading font-bold tracking-widest uppercase text-primary mb-2">
              Our Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 leading-tight mb-6">
              {a.missionHeadline}
            </h2>
            <p className="text-neutral-700 font-body text-lg leading-relaxed">
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
                className={`rounded-card p-8 border ${valueStyles[v.style] ?? "bg-white border-neutral-200"}`}
              >
                <p className="font-body text-lg text-neutral-900 leading-relaxed">
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
              <article key={member.slug} className="bg-white rounded-card border border-neutral-200 overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
                <div className="relative aspect-square bg-sky">
                  {member.photo && (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-lg text-neutral-900">{member.name}</h3>
                  <p className="text-primary font-body text-sm font-semibold mb-3">{member.title}</p>
                  <p className="text-neutral-700 font-body text-sm leading-relaxed">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="bg-neutral-100 section-pad">
        <div className="container-content max-w-3xl mx-auto">
          <SectionHeader title={a.faqHeadline} className="mb-10" />
          <div className="divide-y divide-neutral-200">
            {a.faqs?.map((faq, i) => (
              <details key={i} className="group py-5">
                <summary className="flex justify-between items-center cursor-pointer list-none font-heading font-bold text-lg text-neutral-900 gap-4">
                  {faq.question}
                  <span className="shrink-0 text-primary transition-transform duration-200 group-open:rotate-45 text-2xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-neutral-700 font-body leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
