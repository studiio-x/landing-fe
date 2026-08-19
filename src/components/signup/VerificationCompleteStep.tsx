"use client";

import { useLocale, useTranslations } from "next-intl";
import GlassButton from "@/components/common/GlassButton";
import type { VerificationCompleteStepProps } from "@/types/signup/funnel.type";
import { EmailCheck } from "@/assets/icons";

const VerificationCompleteStep = ({
  email,
  onNext,
}: VerificationCompleteStepProps) => {
  const t = useTranslations("signup.verificationComplete");
  const locale = useLocale();

  return (
    <div className="flex flex-col">
      <EmailCheck className="w-16 h-16" />
      <div className={`Subhead_1_medium text-Grey-50 ${locale === "en" ? "mb-18" : "mb-[6.69rem]"} mt-3`}>
        {t("title")}
      </div>

      <GlassButton
        variant="red"
        size="xl"
        className="Body_2_semibold w-full"
        onClick={onNext}
      >
        {t("continue")}
      </GlassButton>
    </div>
  );
};

export default VerificationCompleteStep;
