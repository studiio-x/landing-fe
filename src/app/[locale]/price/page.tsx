"use client";

import { useState } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SectionWrapper from "@/components/landing/SectionWrapper";
import PricingTable from "@/components/landing/PricingTable";
import FreePlanSection from "@/components/landing/price/FreePlanSection";
import PriceToggle from "@/components/landing/price/PriceToggle";
import ReviewSection from "@/components/landing/price/ReviewSection";
import FaqSection from "@/components/landing/price/FaqSection";
import PriceGrid from "@/components/landing/price/PriceGrid";
import CtaSection from "@/components/landing/price/CtaSection";
import { useTranslations } from "next-intl";

const PricePage = () => {
  const [isMonthly, setIsMonthly] = useState(false);
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
          <section className="flex flex-col items-center pt-[7.5rem]">
            <div className="text-center font-calSans text-[2rem] sm:text-[3rem] lg:text-[4rem] mb-5">
              {t("hero.title")}
            </div>
            <PriceToggle
              isMonthly={isMonthly}
              onToggle={() => setIsMonthly(!isMonthly)}
              yearlyLabel={t("hero.yearly")}
              monthlyLabel={t("hero.monthly")}
            />
            <div className="Caption_medium text-Red-400 mb-16">
              {t("hero.discount")}
            </div>
            <PriceGrid isMonthly={isMonthly} />
            <FreePlanSection
              isMonthly={isMonthly}
              messages={{
                name: t("freePlan.name"),
                description: t("freePlan.description"),
                price: t("freePlan.price"),
                perMonth: t("freePlan.perMonth"),
                onlyMonthly: t("freePlan.onlyMonthly"),
                credits: t("freePlan.credits"),
                storage: t("freePlan.storage"),
                downloads: t("freePlan.downloads"),
              }}
            />
          </section>
          <div
            className="Caption_medium text-Grey-500 ml-[1.37rem] mb-40"
            dangerouslySetInnerHTML={{ __html: t("storageInfo") }}
          />

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
