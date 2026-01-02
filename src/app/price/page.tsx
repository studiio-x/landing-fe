"use client";

import { useState } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import PriceTag from "@/components/landing/PriceTag";
import { priceData } from "@/constants/landing/price";
import { Table, Check, Arrow } from "@/assets/icons";
import OpenBtn from "@/components/landing/OpenBtn";
import Review from "@/components/landing/Review";
import { reviewData } from "@/constants/landing/review";
import FaqBox from "@/components/landing/FaqBox";
import Marquee from "@/components/landing/Marquee";
import SectionWrapper from "@/components/landing/SectionWrapper";
import { FaqData } from "@/constants/landing/faq";
import PricingTable from "@/components/landing/PricingTable";

const FreePlanSection = ({ isMonthly }: { isMonthly: boolean }) => {
  const features = [
    "100 credits / month",
    "5GB cloud storage",
    "Image & video downloads<br/>(with watermark)",
  ];

  return (
    <div className="bg-Grey-900 px-5 sm:px-10 lg:px-16 2xl:px-16 py-9 w-full flex flex-col lg:flex-row justify-between mt-9 mb-5 rounded-lg">
      <div className="flex justify-between gap-6">
        <div className="flex flex-col">
          <div className="font-calSans text-[2rem]">Free</div>
          <div className="Caption_medium text-Grey-300">Free forever</div>
        </div>
        <OpenBtn />
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col mr-[3.25rem] gap-3">
          <div className="flex mt-2 items-end gap-1">
            <div className="font-calSans text-[2.5rem]/[2.4rem]">$0 USD</div>
            <div className="Body_2_medium text-Grey-300">/ mo</div>
          </div>
          <div className="Body_3_regular text-Grey-400">
            {`<Basic plan only available in monthly>`}
          </div>
        </div>
        <div className="bg-Grey-600 w-full h-px lg:w-px lg:h-full max-lg:mt-8 max-lg:mb-6 lg:mr-6" />
        <div className="flex flex-col">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-3 mb-2">
              <Check className="h-6 w-6" />
              <div
                className="w-fit Body_3_regular text-Grey-300"
                dangerouslySetInnerHTML={{ __html: feature }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReviewSection = () => (
  <section className="flex flex-col items-center mb-48">
    <div className="font-calSans text-[1.5rem] sm:text-[2rem] lg:text-[3rem] mb-6">
      See Why People Like Us
    </div>
    <div className="flex gap-4 pl-6 mb-[3.25rem] Subhead_2_semibold sm:Subhead_1_semibold text-Grey-400 items-center">
      Go to Gallery <Arrow className="w-12 h-12" />
    </div>
    <div className="w-screen py-6">
      <Marquee gapPx={16} speedSec={35} direction="left" pauseOnHover>
        {reviewData.map((rv, i) => (
          <Review key={i} {...rv} />
        ))}
      </Marquee>
    </div>
  </section>
);

const PricePage = () => {
  const [isMonthly, setIsMonthly] = useState(false);

  return (
    <div>
      <Header />
      <div
        className="flex w-full flex-col"
        style={{
          backgroundImage: `url('/images/landing/background2.png')`,
          backgroundSize: "100% auto",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8 2xl:px-[6.12rem]">
          <section className="flex flex-col items-center pt-[7.5rem]">
            <div className="text-center font-calSans text-[2rem] sm:text-[3rem] lg:text-[4rem] mb-5">
              Choose a Plan
            </div>
            <div className="flex mb-3 gap-3 items-center">
              {/* 토글 */}
              <div
                className={`Body_1_semibold ${isMonthly ? "text-Grey-500" : "text-Grey-100"}`}
              >
                Yearly
              </div>
              <button
                onClick={() => setIsMonthly(!isMonthly)}
                className="w-[4.5rem] h-9 rounded-full bg-Grey-600 relative"
              >
                <div
                  className={`absolute w-7 h-7 bg-white rounded-full transition-transform duration-300 top-1/2 -translate-y-1/2 left-0 ${
                    isMonthly ? "translate-x-10" : "translate-x-1"
                  }`}
                />
              </button>
              <div
                className={`Body_1_semibold ${isMonthly ? "text-Grey-100" : "text-Grey-500"}`}
              >
                Monthly
              </div>
              {/* 토글 */}
            </div>
            <div className="Caption_medium text-Red-400 mb-16">
              Enjoy the same benefits at just 1% of the original plan’s price!
            </div>
            <div className="grid 2xl:grid-cols-4 gap-4 w-full lg:grid-cols-2 grid-cols-[repeat(4,18.7rem)] overflow-x-auto -mr-4 sm:-mr-6 lg:-mr-0 ml-0">
              {priceData.map((plan) => (
                <PriceTag key={plan.name} plan={plan} isMonthly={isMonthly} />
              ))}
            </div>
            <FreePlanSection isMonthly={isMonthly} />
          </section>
          <div className="Caption_medium text-Grey-500 ml-[1.37rem] mb-40">
            이미지(고해상도 4K 기준): 5~10MB
            <br />
            짧은 영상(15초): 150MB
            <br />→ Basic 10GB = 이미지 약 5,000장 + 짧은 영상 약 500 ~ 1,000개
            저장 가능
          </div>

          <SectionWrapper>
            <PricingTable />
          </SectionWrapper>

          <SectionWrapper>
            <ReviewSection />
          </SectionWrapper>

          <SectionWrapper>
            <section className="flex flex-col 2xl:flex-row mb-44 gap-y-8 sm:gap-y-[3.25rem] gap-x-[8.6305rem]">
              <div className="font-calSans text-[1.5rem] sm:text-[2rem] lg:text-[3rem] whitespace-nowrap">
                StudioX FAQ
              </div>
              <div className="flex flex-col flex-1 items-end">
                {FaqData.map((faq, index) => (
                  <FaqBox
                    key={index}
                    question={`${index + 1}. ${faq.question}`}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </section>
          </SectionWrapper>

          <section className="font-calSans text-[1.5rem] sm:text-[2rem] lg:text-[3rem] 2xl:text-[4rem] flex flex-col gap-7 items-center mb-[17.5rem]">
            Ready to try our AI Studio?
            <OpenBtn />
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricePage;
