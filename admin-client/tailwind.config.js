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
        canvas: "#F5F3FF",
        surface: "#FFFFFF",
        border: "#E9D5FF",

        primary: {
          DEFAULT: "#6366F1",
          hover: "#4F46E5",
          soft: "rgba(99,102,241,0.1)",
        },

        secondary: {
          DEFAULT: "#EC4899",
          soft: "rgba(236,72,153,0.1)",
        },

        text: {
          primary: "#312E81",
          secondary: "#4C1D95",
          muted: "#A78BFA",
        },

        danger: "#EF4444",
        success: "#10B981",
        warning: "#F59E0B",
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
  plugins: [require("tailwindcss-animate")],
};
