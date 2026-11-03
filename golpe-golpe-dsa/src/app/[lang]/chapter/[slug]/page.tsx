import { notFound } from 'next/navigation';
import Link from 'next/link';
import { locales, Locale, isValidLocale } from '@/lib/i18n/config';
import { getDictionary, formatNumber } from '@/lib/i18n/dictionaries';
import { getChapterFileBySlug } from '@/lib/content';
import { CHAPTERS } from '@/lib/chapters';
import { MdxRenderer } from '@/components/mdx/MdxRenderer';
import { ChapterNav } from '@/components/content/ChapterNav';
import { ArrowLeft, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

interface ChapterPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  const readyChapters = CHAPTERS.filter((ch) => ch.status === 'ready');
  const params: { lang: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const chapter of readyChapters) {
      params.push({ lang: locale, slug: chapter.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) return {};

  const chapter = getChapterFileBySlug(lang, slug);
  if (!chapter) return {};

  const dict = getDictionary(lang);
  const baseUrl = 'https://golpe-golpe-dsa.vercel.app';

  return {
    title: `${chapter.frontmatter.title} — ${dict.siteTitle}`,
    description: chapter.frontmatter.storyHook,
    alternates: {
      canonical: `${baseUrl}/${lang}/chapter/${slug}`,
      languages: {
        bn: `${baseUrl}/bn/chapter/${slug}`,
        en: `${baseUrl}/en/chapter/${slug}`,
      },
    },
    openGraph: {
      title: `${chapter.frontmatter.title} — ${dict.siteTitle}`,
      description: chapter.frontmatter.storyHook,
      url: `${baseUrl}/${lang}/chapter/${slug}`,
      siteName: dict.siteTitle,
      locale: lang === 'bn' ? 'bn_BD' : 'en_US',
      type: 'article',
    },
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { lang, slug } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const chapter = getChapterFileBySlug(lang, slug);
  if (!chapter || chapter.frontmatter.status === 'soon') {
    notFound();
  }

  const dict = getDictionary(lang);
  const chapterNumber = formatNumber(chapter.frontmatter.order, lang);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6">
      <div className="reading-column">
        {/* Breadcrumb / Back to TOC */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--brand-teal)] transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>{dict.backToToc}</span>
          </Link>
        </nav>

        {/* Chapter Header */}
        <header className="mb-8 pb-6 border-b border-[var(--border-line)]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--brand-teal-light)]/40 text-[var(--brand-teal)] border border-[var(--brand-teal)]/20 mb-3">
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span>
              {dict.chapterKicker} {chapterNumber}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[var(--text-ink)] leading-tight">
            {chapter.frontmatter.title}
          </h1>

          <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            {chapter.frontmatter.storyHook}
          </p>
        </header>

        {/* MDX Body with Embedded Components */}
        <MdxRenderer source={chapter.content} lang={lang} slug={slug} />

        {/* Bottom Navigation & Reading Progress Tracker */}
        <ChapterNav currentSlug={slug} lang={lang} />
      </div>
    </div>
  );
}
