"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import M3Logo from "@/components/ui/M3Logo";
import Button from "@/components/ui/Button";
import { navLinks } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Add shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-neutral-100 transition-shadow duration-200",
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
                    "hover:text-primary focus:outline-none focus-visible:text-primary",
                    "relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-primary",
                    "after:transition-all after:duration-200",
                    isActive
                      ? "text-primary after:w-full"
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
          <Button variant="secondary" size="sm" href="/get-involved#newsletter">
            Join Our Newsletter
          </Button>
        </div>

        {/* ── Mobile Hamburger ──────────────────────────────────────── */}
        <button
          className="md:hidden p-2 rounded-btn text-neutral-900 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ── Mobile Drawer ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-neutral-100 border-t border-neutral-200 px-4 pb-6"
          >
            <ul className="flex flex-col gap-4 pt-4" role="list">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block font-heading font-semibold text-lg py-2",
                        isActive ? "text-primary" : "text-neutral-900"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <Button
                  variant="secondary"
                  href="/get-involved#newsletter"
                  className="w-full justify-center"
                >
                  Join Our Newsletter
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
