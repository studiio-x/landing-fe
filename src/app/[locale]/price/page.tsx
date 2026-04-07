"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SectionWrapper from "@/components/landing/SectionWrapper";
import PricingTable from "@/components/landing/PricingTable";
import ReviewSection from "@/components/landing/price/ReviewSection";
import FaqSection from "@/components/landing/price/FaqSection";
import CtaSection from "@/components/landing/price/CtaSection";
import PriceHeroSection from "@/components/landing/price/PriceHeroSection";
import { useTranslations } from "next-intl";

const PricePage = () => {
  const t = useTranslations("price");

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
          <PriceHeroSection />
          {/* <div
            className="Caption_medium text-Grey-500 ml-[1.37rem] mb-40"
            dangerouslySetInnerHTML={{ __html: t("storageInfo") }}
          /> */}
          <div className="h-[10rem]"></div>

          <SectionWrapper>
            <PricingTable />
          </SectionWrapper>

          <SectionWrapper>
            <ReviewSection
              title={t("review.title")}
              galleryLink={t("review.galleryLink")}
            />
          </SectionWrapper>

          <SectionWrapper>
            <FaqSection title={t("faq.title")} />
          </SectionWrapper>

          <CtaSection title={t("cta.title")} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricePage;
