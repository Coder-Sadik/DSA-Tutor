'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { getDictionary, formatNumber } from '@/lib/i18n/dictionaries';
import { CHAPTERS, ChapterMeta } from '@/lib/chapters';
import { getReadingProgress } from '@/lib/storage';
import { CheckCircle2, ChevronRight, Lock } from 'lucide-react';

interface TocListProps {
  lang: Locale;
}

export function TocList({ lang }: TocListProps) {
  const dict = getDictionary(lang);
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([]);

  useEffect(() => {
    const progress = getReadingProgress();
    setCompletedSlugs(progress.completedChapters);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto my-10">
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-[var(--border-line)]">
        <div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--text-ink)]">
            {dict.tocTitle}
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {dict.tocSubtitle}
          </p>
        </div>
        {completedSlugs.length > 0 && (
          <div className="text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full bg-[var(--brand-teal-light)]/40 text-[var(--brand-teal)] border border-[var(--brand-teal)]/30">
            {dict.readingProgress}: {formatNumber(completedSlugs.length, lang)} / {formatNumber(CHAPTERS.length, lang)}
          </div>
        )}
      </div>

      <nav aria-label={dict.tocTitle} className="space-y-3">
        {CHAPTERS.map((ch: ChapterMeta) => {
          const isReady = ch.status === 'ready';
          const isCompleted = completedSlugs.includes(ch.slug);
          const title = lang === 'bn' ? ch.titleBn : ch.titleEn;
          const hook = lang === 'bn' ? ch.hookBn : ch.hookEn;
          const chapterNumber = formatNumber(ch.order, lang);

          if (isReady) {
            return (
              <Link
                key={ch.slug}
                href={`/${lang}/chapter/${ch.slug}`}
                className="group flex items-start gap-4 p-4 sm:p-5 rounded-xl border border-[var(--border-line)] bg-[var(--bg-surface)] hover:border-[var(--brand-teal)] hover:shadow-md transition-all focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)]"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--brand-teal-light)]/30 text-[var(--brand-teal)] flex items-center justify-center font-heading font-bold text-lg group-hover:bg-[var(--brand-teal)] group-hover:text-white transition-colors">
                  {chapterNumber}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-teal)]">
                      {dict.chapterKicker} {chapterNumber}
                    </span>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-xs text-[var(--brand-teal)] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span className="sr-only sm:not-sr-only">{dict.completedTag}</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-[var(--text-ink)] group-hover:text-[var(--brand-teal)] transition-colors mt-0.5">
                    {title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mt-1 line-clamp-2">
                    {hook}
                  </p>
                </div>

                <div className="flex-shrink-0 self-center text-[var(--text-muted)] group-hover:text-[var(--brand-teal)] group-hover:translate-x-1 transition-all">
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </div>
              </Link>
            );
          }

          // Not ready ("soon")
          return (
            <div
              key={ch.slug}
              className="flex items-start gap-4 p-4 sm:p-5 rounded-xl border border-[var(--border-line)]/60 bg-[var(--bg-surface)]/50 opacity-80 cursor-not-allowed select-none"
              aria-disabled="true"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--border-line)]/40 text-[var(--text-muted)] flex items-center justify-center font-heading font-bold text-lg">
                {chapterNumber}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    {dict.chapterKicker} {chapterNumber}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded bg-[var(--brand-mango-light)]/40 text-[#B45309] dark:text-[var(--brand-mango)] border border-[var(--brand-mango)]/30">
                    <Lock className="w-3 h-3" aria-hidden="true" />
                    {dict.soonBadge}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-[var(--text-ink)]/70 mt-0.5">
                  {title}
                </h3>
                <p className="text-sm text-[var(--text-muted)]/80 mt-1 line-clamp-2">
                  {hook}
                </p>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
}

