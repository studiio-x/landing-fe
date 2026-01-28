import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createIntlMiddleware(routing);

// [locale] 폴더 안에 실제로 존재하는 페이지들
const localePages = ["signup", "dashboard", "mypage", "login"];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 다국어 처리가 필요 없는 경로
  if (pathname.startsWith("/price") || pathname.startsWith("/guide") || pathname === "/") {
    return NextResponse.next();
  }

  // 유효한 locale로 시작하는 경로 → next-intl 처리
  const pathnameHasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return handleI18nRouting(request);
  }

  // locale 없이 실제 존재하는 페이지로 접근 → locale 붙여서 리다이렉트
  const isValidPage = localePages.some(
    (page) => pathname === `/${page}` || pathname.startsWith(`/${page}/`)
  );

  if (isValidPage) {
    return handleI18nRouting(request);
  }

  // 유효하지 않은 경로 → 404
  return NextResponse.rewrite(new URL("/not-found", request.url));
}

export const config = {
 // 미들웨어를 실행할 경로를 지정합니다.
 matcher: [
   "/((?!api|_next/static|_next/image|favicon.ico|public|assets|images|videos).*)",
   "/guide/:path*, /price/:path*, /",
 ],
};