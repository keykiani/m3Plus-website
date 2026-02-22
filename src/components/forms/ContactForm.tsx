"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Send } from "lucide-react";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
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
      const res = await fetch(`https://formspree.io/f/${siteConfig.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-btn border border-neutral-200 bg-white font-body text-neutral-900 placeholder:text-neutral-700/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="footer-name" className="sr-only">Name</label>
          <input
            id="footer-name"
            placeholder="Name"
            className={inputClass}
            aria-invalid={!!errors.name}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-error text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="footer-email" className="sr-only">Email address</label>
          <input
            id="footer-email"
            type="email"
            placeholder="Email Address"
            className={inputClass}
            aria-invalid={!!errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
            })}
          />
          {errors.email && (
            <p className="text-error text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="footer-subject" className="sr-only">Subject</label>
        <input
          id="footer-subject"
          placeholder="Subject"
          className={inputClass}
          {...register("subject", { required: "Subject is required" })}
        />
      </div>

      <div>
        <label htmlFor="footer-message" className="sr-only">Message</label>
        <textarea
          id="footer-message"
          placeholder="Message"
          rows={4}
          className={inputClass}
          aria-invalid={!!errors.message}
          {...register("message", { required: "Message is required" })}
        />
        {errors.message && (
          <p className="text-error text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        disabled={status === "sending"}
        className="gap-2"
      >
        <Send size={16} />
        {status === "sending" ? "Sending..." : "Send message"}
      </Button>

      {status === "success" && (
        <p className="text-success font-body text-sm">
          Message sent! We&apos;ll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-error font-body text-sm">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
