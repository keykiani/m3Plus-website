"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";

const STORAGE_KEY = "m3plus_newsletter_dismissed";
/** Show popup after this delay (ms) on first visit */
const SHOW_DELAY_MS = 4000;

export default function NewsletterPopUp() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    // Only show if the user hasn't dismissed it before
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");

    // Replace with your actual newsletter signup endpoint (Mailchimp, ConvertKit, etc.)
    // For now, simulates a successful signup
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setTimeout(dismiss, 2000);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-900 z-[90]"
            onClick={dismiss}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative bg-cream rounded-card shadow-card-hover w-full max-w-md pointer-events-auto p-8">
              {/* Close button */}
              <button
                onClick={dismiss}
                aria-label="Close newsletter signup"
                className="absolute top-4 right-4 text-neutral-700 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-1"
              >
                <X size={20} />
              </button>

              {status !== "success" ? (
                <>
                  <p className="text-sm font-heading font-bold tracking-widest uppercase text-primary mb-2">
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

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <label htmlFor="popup-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="popup-email"
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-btn border border-neutral-200 bg-white font-body text-neutral-900 placeholder:text-neutral-700/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      disabled={status === "sending"}
                      className="w-full justify-center"
                    >
                      {status === "sending" ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </form>

                  <button
                    onClick={dismiss}
                    className="mt-4 w-full text-center text-sm text-neutral-700 hover:text-neutral-900 font-body underline"
                  >
                    No thanks
                  </button>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-4xl mb-4">🎉</p>
                  <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-2">
                    You&apos;re in!
                  </h2>
                  <p className="text-neutral-700 font-body">
                    Welcome to the M3+ community. Watch your inbox for updates.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
