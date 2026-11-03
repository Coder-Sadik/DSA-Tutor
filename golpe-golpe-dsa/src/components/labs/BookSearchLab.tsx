'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Locale } from '@/lib/i18n/config';
import { getDictionary, formatNumber } from '@/lib/i18n/dictionaries';
import { linearSearchSteps, binarySearchSteps, SearchStep } from '@/lib/algorithms/search';
import { LabWrapper } from './LabWrapper';
import { StepPlayer } from './StepPlayer';
import { BookOpen, Sparkles, Check, X, Search } from 'lucide-react';

interface BookSearchLabProps {
  lang: Locale;
}

const DEFAULT_SORTED = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const INITIAL_HEAP = [14, 3, 9, 1, 16, 7, 12, 4, 15, 2, 8, 13, 6, 11, 5, 10];

export function BookSearchLab({ lang }: BookSearchLabProps) {
  const dict = getDictionary(lang);
  const shouldReduceMotion = useReducedMotion();

  // State
  const [target, setTarget] = useState<number>(11);
  const [heapBooks, setHeapBooks] = useState<number[]>(INITIAL_HEAP);
  const [sortedBooks] = useState<number[]>(DEFAULT_SORTED);
  const [activeMode, setActiveMode] = useState<'heap' | 'shelf' | null>(null);
  const [steps, setSteps] = useState<SearchStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(700);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Playback timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Client-side hydration safety
  useEffect(() => {
    setIsMounted(true);
    // Deterministic on SSR, random on client after mount if desired
  }, []);

  // Pick a new random target and shuffle the heap
  const handleNewTarget = () => {
    if (isPlaying) return;
    const newTarget = Math.floor(Math.random() * 16) + 1;
    const shuffled = [...DEFAULT_SORTED].sort(() => Math.random() - 0.5);
    setTarget(newTarget);
    setHeapBooks(shuffled);
    setActiveMode(null);
    setSteps([]);
    setCurrentStepIndex(-1);
    setIsPlaying(false);
  };

  // Start Heap Search (Linear)
  const handleSearchHeap = () => {
    if (isPlaying) return;
    const generated = linearSearchSteps(heapBooks, target);
    setActiveMode('heap');
    setSteps(generated);
    setCurrentStepIndex(0);
    setIsPlaying(true);
  };

  // Start Shelf Search (Binary)
  const handleSearchShelf = () => {
    if (isPlaying) return;
    const generated = binarySearchSteps(sortedBooks, target);
    setActiveMode('shelf');
    setSteps(generated);
    setCurrentStepIndex(0);
    setIsPlaying(true);
  };

  // Playback loop
  useEffect(() => {
    if (isPlaying) {
      if (currentStepIndex >= steps.length - 1) {
        setIsPlaying(false);
        return;
      }
      timerRef.current = setTimeout(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, speed);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, steps.length, speed]);

  const currentStep: SearchStep | undefined =
    currentStepIndex >= 0 && currentStepIndex < steps.length
      ? steps[currentStepIndex]
      : undefined;

  // Description / Announcement message
  const stepMessage = currentStep
    ? lang === 'bn'
      ? currentStep.messageBn
      : currentStep.messageEn
    : dict.lab.idleStatus;

  return (
    <LabWrapper
      id="book-search-lab"
      title={dict.lab.title}
      description={
        lang === 'bn'
          ? 'নিচে রাফির এলোমেলো স্তূপ এবং নীলার সাজানো তাক রয়েছে। একটি কাঙ্ক্ষিত বই বেছে নিয়ে পরীক্ষা করুন কোন পদ্ধতিতে কতগুলো ধাপ লাগে।'
          : 'Compare Rafi’s unorganized pile against Nila’s numbered bookshelf. Pick a target book and see how many steps each strategy takes.'
      }
    >
      {/* Target Book & Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[var(--bg-page)] border border-[var(--border-line)] mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[var(--text-muted)]">
            {dict.lab.targetBook}:
          </span>
          <span className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg bg-[var(--brand-mango)] text-[#78350F] font-heading font-extrabold text-xl shadow-sm">
            #{formatNumber(target, lang)}
          </span>
          <button
            type="button"
            onClick={handleNewTarget}
            disabled={isPlaying}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] text-[var(--text-ink)] hover:border-[var(--brand-teal)] hover:text-[var(--brand-teal)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
          >
            <Sparkles className="w-4 h-4 text-[var(--brand-mango)]" aria-hidden="true" />
            <span>{dict.lab.newBook}</span>
          </button>
        </div>

        {/* Search Algorithm Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleSearchHeap}
            disabled={isPlaying}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold min-h-[44px] transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)] ${
              activeMode === 'heap'
                ? 'bg-[#E11D48] text-white ring-2 ring-[#E11D48]/30'
                : 'bg-[var(--bg-surface)] text-[var(--text-ink)] border border-[var(--border-line)] hover:border-[#E11D48] hover:text-[#E11D48]'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            <span>{dict.lab.searchHeap}</span>
          </button>

          <button
            type="button"
            onClick={handleSearchShelf}
            disabled={isPlaying}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold min-h-[44px] transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)] ${
              activeMode === 'shelf'
                ? 'bg-[var(--brand-teal)] text-white ring-2 ring-[var(--brand-teal)]/30'
                : 'bg-[var(--bg-surface)] text-[var(--text-ink)] border border-[var(--border-line)] hover:border-[var(--brand-teal)] hover:text-[var(--brand-teal)]'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            <span>{dict.lab.searchShelf}</span>
          </button>
        </div>
      </div>

      {/* Live Step Announcement Region (ARIA LIVE) */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="p-3.5 sm:p-4 rounded-xl bg-[var(--bg-surface)] border-l-4 border-[var(--brand-teal)] shadow-sm mb-6 min-h-[56px] flex items-center justify-between gap-4"
      >
        <p className="text-sm sm:text-base font-medium text-[var(--text-ink)] leading-snug">
          {stepMessage}
        </p>
        {currentStep && (
          <span
            className={`flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold ${
              currentStep.status === 'found'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
            }`}
          >
            {currentStep.status === 'found' ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{lang === 'bn' ? 'পাওয়া গেছে' : 'Found'}</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{lang === 'bn' ? 'পরীক্ষা চলছে' : 'Scanning'}</span>
              </>
            )}
          </span>
        )}
      </div>

      {/* Visual Workspace: Heap vs Shelf */}
      <div className="space-y-8">
        {/* VIEW 1: Rafi's Messy Heap (Linear Search) */}
        <div
          className={`p-4 sm:p-5 rounded-xl border transition-all ${
            activeMode === 'heap'
              ? 'border-[#E11D48] bg-[var(--bg-surface)] ring-1 ring-[#E11D48]/30 shadow-sm'
              : 'border-[var(--border-line)] bg-[var(--bg-surface)]/60'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-heading font-bold text-sm sm:text-base text-[var(--text-ink)] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" aria-hidden="true" />
              <span>{dict.lab.heapLabel}</span>
            </h4>
            {activeMode === 'heap' && currentStep && (
              <span className="text-xs font-semibold text-[#E11D48]">
                {dict.lab.stepsTaken}: {formatNumber(currentStep.stepNumber, lang)}
              </span>
            )}
          </div>

          {/* Book Cards Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {heapBooks.map((bookNum, idx) => {
              const isChecking = activeMode === 'heap' && currentStep?.currentIndex === idx;
              const isFound = isChecking && currentStep?.status === 'found';
              const isDiscarded =
                activeMode === 'heap' && currentStep?.discardedIndices.includes(idx);

              return (
                <motion.div
                  key={`heap-${idx}-${bookNum}`}
                  layout={!shouldReduceMotion}
                  animate={
                    isChecking
                      ? { scale: shouldReduceMotion ? 1 : 1.08, y: shouldReduceMotion ? 0 : -4 }
                      : { scale: 1, y: 0 }
                  }
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  className={`relative p-2 rounded-lg text-center border font-mono font-bold text-sm select-none transition-colors min-h-[52px] flex flex-col items-center justify-center ${
                    isFound
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400'
                      : isChecking
                      ? 'bg-[#E11D48] text-white border-[#BE123C] shadow-md ring-2 ring-[#FDA4AF]'
                      : isDiscarded
                      ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 border-gray-200 dark:border-gray-700 opacity-60'
                      : 'bg-[var(--bg-page)] text-[var(--text-ink)] border-[var(--border-line)] hover:border-[var(--brand-teal)]'
                  }`}
                >
                  <span className="text-xs opacity-75 font-sans font-normal">
                    #{formatNumber(idx + 1, lang)}
                  </span>
                  <span className="text-base font-extrabold">
                    {formatNumber(bookNum, lang)}
                  </span>
                  {isFound && (
                    <Check className="w-3.5 h-3.5 absolute top-1 right-1" aria-hidden="true" />
                  )}
                  {isDiscarded && (
                    <X className="w-3 h-3 absolute top-1 right-1 opacity-40" aria-hidden="true" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* VIEW 2: Nila's Ordered Shelf (Binary Search) */}
        <div
          className={`p-4 sm:p-5 rounded-xl border transition-all ${
            activeMode === 'shelf'
              ? 'border-[var(--brand-teal)] bg-[var(--bg-surface)] ring-1 ring-[var(--brand-teal)]/30 shadow-sm'
              : 'border-[var(--border-line)] bg-[var(--bg-surface)]/60'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-heading font-bold text-sm sm:text-base text-[var(--text-ink)] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-teal)]" aria-hidden="true" />
              <span>{dict.lab.shelfLabel}</span>
            </h4>
            {activeMode === 'shelf' && currentStep && (
              <span className="text-xs font-semibold text-[var(--brand-teal)]">
                {dict.lab.stepsTaken}: {formatNumber(currentStep.stepNumber, lang)}
              </span>
            )}
          </div>

          {/* Book Cards Grid on the Shelf */}
          <div className="relative">
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pb-2">
              {sortedBooks.map((bookNum, idx) => {
                const isMid = activeMode === 'shelf' && currentStep?.mid === idx;
                const isFound = isMid && currentStep?.status === 'found';
                const isDiscarded =
                  activeMode === 'shelf' && currentStep?.discardedIndices.includes(idx);

                return (
                  <motion.div
                    key={`shelf-${idx}-${bookNum}`}
                    layout={!shouldReduceMotion}
                    animate={
                      isMid
                        ? { scale: shouldReduceMotion ? 1 : 1.08, y: shouldReduceMotion ? 0 : -6 }
                        : { scale: 1, y: 0 }
                    }
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    className={`relative p-2 rounded-lg text-center border font-mono font-bold text-sm select-none transition-colors min-h-[52px] flex flex-col items-center justify-center ${
                      isFound
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400'
                        : isMid
                        ? 'bg-[var(--brand-teal)] text-white border-[#0D655E] shadow-md ring-2 ring-[var(--brand-teal-light)]'
                        : isDiscarded
                        ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 border-gray-200 dark:border-gray-700 opacity-40'
                        : 'bg-[var(--bg-page)] text-[var(--text-ink)] border-[var(--border-line)]'
                    }`}
                  >
                    <span className="text-xs opacity-75 font-sans font-normal">
                      #{formatNumber(idx + 1, lang)}
                    </span>
                    <span className="text-base font-extrabold">
                      {formatNumber(bookNum, lang)}
                    </span>
                    {isFound && (
                      <Check className="w-3.5 h-3.5 absolute top-1 right-1" aria-hidden="true" />
                    )}
                    {isMid && !isFound && (
                      <Search className="w-3 h-3 absolute top-1 right-1 text-white" aria-hidden="true" />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Thick wooden shelf line underneath */}
            <div className="h-3.5 bg-[#78350F] rounded-sm w-full shadow-sm mt-1">
              <div className="h-1 bg-[#B45309] w-full rounded-t-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* StepPlayer Controls */}
      {steps.length > 0 && (
        <StepPlayer
          currentStepIndex={currentStepIndex}
          totalSteps={steps.length}
          isPlaying={isPlaying}
          speed={speed}
          lang={lang}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onStepForward={() => {
            if (currentStepIndex < steps.length - 1) {
              setCurrentStepIndex((prev) => prev + 1);
            }
          }}
          onStepBack={() => {
            if (currentStepIndex > 0) {
              setCurrentStepIndex((prev) => prev - 1);
            }
          }}
          onReset={() => {
            setIsPlaying(false);
            setCurrentStepIndex(0);
          }}
          onSpeedChange={(newSpeed) => setSpeed(newSpeed)}
        />
      )}
    </LabWrapper>
  );
}

