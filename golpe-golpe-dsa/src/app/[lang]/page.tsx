import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale, isValidLocale, locales } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { ShelfIllustration } from '@/components/common/ShelfIllustration';
import { TocList } from '@/components/content/TocList';
import { BookOpen, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

interface CoverPageProps {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: CoverPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  const dict = getDictionary(lang);
  const baseUrl = 'https://golpe-golpe-dsa.vercel.app';

  return {
    title: `${dict.siteTitle} — ${dict.siteTagline}`,
    description: dict.siteTagline,
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        bn: `${baseUrl}/bn`,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: dict.siteTitle,
      description: dict.siteTagline,
      url: `${baseUrl}/${lang}`,
      siteName: dict.siteTitle,
      locale: lang === 'bn' ? 'bn_BD' : 'en_US',
      type: 'website',
    },
  };
}

export default async function CoverPage({ params }: CoverPageProps) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Warm badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--brand-teal-light)]/40 text-[var(--brand-teal)] border border-[var(--brand-teal)]/20 mb-4">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{lang === 'bn' ? 'সবার জন্য সহজ ভাষায় কম্পিউটার সায়েন্স' : 'Computer science in plain, joyful words'}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-[var(--text-ink)] leading-tight">
          {dict.siteTitle}
        </h1>

        {/* Subtitle / Tagline */}
        <p className="mt-4 text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
          {lang === 'bn'
            ? 'কঠিন সংজ্ঞা আর ভীতি ভুলে দৈনন্দিন জীবনের ছোট ছোট গল্প ও জীবন্ত অ্যানিমেশনে ডেটা স্ট্রাকচার ও অ্যালগরিদম শিখুন।'
            : 'Leave intimidating jargon behind. Learn Data Structures and Algorithms through relatable everyday stories and interactive visual labs.'}
        </p>

        {/* Start reading CTA button */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href={`/${lang}/chapter/what-is-a-data-structure`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-heading font-bold text-base bg-[var(--brand-teal)] text-white hover:bg-[#0D655E] dark:hover:bg-[#4ADE80] transition-colors shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-teal)] min-h-[44px]"
          >
            <BookOpen className="w-5 h-5" aria-hidden="true" />
            <span>{dict.startReading} (অধ্যায় ১)</span>
          </Link>
        </div>
      </div>

      {/* Book Shelf Illustration */}
      <ShelfIllustration lang={lang} />

      {/* Table of Contents */}
      <TocList lang={lang} />
    </div>
  );
}

