"use client";

import { useEffect } from "react";
import { useFunnel } from "@use-funnel/browser";
import { useRouter, useSearchParams } from "next/navigation";
import { PATHS } from "@/constants/common/paths";
import { SIGNUP_FUNNEL_ID } from "@/constants/signup/funnel";

import EmailInputStep from "@/components/signup/EmailInputStep";
import EmailSentStep from "@/components/signup/EmailSentStep";
import VerificationCompleteStep from "@/components/signup/VerificationCompleteStep";
import PasswordSetupStep from "@/components/signup/PasswordSetupStep";

import type { SignupFunnelSteps } from "@/types/signup/funnel.type";

const SignUp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const funnel = useFunnel<SignupFunnelSteps>({
    id: SIGNUP_FUNNEL_ID,
    initial: {
      step: "EmailInput",
      context: { email: "", agreedToTerms: false },
    },
  });

  useEffect(() => {
    const email = searchParams.get("email");

    if (email) {
      const channel = new BroadcastChannel("signup-verification");
      channel.postMessage({ type: "email-verified" });
      channel.close();

      funnel.history.replace("VerificationComplete", {
        email,
        agreedToTerms: true,
        emailVerified: true,
      });
    }
  }, [searchParams]);

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
