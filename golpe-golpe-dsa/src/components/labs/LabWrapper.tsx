import React from 'react';
import { FlaskConical } from 'lucide-react';

interface LabWrapperProps {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function LabWrapper({ id, title, description, children }: LabWrapperProps) {
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      aria-describedby={descId}
      className="my-10 p-5 sm:p-7 rounded-2xl border-2 border-[var(--brand-teal)]/30 bg-[var(--bg-surface)] shadow-sm transition-colors"
    >
      <header className="mb-6 pb-4 border-b border-[var(--border-line)]">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--brand-teal-light)]/40 text-[var(--brand-teal)] flex items-center justify-center">
            <FlaskConical className="w-4 h-4" aria-hidden="true" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-teal)]">
            Interactive Lab
          </span>
        </div>
        <h3 id={titleId} className="text-xl sm:text-2xl font-heading font-bold text-[var(--text-ink)]">
          {title}
        </h3>
        <p id={descId} className="text-sm text-[var(--text-muted)] mt-1 leading-relaxed">
          {description}
        </p>
      </header>

      <div>{children}</div>
    </section>
  );
}

