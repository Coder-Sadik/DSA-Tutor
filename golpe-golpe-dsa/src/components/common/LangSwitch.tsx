'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Languages } from 'lucide-react';

interface LangSwitchProps {
  lang: Locale;
}

export function LangSwitch({ lang }: LangSwitchProps) {
  const pathname = usePathname() || `/${lang}`;
  const dict = getDictionary(lang);
  const targetLang: Locale = lang === 'bn' ? 'en' : 'bn';

  // Replace leading /{lang} with /{targetLang}
  const targetPath = pathname.replace(new RegExp(`^/${lang}`), `/${targetLang}`);

  return (
    <Link
      href={targetPath}
      className="inline-flex items-center gap-2 min-w-[44px] min-h-[44px] px-3.5 py-2 text-sm font-medium rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] text-[var(--text-ink)] hover:border-[var(--brand-teal)] hover:text-[var(--brand-teal)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)]"
      aria-label={`Switch language to ${targetLang === 'bn' ? 'বাংলা' : 'English'}`}
    >
      <Languages className="w-4 h-4 text-[var(--brand-teal)]" aria-hidden="true" />
      <span>{dict.switchLang}</span>
    </Link>
  );
}

