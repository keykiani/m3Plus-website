"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import M3Logo from "@/components/ui/M3Logo";
import Button from "@/components/ui/Button";
import { navLinks } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Add shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  /**
   * Close on Escape and hand focus back to the toggle.
   *
   * Deliberately not a focus trap: this is a disclosure, not a dialog. There is
   * no role="dialog"/aria-modal here and the page behind it stays legitimately
   * reachable, so trapping Tab would strand keyboard users rather than help
   * them. NewsletterPopUp is the modal pattern; this is not that.
   */
  const closeMenu = useCallback(() => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMenu]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-sky transition-shadow duration-200",
        scrolled && "shadow-md"
      )}
    >
      <nav
        className="container-content flex items-center justify-between h-16 md:h-20"
        aria-label="Main navigation"
      >
        {/* ── Logo ──────────────────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
          <M3Logo size={40} />
          <span className="font-heading font-bold text-navy text-lg leading-tight hidden sm:block">
            M3+ Mutual<br />Mentoring
          </span>
        </Link>

        {/* ── Desktop Nav Links ──────────────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "font-heading font-semibold text-base transition-colors duration-150",
                    "hover:text-primary",
                    // Visible focus ring — colour alone is not a sufficient indicator,
                    // and the active link is already text-primary (no change on focus).
                    "rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sky",
                    "relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-primary",
                    "after:transition-all after:duration-200",
                    // primary-dark: #2977BD on bg-sky measured 4.05:1 (needs 4.5:1).
                    isActive
                      ? "text-primary-dark after:w-full"
                      : "text-neutral-900 after:w-0 hover:after:w-full"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── CTA Button ────────────────────────────────────────────── */}
        <div className="hidden md:block">
          <Button variant="secondary" size="sm" href="/get-involved">
            Get Involved
          </Button>
        </div>

        {/* ── Mobile Hamburger ──────────────────────────────────────── */}
        <button
          ref={menuButtonRef}
          className="md:hidden p-2 rounded-btn text-neutral-900 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ── Mobile Drawer — CSS grid-rows transition, no Framer Motion ── */}
      <div
        id="mobile-nav-drawer"
        className={cn(
          "md:hidden overflow-hidden",
          "grid transition-[grid-template-rows,opacity,visibility] duration-200 ease-in-out",
          // `invisible` (visibility: hidden) is what actually removes the collapsed
          // drawer's links from the tab order — grid-rows-[0fr] + opacity-0 do not.
          // Transitioning visibility keeps the fade-out: it flips to `visible`
          // immediately on open, and waits out the duration on close.
          mobileOpen
            ? "grid-rows-[1fr] opacity-100 visible"
            : "grid-rows-[0fr] opacity-0 invisible"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="min-h-0 bg-sky border-t border-neutral-200 px-4 pb-6">
          <ul className="flex flex-col gap-4 pt-4" role="list">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block font-heading font-semibold text-lg py-2",
                      // The desktop links got a focus ring; these did not, so
                      // keyboard focus inside the open drawer was invisible.
                      "rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sky",
                      // primary (#2977BD) on the drawer's bg-sky (#E3F0FC) is
                      // 4.06:1 — the same failure fixed on the desktop nav and
                      // missed here. primary-dark (#1E5A94) gives 6.16:1.
                      isActive ? "text-primary-dark" : "text-neutral-900"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Button
                variant="secondary"
                href="/get-involved"
                className="w-full justify-center"
              >
                Get Involved
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
