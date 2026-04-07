export type PlanKey = "basic" | "standard" | "pro" | "enterprise";
export type BillingCycle = "monthly" | "yearly";

export interface SubscriptionInfo {
  planKey: PlanKey;
  billingCycle: BillingCycle;
  startDate: string;
  endDate: string;
  creditsUsed: number;
  creditsTotal: number;
}

export interface PaymentOrderRequest {
  planKey: PlanKey;
  billingCycle: BillingCycle;
}

export interface PaymentOrderResponse {
  orderId: string;
  orderName: string;
  amount: number;
  customerEmail: string;
  customerName: string;
}

export interface PaymentConfirmRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface PaymentConfirmResponse {
  paymentKey: string;
  orderId: string;
  status: string;
}

export interface SubscriptionChangeRequest {
  newPlanKey: PlanKey;
  newBillingCycle: BillingCycle;
}

export interface SubscriptionChangeResponse {
  refundAmount: number;
  chargeAmount: number;
  orderId: string;
  orderName: string;
  amount: number;
  customerEmail: string;
  customerName: string;
}

export interface SubscriptionCancelResponse {
  refundAmount: number;
}
