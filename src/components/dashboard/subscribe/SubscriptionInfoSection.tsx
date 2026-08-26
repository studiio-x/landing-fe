"use client";

import { Check } from "@/assets/icons";
import GlassButton from "@/components/common/GlassButton";
import type { BillingPlan } from "@/types/api/payment.type";

const PLAN_DISPLAY: Record<
  string,
  { name: string; credits: string; features: string[] }
> = {
  FREE: {
    name: "무료 플랜",
    credits: "100",
    features: [
      "월 100 크레딧",
      "5GB cloud 저장 용량",
      "이미지 & 영상 다운로드 (워터마크 포함)",
    ],
  },
  BASIC: {
    name: "기본 플랜",
    credits: "300",
    features: [
      "월 300 크레딧",
      "10GB cloud 저장 용량",
      "이미지 & 영상 다운로드",
      "StudioX 워터마크 제거",
      "무한한 AI 채팅 편집 (텍스트 전용)",
      "레퍼런스 이미지 첨부: 월 15회",
    ],
  },
  STANDARD: {
    name: "스탠다드 플랜",
    credits: "900",
    features: [
      "월 900 크레딧",
      "50GB cloud 저장 용량",
      "이미지 & 영상 다운로드",
      "StudioX 워터마크 제거",
      "무한한 AI 채팅 편집 (레퍼런스 이미지 포함)",
      "이미지 히스토리 & 버전 관리",
    ],
  },
  PRO: {
    name: "프로 플랜",
    credits: "3,000",
    features: [
      "월 3,000 크레딧",
      "팀 협업 (최대 5명 초대 가능)",
      "200GB cloud 저장 용량",
      "무한한 AI 채팅 편집 (레퍼런스 이미지 포함)",
      "이미지 & 영상 다운로드",
      "이미지 히스토리 & 버전 관리",
      "StudioX 워터마크 제거",
      "우선 채팅 & 이메일 지원",
    ],
  },
};

const PLAN_PRICE: Record<string, number> = {
  FREE: 0,
  BASIC: 8,
  STANDARD: 24,
  PRO: 48,
};

interface SubscriptionInfoSectionProps {
  username: string;
  currentPlan: BillingPlan;
  onChangePlan: () => void;
  onCancelPlan: () => void;
}

const SubscriptionInfoSection = ({
  username,
  currentPlan,
  onChangePlan,
  onCancelPlan,
}: SubscriptionInfoSectionProps) => {
  const planInfo = PLAN_DISPLAY[currentPlan] ?? PLAN_DISPLAY.FREE;
  const price = PLAN_PRICE[currentPlan] ?? 0;
  const isSubscribed = currentPlan !== "FREE";

  return (
    <div className="w-full mb-16">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="Heading_2_semibold text-White">
            {username}님의{" "}
            <span className="text-Red-400">{planInfo.name}</span>
          </h2>
          {isSubscribed && (
            <span className="px-3 py-1 rounded-full bg-Red-500/20 text-Red-400 Caption_medium">
              활성화
            </span>
          )}
        </div>
        {isSubscribed && (
          <div className="flex gap-3">
            <GlassButton variant="red" size="sm" onClick={onChangePlan}>
              플랜 변경
            </GlassButton>
            <GlassButton size="sm" onClick={onCancelPlan}>
              플랜 취소
            </GlassButton>
          </div>
        )}
      </div>

      {isSubscribed && (
        <div className="flex gap-6 mb-8">
          <div className="flex-1 bg-Grey-800 rounded-lg p-6">
            <h3 className="Subhead_1_semibold text-White mb-4">사용량 상세</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span className="Body_2_medium text-Grey-300">남은 크레딧 :</span>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex justify-between w-48">
                    <span className="Body_3_regular text-Grey-400">포함된 크레딧</span>
                    <span className="Body_3_regular text-Grey-300">
                      0000 크레딧
                    </span>
                  </div>
                  <div className="flex justify-between w-48">
                    <span className="Body_3_regular text-Grey-400">추가 구매/지급 크레딧</span>
                    <span className="Body_3_regular text-Grey-300">
                      00 크레딧
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="Body_2_medium text-Grey-300">
                  크레딧 초기화 예정일
                </span>
                <span className="Body_2_medium text-Grey-300">
                  202n년 n월 n일
                </span>
              </div>
            </div>
            <div className="mt-5">
              <GlassButton fullWidth size="lg" className="w-full">
                크레딧 추가 구매
              </GlassButton>
            </div>
          </div>

          <div className="flex-1 bg-Grey-800 rounded-lg p-6">
            <h3 className="Subhead_1_semibold text-White mb-4">결제 & 지불</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span className="Body_2_medium text-Grey-300">가격</span>
                <span className="Body_2_medium text-Grey-300">
                  ${price} / 월
                </span>
              </div>
              <div className="flex justify-between">
                <span className="Body_2_medium text-Grey-300">결제일</span>
                <span className="Body_2_medium text-Grey-300">
                  202n년 n월 n일
                </span>
              </div>
              <div className="flex justify-between">
                <span className="Body_2_medium text-Grey-300">다음 결제일</span>
                <span className="Body_2_medium text-Grey-300">
                  202n년 n월 n일
                </span>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <GlassButton fullWidth size="lg" className="flex-1">
                결제 정보 수정
              </GlassButton>
              <GlassButton fullWidth size="lg" className="flex-1">
                청구서 보기
              </GlassButton>
            </div>
          </div>
        </div>
      )}

      {isSubscribed && (
        <div className="border border-dashed border-Grey-600 rounded-lg p-6">
          <h3 className="Subhead_1_semibold text-Red-400 mb-1">
            {planInfo.name} 기능
          </h3>
          <p className="Caption_medium text-Grey-400 mb-4">
            전문 크리에이터를 위한 요금제
          </p>
          <div className="grid grid-cols-2 gap-2">
            {planInfo.features.map((feature, index) => (
              <div key={index} className="flex gap-3 items-start">
                <Check className="h-5 w-5 shrink-0 text-Red-400" />
                <span className="Body_3_regular text-Grey-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionInfoSection;
