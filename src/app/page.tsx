"use client";

import Header from "@/components/landing/Header";
import MainVideo from "@/components/landing/MainVideo";
import dynamic from "next/dynamic";
import Footer from "@/components/landing/Footer";

const Portfolio = dynamic(() => import("@/components/landing/Portfolio"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Header />
      <MainVideo />
      <div id="gallery">
        <Portfolio />
      </div>
      <Footer />
    </div>
  );
}
