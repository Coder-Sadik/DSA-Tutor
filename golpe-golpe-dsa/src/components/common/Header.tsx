import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { LangSwitch } from './LangSwitch';
import { ThemeToggle } from './ThemeToggle';
import { ProgressBar } from './ProgressBar';
import { BookOpen } from 'lucide-react';

interface HeaderProps {
  lang: Locale;
}

export function Header({ lang }: HeaderProps) {
  const dict = getDictionary(lang);

  return (
    <>
      <ProgressBar />
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border-line)] bg-[var(--bg-surface)]/90 backdrop-blur-md transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)] rounded-md"
            aria-label={`${dict.siteTitle} - Home`}
          >
            <div className="w-9 h-9 rounded-lg bg-[var(--brand-teal)] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg leading-tight tracking-tight text-[var(--text-ink)] group-hover:text-[var(--brand-teal)] transition-colors">
                {dict.siteShortTitle}
              </span>
              <span className="text-xs text-[var(--text-muted)] hidden sm:inline-block">
                {lang === 'bn' ? 'গল্পে গল্পে অ্যালগরিদম' : 'Algorithms through stories'}
              </span>
            </div>
          </Link>

          <nav aria-label="Quick actions" className="flex items-center gap-2 sm:gap-3">
            <LangSwitch lang={lang} />
            <ThemeToggle lang={lang} />
          </nav>
        </div>
      </header>
    </>
  );
}

