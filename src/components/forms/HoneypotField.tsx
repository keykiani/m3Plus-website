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
 * Usage: <HoneypotField register={register("_gotcha")} />
 */
export default function HoneypotField({
  register,
}: {
  register: UseFormRegisterReturn;
}) {
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
      <label htmlFor={register.name}>Leave this field empty</label>
      <input
        id={register.name}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register}
      />
    </div>
  );
}
