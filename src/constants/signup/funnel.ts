export const SIGNUP_FUNNEL_ID = "s" as const;

export const SIGNUP_STEPS = {
  EMAIL_INPUT: "EmailInput",
  EMAIL_SENT: "EmailSent",
  VERIFICATION_COMPLETE: "VerificationComplete",
  PASSWORD_SETUP: "PasswordSetup",
} as const;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
