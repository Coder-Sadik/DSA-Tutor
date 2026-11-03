'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeTabsProps {
  jsCode?: string;
  pyCode?: string;
  js?: string;
  py?: string;
  jsTitle?: string;
  pyTitle?: string;
}

export function CodeTabs({
  jsCode = '',
  pyCode = '',
  js = '',
  py = '',
  jsTitle = 'JavaScript',
  pyTitle = 'Python',
}: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState<'js' | 'py'>('js');
  const [copied, setCopied] = useState<boolean>(false);

  const rawJs = jsCode || js || '';
  const rawPy = pyCode || py || '';
  const activeCode = (activeTab === 'js' ? rawJs : rawPy).trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="my-8 rounded-2xl border border-[var(--border-line)] bg-[#0F172A] text-slate-100 overflow-hidden shadow-md">
      {/* Tab bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-[#0B1120]">
        <div className="flex items-center gap-1" role="tablist" aria-label="Programming language tabs">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'js'}
            onClick={() => setActiveTab('js')}
            className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg min-h-[44px] transition-colors focus-visible:outline-2 focus-visible:outline-teal-400 ${
              activeTab === 'js'
                ? 'bg-slate-800 text-yellow-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {jsTitle}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'py'}
            onClick={() => setActiveTab('py')}
            className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg min-h-[44px] transition-colors focus-visible:outline-2 focus-visible:outline-teal-400 ${
              activeTab === 'py'
                ? 'bg-slate-800 text-sky-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {pyTitle}
          </button>
        </div>

        {/* Copy button */}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-teal-400"
          aria-label={copied ? 'Code copied' : 'Copy code snippet'}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span className="text-emerald-400 font-semibold">কপি হয়েছে / Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="p-4 sm:p-5 overflow-x-auto text-sm sm:text-[15px] font-mono leading-relaxed">
        <pre tabIndex={0} className="focus-visible:outline-none">
          <code>{activeCode}</code>
        </pre>
      </div>
    </div>
  );
}
