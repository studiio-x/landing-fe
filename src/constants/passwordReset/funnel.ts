export const PASSWORD_RESET_FUNNEL_ID = "pr" as const;

export const PASSWORD_RESET_STEPS = {
  EMAIL_INPUT: "EmailInput",
  CODE_VERIFICATION: "CodeVerification",
  PASSWORD_RESET: "PasswordReset",
} as const;
