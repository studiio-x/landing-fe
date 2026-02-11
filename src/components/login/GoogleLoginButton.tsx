"use client";

import { Google } from "@/assets/icons";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { getGoogleOAuthUrl } from "@/apis/oauthApi";

const GoogleLoginButton = () => {
  const t = useTranslations("login");
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const redirectUrl = `${window.location.origin}/${locale}/dashboard`;
      const googleOAuthUrl = await getGoogleOAuthUrl({ redirectUrl });
      window.location.href = googleOAuthUrl;
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="bg-Grey-700 rounded-[0.25rem] flex py-[0.75rem] w-full justify-center items-center gap-[0.75rem] "
    >
      <Google className="w-[1.75rem] h-[1.75rem]" />
      <span className="text-Grey-100">{t("googleContinue")}</span>
    </button>
  );
};

export default GoogleLoginButton;
