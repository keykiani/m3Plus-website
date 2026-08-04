"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import NewsletterForm from "@/components/forms/NewsletterForm";

const STORAGE_KEY = "m3plus_newsletter_dismissed";
const SHOW_DELAY_MS = 4000;

/** Elements that can receive keyboard focus inside the dialog. */
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function NewsletterPopUp() {
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  /** Where focus was before the dialog opened, so we can put it back. */
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    /**
     * Don't interrupt someone mid-form. Opening moves focus to the close button,
     * so firing while a visitor is typing in the footer contact form yanks focus
     * away and sends their next keystrokes into the newsletter email field.
     * Re-arm instead of cancelling, so the popup still appears once they stop.
     */
    const isTyping = () => {
      const el = document.activeElement;
      return !!el?.closest("form") &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
    };

    let timer: ReturnType<typeof setTimeout>;
    const arm = () => {
      timer = setTimeout(() => (isTyping() ? arm() : setVisible(true)), SHOW_DELAY_MS);
    };
    arm();

    return () => clearTimeout(timer);
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "true");
    // Restore focus to wherever the user was before the dialog interrupted them.
    previouslyFocused.current?.focus();
  }, []);

  // Focus management: move focus in on open, trap Tab inside, close on Escape.
  useEffect(() => {
    if (!visible) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [visible, dismiss]);

  // The form is replaced by the success panel — move focus so it isn't dropped to <body>.
  useEffect(() => {
    if (success) successRef.current?.focus();
  }, [success]);

  const handleSuccess = () => setSuccess(true);

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/50 z-[90] animate-fade-in"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          ref={dialogRef}
          className="relative bg-cream rounded-card shadow-card-hover w-full max-w-md pointer-events-auto p-8 animate-popup-in"
        >
          <button
            ref={closeButtonRef}
            onClick={dismiss}
            aria-label="Close newsletter signup"
            className="absolute top-4 right-4 text-neutral-700 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-1"
          >
            <X size={20} />
          </button>

          {!success ? (
            <>
              <p className="text-sm font-heading font-bold tracking-widest uppercase text-primary-dark mb-2">
                Stay Connected
              </p>
              <h2
                id="popup-title"
                className="text-2xl font-heading font-bold text-neutral-900 mb-3"
              >
                Join the M3+ Community
              </h2>
              <p className="text-neutral-700 font-body mb-6 leading-relaxed">
                Get monthly updates on events, resources, and opportunities for
                designers at every level. No spam, ever.
              </p>

              <NewsletterForm onSuccess={handleSuccess} />

              <button
                onClick={dismiss}
                className="mt-4 w-full text-center text-sm text-neutral-700 hover:text-neutral-900 font-body underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                No thanks
              </button>
            </>
          ) : (
            /* role="status" announces the confirmation. No auto-dismiss — tearing the
               panel down on a timer would fail WCAG 2.2.1 (Timing Adjustable). */
            <div
              ref={successRef}
              role="status"
              tabIndex={-1}
              className="text-center py-4 focus:outline-none"
            >
              <p className="text-4xl mb-4" aria-hidden="true">🎉</p>
              <h2
                id="popup-title"
                className="text-2xl font-heading font-bold text-neutral-900 mb-2"
              >
                You&apos;re in!
              </h2>
              <p className="text-neutral-700 font-body mb-6">
                Welcome to the M3+ community. Watch your inbox for updates.
              </p>
              <button
                onClick={dismiss}
                className="text-sm text-neutral-700 hover:text-neutral-900 font-body underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
