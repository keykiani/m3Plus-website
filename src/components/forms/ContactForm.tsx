"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input, Textarea, InputWrapper } from "@/components/ui/Input";
import HoneypotField from "@/components/forms/HoneypotField";
import { siteConfig } from "@/lib/siteConfig";

interface ContactFormData {
  name:     string;
  email:    string;
  subject:  string;
  message:  string;
  /** Honeypot — must stay empty; Formspree drops the submission if filled. */
  _gotcha?: string;
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setStatus("sending");
    try {
      const endpoint = siteConfig.formspreeId.startsWith("http")
        ? siteConfig.formspreeId
        : `https://formspree.io/f/${siteConfig.formspreeId}`;

      const res = await fetch(endpoint, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify(data),
      });

      if (res.ok) { setStatus("success"); reset(); }
      else          setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <HoneypotField register={register("_gotcha")} />

      {/* Labels are visible rather than sr-only: a placeholder is not a label —
          it disappears on input, and at the required contrast it was ~2:1. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputWrapper label="Name" htmlFor="footer-name" error={errors.name?.message}>
          <Input
            id="footer-name"
            placeholder="Name"
            error={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />
        </InputWrapper>

        <InputWrapper label="Email" htmlFor="footer-email" error={errors.email?.message}>
          <Input
            id="footer-email"
            type="email"
            placeholder="Email Address"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
            })}
          />
        </InputWrapper>
      </div>

      <InputWrapper label="Subject" htmlFor="footer-subject" error={errors.subject?.message}>
        <Input
          id="footer-subject"
          placeholder="Subject"
          error={errors.subject?.message}
          {...register("subject", { required: "Subject is required" })}
        />
      </InputWrapper>

      <InputWrapper label="Message" htmlFor="footer-message" error={errors.message?.message}>
        <Textarea
          id="footer-message"
          placeholder="Message"
          rows={4}
          error={errors.message?.message}
          {...register("message", { required: "Message is required" })}
        />
      </InputWrapper>

      <Button
        type="submit"
        variant="primary"
        disabled={status === "sending"}
        className="gap-2"
      >
        <Send size={16} aria-hidden="true" />
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>

      {/* Live region so the outcome is announced, not just shown. */}
      <div role="status" aria-live="polite">
        {status === "success" && (
          <p className="flex items-center gap-2 text-success font-body text-sm">
            <CheckCircle2 size={16} aria-hidden="true" />
            Message sent! We&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="flex items-center gap-2 text-error font-body text-sm">
            <AlertCircle size={16} aria-hidden="true" />
            Something went wrong. Please try again or email us directly.
          </p>
        )}
      </div>
    </form>
  );
}
