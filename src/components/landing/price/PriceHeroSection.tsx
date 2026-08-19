"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import PriceToggle from "./PriceToggle";
import PriceGrid from "./PriceGrid";
import FreePlanSection from "./FreePlanSection";
import { usePayment } from "@/hooks/usePayment";
import { useMypage } from "@/hooks/queries/useMypageApi";
import type { PlanKey, BillingPlan } from "@/types/api/payment.type";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/common/paths";

const PLAN_KEY_TO_BILLING: Record<string, BillingPlan> = {
  basic: "BASIC",
  standard: "STANDARD",
  pro: "PRO",
};

const PriceHeroSection = () => {
  const [isMonthly, setIsMonthly] = useState(false);
  const t = useTranslations("price");
  const { requestBillingAuth } = usePayment();
  const { data: user } = useMypage();
  const router = useRouter();

  const handleSelectPlan = async (planKey: PlanKey, _isMonthly: boolean) => {
    if (planKey === "enterprise") {
      window.open(`mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`, "_blank");
      return;
    }

    if (!user) {
      router.push(`${PATHS.LOGIN}?callbackUrl=${encodeURIComponent(PATHS.SUBSCRIBE)}`);
      return;
    }

    const billingPlan = PLAN_KEY_TO_BILLING[planKey];
    if (!billingPlan) return;

    try {
      await requestBillingAuth(billingPlan, `studiox_${user.userId}`);
    } catch (error) {
      console.error("결제창 호출 실패:", error);
    }
  };

  return (
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
      <PriceGrid isMonthly={isMonthly} onSelectPlan={handleSelectPlan} />
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
  );
};

export default PriceHeroSection;
