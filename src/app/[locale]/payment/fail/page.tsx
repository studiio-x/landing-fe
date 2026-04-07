"use client";

import { useSearchParams } from "next/navigation";
import { PATHS } from "@/constants/common/paths";

const PaymentFailPage = () => {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("code");
  const errorMessage = searchParams.get("message");

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <div className="Heading_2_semibold text-Red-400">결제에 실패했습니다</div>
      {errorMessage && (
        <div className="Body_2_regular text-Grey-400">{errorMessage}</div>
      )}
      {errorCode && (
        <div className="Caption_medium text-Grey-500">오류 코드: {errorCode}</div>
      )}
      <a href={PATHS.PRICE} className="Body_2_medium text-Grey-300 underline">
        플랜 페이지로 돌아가기
      </a>
    </div>
  );
};

export default PaymentFailPage;
