import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
// I18n middleware'ni oldindan yaratib qo'yamiz
const intlMiddleware = createMiddleware(routing);
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value as string;
  console.log(token);
  const { pathname } = request.nextUrl;
  // Til (locale) ni olish (masalan: /en/dashboard -> en)
  const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : "en";
  // Admin login sahifasi va dashboard yo‘li
  const isLoginPage = pathname === `/${locale}/admin-login`;
  const isDashboard = pathname.startsWith(`/${locale}/dashboard`);
  // Auth: Agar token yo‘q va dashboard sahifasiga kirilsa => login pagega yo‘naltir
  if (!token && isDashboard) {
    return NextResponse.redirect(new URL(`/${locale}/admin-login`, request.url));
  }
  // Auth: Agar token bor va login sahifasiga kirilsa => dashboardga yo‘naltir
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }
  // Har doim intl middleware'ni ishga tushiramiz (locale routing uchun)
  return intlMiddleware(request);
}
// Faqat kerakli yo'nalishlarga middleware ishlasin
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
