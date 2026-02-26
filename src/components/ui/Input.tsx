/**
 * Input & Textarea primitives — matches the Figma input component.
 *
 * Usage:
 *   <Input placeholder="Name" />
 *   <Input as="textarea" rows={4} placeholder="Message" />
 *
 * Pair with InputWrapper for labelled + error-messaged fields.
 */

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

// ─── Shared style ─────────────────────────────────────────────────────────────
const baseClass =
  "w-full rounded-btn border border-neutral-200 bg-white px-4 py-3 " +
  "font-body text-base text-foreground shadow-input " +
  "placeholder:text-neutral-700/50 " +
  "transition-colors duration-150 " +
  "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  "aria-[invalid=true]:border-error aria-[invalid=true]:ring-error/20";

// ─── Input ────────────────────────────────────────────────────────────────────

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  as?: "input";
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(baseClass, className)}
      aria-invalid={!!error}
      {...props}
    />
  )
);
Input.displayName = "Input";

// ─── Textarea ─────────────────────────────────────────────────────────────────

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, rows = 4, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(baseClass, "resize-y min-h-[100px]", className)}
      aria-invalid={!!error}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

// ─── InputWrapper — label + field + error message ─────────────────────────────

interface InputWrapperProps {
  label:     string;
  htmlFor:   string;
  error?:    string;
  srOnly?:   boolean;       // hide label visually (still accessible)
  children:  React.ReactNode;
  className?: string;
}

export function InputWrapper({
  label,
  htmlFor,
  error,
  srOnly = false,
  children,
  className,
}: InputWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label
        htmlFor={htmlFor}
        className={cn(
          "text-sm font-heading font-semibold text-neutral-900",
          srOnly && "sr-only"
        )}
      >
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-error text-xs mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(baseClass, "cursor-pointer", className)}
      aria-invalid={!!error}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";
