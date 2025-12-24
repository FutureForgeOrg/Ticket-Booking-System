import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FFFFFF",
        surface: "#FAFAFA",
        border: "#E5E7EB",

        primary: {
          DEFAULT: "#F4C430",
          hover: "#EAB308",
          soft: "rgba(244,196,48,0.15)",
        },

        secondary: {
          DEFAULT: "#16A34A",
          soft: "rgba(22,163,74,0.12)",
        },

        text: {
          primary: "#111827",
          secondary: "#4B5563",
          muted: "#787d87ff",
        },

        danger: "#DC2626",
      },

      borderRadius: {
        xl: "14px",
      },

      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.08)",
        focus: "0 0 0 3px rgba(244,196,48,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
