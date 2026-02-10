import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";
import NotFound from "@/components/common/NotFound";
import { routing } from "@/i18n/routing";
import { LanguageType } from "@/types/mypage/language.type";

export default async function NotFoundPage() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value as LanguageType | undefined;
  const locale = localeCookie && routing.locales.includes(localeCookie)
    ? localeCookie
    : routing.defaultLocale;

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <NotFound />
    </NextIntlClientProvider>
  );
}
