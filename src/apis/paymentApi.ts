import { axiosInstance } from "./axios";
import type {
  PaymentOrderRequest,
  PaymentOrderResponse,
  PaymentConfirmRequest,
  PaymentConfirmResponse,
  SubscriptionInfo,
  SubscriptionChangeRequest,
  SubscriptionChangeResponse,
  SubscriptionCancelResponse,
} from "@/types/api/payment.type";

export const paymentApi = {
  /** 결제 주문 생성 */
  createOrder: (data: PaymentOrderRequest) =>
    axiosInstance.post<PaymentOrderResponse>("/payments/order", data),

  /** 결제 승인 확인 */
  confirmPayment: (data: PaymentConfirmRequest) =>
    axiosInstance.post<PaymentConfirmResponse>("/payments/confirm", data),

  /** 현재 구독 정보 조회 */
  getSubscription: () =>
    axiosInstance.get<SubscriptionInfo>("/subscription"),

  /** 구독 변경 (업그레이드/다운그레이드) */
  changeSubscription: (data: SubscriptionChangeRequest) =>
    axiosInstance.post<SubscriptionChangeResponse>("/subscription/change", data),

  /** 구독 취소 */
  cancelSubscription: () =>
    axiosInstance.post<SubscriptionCancelResponse>("/subscription/cancel"),
};
