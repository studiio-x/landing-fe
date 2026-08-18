"use client";

import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { paymentApi } from "@/apis/paymentApi";
import type { BillingCycle, PlanKey } from "@/types/api/payment.type";

const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || "";

export const usePayment = () => {
  /** 신규 결제 */
  const requestPayment = async (planKey: PlanKey, billingCycle: BillingCycle) => {
    const { data: order } = await paymentApi.createOrder({ planKey, billingCycle });

    const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);
    const payment = tossPayments.payment({ customerKey: order.customerEmail });

    await payment.requestPayment({
      method: "CARD",
      amount: { currency: "KRW", value: order.amount },
      orderId: order.orderId,
      orderName: order.orderName,
      customerEmail: order.customerEmail,
      customerName: order.customerName,
      successUrl: `${window.location.origin}/payment/success`,
      failUrl: `${window.location.origin}/payment/fail`,
    });
  };

  /** 구독 변경 (업그레이드/다운그레이드) - 환불+재결제 */
  const changeSubscription = async (newPlanKey: PlanKey, newBillingCycle: BillingCycle) => {
    const { data: changeOrder } = await paymentApi.changeSubscription({
      newPlanKey,
      newBillingCycle,
    });

    // 추가 결제가 필요한 경우 (업그레이드)
    if (changeOrder.amount > 0) {
      const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);
      const payment = tossPayments.payment({ customerKey: changeOrder.customerEmail });

      await payment.requestPayment({
        method: "CARD",
        amount: { currency: "KRW", value: changeOrder.amount },
        orderId: changeOrder.orderId,
        orderName: changeOrder.orderName,
        customerEmail: changeOrder.customerEmail,
        customerName: changeOrder.customerName,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    }

    return changeOrder;
  };

  /** 구독 취소 */
  const cancelSubscription = async () => {
    const { data } = await paymentApi.cancelSubscription();
    return data;
  };

  return { requestPayment, changeSubscription, cancelSubscription };
};
