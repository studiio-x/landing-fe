import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/assets/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        Black: "#0F1114",
        White: "#FFFFFF",
        Red: {
          "300": "#FF8686",
          "350": "#FF7575",
          "400": "#FF5252",
          "500": "#FF3030",
        },
        Grey: {
          "50": "#F1F4F8",
          "100": "#D8DFE9",
          "200": "#A9B4C6",
          "300": "#808A9D",
          "400": "#626B7F",
          "500": "#4B5362",
          "600": "#353B45",
          "700": "#282C34",
          "800": "#1D2025",
          "900": "#16181D",
        },
      },
      fontFamily: {
        pretendard: [
          "var(--font-pretendard)",
          "Pretendard",
          "system-ui",
          "sans-serif",
        ],
        calSans: ["var(--font-calSans)", "system-ui", "sans-serif"],
      },
    },
  },
};

export default config;
