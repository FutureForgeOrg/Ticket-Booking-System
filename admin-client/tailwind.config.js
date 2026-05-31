// /** @type {import('tailwindcss').Config} */
// export default {
//     darkMode: ["class"],
//     content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//   	extend: {
//   		borderRadius: {
//   			lg: 'var(--radius)',
//   			md: 'calc(var(--radius) - 2px)',
//   			sm: 'calc(var(--radius) - 4px)'
//   		},
//   		colors: {
//   			background: 'hsl(var(--background))',
//   			foreground: 'hsl(var(--foreground))',
//   			card: {
//   				DEFAULT: 'hsl(var(--card))',
//   				foreground: 'hsl(var(--card-foreground))'
//   			},
//   			popover: {
//   				DEFAULT: 'hsl(var(--popover))',
//   				foreground: 'hsl(var(--popover-foreground))'
//   			},
//   			primary: {
//   				DEFAULT: 'hsl(var(--primary))',
//   				foreground: 'hsl(var(--primary-foreground))'
//   			},
//   			secondary: {
//   				DEFAULT: 'hsl(var(--secondary))',
//   				foreground: 'hsl(var(--secondary-foreground))'
//   			},
//   			muted: {
//   				DEFAULT: 'hsl(var(--muted))',
//   				foreground: 'hsl(var(--muted-foreground))'
//   			},
//   			accent: {
//   				DEFAULT: 'hsl(var(--accent))',
//   				foreground: 'hsl(var(--accent-foreground))'
//   			},
//   			destructive: {
//   				DEFAULT: 'hsl(var(--destructive))',
//   				foreground: 'hsl(var(--destructive-foreground))'
//   			},
//   			border: 'hsl(var(--border))',
//   			input: 'hsl(var(--input))',
//   			ring: 'hsl(var(--ring))',
//   			chart: {
//   				'1': 'hsl(var(--chart-1))',
//   				'2': 'hsl(var(--chart-2))',
//   				'3': 'hsl(var(--chart-3))',
//   				'4': 'hsl(var(--chart-4))',
//   				'5': 'hsl(var(--chart-5))'
//   			}
//   		}
//   	}
//   },
//   plugins: [require("tailwindcss-animate")],
// }


/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        border: "var(--border)",

        background: "var(--canvas)",
        foreground: "var(--text-primary)",

        card: {
          DEFAULT: "var(--surface)",
          foreground: "var(--text-primary)",
        },
        popover: {
          DEFAULT: "var(--surface)",
          foreground: "var(--text-primary)",
        },

        primary: {
          DEFAULT: "var(--primary)",
          foreground: "#ffffff",
          hover: "var(--primary-hover)",
          soft: "var(--primary-soft)",
        },

        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "#ffffff",
          soft: "var(--secondary-soft)",
        },

        muted: {
          DEFAULT: "var(--surface)",
          foreground: "var(--text-muted)",
        },

        accent: {
          DEFAULT: "var(--surface)",
          foreground: "var(--text-primary)",
        },

        destructive: {
          DEFAULT: "var(--danger)",
          foreground: "#ffffff",
        },

        input: "var(--border)",
        ring: "var(--primary)",

        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },

        danger: "var(--danger)",
        success: "var(--success)",
        warning: "var(--warning)",
      },

      borderRadius: {
        xl: "14px",
      },

      boxShadow: {
        soft: "0 4px 24px rgba(99,102,241,0.12)",
        focus: "0 0 0 3px rgba(99,102,241,0.3)",
        glow: "0 6px 30px rgba(236,72,153,0.15)",
      },
    },
  },
  plugins: [("tailwindcss-animate")],
};
