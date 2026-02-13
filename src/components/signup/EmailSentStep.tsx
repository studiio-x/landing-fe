"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import GlassButton from "@/components/common/GlassButton";
import AlertModal from "@/components/common/AlertModal";
import type { EmailSentStepProps } from "@/types/signup/funnel.type";
import { CHANNEL_NAME, MESSAGE_TYPE } from "@/constants/signup/funnel";
import { useCheckEmailValidation } from "@/hooks/queries/useAuthApi";

const EmailSentStep = ({ email, onNext }: EmailSentStepProps) => {
  const t = useTranslations("signup.emailSent");
  const te = useTranslations("signup.error");
  const [isVerified, setIsVerified] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(true);
  const hasMovedRef = useRef(false);
  const { mutate: checkValidation } = useCheckEmailValidation();

  const safeNext = useCallback(() => {
    if (hasMovedRef.current) return;
    hasMovedRef.current = true;
    onNext();
  }, [onNext]);

  const verifyAndProceed = useCallback(() => {
    checkValidation(email, {
      onSuccess: (data) => {
        if (data.isVerified) {
          setIsVerified(true);
          safeNext();
        }
      },
      onError: () => {
        setIsErrorModalOpen(true);
      },
    });
  }, [email, checkValidation, safeNext]);

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);

    channel.onmessage = (event) => {
      if (event.data?.type !== MESSAGE_TYPE) return;
      verifyAndProceed();
    };

    return () => channel.close();
  }, [verifyAndProceed]);

  return (
    <>
      <div className="Heading_2_semibold text-Grey-50 mb-10">{t("title")}</div>
      <p className="Body_2_medium text-Grey-300 whitespace-pre-line mb-[3.94rem]">
        {t("description", { email })}
      </p>

      <GlassButton
        variant="red"
        size="xl"
        className="Body_2_semibold w-full"
        disabled={!isVerified || hasMovedRef.current}
        onClick={safeNext}
      >
        {t("confirm")}
      </GlassButton>

      <AlertModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title={te("verificationFailed.title")}
        description={te("verificationFailed.description")}
        buttons={[
          { label: te("confirm"), variant: "red", onClick: () => setIsErrorModalOpen(false) },
        ]}
        contained
      />
    </>
  );
};

export default EmailSentStep;
