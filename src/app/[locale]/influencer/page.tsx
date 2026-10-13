"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import InfluencerCard from "@/components/landing/InfluencerCard";
import { influencers } from "@/constants/landing/influencers";

export default function InfluencerPage() {
  return (
    <div>
      <Header />

      <div className="px-4 sm:px-6 lg:px-8 2xl:px-[6.12rem]">
        <section className="flex flex-col items-center pt-16 pb-12">
          <div className="Body_2_medium rounded-full bg-[rgba(255,255,255,0.03)] px-5 py-2 mb-4">
            AI Influencer
          </div>
          <h1 className="font-calSans text-[1.75rem] lg:text-[3rem] mb-3 text-center">
            Meet Our AI Influencers
          </h1>
          <p className="Body_2_medium lg:Subhead_1_medium text-Grey-400 text-center max-w-160">
            StudioX가 만든 AI 인플루언서들을 만나보세요.
            <br />
            브랜드에 맞는 완벽한 AI 모델을 찾아드립니다.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-24">
          {influencers.map((influencer) => (
            <InfluencerCard key={influencer.id} influencer={influencer} />
          ))}
        </section>
      </div>

      <Footer />
    </div>
  );
}
