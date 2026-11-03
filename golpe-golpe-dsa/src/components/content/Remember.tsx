import React from 'react';
import { Lightbulb } from 'lucide-react';

interface RememberProps {
  title?: string;
  children: React.ReactNode;
}

export function Remember({ title, children }: RememberProps) {
  return (
    <div
      className="my-8 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-line)] shadow-sm"
      role="region"
      aria-label={title || 'What to remember'}
    >
      <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-[var(--border-line)]">
        <div className="w-8 h-8 rounded-lg bg-[var(--brand-mango-light)]/40 text-[var(--brand-mango)] flex items-center justify-center">
          <Lightbulb className="w-4 h-4" aria-hidden="true" />
        </div>
        <h4 className="font-heading font-extrabold text-lg sm:text-xl text-[var(--text-ink)]">
          {title || 'মনে রাখার মতো মূল কথা (What to Remember)'}
        </h4>
      </div>
      <div className="text-[17px] text-[var(--text-ink)] leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul>li]:marker:text-[var(--brand-teal)]">
        {children}
      </div>
    </div>
  );
}

