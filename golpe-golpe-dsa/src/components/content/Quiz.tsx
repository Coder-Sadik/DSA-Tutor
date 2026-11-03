'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/lib/i18n/config';
import { getDictionary, formatNumber } from '@/lib/i18n/dictionaries';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw } from 'lucide-react';

export interface QuizOption {
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

interface QuizProps {
  chapterSlug: string;
  lang: Locale;
  questions: QuizQuestion[];
}

export function Quiz({ chapterSlug, lang, questions }: QuizProps) {
  const dict = getDictionary(lang);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const storageKey = `golpe-quiz-${chapterSlug}`;

  // Restore quiz state safely from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.score === 'number' && parsed.isFinished) {
          setScore(parsed.score);
          setIsFinished(true);
        }
      }
    } catch (e) {
      console.warn('Could not read quiz state from localStorage:', e);
    }
  }, [storageKey]);

  const currentQ = questions[currentIdx];
  const totalQ = questions.length;

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOptionIdx(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOptionIdx === null || hasAnswered) return;
    setHasAnswered(true);
    const chosen = currentQ.options[selectedOptionIdx];
    if (chosen.isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < totalQ - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionIdx(null);
      setHasAnswered(false);
    } else {
      setIsFinished(true);
      // Save result in localStorage
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({ isFinished: true, score })
        );
      } catch (e) {
        console.warn('Could not save quiz state to localStorage:', e);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOptionIdx(null);
    setHasAnswered(false);
    setScore(0);
    setIsFinished(false);
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.warn('Could not clear quiz state in localStorage:', e);
    }
  };

  if (!currentQ && !isFinished) return null;

  return (
    <section
      aria-labelledby="quiz-section-title"
      className="my-12 p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border-2 border-[var(--brand-teal)]/30 shadow-md"
    >
      <header className="mb-6 pb-4 border-b border-[var(--border-line)]">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--brand-teal-light)]/40 text-[var(--brand-teal)] flex items-center justify-center">
            <HelpCircle className="w-4 h-4" aria-hidden="true" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-teal)]">
            {dict.quiz.title}
          </span>
        </div>
        <h3 id="quiz-section-title" className="text-xl sm:text-2xl font-heading font-bold text-[var(--text-ink)]">
          {dict.quiz.subtitle}
        </h3>
      </header>

      {isFinished ? (
        // Results Card
        <div className="text-center py-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--brand-mango-light)]/40 text-[var(--brand-mango)] flex items-center justify-center shadow-inner">
            <Award className="w-8 h-8" aria-hidden="true" />
          </div>
          <h4 className="text-2xl font-heading font-extrabold text-[var(--text-ink)] mb-2">
            {dict.quiz.scoreTitle}
          </h4>
          <p className="text-lg text-[var(--text-muted)] mb-6">
            {dict.quiz.scoreSummary(score, totalQ)}
          </p>
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-bold text-sm bg-[var(--brand-teal)] text-white hover:bg-[#0D655E] transition-colors shadow-sm min-h-[44px]"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>{dict.quiz.tryAgain}</span>
          </button>
        </div>
      ) : (
        // Active Question
        <div>
          {/* Question progress */}
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-muted)] mb-3">
            <span>
              {dict.lab.step} {formatNumber(currentIdx + 1, lang)} / {formatNumber(totalQ, lang)}
            </span>
            <span className="text-[var(--brand-teal)]">
              {lang === 'bn' ? `স্কোর: ${formatNumber(score, lang)}` : `Score: ${score}`}
            </span>
          </div>

          <h4 className="text-lg sm:text-xl font-heading font-bold text-[var(--text-ink)] mb-4 leading-snug">
            {currentQ.question}
          </h4>

          {/* Options */}
          <div className="space-y-3" role="radiogroup" aria-label={currentQ.question}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOptionIdx === idx;
              let borderClass = 'border-[var(--border-line)] hover:border-[var(--brand-teal)]';
              let bgClass = 'bg-[var(--bg-page)]';

              if (hasAnswered) {
                if (opt.isCorrect) {
                  borderClass = 'border-emerald-500 ring-1 ring-emerald-500';
                  bgClass = 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100';
                } else if (isSelected && !opt.isCorrect) {
                  borderClass = 'border-rose-500 ring-1 ring-rose-500';
                  bgClass = 'bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100';
                }
              } else if (isSelected) {
                borderClass = 'border-[var(--brand-teal)] ring-2 ring-[var(--brand-teal)]/30';
                bgClass = 'bg-[var(--brand-teal-light)]/20';
              }

              return (
                <button
                  key={`opt-${idx}`}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 min-h-[44px] focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)] ${borderClass} ${bgClass}`}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border border-[var(--border-line)] flex items-center justify-center mt-0.5 text-xs font-bold font-mono">
                    {formatNumber(idx + 1, lang)}
                  </div>
                  <span className="flex-1 text-sm sm:text-base leading-relaxed text-[var(--text-ink)]">
                    {opt.text}
                  </span>
                  {hasAnswered && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" aria-hidden="true" />
                  )}
                  {hasAnswered && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation */}
          {hasAnswered && selectedOptionIdx !== null && (
            <div
              className={`mt-4 p-4 rounded-xl border text-sm leading-relaxed ${
                currentQ.options[selectedOptionIdx].isCorrect
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-200'
                  : 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-200'
              }`}
            >
              <p className="font-bold mb-1 flex items-center gap-1.5">
                {currentQ.options[selectedOptionIdx].isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                    <span>{dict.quiz.correct}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" aria-hidden="true" />
                    <span>{dict.quiz.incorrect}</span>
                  </>
                )}
              </p>
              <p>{currentQ.options[selectedOptionIdx].explanation}</p>
            </div>
          )}

          {/* Action button */}
          <div className="mt-6 flex justify-end">
            {!hasAnswered ? (
              <button
                type="button"
                onClick={handleCheckAnswer}
                disabled={selectedOptionIdx === null}
                className="px-5 py-2.5 rounded-xl font-heading font-bold text-sm bg-[var(--brand-teal)] text-white hover:bg-[#0D655E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
              >
                {dict.quiz.checkAnswer}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl font-heading font-bold text-sm bg-[var(--brand-teal)] text-white hover:bg-[#0D655E] transition-colors min-h-[44px]"
              >
                {currentIdx < totalQ - 1 ? dict.quiz.nextQuestion : dict.quiz.finishQuiz}
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

