"use client";

import { useId } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

/**
 * Spam honeypot.
 *
 * Formspree silently discards any submission where a field named `_gotcha`
 * is non-empty. Humans never see or focus this input; scripted bots that fill
 * every field in the DOM do, and get dropped.
 *
 * Positioned off-screen rather than `display: none` — some bots skip fields
 * that are not rendered at all. `aria-hidden` + `tabIndex={-1}` keep it out of
 * the accessibility tree and the tab order.
 *
 * The DOM id comes from useId(), not from `register.name`: the name is always
 * the literal "_gotcha", so reusing it emitted duplicate ids on any page with
 * more than one form (/get-involved renders three). Duplicate ids are invalid
 * HTML and make `<label for>` resolve to whichever element comes first.
 * Formspree matches on the *name*, which is unchanged, so the trap still works.
 *
 * Usage: <HoneypotField register={register("_gotcha")} />
 */
export default function HoneypotField({
  register,
}: {
  register: UseFormRegisterReturn;
}) {
  const id = useId();

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      <label htmlFor={id}>Leave this field empty</label>
      <input
        id={id}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register}
      />
    </div>
  );
}
