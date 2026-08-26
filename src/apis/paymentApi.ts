import { axiosInstance } from "./axios";
import type {
  BillingPlan,
  BillingKeyCardRequest,
  BillingKeyAuthKeyRequest,
  CreditOption,
} from "@/types/api/payment.type";

export const paymentApi = {
  /** 빌링키 등록 (카드 직접 입력) */
  registerBillingKeyByCard: (plan: BillingPlan, data: BillingKeyCardRequest) =>
    axiosInstance.post("/payment/billingKey/card", data, { params: { plan } }),

  /** 빌링키 등록 (인증키) */
  registerBillingKeyByAuthKey: (plan: BillingPlan, data: BillingKeyAuthKeyRequest) =>
    axiosInstance.post("/payment/billingKey/authKey", data, { params: { plan } }),

  /** 구독 가격 조회 */
  getSubscriptionPrice: (plan: BillingPlan) =>
    axiosInstance.get<number>("/subscription/price", { params: { plan } }),

  /** 구독 변경 */
  changeSubscription: (plan: BillingPlan) =>
    axiosInstance.patch("/subscription", null, { params: { plan } }),

  /** 구독 취소 */
  cancelSubscription: () =>
    axiosInstance.delete("/subscription"),

  /** 크레딧 추가 구매 */
  purchaseCredit: (option: CreditOption, paymentKey: string) =>
    axiosInstance.post("/payment/credit", null, {
      params: { option, paymentKey },
    }),
};
