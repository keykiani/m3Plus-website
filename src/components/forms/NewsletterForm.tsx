"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    // Simulate submission — replace with real newsletter endpoint
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <p className="text-success font-body font-semibold text-center py-3">
        You&apos;re subscribed! 🎉 Check your inbox for a confirmation.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <label htmlFor="newsletter-inline-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-inline-email"
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-btn border border-neutral-200 bg-white font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
      />
      <Button variant="secondary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Subscribing…" : "Subscribe"}
      </Button>
    </form>
  );
}
