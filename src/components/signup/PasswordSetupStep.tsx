"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import GlassButton from "@/components/common/GlassButton";
import LoginInput from "@/components/login/LoginInput";
import { PASSWORD_REGEX } from "@/constants/signup/funnel";
import type { PasswordSetupStepProps } from "@/types/signup/funnel.type";

const PasswordSetupStep = ({
  email,
  onSubmit,
  isLoading,
}: PasswordSetupStepProps) => {
  const t = useTranslations("signup.passwordSetup");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const isValidPassword = PASSWORD_REGEX.test(password);
  const isPasswordMatch =
    password === confirmPassword && confirmPassword.length > 0;
  const isSubmitDisabled = !isValidPassword || !isPasswordMatch || isLoading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    onSubmit({ password });
  };

  return (
    <>
      <div className="Heading_2_semibold text-Grey-50 mb-7">{t("title")}</div>
      <p className="Body_2_medium text-Grey-300 mb-4">
        {t("confirmEmail", { email })}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <span className="Body_3_regular text-Grey-400 whitespace-pre-line">
            {t.rich("passwordRequirement", {
              bold: (chunks) => (
                <span className="Body_3_semibold">{chunks}</span>
              ),
            })}
          </span>

          <LoginInput
            placeholder={t("passwordPlaceholder")}
            ariaLabel={t("passwordAriaLabel")}
            watchIcon
            isPasswordOpen={isPasswordVisible}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            value={password}
            onChange={setPassword}
          />

          <LoginInput
            placeholder={t("confirmPasswordPlaceholder")}
            ariaLabel={t("confirmPasswordAriaLabel")}
            watchIcon
            isPasswordOpen={isConfirmVisible}
            onClick={() => setIsConfirmVisible((prev) => !prev)}
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
          {confirmPassword.length > 0 && !isPasswordMatch && (
            <span className="Body_3_regular text-Red-350">
              {t("passwordMismatch")}
            </span>
          )}
        </div>

        <GlassButton
          type="submit"
          variant="red"
          size="xl"
          className="Body_2_semibold mt-8 w-full"
          disabled={isSubmitDisabled}
        >
          {t("submit")}
        </GlassButton>
      </form>
    </>
  );
};

export default PasswordSetupStep;
