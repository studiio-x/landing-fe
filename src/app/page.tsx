"use client";

import Header from "@/components/Header";
import MainVideo from "@/components/MainVideo";
import dynamic from "next/dynamic";

const Portfolio = dynamic(() => import("@/components/Portfolio"), {
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
    </div>
  );
}
