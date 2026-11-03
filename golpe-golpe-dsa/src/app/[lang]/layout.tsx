import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/lib/i18n/config';
import { hindSiliguri, bricolageGrotesque } from '@/lib/fonts';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { SITE_URL } from '@/lib/site';
import type { Metadata } from 'next';
import '@/app/globals.css';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  twitter: {
    card: 'summary_large_image',
  },
};

const themeScript = `
(function() {
  try {
    var saved = localStorage.getItem('golpe-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved ? saved : (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    notFound();
  }

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${hindSiliguri.variable} ${bricolageGrotesque.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className="min-h-screen flex flex-col font-sans bg-[var(--bg-page)] text-[var(--text-ink)] antialiased"
        suppressHydrationWarning
      >
        <Header lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
