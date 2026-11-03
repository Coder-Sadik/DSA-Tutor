import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface ShelfIllustrationProps {
  lang: Locale;
}

export function ShelfIllustration({ lang }: ShelfIllustrationProps) {
  const dict = getDictionary(lang);

  return (
    <div
      className="w-full max-w-xl mx-auto my-8 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-line)] shadow-sm text-center"
      role="region"
      aria-label={dict.shelfIllustrationTitle}
    >
      <div className="relative w-full h-48 flex items-end justify-center pb-3">
        {/* Books on the shelf */}
        <div className="w-full flex items-end justify-around px-2 sm:px-6 relative z-10">
          {/* Left: Rafi's leaning/scattered pile */}
          <div className="flex items-end -space-x-2 relative" title={lang === 'bn' ? 'রাফির এলোমেলো স্তূপ' : "Rafi's messy pile"}>
            <div className="w-6 h-28 bg-[#E11D48] rounded-t-sm transform -rotate-12 origin-bottom-left shadow-sm flex items-center justify-center text-[10px] text-white font-mono font-bold select-none">
              <span className="transform -rotate-90">14</span>
            </div>
            <div className="w-7 h-24 bg-[#D97706] rounded-t-sm transform rotate-6 origin-bottom shadow-sm flex items-center justify-center text-[10px] text-white font-mono font-bold select-none">
              <span className="transform -rotate-90">02</span>
            </div>
            <div className="w-6 h-32 bg-[#475569] rounded-t-sm transform -rotate-6 origin-bottom-right shadow-sm flex items-center justify-center text-[10px] text-white font-mono font-bold select-none">
              <span className="transform -rotate-90">09</span>
            </div>
            <div className="w-8 h-20 bg-[#CA8A04] rounded-t-sm transform rotate-12 origin-bottom shadow-sm flex items-center justify-center text-[10px] text-white font-mono font-bold select-none">
              <span className="transform -rotate-90">15</span>
            </div>
          </div>

          {/* Center Divider / Bookend */}
          <div className="h-20 w-1 bg-[var(--border-line)] rounded-full opacity-40 mx-2" aria-hidden="true" />

          {/* Right: Nila's neatly sorted row of books */}
          <div className="flex items-end space-x-1.5" title={lang === 'bn' ? 'নীলার সাজানো বইয়ের তাক' : "Nila's organized shelf"}>
            <div className="w-6 h-28 bg-[var(--brand-teal)] rounded-t-sm shadow-sm flex items-center justify-center text-[10px] text-white font-mono font-bold select-none">
              <span className="transform -rotate-90">01</span>
            </div>
            <div className="w-6 h-30 bg-[#0D9488] rounded-t-sm shadow-sm flex items-center justify-center text-[10px] text-white font-mono font-bold select-none">
              <span className="transform -rotate-90">02</span>
            </div>
            <div className="w-6 h-26 bg-[var(--brand-mango)] rounded-t-sm shadow-sm flex items-center justify-center text-[10px] text-[#78350F] font-mono font-bold select-none">
              <span className="transform -rotate-90">03</span>
            </div>
            <div className="w-6 h-32 bg-[#14B8A6] rounded-t-sm shadow-sm flex items-center justify-center text-[10px] text-white font-mono font-bold select-none">
              <span className="transform -rotate-90">04</span>
            </div>
            <div className="w-6 h-28 bg-[#0F766E] rounded-t-sm shadow-sm flex items-center justify-center text-[10px] text-white font-mono font-bold select-none">
              <span className="transform -rotate-90">05</span>
            </div>
            <div className="w-6 h-34 bg-[#F59E0B] rounded-t-sm shadow-sm flex items-center justify-center text-[10px] text-[#78350F] font-mono font-bold select-none">
              <span className="transform -rotate-90">06</span>
            </div>
          </div>
        </div>

        {/* Thick wooden shelf line */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#78350F] rounded-sm shadow-md">
          <div className="h-1 bg-[#B45309] w-full rounded-t-sm" />
          <div className="h-1.5 bg-[#451A03] w-full mt-1.5" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-[var(--text-muted)] font-medium px-4">
        <span>{lang === 'bn' ? '← রাফির অগোছালো স্তূপ (খুঁজতে সময় লাগে)' : "← Rafi's messy heap (slow search)"}</span>
        <span>{lang === 'bn' ? 'নীলার সাজানো তাক (ঝটপট পাওয়া যায়) →' : "Nila's ordered shelf (fast search) →"}</span>
      </div>
    </div>
  );
}

