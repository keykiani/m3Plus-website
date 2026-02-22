"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Send } from "lucide-react";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  contribution: string;
  expertise: string;
  motivation: string;
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
      const res = await fetch(`https://formspree.io/f/${siteConfig.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: "New M3+ Application" }),
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

  if (status === "success") {
    return (
      <div className="bg-white rounded-card p-10 text-center shadow-card">
        <p className="text-4xl mb-4">🎉</p>
        <h3 className="text-2xl font-heading font-bold text-neutral-900 mb-2">Application Received!</h3>
        <p className="text-neutral-700 font-body">
          Thank you for applying to join M3+. We&apos;ll review your application and reach out soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="bg-white rounded-card p-8 shadow-card space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-heading font-semibold text-neutral-900 mb-1">First Name *</label>
          <input id="firstName" placeholder="First Name" className={inputClass}
            {...register("firstName", { required: "Required" })} />
          {errors.firstName && <p className="text-error text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-heading font-semibold text-neutral-900 mb-1">Last Name *</label>
          <input id="lastName" placeholder="Last Name" className={inputClass}
            {...register("lastName", { required: "Required" })} />
          {errors.lastName && <p className="text-error text-xs mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-heading font-semibold text-neutral-900 mb-1">Email Address *</label>
        <input id="email" type="email" placeholder="you@example.com" className={inputClass}
          {...register("email", {
            required: "Required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
          })} />
        {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-heading font-semibold text-neutral-900 mb-1">Current Company / Organization</label>
        <input id="company" placeholder="Company or Organization" className={inputClass}
          {...register("company")} />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-heading font-semibold text-neutral-900 mb-1">Current Role</label>
        <input id="role" placeholder="e.g. UX Designer, Product Manager" className={inputClass}
          {...register("role")} />
      </div>

      <div>
        <label htmlFor="contribution" className="block text-sm font-heading font-semibold text-neutral-900 mb-1">How would you like to contribute? *</label>
        <select id="contribution" className={inputClass}
          {...register("contribution", { required: "Please select an option" })}>
          <option value="">Select one…</option>
          {contributionOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.contribution && <p className="text-error text-xs mt-1">{errors.contribution.message}</p>}
      </div>

      <div>
        <label htmlFor="expertise" className="block text-sm font-heading font-semibold text-neutral-900 mb-1">Areas of Expertise / Interest</label>
        <input id="expertise" placeholder="e.g. UX Research, Visual Design, Accessibility" className={inputClass}
          {...register("expertise")} />
      </div>

      <div>
        <label htmlFor="motivation" className="block text-sm font-heading font-semibold text-neutral-900 mb-1">What excites you about contributing to M3+? *</label>
        <textarea id="motivation" rows={4} placeholder="Tell us a bit about yourself and your goals…" className={inputClass}
          {...register("motivation", { required: "Please share your motivation" })} />
        {errors.motivation && <p className="text-error text-xs mt-1">{errors.motivation.message}</p>}
      </div>

      <Button type="submit" variant="secondary" disabled={status === "sending"} className="gap-2 w-full justify-center">
        <Send size={16} aria-hidden="true" />
        {status === "sending" ? "Submitting…" : "Submit Application"}
      </Button>

      {status === "error" && (
        <p className="text-error font-body text-sm text-center">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
