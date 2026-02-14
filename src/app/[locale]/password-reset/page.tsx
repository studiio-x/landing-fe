"use client";

import { useState } from "react";
import { useFunnel } from "@use-funnel/browser";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { BackArrow } from "@/assets/icons";
import Header from "@/components/dashboard/Header";
import AlertModal from "@/components/common/AlertModal";
import { PATHS } from "@/constants/common/paths";
import {
  PASSWORD_RESET_FUNNEL_ID,
  PASSWORD_RESET_STEPS,
} from "@/constants/passwordReset/funnel";

import EmailInputStep from "@/components/passwordReset/EmailInputStep";
import CodeVerificationStep from "@/components/passwordReset/CodeVerificationStep";
import PasswordResetStep from "@/components/passwordReset/PasswordResetStep";

import type { PasswordResetFunnelSteps } from "@/types/passwordReset/funnel.type";

const PasswordResetPage = () => {
  const router = useRouter();
  const t = useTranslations("passwordReset");
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const funnel = useFunnel<PasswordResetFunnelSteps>({
    id: PASSWORD_RESET_FUNNEL_ID,
    initial: {
      step: PASSWORD_RESET_STEPS.EMAIL_INPUT,
      context: { email: "" },
    },
  });

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 pb-[var(--header-height)]">
        <div className="h-fit max-w-[28.75rem] w-full rounded-lg bg-gradient-to-b from-Red-500/35 to-Red-500/15 p-[1.5px] shadow-[0_0_8px_0_rgba(255,82,82,0.10),0_0_20px_0_rgba(8,8,8,0.12)]">
          <div className="pt-10 pb-12 px-[3.15625rem] rounded-[calc(0.5rem-1.5px)] bg-Grey-900 relative">
            <button
              onClick={() =>
                funnel.step === PASSWORD_RESET_STEPS.EMAIL_INPUT
                  ? router.push(PATHS.LOGIN)
                  : funnel.history.back()
              }
              className="absolute top-5 left-5"
              aria-label={t("backLabel")}
            >
              <BackArrow className="w-6 h-6 text-Grey-300" />
            </button>

            <funnel.Render
              EmailInput={({ context, history }) => (
                <EmailInputStep
                  email={context.email ?? ""}
                  onNext={({ email }) => {
                    history.push(PASSWORD_RESET_STEPS.CODE_VERIFICATION, {
                      email,
                    });
                  }}
                />
              )}
              CodeVerification={({ context, history }) => (
                <CodeVerificationStep
                  email={context.email}
                  onNext={({ code }) => {
                    history.push(PASSWORD_RESET_STEPS.PASSWORD_RESET, {
                      ...context,
                      code,
                    });
                  }}
                  onResend={() => {
                    // TODO: 인증코드 재전송 API 호출
                  }}
                />
              )}
              PasswordReset={({ context }) => (
                <PasswordResetStep
                  onComplete={() => {
                    setIsCompleteModalOpen(true);
                  }}
                />
              )}
            />

            <AlertModal
              isOpen={isCompleteModalOpen}
              onClose={() => {
                setIsCompleteModalOpen(false);
                router.push(PATHS.LOGIN);
              }}
              title={t("complete.title")}
              description={t("complete.description")}
              buttons={[
                {
                  label: t("complete.confirm"),
                  variant: "red",
                  onClick: () => router.push(PATHS.LOGIN),
                },
              ]}
              contained
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PasswordResetPage;
