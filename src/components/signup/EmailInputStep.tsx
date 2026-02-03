"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Checkbox, SelectedCheckbox } from "@/assets/icons";
import GlassButton from "@/components/common/GlassButton";
import { EMAIL_REGEX } from "@/constants/signup/funnel";
import type { EmailInputStepProps } from "@/types/signup/funnel.type";

const EmailInputStep = ({
  email: initialEmail,
  agreedToTerms: initialAgreed,
  onNext,
}: EmailInputStepProps) => {
  const t = useTranslations("signup");
  const locale = useLocale();
  const [isCheckboxClicked, setIsCheckboxClicked] = useState(initialAgreed);
  const [email, setEmail] = useState(initialEmail);

  const isValidEmail = EMAIL_REGEX.test(email);
  const isSubmitDisabled = !isCheckboxClicked || !isValidEmail;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    onNext({ email: email.trim(), agreedToTerms: true });
  };

  return (
    <>
      <div className="Heading_1_semibold text-Grey-50 mb-10">{t("title")}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("emailPlaceholder")}
          className="bg-Grey-800 py-3 px-4 mb-4 placeholder:text-Grey-400 text-Grey-100 Body_2_medium w-full rounded-[4px]"
        />
        <button
          type="button"
          className={`flex gap-3 pl-4 cursor-pointer ${locale === "ko" ? "items-center" : ""}`}
          onClick={() => setIsCheckboxClicked((prev) => !prev)}
        >
          {isCheckboxClicked ? (
            <SelectedCheckbox className="w-6 h-6" />
          ) : (
            <Checkbox className="w-6 h-6" />
          )}
          <span className="Body_3_regular text-Grey-300 text-left whitespace-pre-line">
            {t("termsAgreement")}
          </span>
        </button>

        <GlassButton
          type="submit"
          variant="red"
          size="xl"
          className="Body_2_semibold mt-10 w-full"
          disabled={isSubmitDisabled}
        >
          {t("submit")}
        </GlassButton>
      </form>
      <div className="mt-3 flex gap-2 justify-center">
        <span className="Body_3_regular text-Grey-400">{t("hasAccount")}</span>
        <button className="Body_3_semibold text-Grey-200">{t("login")}</button>
      </div>
    </>
  );
};

export default EmailInputStep;
