import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 최적화 설정
  images: {
    formats: ["image/webp", "image/avif"], // 자동 WebP/AVIF 변환
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 압축 활성화
  compress: true,

  // 번들 최적화
  experimental: {
    optimizePackageImports: ["framer-motion", "@tanstack/react-query"],
  },
};

export default nextConfig;
