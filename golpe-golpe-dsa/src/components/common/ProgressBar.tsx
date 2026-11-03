'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function ProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const isChapterPage = pathname.includes('/chapter/');

  useEffect(() => {
    if (!isChapterPage) {
      setScrollProgress(0);
      return;
    }

    const updateScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const totalScrollable = scrollHeight - clientHeight;
      if (totalScrollable > 0) {
        const progress = (scrollTop / totalScrollable) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener('scroll', updateScroll);
  }, [pathname, isChapterPage]);

  if (!isChapterPage) return null;

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent"
    >
      <div
        className="h-full bg-[var(--brand-teal)] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

