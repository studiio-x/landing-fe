"use client";

import { useEffect, useMemo } from "react";
import { useFunnel } from "@use-funnel/browser";
import { useRouter, useSearchParams } from "next/navigation";

import { PATHS } from "@/constants/common/paths";
import {
  CHANNEL_NAME,
  MESSAGE_TYPE,
  SIGNUP_FUNNEL_ID,
  SIGNUP_STEPS,
} from "@/constants/signup/funnel";
import { useSignup } from "@/hooks/queries/useAuthApi";

import EmailInputStep from "@/components/signup/EmailInputStep";
import EmailSentStep from "@/components/signup/EmailSentStep";
import VerificationCompleteStep from "@/components/signup/VerificationCompleteStep";
import PasswordSetupStep from "@/components/signup/PasswordSetupStep";

import type { SignupFunnelSteps } from "@/types/signup/funnel.type";

const SignUp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: signup, isPending: isSignupPending } = useSignup();

  const emailFromQuery = searchParams.get("email");
  const hasEmailQuery = !!emailFromQuery;

  const initial = useMemo(() => {
    if (!hasEmailQuery) {
      return {
        step: SIGNUP_STEPS.EMAIL_INPUT,
        context: { email: "", agreedToTerms: false },
      };
    }

    return {
      step: SIGNUP_STEPS.VERIFICATION_COMPLETE,
      context: {
        email: emailFromQuery ?? "",
        agreedToTerms: true as const,
        emailVerified: true as const,
      },
    };
  }, [hasEmailQuery, emailFromQuery]);

  const funnel = useFunnel<SignupFunnelSteps>({
    id: SIGNUP_FUNNEL_ID,
    initial,
  });

  useEffect(() => {
    if (!emailFromQuery) return;

    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.postMessage({ type: MESSAGE_TYPE, email: emailFromQuery });
    channel.close();
  }, [emailFromQuery]);

  return (
    <funnel.Render
      EmailInput={({ context, history }) => (
        <EmailInputStep
          email={context.email ?? ""}
          agreedToTerms={context.agreedToTerms ?? false}
          onNext={({ email, agreedToTerms }) => {
            history.push(SIGNUP_STEPS.EMAIL_SENT, { email, agreedToTerms });
          }}
        />
      )}
      EmailSent={({ context, history }) => (
        <EmailSentStep
          email={context.email}
          onNext={() => {
            history.push(SIGNUP_STEPS.VERIFICATION_COMPLETE, {
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
            history.push(SIGNUP_STEPS.PASSWORD_SETUP, context);
          }}
        />
      )}
      PasswordSetup={({ context }) => (
        <PasswordSetupStep
          email={context.email}
          isLoading={isSignupPending}
          onSubmit={({ password }) => {
            signup(
              { email: context.email, password },
              {
                onSuccess: () => {
                  router.push(PATHS.LOGIN);
                },
              },
            );
          }}
        />
      )}
    />
  );
};

export default SignUp;
