"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function NewsletterForm() {
  const [email,  setEmail]  = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    // Replace with your newsletter endpoint (Mailchimp, ConvertKit, etc.)
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <p className="flex items-center justify-center gap-2 text-success font-body font-semibold py-3">
        <CheckCircle2 size={18} aria-hidden="true" />
        You&apos;re subscribed! Check your inbox for a confirmation.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <label htmlFor="newsletter-inline-email" className="sr-only">
        Email address
      </label>
      <Input
        id="newsletter-inline-email"
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1"
      />
      <Button variant="secondary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Subscribing…" : "Subscribe"}
      </Button>
    </form>
  );
}
