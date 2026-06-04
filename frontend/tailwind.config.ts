import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#071013",
        panel: "#0d1b20",
        panel2: "#10262c",
        border: "#1f3a42",
        text: "#e7f6f4",
        muted: "#8fb2ad",
        cyan: "#38d6c5",
        amber: "#f4b942",
        red: "#ff5c70",
        green: "#55d187"
      },
      boxShadow: {
        glow: "0 0 24px rgba(56, 214, 197, 0.18)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
