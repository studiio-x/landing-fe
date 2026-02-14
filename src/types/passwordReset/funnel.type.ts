export type EmailInputContext = {
  email?: string;
};

export type CodeVerificationContext = {
  email: string;
};

export type PasswordResetContext = {
  email: string;
  code: string;
};

export type PasswordResetFunnelSteps = {
  EmailInput: EmailInputContext;
  CodeVerification: CodeVerificationContext;
  PasswordReset: PasswordResetContext;
};

export interface EmailInputStepProps {
  email: string;
  onNext: (data: { email: string }) => void;
}

export interface CodeVerificationStepProps {
  email: string;
  onNext: (data: { code: string }) => void;
  onResend: () => void;
}

export interface PasswordResetStepProps {
  onComplete: (data: { password: string }) => void;
}
