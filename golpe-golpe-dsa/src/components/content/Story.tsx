import React from 'react';
import { BookOpenText } from 'lucide-react';

interface StoryProps {
  children: React.ReactNode;
}

export function Story({ children }: StoryProps) {
  return (
    <aside
      className="my-8 p-5 sm:p-6 rounded-2xl bg-[var(--brand-mango-light)]/25 dark:bg-[var(--brand-mango-light)]/15 border-l-4 border-[var(--brand-mango)] shadow-sm"
      role="region"
      aria-label="Story"
    >
      <div className="flex items-center gap-2 mb-3 text-[var(--brand-mango)] dark:text-[var(--brand-mango)]">
        <BookOpenText className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
        <span className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#92400E] dark:text-[var(--brand-mango)]">
          গল্পের শুরু / The Story
        </span>
      </div>
      <div className="text-[17px] sm:text-[18px] text-[var(--text-ink)] leading-relaxed italic [&>p]:mb-3 [&>p:last-child]:mb-0 font-body">
        {children}
      </div>
    </aside>
  );
}

