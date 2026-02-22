import Link from "next/link";
import { Linkedin } from "lucide-react";
import M3Logo from "@/components/ui/M3Logo";
import ContactForm from "@/components/forms/ContactForm";
import { siteConfig, navLinks } from "@/lib/siteConfig";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cream border-t border-neutral-200 mt-auto">
      {/* ── Contact Section ─────────────────────────────────────────── */}
      <div className="container-content py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — prompt */}
          <div>
            <p className="text-sm font-heading font-bold tracking-widest uppercase text-primary mb-3">
              Get in Touch
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 leading-tight mb-4">
              Looking for another way to connect?
            </h2>
            <p className="text-neutral-700 font-body text-lg mb-6">
              Send us a message and we&apos;ll get back to you as soon as possible.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              {siteConfig.socialLinks.linkedin && (
                <a
                  href={siteConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="M3+ on LinkedIn"
                  className="flex items-center gap-2 text-neutral-700 hover:text-primary transition-colors font-body font-semibold"
                >
                  <Linkedin size={20} />
                  LinkedIn
                </a>
              )}
              {siteConfig.socialLinks.slack && (
                <a
                  href={siteConfig.socialLinks.slack}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join M3+ on Slack"
                  className="flex items-center gap-2 text-neutral-700 hover:text-primary transition-colors font-body font-semibold"
                >
                  {/* Slack icon (inline SVG — no package dep needed) */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                  </svg>
                  Slack
                </a>
              )}
            </div>
          </div>

          {/* Right — Contact Form */}
          <ContactForm />
        </div>
      </div>

      {/* ── Bottom Bar ──────────────────────────────────────────────── */}
      <div className="border-t border-neutral-200">
        <div className="container-content py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
            <M3Logo size={32} />
            <span className="font-heading font-bold text-navy text-sm">
              M3+ Mutual Mentoring
            </span>
          </Link>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-6" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-body text-neutral-700 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-xs text-neutral-700 font-body">
            &copy; {year} M3+ Mutual Mentoring. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
