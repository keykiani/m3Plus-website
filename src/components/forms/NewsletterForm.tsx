"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import HoneypotField from "@/components/forms/HoneypotField";
import { siteConfig } from "@/lib/siteConfig";

interface NewsletterFormData {
  email: string;
  /** Honeypot — must stay empty; Formspree drops the submission if filled. */
  _gotcha?: string;
}

interface Props {
  /** Called after a successful Formspree submission — lets parent components react (e.g. popup auto-dismiss). */
  onSuccess?: () => void;
}

export default function NewsletterForm({ onSuccess }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>();

  const onSubmit = async (data: NewsletterFormData) => {
    setStatus("sending");
    try {
      const endpoint = siteConfig.formspreeId.startsWith("http")
        ? siteConfig.formspreeId
        : `https://formspree.io/f/${siteConfig.formspreeId}`;

      const res = await fetch(endpoint, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify({ email: data.email, _subject: "Newsletter Signup" }),
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus("success");
      reset();
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p
        role="status"
        className="flex items-center justify-center gap-2 text-success font-body font-semibold py-3"
      >
        <CheckCircle2 size={18} aria-hidden="true" />
        You&apos;re subscribed! Check your inbox for a confirmation.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-3">
      <HoneypotField register={register("_gotcha")} />

      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="newsletter-inline-email" className="sr-only">
          Email address
        </label>
        <Input
          id="newsletter-inline-email"
          type="email"
          placeholder="Enter your email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "newsletter-inline-email-error" : undefined}
          className="flex-1"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
          })}
        />
        <Button variant="secondary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Subscribing…" : "Subscribe"}
        </Button>
      </div>

      {/* Field-level validation error — id is referenced by aria-describedby above */}
      {errors.email && (
        <p id="newsletter-inline-email-error" role="alert" className="text-error text-xs">
          {errors.email.message}
        </p>
      )}

      {/* Network / server error */}
      <div role="status" aria-live="polite">
        {status === "error" && (
          <p className="flex items-center gap-2 text-error font-body text-sm">
            <AlertCircle size={16} aria-hidden="true" />
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}
