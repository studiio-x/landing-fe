"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { paymentApi } from "@/apis/paymentApi";
import { PATHS } from "@/constants/common/paths";
import type { BillingPlan } from "@/types/api/payment.type";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const authKey = searchParams.get("authKey");
    const customerKey = searchParams.get("customerKey");
    const plan = searchParams.get("plan") as BillingPlan | null;

    if (!authKey || !customerKey || !plan) {
      setStatus("error");
      setErrorMessage("결제 정보가 올바르지 않습니다.");
      return;
    }

    paymentApi
      .registerBillingKeyByAuthKey(plan, { authKey, customerKey })
      .then(() => setStatus("success"))
      .catch((err) => {
        setStatus("error");
        setErrorMessage(
          err?.response?.data?.reason ?? "빌링키 등록에 실패했습니다.",
        );
      });
  }, [searchParams]);

  if (status === "loading") {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="text-Grey-300 Body_1_semibold">결제 처리 중...</div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
        <div className="Heading_2_semibold text-Red-400">결제에 실패했습니다</div>
        {errorMessage && (
          <div className="Body_2_regular text-Grey-400">{errorMessage}</div>
        )}
        <a href={PATHS.SUBSCRIBE} className="Body_2_medium text-Grey-300 underline">
          다시 시도하기
        </a>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <div className="Heading_2_semibold">결제가 완료되었습니다</div>
      <a href={PATHS.DASHBOARD} className="Body_2_medium text-Grey-300 underline">
        대시보드로 이동
      </a>
    </div>
  );
};

export default PaymentSuccessPage;
