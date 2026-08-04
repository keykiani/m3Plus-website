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
import { forwardRef, cloneElement, isValidElement } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

// ─── Shared style ─────────────────────────────────────────────────────────────
const baseClass =
  "w-full rounded-btn border border-neutral-200 bg-white px-4 py-3 " +
  "font-body text-base text-foreground shadow-input " +
  // Full-strength token: neutral-700 at 50% opacity measured ~1.97:1 on white.
  "placeholder:text-neutral-700 " +
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
  const errorId = error ? `${htmlFor}-error` : undefined;

  /**
   * Tie the error message to the field with aria-describedby. Without this a
   * screen reader returning to an invalid input announces "invalid entry" with
   * no explanation — role="alert" only fires once, at render.
   *
   * Cloning here means every field in every form gets the association from a
   * single place, rather than each call site having to remember it.
   */
  const field =
    errorId && isValidElement<{ "aria-describedby"?: string }>(children)
      ? cloneElement(children, {
          "aria-describedby":
            [children.props["aria-describedby"], errorId].filter(Boolean).join(" "),
        })
      : children;

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
      {field}
      {error && (
        <p id={errorId} role="alert" className="text-error text-xs mt-0.5">
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
