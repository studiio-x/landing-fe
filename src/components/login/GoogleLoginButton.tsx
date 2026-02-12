"use client";

import { Google } from "@/assets/icons";
import { BASE_URL } from "@/apis/config";
import { useLocale, useTranslations } from "next-intl";

const GoogleLoginButton = () => {
  const t = useTranslations("login");
  const locale = useLocale();

  const handleGoogleLogin = () => {
    const redirectUrl = `${window.location.origin}/${locale}/dashboard`;
    window.location.href = `${BASE_URL}/api/v1/oauth/google?redirectUrl=${redirectUrl}`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="bg-Grey-700 rounded-[0.25rem] flex py-[0.75rem] w-full justify-center items-center gap-[0.75rem] "
    >
      <Google className="w-[1.75rem] h-[1.75rem]" />
      <span className="text-Grey-100">{t("googleContinue")}</span>
    </button>
  );
};

export default GoogleLoginButton;
