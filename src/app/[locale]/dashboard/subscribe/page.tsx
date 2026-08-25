"use client";

import { useState } from "react";
import Header from "@/components/dashboard/Header";
import SideBar from "@/components/dashboard/sidebar/SideBar";
import SubscriptionInfoSection from "@/components/dashboard/subscribe/SubscriptionInfoSection";
import PlanChangeModal from "@/components/dashboard/subscribe/PlanChangeModal";
import PriceToggle from "@/components/landing/price/PriceToggle";
import PriceGrid from "@/components/landing/price/PriceGrid";
import FreePlanSection from "@/components/landing/price/FreePlanSection";
import { useMypage } from "@/hooks/queries/useMypageApi";
import { usePayment } from "@/hooks/usePayment";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/common/paths";
import type { PlanKey, BillingPlan } from "@/types/api/payment.type";
import { useTranslations } from "next-intl";

const PLAN_KEY_TO_BILLING: Record<string, BillingPlan> = {
  basic: "BASIC",
  standard: "STANDARD",
  pro: "PRO",
};

const SubscribePage = () => {
  const [isMonthly, setIsMonthly] = useState(false);
  const [changeToPlan, setChangeToPlan] = useState<BillingPlan | null>(null);
  const t = useTranslations("price");
  const { data: user } = useMypage();
  const { requestBillingAuth, changeSubscription, cancelSubscription } =
    usePayment();
  const router = useRouter();

  // TODO: 백엔드에서 구독 정보 API 나오면 교체
  const currentPlan: BillingPlan = "FREE";

  const handleSelectPlan = async (planKey: PlanKey, _isMonthly: boolean) => {
    if (planKey === "enterprise") {
      window.open(`mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`, "_blank");
      return;
    }

    if (!user) {
      router.push(
        `${PATHS.LOGIN}?callbackUrl=${encodeURIComponent(PATHS.SUBSCRIBE)}`,
      );
      return;
    }

    const billingPlan = PLAN_KEY_TO_BILLING[planKey];
    if (!billingPlan) return;

    if (currentPlan !== "FREE") {
      setChangeToPlan(billingPlan);
      return;
    }

    try {
      await requestBillingAuth(billingPlan, `studiox_${user.userId}`);
    } catch (error) {
      console.error("결제창 호출 실패:", error);
    }
  };

  const handleConfirmChange = async () => {
    if (!changeToPlan) return;
    try {
      await changeSubscription.mutateAsync(changeToPlan);
      setChangeToPlan(null);
    } catch (error) {
      console.error("플랜 변경 실패:", error);
    }
  };

  const handleCancelPlan = async () => {
    if (!confirm("정말 구독을 취소하시겠습니까?")) return;
    try {
      await cancelSubscription.mutateAsync();
    } catch (error) {
      console.error("구독 취소 실패:", error);
    }
  };

  return (
    <div className="w-full min-h-dvh relative flex flex-col">
      <div className="fixed inset-0 bg-[url('/images/dashboard/background.png')] bg-cover bg-center -z-10 pointer-events-none" />
      <Header />

      <div className="flex">
        {/* <SideBar /> */}

        <main className="flex-1 px-12 py-10 overflow-y-auto">
          <div className="max-w-[72rem] mx-auto">
            <h1 className="text-center font-calSans text-[2.5rem] text-White mb-2">
              플랜 관리
            </h1>
            <p className="text-center Body_1_medium text-Grey-400 mb-10">
              원하는 플랜을 선택하세요.
            </p>

            {user && currentPlan !== "FREE" && (
              <SubscriptionInfoSection
                username={user.username}
                currentPlan={currentPlan}
                onChangePlan={() => setChangeToPlan(null)}
                onCancelPlan={handleCancelPlan}
              />
            )}

            <div className="flex flex-col items-center">
              <PriceToggle
                isMonthly={isMonthly}
                onToggle={() => setIsMonthly(!isMonthly)}
                yearlyLabel={t("hero.yearly")}
                monthlyLabel={t("hero.monthly")}
              />
              <PriceGrid
                isMonthly={isMonthly}
                onSelectPlan={handleSelectPlan}
              />
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
            </div>
          </div>
        </main>
      </div>

      {changeToPlan && (
        <PlanChangeModal
          currentPlan={currentPlan}
          targetPlan={changeToPlan}
          onConfirm={handleConfirmChange}
          onClose={() => setChangeToPlan(null)}
          isLoading={changeSubscription.isPending}
        />
      )}
    </div>
  );
};

export default SubscribePage;
