import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { LanguageType } from "@/types/mypage/language.type";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as LanguageType)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});