import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
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

      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "marquee-left": "marquee-left 30s linear infinite",
        "marquee-right": "marquee-right 30s linear infinite",
      },
    },
  },
};

export default config;
