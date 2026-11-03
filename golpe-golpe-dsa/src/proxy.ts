import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './lib/i18n/config';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname has a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Handle "/" redirect based on Accept-Language
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language') || '';
    // Detect if user prefers English and does not prioritize Bengali
    const prefersEnglish =
      acceptLanguage.toLowerCase().includes('en') &&
      !acceptLanguage.toLowerCase().includes('bn');

    const chosenLocale = prefersEnglish ? 'en' : defaultLocale;
    return NextResponse.redirect(new URL(`/${chosenLocale}`, request.url));
  }

  // Default redirect for any other unmatched path without locale
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

export const config = {
  matcher: [
    // Exclude Next.js internals, static assets, favicon, robots.txt, sitemap.xml, and any file with an extension
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
