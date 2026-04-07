"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import GlassButton from "@/components/common/GlassButton";
import OtpInput from "@/components/passwordReset/OtpInput";
import type { CodeVerificationStepProps } from "@/types/passwordReset/funnel.type";

const CODE_LENGTH = 6;
const TIMER_SECONDS = 300;

const CodeVerificationStep = ({
  email,
  sentAt,
  isLoading,
  isResending,
  isError,
  onNext,
  onResend,
}: CodeVerificationStepProps) => {
  const t = useTranslations("passwordReset.codeVerification");
  const [code, setCode] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    Math.max(0, TIMER_SECONDS - Math.floor((Date.now() - sentAt) / 1000)),
  );

  const isExpired = remainingSeconds <= 0;
  const isValidCode = /^\d{6}$/.test(code);

  useEffect(() => {
    setRemainingSeconds(
      Math.max(0, TIMER_SECONDS - Math.floor((Date.now() - sentAt) / 1000)),
    );
  }, [sentAt]);

  useEffect(() => {
    if (isExpired) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isExpired]);

  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const seconds = String(remainingSeconds % 60).padStart(2, "0");

  const handleChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(digitsOnly);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidCode || isExpired) return;
    onNext({ code });
  };

  const handleResend = useCallback(async () => {
    await onResend();
    setCode("");
    setRemainingSeconds(TIMER_SECONDS);
  }, [onResend]);

  return (
    <div className="my-[0.9375rem]">
      <div className="Heading_3_semibold text-Grey-50 mb-3">{t("title")}</div>
      <p className="Body_2_medium text-Grey-300 mb-11">
        {t("description", { email })}
      </p>
      <form onSubmit={handleSubmit}>
        <OtpInput
          length={CODE_LENGTH}
          value={code}
          onChange={handleChange}
          ariaLabel={t("codeAriaLabel")}
        />

        {isError && (
          <span className="Body_3_regular text-Red-350 mt-2 block">
            {t("invalidCode")}
          </span>
        )}

        <div className="mt-9 text-left flex">
          {!isExpired && (
            <>
              <p className="Body_3_medium text-Grey-500">{t("noEmail")}</p>
              <p className="Body_3_medium text-Grey-500 ml-1">
                {remainingSeconds >= 60
                  ? t("timerMinutes", { minutes, seconds })
                  : t("timerSeconds", { seconds: remainingSeconds })}
              </p>
            </>
          )}
        </div>

        {isExpired ? (
          <GlassButton
            type="button"
            variant="red"
            size="xl"
            className="Body_2_semibold mt-3 w-full"
            disabled={isResending}
            onClick={handleResend}
          >
            {t("resend")}
          </GlassButton>
        ) : (
          <GlassButton
            type="submit"
            variant="red"
            size="xl"
            className="Body_2_semibold mt-3 w-full"
            disabled={!isValidCode || isLoading}
          >
            {t("submit")}
          </GlassButton>
        )}
      </form>
    </div>
  );
};

export default CodeVerificationStep;
