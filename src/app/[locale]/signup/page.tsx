"use client";

import { useFunnel } from "@use-funnel/browser";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/common/paths";
import { SIGNUP_FUNNEL_ID } from "@/constants/signup/funnel";

import EmailInputStep from "@/components/signup/EmailInputStep";
import EmailSentStep from "@/components/signup/EmailSentStep";
import VerificationCompleteStep from "@/components/signup/VerificationCompleteStep";
import PasswordSetupStep from "@/components/signup/PasswordSetupStep";

import type { SignupFunnelSteps } from "@/types/signup/funnel.type";

const SignUp = () => {
  const router = useRouter();

  const funnel = useFunnel<SignupFunnelSteps>({
    id: SIGNUP_FUNNEL_ID,
    initial: {
      step: "EmailInput",
      context: { email: "", agreedToTerms: false },
    },
  });

  return (
    <funnel.Render
      EmailInput={({ context, history }) => (
        <EmailInputStep
          email={context.email ?? ""}
          agreedToTerms={context.agreedToTerms ?? false}
          onNext={({ email, agreedToTerms }) => {
            history.push("EmailSent", { email, agreedToTerms });
          }}
        />
      )}
      EmailSent={({ context, history }) => (
        <EmailSentStep
          email={context.email}
          onNext={() => {
            history.push("VerificationComplete", {
              ...context,
              emailVerified: true,
            });
          }}
        />
      )}
      VerificationComplete={({ context, history }) => (
        <VerificationCompleteStep
          email={context.email}
          onNext={() => {
            history.push("PasswordSetup", context);
          }}
        />
      )}
      PasswordSetup={({ context }) => (
        <PasswordSetupStep
          email={context.email}
          isLoading={false}
          onSubmit={({ password }) => {
            // TODO: 회원가입 API 연결
            router.push(PATHS.LOGIN);
          }}
        />
      )}
    />
  );
};

export default SignUp;
