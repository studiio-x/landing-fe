import localFont from "next/font/local";
import { Cal_Sans } from "next/font/google";

export const pretendard = localFont({
  src: [
    {
      path: "./fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    { path: "./fonts/Pretendard-Medium.woff2", weight: "500", style: "normal" },
    {
      path: "./fonts/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    { path: "./fonts/Pretendard-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-pretendard",
  display: "swap",
  preload: true,
});

export const calSans = Cal_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-calSans",
  display: "swap",
  adjustFontFallback: false,
});
