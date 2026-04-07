export type EmailInputContext = {
  email?: string;
  agreedToTerms?: boolean;
};

export type EmailSentContext = {
  email: string;
  agreedToTerms: true;
};

export type VerificationCompleteContext = {
  email: string;
  agreedToTerms: true;
  emailVerified: true;
};

export type PasswordSetupContext = {
  email: string;
  agreedToTerms: true;
  emailVerified: true;
};

export type SignupFunnelSteps = {
  EmailInput: EmailInputContext;
  EmailSent: EmailSentContext;
  VerificationComplete: VerificationCompleteContext;
  PasswordSetup: PasswordSetupContext;
};

export interface EmailInputStepProps {
  email: string;
  agreedToTerms: boolean;
  onNext: (data: { email: string; agreedToTerms: true }) => void;
}

export interface EmailSentStepProps {
  email: string;
  onNext: () => void;
}

export interface VerificationCompleteStepProps {
  email: string;
  onNext: () => void;
}

export interface PasswordSetupStepProps {
  email: string;
  onSubmit: (data: { password: string }) => void;
  isLoading: boolean;
}
