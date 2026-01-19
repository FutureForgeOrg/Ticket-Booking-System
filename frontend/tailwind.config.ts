import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#020617",   // main background
        surface: "#020617",  // cards / sections
        border: "#1E293B",

        primary: {
          DEFAULT: "#F4C430",
          hover: "#EAB308",
          soft: "rgba(244,196,48,0.2)",
        },

        secondary: {
          DEFAULT: "#22C55E",
          soft: "rgba(34,197,94,0.18)",
        },

        text: {
          primary: "#F8FAFC",
          secondary: "#CBD5E1",
          muted: "#94A3B8",
        },

        danger: "#EF4444",

        skeleton : "#334155",
      },

      borderRadius: {
        xl: "14px",
      },

      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.6)",
        focus: "0 0 0 3px rgba(244,196,48,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
