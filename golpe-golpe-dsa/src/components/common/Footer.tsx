import Link from 'next/link';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { BookOpen } from 'lucide-react';

interface FooterProps {
  lang: Locale;
}

export function Footer({ lang }: FooterProps) {
  const dict = getDictionary(lang);

  return (
    <footer className="w-full border-t border-[var(--border-line)] bg-[var(--bg-surface)] py-10 mt-16 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[var(--brand-teal)] text-white flex items-center justify-center">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <p className="font-heading font-bold text-sm text-[var(--text-ink)]">
              {dict.siteTitle}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              {dict.footerText}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
          <Link
            href={`/${lang}`}
            className="hover:text-[var(--brand-teal)] transition-colors underline-offset-4 hover:underline"
          >
            {dict.tocTitle}
          </Link>
          <a
            href="https://github.com/Coder-Sadik/DSA-Tutor"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--brand-teal)] transition-colors underline-offset-4 hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

