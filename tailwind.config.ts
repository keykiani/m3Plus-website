import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Design Tokens from Figma ────────────────────────────────────────
      colors: {
        // Brand primaries
        primary: "#2977BD",       // M3+ Blue
        secondary: "#FFED88",     // M3+ Yellow
        // Tertiary
        "tertiary-dark": "#122849",
        "tertiary-light": "#BBE2F5",
        // Semantic
        error: "#B3261E",
        success: "#02A52B",
        warning: "#C97800",       // Figma swatch shows amber (hex in file is a typo)
        // Neutrals
        "neutral-900": "#2A3441",
        "neutral-700": "#6B7280",
        "neutral-200": "#E5E7EB",
        "neutral-100": "#FEFDFB",
        // Named palette (used directly in design)
        cream: "#F5F0DC",         // Hero/testimonial section backgrounds
        sky: "#C5DDE8",           // About/events hero, mission section
        navy: "#122849",          // Primary action buttons
        yellow: "#FFED88",        // CTA buttons (Join Newsletter, Register Now)
        coral: "#E86048",         // Event card thumbnail backgrounds
        "blue-flower": "#4A8FD5", // Decorative elements on Get Involved page
      },

      // ─── Typography ───────────────────────────────────────────────────────
      fontFamily: {
        // Headings: Manrope Bold (Google Fonts – loaded in layout.tsx)
        heading: ["var(--font-manrope)", "Manrope", "sans-serif"],
        // Body: Gill Sans (system font stack)
        body: [
          "Gill Sans",
          "Gill Sans MT",
          "Calibri",
          "Trebuchet MS",
          "sans-serif",
        ],
        sans: [
          "Gill Sans",
          "Gill Sans MT",
          "Calibri",
          "Trebuchet MS",
          "sans-serif",
        ],
      },

      // ─── Spacing / Sizing ─────────────────────────────────────────────────
      maxWidth: {
        content: "1280px",
      },

      // ─── Border radius ────────────────────────────────────────────────────
      borderRadius: {
        card: "12px",
        btn: "8px",
        pill: "9999px",
      },

      // ─── Box shadows ──────────────────────────────────────────────────────
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.14)",
      },

      // ─── Animation ────────────────────────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "counter-spin": {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
