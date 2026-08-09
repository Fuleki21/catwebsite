import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FBF7F1",
          50: "#FFFFFF",
          100: "#FEFCFA",
          200: "#FBF7F1",
          300: "#F5EDE1",
          400: "#EFE2D0",
        },
        ink: {
          DEFAULT: "#2B2420",
          50: "#F4F2F0",
          100: "#E3DEDA",
          300: "#8B8078",
          500: "#5A5049",
          700: "#3B332E",
          900: "#2B2420",
        },
        marmalade: {
          50: "#FDF1E7",
          100: "#FAE1C9",
          200: "#F3C08D",
          300: "#EB9E56",
          400: "#DE8135",
          500: "#C96A26",
          600: "#A8541C",
          700: "#804017",
          800: "#5C2E12",
          900: "#3D1F0C",
        },
        sage: {
          50: "#EEF3F0",
          100: "#D7E3DB",
          200: "#AFC7B9",
          300: "#87AB98",
          400: "#628F78",
          500: "#4F7A63",
          600: "#3E6350",
          700: "#2F4C3D",
          800: "#213629",
          900: "#152219",
        },
        blush: {
          50: "#FBEFEE",
          100: "#F5D9D6",
          300: "#E6A69E",
          500: "#D07C70",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(43, 36, 32, 0.18)",
        card: "0 4px 20px -6px rgba(43, 36, 32, 0.12)",
        lift: "0 20px 45px -18px rgba(43, 36, 32, 0.28)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fadeIn 0.6s ease-out both",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
