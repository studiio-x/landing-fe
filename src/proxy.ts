import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createIntlMiddleware(routing);

export default function proxy(request: NextRequest) {
 const { pathname } = request.nextUrl;


 // 다국어 처리가 필요 없는 경로로, next-intl 미들웨어를 건너뜁니다.
 if (pathname.startsWith("/price") || pathname.startsWith("/guide")|| pathname === "/") {
    // 추후 쿠키연동하면서 미들웨어 추가 예정
    //    if (pathname === "/login") {
    //      return NextResponse.next();
    //    }

    //    // /dashboard로 시작하는 모든 경로를 체크합니다.
    //    if (pathname.startsWith("/dashboard")) {
    //      const token = request.cookies.get("access_token")?.value;

    //      // 토큰이 없으면 로그인 페이지로 리다이렉트합니다.
    //      if (!token) {
    //        const loginUrl = new URL("/login", request.url);
    //        return NextResponse.redirect(loginUrl);
    //      }

    //      // 토큰이 있으면 API 요청을 위해 헤더에 토큰을 추가합니다.
    //      const requestHeaders = new Headers(request.headers);
    //      requestHeaders.set("Authorization", token);

    //      return NextResponse.next({
    //        request: {
    //          headers: requestHeaders,
    //        },
    //      });
    //    }

   return NextResponse.next();
 }
 return handleI18nRouting(request);
}

export const config = {
 // 미들웨어를 실행할 경로를 지정합니다.
 matcher: [
   "/((?!api|_next/static|_next/image|favicon.ico|public|assets|images|videos).*)",
   "/guide/:path*, /price/:path*, /",
 ],
}