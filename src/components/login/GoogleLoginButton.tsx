"use client";

import { Google } from "@/assets/icons";
import { BASE_URL } from "@/apis/config";
import { getSafeCallbackDestination } from "@/utils/authUtils";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

const GoogleLoginButton = () => {
  const t = useTranslations("login");
  const locale = useLocale();
  const searchParams = useSearchParams();

  const handleGoogleLogin = () => {
    if (!BASE_URL) {
      return;
    }
    const callbackUrl = searchParams.get("callbackUrl");
    const destination = getSafeCallbackDestination(callbackUrl, `/${locale}/dashboard`);
    const redirectUrl = `${window.location.origin}${destination}`;
    window.location.href = `${BASE_URL}/api/v1/oauth/google?redirectUrl=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="bg-Grey-700 rounded-[0.25rem] flex py-3 w-full justify-center items-center gap-3"
    >
      <Google className="w-7 h-7]" />
      <span className="text-Grey-100">{t("googleContinue")}</span>
    </button>
  );
};

export default GoogleLoginButton;
