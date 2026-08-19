export type EmailInputContext = {
  email?: string;
};

export type CodeVerificationContext = {
  email: string;
  sentAt: number;
};

export type PasswordResetContext = {
  email: string;
  sentAt: number;
  code: string;
};

export type PasswordResetFunnelSteps = {
  EmailInput: EmailInputContext;
  CodeVerification: CodeVerificationContext;
  PasswordReset: PasswordResetContext;
};

export interface EmailInputStepProps {
  email: string;
  isLoading?: boolean;
  onNext: (data: { email: string }) => void;
}

export interface CodeVerificationStepProps {
  email: string;
  sentAt: number;
  isLoading?: boolean;
  isResending?: boolean;
  isError?: boolean;
  onNext: (data: { code: string }) => void;
  onResend: () => Promise<void>;
}

export interface PasswordResetStepProps {
  isLoading?: boolean;
  onComplete: (data: { password: string }) => void;
}
