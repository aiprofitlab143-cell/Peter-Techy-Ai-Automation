import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        foreground: "#F8FAFC",
        primary: {
          DEFAULT: "#6366F1",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#111827",
          foreground: "#F8FAFC",
        },
        accent: {
          DEFAULT: "#22C55E",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#1E293B",
          foreground: "#94A3B8",
        },
        border: "#1E293B",
        card: {
          DEFAULT: "#111827",
          foreground: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

