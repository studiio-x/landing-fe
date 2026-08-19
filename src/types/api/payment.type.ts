/** UI에서 사용하는 플랜 키 (소문자) */
export type PlanKey = "basic" | "standard" | "pro" | "enterprise";

/** 결제 API에서 사용하는 플랜 (대문자) */
export type BillingPlan = "FREE" | "BASIC" | "STANDARD" | "PRO";

export interface BillingKeyCardRequest {
  cardNumber: string;
  cardExpirationMonth: string;
  cardExpirationYear: string;
  cardPassword: string;
  customerIdentityNumber: string;
  customerKey: string;
  customerEmail?: string;
  customerName?: string;
  cavv?: { masking: string; plain: string };
  eci?: { masking: string; plain: string };
  xid?: { masking: string; plain: string };
}

export interface BillingKeyAuthKeyRequest {
  authKey: string;
  customerKey: string;
}
