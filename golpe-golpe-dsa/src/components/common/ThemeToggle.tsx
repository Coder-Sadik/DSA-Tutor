'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { getSavedTheme, setSavedTheme } from '@/lib/storage';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface ThemeToggleProps {
  lang: Locale;
}

export function ThemeToggle({ lang }: ThemeToggleProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const dict = getDictionary(lang);

  useEffect(() => {
    setMounted(true);
    const saved = getSavedTheme();
    if (saved) {
      setTheme(saved);
      if (saved === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDark ? 'dark' : 'light');
      if (isDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    setSavedTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] text-[var(--text-ink)] hover:bg-[var(--brand-teal-light)]/20 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)]"
      aria-label={theme === 'dark' ? dict.themeLight : dict.themeDark}
      title={theme === 'dark' ? dict.themeLight : dict.themeDark}
    >
      {mounted && theme === 'dark' ? (
        <Sun className="w-5 h-5 text-[var(--brand-mango)]" aria-hidden="true" />
      ) : (
        <Moon className="w-5 h-5 text-[var(--brand-teal)]" aria-hidden="true" />
      )}
      <span className="sr-only">
        {mounted && theme === 'dark' ? dict.themeLight : dict.themeDark}
      </span>
    </button>
  );
}

