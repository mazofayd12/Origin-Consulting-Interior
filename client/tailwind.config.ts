import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#B79A5B",
          goldLight: "#D4AF37",
          goldDark: "#8C733E",
          charcoal: "#1A1A1A",
          charcoalDark: "#121212",
          grayLight: "#F5F5F5",
          grayBorder: "#2A2A2A",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        cairo: ["Cairo", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 20px 60px -15px rgba(183, 154, 91, 0.2)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "luxury-lg": "0 30px 80px -20px rgba(183, 154, 91, 0.25)",
      },
      animation: {
        shimmer: "shimmer 4s linear infinite",
        "float-slow": "float 8s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "200% center" },
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
