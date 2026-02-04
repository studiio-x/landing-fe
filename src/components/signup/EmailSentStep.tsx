"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import GlassButton from "@/components/common/GlassButton";
import type { EmailSentStepProps } from "@/types/signup/funnel.type";
import { CHANNEL_NAME, MESSAGE_TYPE } from "@/constants/signup/funnel";

const EmailSentStep = ({ email, onNext }: EmailSentStepProps) => {
  const t = useTranslations("signup.emailSent");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = (event) => {
      if (event.data.type === MESSAGE_TYPE) {
        setIsVerified(true);
        onNext();
      }
    };
    return () => channel.close();
  }, [onNext]);

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
        disabled={!isVerified}
        onClick={onNext}
      >
        {t("confirm")}
      </GlassButton>
    </>
  );
};

export default EmailSentStep;
