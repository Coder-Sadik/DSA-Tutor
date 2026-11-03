import React from 'react';
import { BookmarkCheck } from 'lucide-react';

interface DefinitionProps {
  term: string;
  english?: string;
  children: React.ReactNode;
}

export function Definition({ term, english, children }: DefinitionProps) {
  return (
    <div
      className="my-7 p-5 sm:p-6 rounded-2xl bg-[var(--brand-teal-light)]/20 dark:bg-[var(--brand-teal-light)]/10 border-2 border-[var(--brand-teal)]/40 shadow-sm"
      role="region"
      aria-label={`Definition: ${term}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <BookmarkCheck className="w-5 h-5 text-[var(--brand-teal)] flex-shrink-0" aria-hidden="true" />
        <h4 className="font-heading font-extrabold text-lg text-[var(--brand-teal)]">
          {term} {english && <span className="font-normal text-sm opacity-80">({english})</span>}
        </h4>
      </div>
      <div className="text-[17px] sm:text-[18px] text-[var(--text-ink)] leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

