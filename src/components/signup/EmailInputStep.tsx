"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Checkbox, SelectedCheckbox } from "@/assets/icons";
import GlassButton from "@/components/common/GlassButton";
import AlertModal from "@/components/common/AlertModal";
import { EMAIL_REGEX } from "@/constants/signup/funnel";
import type { EmailInputStepProps } from "@/types/signup/funnel.type";
import LoginInput from "@/components/login/LoginInput";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/common/paths";
import { useSendVerificationEmail } from "@/hooks/queries/useAuthApi";

const EmailInputStep = ({
  email: initialEmail,
  agreedToTerms: initialAgreed,
  onNext,
}: EmailInputStepProps) => {
  const t = useTranslations("signup");
  const locale = useLocale();
  const [isCheckboxClicked, setIsCheckboxClicked] = useState(initialAgreed);
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); 
  const { mutate: sendVerificationEmail, isPending } =
    useSendVerificationEmail();

  const isValidEmail = EMAIL_REGEX.test(email);
  const isSubmitDisabled = !isCheckboxClicked || !isValidEmail || isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    const trimmedEmail = email.trim();
    const callbackUrl = `${window.location.origin}/${locale}/signup?email=${encodeURIComponent(trimmedEmail)}`;

    sendVerificationEmail(
      { email: trimmedEmail, callbackUrl },
      {
        onSuccess: () => {
          onNext({ email: trimmedEmail, agreedToTerms: true });
        },
        onError: () => {
          setIsErrorModalOpen(true);
        },
      },
    );
  };

  return (
    <>
      <div className="Heading_1_semibold text-Grey-50 mb-10">{t("title")}</div>
      <form onSubmit={handleSubmit}>
        <LoginInput
          type="email"
          value={email}
          onChange={setEmail}
          placeholder={t("emailPlaceholder")}
          ariaLabel={t("emailAriaLabel")}
        />

        <label
          className={`flex gap-3 pl-4 pt-4 cursor-pointer ${locale === "ko" ? "items-center" : ""}`}
        >
          <input
            type="checkbox"
            className="sr-only"
            checked={isCheckboxClicked}
            onChange={(e) => setIsCheckboxClicked(e.target.checked)}
          />
          {isCheckboxClicked ? (
            <SelectedCheckbox className="w-6 h-6" />
          ) : (
            <Checkbox className="w-6 h-6" />
          )}
          <span className="Body_3_regular text-Grey-300 text-left whitespace-pre-line">
            {t("termsAgreement")}
          </span>
        </label>

        <GlassButton
          type="submit"
          variant="red"
          size="xl"
          className="Body_2_semibold mt-10 w-full"
          disabled={isSubmitDisabled}
        >
          {isPending ? t("submitting") : t("submit")}
        </GlassButton>
      </form>

      <div className="mt-3 flex gap-2 justify-center">
        <span className="Body_3_regular text-Grey-400">{t("hasAccount")}</span>
        <button
          onClick={() => router.push(PATHS.LOGIN)}
          className="Body_3_semibold text-Grey-200"
        >
          {t("login")}
        </button>
      </div>

      <AlertModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="이메일 전송에 실패했습니다"
        description={<>일시적인 오류로 이메일을 보내지 못했어요.<br />잠시 후 다시 시도하거나,<br />문제가 계속되면 고객센터로 문의해 주세요.</>}
        buttons={[
          { label: "확인", variant: "red", onClick: () => setIsErrorModalOpen(false) },
        ]}
        contained
      />
    </>
  );
};

export default EmailInputStep;
