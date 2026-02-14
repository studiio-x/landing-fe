"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import GlassButton from "@/components/common/GlassButton";
import LoginInput from "@/components/login/LoginInput";
import { EMAIL_REGEX } from "@/constants/signup/funnel";
import type { EmailInputStepProps } from "@/types/passwordReset/funnel.type";

const EmailInputStep = ({ email: initialEmail, onNext }: EmailInputStepProps) => {
  const t = useTranslations("passwordReset.emailInput");
  const [email, setEmail] = useState(initialEmail);

  const isValidEmail = EMAIL_REGEX.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail) return;
    onNext({ email: email.trim() });
  };

  return (
    <div className="my-[2.3125rem]">
      <div className="Heading_3_semibold text-Grey-50 mb-3">{t("title")}</div>
      <span className="Body_2_medium text-Grey-300">{t("description")}</span>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-11">
        <LoginInput
          type="email"
          value={email}
          onChange={setEmail}
          placeholder={t("emailPlaceholder")}
          ariaLabel={t("emailAriaLabel")}
        />

        <GlassButton
          type="submit"
          variant="red"
          size="xl"
          className="Body_2_semibold w-full"
          disabled={!isValidEmail}
        >
          {t("submit")}
        </GlassButton>
      </form>
    </div>
  );
};

export default EmailInputStep;
