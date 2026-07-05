import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette derived from the ExamSafexa emblem
        navy: {
          50: "#EEF2FA",
          100: "#D6E0F2",
          300: "#7C93C4",
          500: "#284581",
          700: "#16305F",
          900: "#0F2A5E", // primary brand navy
          950: "#0A1C40",
        },
        emerald: {
          400: "#3FD98B",
          500: "#2FBF71", // gradient start
        },
        teal: {
          400: "#14B8AE",
          500: "#0FA3A3", // gradient end
          600: "#0C8686",
        },
        rose: {
          50: "#FDF3F6",
          200: "#F6D6E2",
          400: "#E888AA",
          600: "#C85A83",
        },
        cloud: "#F7F9FC", // off-white background
      },
      fontFamily: {
        display: ["var(--font-fraunces)"],
        sans: ["var(--font-jakarta)"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #2FBF71 0%, #0FA3A3 100%)",
        "brand-gradient-diag": "linear-gradient(135deg, #2FBF71 0%, #0FA3A3 100%)",
        "navy-gradient": "linear-gradient(180deg, #16305F 0%, #0A1C40 100%)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 8px 30px -8px rgba(15, 42, 94, 0.18)",
        card: "0 4px 24px -4px rgba(15, 42, 94, 0.10)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "route-draw": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "route-draw": "route-draw 2.4s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
