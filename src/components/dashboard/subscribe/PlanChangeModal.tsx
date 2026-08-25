"use client";

import { Close } from "@/assets/icons";
import GlassButton from "@/components/common/GlassButton";
import type { BillingPlan } from "@/types/api/payment.type";

const PLAN_NAME: Record<string, string> = {
  FREE: "무료 플랜",
  BASIC: "기본 플랜",
  STANDARD: "스탠다드 플랜",
  PRO: "프로 플랜",
};

const PLAN_PRICE: Record<string, number> = {
  FREE: 0,
  BASIC: 8,
  STANDARD: 24,
  PRO: 48,
};

interface PlanChangeModalProps {
  currentPlan: BillingPlan;
  targetPlan: BillingPlan;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

const PlanChangeModal = ({
  currentPlan,
  targetPlan,
  onConfirm,
  onClose,
  isLoading,
}: PlanChangeModalProps) => {
  const currentPrice = PLAN_PRICE[currentPlan] ?? 0;
  const targetPrice = PLAN_PRICE[targetPlan] ?? 0;
  const isUpgrade = targetPrice > currentPrice;
  const priceDiff = targetPrice - currentPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-[32rem] bg-Grey-800 rounded-lg p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-Grey-400 hover:text-White"
        >
          <Close className="w-5 h-5" />
        </button>

        <h2 className="Heading_2_semibold text-White mb-3">플랜 변경</h2>
        <p className="Body_2_medium text-Grey-400 mb-1">
          결제 주기 종료 시,
        </p>
        <p className="Body_2_medium text-Grey-400 mb-6">
          현재 구독이 자동으로 갱신되며 새로운 플랜으로 적용됩니다.
        </p>

        {!isUpgrade && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-Grey-400 Body_3_regular">
              스탠다드 플랜으로 전환할 경우 팀 협업 기능이 제한됩니다.
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 mb-6">
          <span className="Body_3_medium text-Grey-300">ⓘ 변경 내용</span>
        </div>

        <div className="bg-Grey-700 rounded-lg p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col items-center">
              <span className="Caption_medium text-Grey-400">현재 플랜</span>
              <span className="Body_2_semibold text-White">
                ({PLAN_NAME[currentPlan]})
              </span>
              <span className="Caption_medium text-Grey-400">
                기본요금: ${currentPrice} / 월
              </span>
            </div>
            <span className="text-Grey-400 text-xl">→</span>
            <div className="flex flex-col items-center">
              <span className="Caption_medium text-Red-400">변경할 플랜</span>
              <span className="Body_2_semibold text-Red-400">
                ({PLAN_NAME[targetPlan]})
              </span>
              <span className="Caption_medium text-Grey-400">
                기본요금: ${targetPrice} / 월
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <div className="flex justify-between">
            <span className="Body_2_medium text-Grey-300">현재 플랜</span>
            <span className="Body_2_medium text-Grey-300">${currentPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="Body_2_medium text-Grey-300">사용 금액</span>
            <span className="Body_2_medium text-Grey-300">
              -${currentPrice}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="Body_2_semibold text-Red-400">변경할 플랜</span>
            <span className="Body_2_semibold text-Red-400">
              -${targetPrice}
            </span>
          </div>
          <div className="h-px bg-Grey-600 my-2" />
          <div className="flex justify-between">
            <span className="Body_1_semibold text-White">
              {isUpgrade ? "추가 결제 금액" : "환불 금액"}
            </span>
            <span className="Body_1_semibold text-White">
              ${Math.abs(priceDiff)}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <GlassButton fullWidth size="lg" className="flex-1" onClick={onClose}>
            뒤로가기
          </GlassButton>
          <GlassButton
            fullWidth
            variant="red"
            size="lg"
            className="flex-1"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "처리중..." : "변경 확정"}
          </GlassButton>
        </div>
      </div>
    </div>
  );
};

export default PlanChangeModal;
