"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { paymentApi } from "@/apis/paymentApi";
import { PATHS } from "@/constants/common/paths";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");

    if (!paymentKey || !orderId || !amount) {
      setStatus("error");
      return;
    }

    paymentApi
      .confirmPayment({
        paymentKey,
        orderId,
        amount: Number(amount),
      })
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [searchParams]);

  if (status === "loading") {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="text-Grey-300 Body_1_semibold">결제 확인 중...</div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
        <div className="Heading_2_semibold text-Red-400">결제 확인에 실패했습니다</div>
        <a href={PATHS.DASHBOARD} className="Body_2_medium text-Grey-300 underline">
          대시보드로 이동
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
