import Link from 'next/link';
import { BookX, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md mx-auto p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-line)] shadow-sm">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--brand-mango-light)]/40 text-[var(--brand-mango)] flex items-center justify-center">
          <BookX className="w-8 h-8" aria-hidden="true" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--text-ink)] mb-2">
          পৃষ্ঠাটি পাওয়া যায়নি / Page Not Found
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
          আপনি যে পাতাটি খুঁজছেন তা বইয়ের তাকে নেই অথবা সরানো হয়েছে।
          <br />
          The page or chapter you are looking for does not exist on our shelf.
        </p>
        <Link
          href="/bn"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-heading font-semibold text-sm bg-[var(--brand-teal)] text-white hover:opacity-90 transition-opacity min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>প্রচ্ছদে ফিরে যান (Home)</span>
        </Link>
      </div>
    </div>
  );
}

