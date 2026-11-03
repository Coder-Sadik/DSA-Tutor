'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { getDictionary, formatNumber } from '@/lib/i18n/dictionaries';
import { CHAPTERS, ChapterMeta } from '@/lib/chapters';
import { saveReadingProgress } from '@/lib/storage';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';

interface ChapterNavProps {
  currentSlug: string;
  lang: Locale;
}

export function ChapterNav({ currentSlug, lang }: ChapterNavProps) {
  const dict = getDictionary(lang);

  const currentIndex = CHAPTERS.findIndex((c) => c.slug === currentSlug);
  const currentChapter = CHAPTERS[currentIndex];
  const prevChapter: ChapterMeta | undefined =
    currentIndex > 0 ? CHAPTERS[currentIndex - 1] : undefined;
  const nextChapter: ChapterMeta | undefined =
    currentIndex < CHAPTERS.length - 1 ? CHAPTERS[currentIndex + 1] : undefined;

  // Mark this chapter as read/visited in localStorage
  useEffect(() => {
    saveReadingProgress(currentSlug, true);
  }, [currentSlug]);

  return (
    <nav
      aria-label="Chapter navigation"
      className="mt-16 pt-8 border-t-2 border-[var(--border-line)]"
    >
      <div className="flex items-center justify-between mb-6 text-xs text-[var(--text-muted)] font-medium">
        <span className="flex items-center gap-1.5 text-[var(--brand-teal)]">
          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
          <span>{dict.completedTag}</span>
        </span>
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-1 text-[var(--text-ink)] hover:text-[var(--brand-teal)] transition-colors underline-offset-4 hover:underline min-h-[44px]"
        >
          <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{dict.backToToc}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Previous Chapter */}
        {prevChapter ? (
          <Link
            href={`/${lang}/chapter/${prevChapter.slug}`}
            className="group flex flex-col p-4 sm:p-5 rounded-xl border border-[var(--border-line)] bg-[var(--bg-surface)] hover:border-[var(--brand-teal)] hover:shadow-sm transition-all min-h-[88px] justify-between focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)]"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] group-hover:text-[var(--brand-teal)] transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{dict.prevChapter}</span>
            </span>
            <span className="font-heading font-bold text-base text-[var(--text-ink)] group-hover:text-[var(--brand-teal)] transition-colors mt-1">
              {formatNumber(prevChapter.order, lang)}. {lang === 'bn' ? prevChapter.titleBn : prevChapter.titleEn}
            </span>
          </Link>
        ) : (
          <Link
            href={`/${lang}`}
            className="group flex flex-col p-4 sm:p-5 rounded-xl border border-[var(--border-line)] bg-[var(--bg-surface)] hover:border-[var(--brand-teal)] transition-all min-h-[88px] justify-between focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)]"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] group-hover:text-[var(--brand-teal)] transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{dict.siteShortTitle}</span>
            </span>
            <span className="font-heading font-bold text-base text-[var(--text-ink)] group-hover:text-[var(--brand-teal)] transition-colors mt-1">
              {dict.backToToc}
            </span>
          </Link>
        )}

        {/* Next Chapter */}
        {nextChapter && nextChapter.status === 'ready' ? (
          <Link
            href={`/${lang}/chapter/${nextChapter.slug}`}
            className="group flex flex-col p-4 sm:p-5 rounded-xl border border-[var(--border-line)] bg-[var(--bg-surface)] hover:border-[var(--brand-teal)] hover:shadow-sm transition-all text-right min-h-[88px] justify-between focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)]"
          >
            <span className="inline-flex items-center justify-end gap-1.5 text-xs font-semibold text-[var(--text-muted)] group-hover:text-[var(--brand-teal)] transition-colors">
              <span>{dict.nextChapter}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
            <span className="font-heading font-bold text-base text-[var(--text-ink)] group-hover:text-[var(--brand-teal)] transition-colors mt-1">
              {formatNumber(nextChapter.order, lang)}. {lang === 'bn' ? nextChapter.titleBn : nextChapter.titleEn}
            </span>
          </Link>
        ) : nextChapter ? (
          <div
            className="flex flex-col p-4 sm:p-5 rounded-xl border border-[var(--border-line)]/50 bg-[var(--bg-surface)]/50 text-right min-h-[88px] justify-between opacity-70 cursor-not-allowed select-none"
            aria-disabled="true"
          >
            <span className="inline-flex items-center justify-end gap-1.5 text-xs font-semibold text-[var(--text-muted)]">
              <span>{dict.nextChapter} ({dict.soonBadge})</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
            <span className="font-heading font-bold text-base text-[var(--text-ink)]/70 mt-1">
              {formatNumber(nextChapter.order, lang)}. {lang === 'bn' ? nextChapter.titleBn : nextChapter.titleEn}
            </span>
          </div>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>
    </nav>
  );
}
