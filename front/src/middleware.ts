import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { authPages } from "./config/pages";
// import NextAuthMiddleWare from "next-auth/middleware";
function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: i18n["locales"] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}
import {
  NextAuthMiddlewareOptions,
  NextMiddlewareWithAuth,
  withAuth,
} from "next-auth/middleware";
import { requireAuthPages } from "./config/site";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface NextRequestWithNextAuth extends NextRequest {
  nextauth: {
    token: {
      grantType: string;
      accessToken: string;
      refreshToken: string;
      iat: number;
      exp: number;
      jti: string;
    } | null;
  };
}

const middleware: NextMiddlewareWithAuth = async (request) => {
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  const cookie = cookies();
  const nextAuthSessionCookie = cookie.get("next-auth.session-token");

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  const authPagesPathnames = Object.values(authPages);
  const pathnameIsAuthPage = authPagesPathnames.includes(pathname);

  // Redirect if there is no locale
  if (!pathnameIsAuthPage && pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};
const middlewareOptions: NextAuthMiddlewareOptions = {
  callbacks: {
    authorized: ({ req, token }) => {
      const pathname = req.nextUrl.pathname;
      const isRequiredAuthPage = requireAuthPages.every((path) =>
        pathname.endsWith(path)
      );
      if (isRequiredAuthPage) {
        return !!token?.accessToken && !!token?.refreshToken;
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: authPages,
};

export default withAuth(middleware, middlewareOptions);

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
