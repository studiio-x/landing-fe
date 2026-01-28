import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import NotFound from "@/components/common/NotFound";

export default async function NotFoundPage() {
  const messages = await getMessages({ locale: "ko" });

  return (
    <NextIntlClientProvider locale="ko" messages={messages}>
      <NotFound />
    </NextIntlClientProvider>
  );
}
