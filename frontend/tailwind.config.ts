import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",   // main background
        surface: "var(--color-surface)",  // cards / sections
        border: "var(--color-border)",

        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          soft: "var(--color-primary-soft)",
        },

        secondary: {
          DEFAULT: "var(--color-secondary)",
          soft: "var(--color-secondary-soft)",
        },

        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },

        danger: "var(--color-danger)",

        skeleton: "var(--color-skeleton)",

        seat: {
          selected: "var(--color-seat-selected)",
          booked: "var(--color-seat-booked)",
          "booked-bg": "var(--color-seat-booked-bg)",
          premium: "var(--color-seat-premium)",
          vip: "var(--color-seat-vip)",
          regular: "var(--color-seat-regular)",
        },
      },

      borderRadius: {
        xl: "14px",
      },

      boxShadow: {
        soft: "var(--shadow-soft)",
        focus: "var(--shadow-focus)",
      },
    },
  },
  plugins: [],
};

export default config;
