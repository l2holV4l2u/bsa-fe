import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2C6E49", // Deep Green
        secondary: "#C06E52", // Warm Terracotta
        background: "#f7f7f7", // Gray
        border: "#efeded", // Some shade of gray idk
        text: "#43281C", // Deep Brown
        accent: "#C06E52", // Warm Terracotta
        hover: "#245836", // Darker Green for hover
        error: "#D94A4A", // Red for error
        success: "#28a745", // Green for success
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
