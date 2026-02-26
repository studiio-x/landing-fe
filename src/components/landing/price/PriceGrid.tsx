"use client";

import PriceTag from "@/components/landing/PriceTag";
import { priceData } from "@/constants/landing/price";
import { useTranslations } from "next-intl";

interface PriceGridProps {
  isMonthly: boolean;
}

const PriceGrid = ({ isMonthly }: PriceGridProps) => {
  const t = useTranslations("price.plans");

  return (
    <div className="grid 2xl:grid-cols-4 gap-4 w-full lg:grid-cols-2 grid-cols-[repeat(4,18.7rem)] overflow-x-auto -mr-4 sm:-mr-6 lg:-mr-0 ml-0">
      {priceData.map((plan) => {
        const planData = {
          name: t(`${plan.key}.name`),
          for: t(`${plan.key}.for`),
          yearlyPrice: plan.yearlyPrice,
          monthlyPrice: plan.monthlyPrice,
          subtitle:
            plan.key === "basic" || plan.key === "enterprise"
              ? t(`${plan.key}.subtitle`)
              : {
                  yearly: t(`${plan.key}.subtitle.yearly`),
                  monthly: t(`${plan.key}.subtitle.monthly`),
                },
          buttonText: t(`${plan.key}.buttonText`),
          features: t.raw(`${plan.key}.features`) as string[],
        };

        return <PriceTag key={plan.key} plan={planData} isMonthly={isMonthly} />;
      })}
    </div>
  );
};

export default PriceGrid;
