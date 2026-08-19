"use client";

import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useMutation, useQuery } from "@tanstack/react-query";
import { paymentApi } from "@/apis/paymentApi";
import type {
  BillingPlan,
  BillingKeyCardRequest,
  BillingKeyAuthKeyRequest,
} from "@/types/api/payment.type";

const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || "";

export const usePayment = () => {
  /** Toss 결제창으로 빌링키 인증 요청 (결제창형) */
  const requestBillingAuth = async (plan: BillingPlan, customerKey: string) => {
    const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);
    const payment = tossPayments.payment({ customerKey });

    await payment.requestBillingAuth({
      method: "CARD",
      successUrl: `${window.location.origin}/payment/success?plan=${plan}`,
      failUrl: `${window.location.origin}/payment/fail`,
    });
  };

  /** 빌링키 등록 (인증키 - success 페이지에서 호출) */
  const registerBillingKeyByAuthKey = useMutation({
    mutationFn: ({ plan, data }: { plan: BillingPlan; data: BillingKeyAuthKeyRequest }) =>
      paymentApi.registerBillingKeyByAuthKey(plan, data),
  });

  /** 빌링키 등록 (카드 직접 입력) */
  const registerBillingKeyByCard = useMutation({
    mutationFn: ({ plan, data }: { plan: BillingPlan; data: BillingKeyCardRequest }) =>
      paymentApi.registerBillingKeyByCard(plan, data),
  });

  /** 구독 변경 */
  const changeSubscription = useMutation({
    mutationFn: (plan: BillingPlan) => paymentApi.changeSubscription(plan),
  });

  /** 구독 취소 */
  const cancelSubscription = useMutation({
    mutationFn: () => paymentApi.cancelSubscription(),
  });

  return {
    requestBillingAuth,
    registerBillingKeyByAuthKey,
    registerBillingKeyByCard,
    changeSubscription,
    cancelSubscription,
  };
};

/** 구독 가격 조회 */
export const useSubscriptionPrice = (plan: BillingPlan) =>
  useQuery({
    queryKey: ["subscriptionPrice", plan],
    queryFn: () => paymentApi.getSubscriptionPrice(plan),
  });
