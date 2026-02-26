import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Design Tokens (Figma) ───────────────────────────────────────────
      colors: {

        // ── Primary Blue ─────────────────────────────────────────────────
        primary: {
          DEFAULT: "#2977BD",
          dark:    "#1E5A94",
          subtle:  "#E3F0FC",   // light bg tint — matches Figma primary.background
        },

        // ── Secondary Yellow ──────────────────────────────────────────────
        secondary: {
          DEFAULT: "#FFED89",
          dark:    "#E6D470",
          subtle:  "#FFFDF0",
        },

        // ── Tertiary (Dark Navy) ──────────────────────────────────────────
        tertiary: {
          DEFAULT: "#122849",
          dark:    "#0D1D35",
          subtle:  "#E8EAF0",
        },

        // ── Light Blue ────────────────────────────────────────────────────
        "light-blue": {
          DEFAULT: "#BBE2F5",
          dark:    "#9DD4F0",
          subtle:  "#F7FCFF",
        },

        // ── Neutral (Gray) ────────────────────────────────────────────────
        neutral: {
          DEFAULT: "#6B7280",
          dark:    "#4B5563",
          subtle:  "#F9FAFB",
          // Legacy numbered keys — referenced throughout codebase
          900: "#2A3441",
          700: "#6B7280",
          200: "#E5E7EB",
          100: "#FEFDFB",
        },

        // ── Semantic States ───────────────────────────────────────────────
        success: {
          DEFAULT: "#059669",
          dark:    "#047857",
          subtle:  "#ECFDF5",
        },
        warning: {
          DEFAULT: "#D97706",
          dark:    "#B45309",
          subtle:  "#FFFBEB",
        },
        error: {
          DEFAULT: "#DC2626",
          dark:    "#B91C1C",
          subtle:  "#FEF2F2",
        },

        // ── Global Surface Tokens ─────────────────────────────────────────
        foreground: "#1A1A1A",
        border:     "#E5E7EB",

        // ── Named Palette Aliases (backward compat + section backgrounds) ─
        cream:         "#F5F0DC",   // hero / testimonial sections
        sky:           "#E3F0FC",   // updated → matches primary.subtle
        navy:          "#122849",   // = tertiary.DEFAULT
        yellow:        "#FFED89",   // = secondary.DEFAULT
        coral:         "#E86048",   // event card thumbnails
        "blue-flower": "#4A8FD5",   // decorative accents

        // Flat legacy aliases kept so existing class names still compile
        "tertiary-dark":  "#122849",
        "tertiary-light": "#BBE2F5",
        "neutral-900":    "#2A3441",
        "neutral-700":    "#6B7280",
        "neutral-200":    "#E5E7EB",
        "neutral-100":    "#FEFDFB",
      },

      // ─── Typography ───────────────────────────────────────────────────────
      fontFamily: {
        heading: ["var(--font-manrope)", "Manrope", "sans-serif"],
        body:    ["Gill Sans", "Gill Sans MT", "Calibri", "Trebuchet MS", "sans-serif"],
        sans:    ["Gill Sans", "Gill Sans MT", "Calibri", "Trebuchet MS", "sans-serif"],
      },

      // ─── Max-width ────────────────────────────────────────────────────────
      maxWidth: {
        content: "1280px",
      },

      // ─── Border Radius ────────────────────────────────────────────────────
      borderRadius: {
        card: "12px",
        btn:  "8px",
        pill: "9999px",
      },

      // ─── Box Shadows ──────────────────────────────────────────────────────
      boxShadow: {
        card:         "0 2px 8px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.14)",
        input:        "0 1px 2px rgba(0,0,0,0.04)",
      },

      // ─── Keyframes & Animations ───────────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "accordion-down": {
          from: { height: "0px", opacity: "0" },
          to:   { height: "var(--radix-accordion-content-height, 100%)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height, 100%)", opacity: "1" },
          to:   { height: "0px", opacity: "0" },
        },
      },
      animation: {
        "fade-up":        "fade-up 0.5s ease-out forwards",
        "fade-in":        "fade-in 0.4s ease-out forwards",
        "accordion-down": "accordion-down 0.22s ease-out",
        "accordion-up":   "accordion-up 0.22s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
