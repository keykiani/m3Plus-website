"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input, Textarea, Select, InputWrapper } from "@/components/ui/Input";
import { siteConfig } from "@/lib/siteConfig";

interface FormData {
  firstName:    string;
  lastName:     string;
  email:        string;
  company:      string;
  role:         string;
  contribution: string;
  expertise:    string;
  motivation:   string;
}

interface GetInvolvedFormProps {
  contributionOptions: string[];
}

export default function GetInvolvedForm({ contributionOptions }: GetInvolvedFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      const endpoint = siteConfig.formspreeId.startsWith("http")
        ? siteConfig.formspreeId
        : `https://formspree.io/f/${siteConfig.formspreeId}`;

      const res = await fetch(endpoint, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify({ ...data, _subject: "New M3+ Application" }),
      });

      if (res.ok) { setStatus("success"); reset(); }
      else          setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white rounded-card p-10 text-center shadow-card border border-success/20">
        <CheckCircle2 size={48} className="text-success mx-auto mb-4" aria-hidden="true" />
        <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
          Application Received!
        </h3>
        <p className="text-neutral font-body">
          Thank you for applying to join M3+. We&apos;ll review your application and reach out soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-white rounded-card p-8 shadow-card border border-neutral-200 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputWrapper label="First Name *" htmlFor="gi-firstName" error={errors.firstName?.message}>
          <Input
            id="gi-firstName"
            placeholder="First Name"
            error={errors.firstName?.message}
            {...register("firstName", { required: "Required" })}
          />
        </InputWrapper>

        <InputWrapper label="Last Name *" htmlFor="gi-lastName" error={errors.lastName?.message}>
          <Input
            id="gi-lastName"
            placeholder="Last Name"
            error={errors.lastName?.message}
            {...register("lastName", { required: "Required" })}
          />
        </InputWrapper>
      </div>

      <InputWrapper label="Email Address *" htmlFor="gi-email" error={errors.email?.message}>
        <Input
          id="gi-email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email", {
            required: "Required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
          })}
        />
      </InputWrapper>

      <InputWrapper label="Current Company / Organisation" htmlFor="gi-company">
        <Input
          id="gi-company"
          placeholder="Company or Organisation"
          {...register("company")}
        />
      </InputWrapper>

      <InputWrapper label="Current Role" htmlFor="gi-role">
        <Input
          id="gi-role"
          placeholder="e.g. UX Designer, Product Manager"
          {...register("role")}
        />
      </InputWrapper>

      <InputWrapper
        label="How would you like to contribute? *"
        htmlFor="gi-contribution"
        error={errors.contribution?.message}
      >
        <Select
          id="gi-contribution"
          error={errors.contribution?.message}
          {...register("contribution", { required: "Please select an option" })}
        >
          <option value="">Select one…</option>
          {contributionOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </Select>
      </InputWrapper>

      <InputWrapper label="Areas of Expertise / Interest" htmlFor="gi-expertise">
        <Input
          id="gi-expertise"
          placeholder="e.g. UX Research, Visual Design, Accessibility"
          {...register("expertise")}
        />
      </InputWrapper>

      <InputWrapper
        label="What excites you about contributing to M3+? *"
        htmlFor="gi-motivation"
        error={errors.motivation?.message}
      >
        <Textarea
          id="gi-motivation"
          rows={4}
          placeholder="Tell us a bit about yourself and your goals…"
          error={errors.motivation?.message}
          {...register("motivation", { required: "Please share your motivation" })}
        />
      </InputWrapper>

      <Button
        type="submit"
        variant="secondary"
        disabled={status === "sending"}
        className="w-full justify-center gap-2"
      >
        <Send size={16} aria-hidden="true" />
        {status === "sending" ? "Submitting…" : "Submit Application"}
      </Button>

      {status === "error" && (
        <p className="flex items-center justify-center gap-2 text-error font-body text-sm">
          <AlertCircle size={16} aria-hidden="true" />
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
