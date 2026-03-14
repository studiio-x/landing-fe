"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import GlassButton from "@/components/common/GlassButton";
import LoginInput from "@/components/login/LoginInput";
import { PASSWORD_REGEX } from "@/constants/signup/funnel";
import type { PasswordResetStepProps } from "@/types/passwordReset/funnel.type";

const PasswordResetStep = ({ isLoading, onComplete }: PasswordResetStepProps) => {
  const t = useTranslations("passwordReset.passwordSetup");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const isValidPassword = PASSWORD_REGEX.test(password);
  const isPasswordMatch =
    password === confirmPassword && confirmPassword.length > 0;
  const isSubmitDisabled = !isValidPassword || !isPasswordMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    onComplete({ password });
  };

  return (
    <div className="my-[1.5625rem]">
      <div className="Heading_3_semibold text-Grey-50 mb-3">{t("title")}</div>
      <p className="Body_2_medium text-Grey-300 mb-7">{t("description")}</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <span className="Body_3_regular text-Grey-400 whitespace-pre-line">
            {t.rich("passwordRequirement", {
              bold: (chunks) => (
                <span className="Body_3_semibold text-Grey-300">{chunks}</span>
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
          disabled={isSubmitDisabled || isLoading}
        >
          {t("submit")}
        </GlassButton>
      </form>
    </div>
  );
};

export default PasswordResetStep;
