'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Locale } from '@/lib/i18n/config';
import { formatNumber } from '@/lib/i18n/dictionaries';
import {
  readSteps,
  appendSteps,
  insertSteps,
  deleteSteps,
  ArrayStep,
  CAPACITY,
} from '@/lib/algorithms/array';
import { LabWrapper } from './LabWrapper';
import { StepPlayer } from './StepPlayer';
import {
  KeyRound,
  UserPlus,
  ArrowRightToLine,
  UserMinus,
  RotateCcw,
  Sparkles,
  Info,
} from 'lucide-react';

interface LockerArrayLabProps {
  lang: Locale;
}

const INITIAL_STUDENTS_EN = [
  'Rafi',
  'Nila',
  'Sumon',
  'Mitu',
  'Arif',
  'Joya',
  'Tuhin',
  null,
  null,
  null,
];

const INITIAL_STUDENTS_BN = [
  'রাফি',
  'নীলা',
  'সুমন',
  'মিতু',
  'আরিফ',
  'জয়া',
  'তুহিন',
  null,
  null,
  null,
];

export function LockerArrayLab({ lang }: LockerArrayLabProps) {
  const isBn = lang === 'bn';
  const shouldReduceMotion = useReducedMotion();

  const initialList = isBn ? INITIAL_STUDENTS_BN : INITIAL_STUDENTS_EN;
  const newStudentName = isBn ? 'তানিয়া' : 'Tania';

  // State
  const [currentLockers, setCurrentLockers] = useState<(string | null)[]>([
    ...initialList,
  ]);
  const [selectedLocker, setSelectedLocker] = useState<number>(2);
  const [steps, setSteps] = useState<ArrayStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(700);
  const [lastActionType, setLastActionType] = useState<
    'read' | 'insert' | 'append' | 'delete' | null
  >(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Playback timer
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

  // Keep lockers visually in sync with the active step
  const activeStep: ArrayStep | undefined =
    currentStepIndex >= 0 && currentStepIndex < steps.length
      ? steps[currentStepIndex]
      : undefined;

  const displayLockers = activeStep ? activeStep.arrayState : currentLockers;

  // When animation finishes or is at last step, commit the final state
  useEffect(() => {
    if (steps.length > 0 && currentStepIndex === steps.length - 1) {
      setCurrentLockers(steps[steps.length - 1].arrayState);
    }
  }, [currentStepIndex, steps]);

  // Controls Handlers
  const handleOpenLocker = () => {
    if (isPlaying) return;
    const s = readSteps(currentLockers, selectedLocker);
    setLastActionType('read');
    setSteps(s);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleAppend = () => {
    if (isPlaying) return;
    const s = appendSteps(currentLockers, newStudentName);
    setLastActionType('append');
    setSteps(s);
    setCurrentStepIndex(0);
    setIsPlaying(s.length > 1);
  };

  const handleInsert = () => {
    if (isPlaying) return;
    const s = insertSteps(currentLockers, selectedLocker, newStudentName);
    setLastActionType('insert');
    setSteps(s);
    setCurrentStepIndex(0);
    setIsPlaying(s.length > 1);
  };

  const handleDelete = () => {
    if (isPlaying) return;
    const s = deleteSteps(currentLockers, selectedLocker);
    setLastActionType('delete');
    setSteps(s);
    setCurrentStepIndex(0);
    setIsPlaying(s.length > 1);
  };

  const handleReset = () => {
    if (isPlaying) return;
    setCurrentLockers([...initialList]);
    setSteps([]);
    setCurrentStepIndex(-1);
    setIsPlaying(false);
    setLastActionType(null);
  };

  // Live Step Announcement Message
  const currentMessage = activeStep
    ? isBn
      ? activeStep.messageBn
      : activeStep.messageEn
    : isBn
    ? 'একটি লকার নম্বর বেছে নিন এবং উপরের যেকোনো অ্যাকশন বাটনে ক্লিক করুন।'
    : 'Choose a locker number and click any action button above.';

  return (
    <LabWrapper
      id="locker-array-lab"
      title={
        isBn
          ? 'লকার অ্যারে ল্যাব (Locker Array Lab)'
          : 'Interactive Locker Array Lab'
      }
      description={
        isBn
          ? '১০টি সবুজ লকারের সারিতে সরাসরি পৌঁছানো, শেষে যোগ করা ও মাঝখানে ঢোকানোর তফাত পরীক্ষা করে দেখুন।'
          : 'Explore a row of 10 green lockers to see why direct access is instant while inserting in the middle requires shifting.'
      }
    >
      {/* Selector & Action Toolbar */}
      <div className="p-4 sm:p-5 rounded-xl bg-[var(--bg-page)] border border-[var(--border-line)] mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border-line)] mb-4">
          {/* Locker number selector */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="locker-select"
              className="text-xs sm:text-sm font-semibold text-[var(--text-ink)]"
            >
              {isBn ? 'লকার নম্বর নির্বাচন:' : 'Select Locker #:'}
            </label>
            <select
              id="locker-select"
              value={selectedLocker}
              onChange={(e) => setSelectedLocker(Number(e.target.value))}
              disabled={isPlaying}
              className="px-3 py-2 rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] text-[var(--text-ink)] font-mono font-bold text-base focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)] min-h-[44px]"
            >
              {Array.from({ length: CAPACITY }, (_, i) => (
                <option key={i} value={i}>
                  {formatNumber(i, lang)}
                </option>
              ))}
            </select>
          </div>

          {/* Reset */}
          <button
            type="button"
            onClick={handleReset}
            disabled={isPlaying}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] text-[var(--text-ink)] hover:border-[var(--brand-teal)] hover:text-[var(--brand-teal)] disabled:opacity-50 transition-colors min-h-[44px]"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>{isBn ? 'রিসেট' : 'Reset'}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* 1. Open Locker */}
          <button
            type="button"
            onClick={handleOpenLocker}
            disabled={isPlaying}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[var(--bg-surface)] text-[var(--text-ink)] border border-[var(--border-line)] hover:border-[var(--brand-teal)] hover:text-[var(--brand-teal)] shadow-sm disabled:opacity-50 transition-all min-h-[44px] focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)]"
          >
            <KeyRound className="w-4 h-4 text-[var(--brand-teal)]" aria-hidden="true" />
            <span>{isBn ? 'লকার খুলুন' : 'Open Locker'}</span>
          </button>

          {/* 2. Add Tania at End */}
          <button
            type="button"
            onClick={handleAppend}
            disabled={isPlaying}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[var(--bg-surface)] text-[var(--text-ink)] border border-[var(--border-line)] hover:border-emerald-600 hover:text-emerald-600 shadow-sm disabled:opacity-50 transition-all min-h-[44px] focus-visible:outline-2 focus-visible:outline-emerald-600"
          >
            <UserPlus className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>
              {isBn ? 'শেষে তানিয়াকে রাখুন' : 'Add Tania at End'}
            </span>
          </button>

          {/* 3. Insert Tania Here */}
          <button
            type="button"
            onClick={handleInsert}
            disabled={isPlaying}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[var(--brand-teal)] text-white hover:bg-[#0D655E] shadow-sm disabled:opacity-50 transition-all min-h-[44px] focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)]"
          >
            <ArrowRightToLine className="w-4 h-4" aria-hidden="true" />
            <span>
              {isBn ? 'এখানে তানিয়াকে ঢোকান' : 'Insert Tania Here'}
            </span>
          </button>

          {/* 4. Remove Student Here */}
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPlaying}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[var(--bg-surface)] text-rose-600 border border-[var(--border-line)] hover:border-rose-600 shadow-sm disabled:opacity-50 transition-all min-h-[44px] focus-visible:outline-2 focus-visible:outline-rose-600"
          >
            <UserMinus className="w-4 h-4 text-rose-600" aria-hidden="true" />
            <span>{isBn ? 'ছাত্র সরান' : 'Remove Student'}</span>
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
          {currentMessage}
        </p>

        {activeStep && (
          <span className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-[var(--brand-teal-light)]/40 text-[var(--brand-teal)]">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>
              {isBn
                ? `সরানো হয়েছে: ${formatNumber(activeStep.movesSoFar, lang)} বার`
                : `Moves: ${activeStep.movesSoFar}`}
            </span>
          </span>
        )}
      </div>

      {/* Visual Workspace: Row of 10 Green Lockers */}
      <div className="p-4 sm:p-6 rounded-2xl border border-[var(--border-line)] bg-[var(--bg-surface)] shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between mb-3 text-xs text-[var(--text-muted)] font-medium">
          <span>{isBn ? '← দেয়াল (Wall, শুরু ০)' : '← Wall (Start at index 0)'}</span>
          <span>{isBn ? '১০টি সবুজ লকারের সারি' : 'Row of 10 Green Lockers'}</span>
        </div>

        {/* Lockers Grid / Row */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 min-w-[620px] sm:min-w-0 pb-2">
          {displayLockers.map((student, idx) => {
            const isSelected = selectedLocker === idx;
            const isTargeted = activeStep?.index === idx;
            const isShiftSource = activeStep?.from === idx;
            const isShiftDest = activeStep?.to === idx;
            const isHighlighted = isTargeted || isShiftSource || isShiftDest;

            return (
              <div
                key={`locker-col-${idx}`}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => !isPlaying && setSelectedLocker(idx)}
              >
                {/* Index label above locker */}
                <span
                  className={`text-xs font-mono font-bold mb-1.5 transition-colors ${
                    isSelected
                      ? 'text-[var(--brand-teal)] scale-110'
                      : 'text-[var(--text-muted)] group-hover:text-[var(--text-ink)]'
                  }`}
                  aria-label={
                    isBn
                      ? `ইনডেক্স ${formatNumber(idx, lang)}`
                      : `Index ${idx}`
                  }
                >
                  [{formatNumber(idx, lang)}]
                </span>

                {/* Locker Cabinet */}
                <motion.div
                  layout={!shouldReduceMotion}
                  animate={
                    isHighlighted
                      ? {
                          scale: shouldReduceMotion ? 1 : 1.05,
                          y: shouldReduceMotion ? 0 : -4,
                        }
                      : { scale: 1, y: 0 }
                  }
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  className={`w-full relative rounded-xl border-2 flex flex-col items-center justify-between p-2 select-none min-h-[110px] transition-all shadow-sm ${
                    isSelected
                      ? 'ring-2 ring-[var(--brand-teal)] shadow-md'
                      : ''
                  } ${
                    isHighlighted
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-300'
                      : student
                      ? 'bg-[#15803D] text-white border-[#166534]'
                      : 'bg-emerald-950/20 dark:bg-emerald-950/40 border-dashed border-emerald-700/40 text-[var(--text-muted)]'
                  }`}
                >
                  {/* Top Vent Slits */}
                  <div className="w-full flex flex-col items-center gap-0.5 pt-1 opacity-60">
                    <div className="w-6 h-0.5 bg-white/70 rounded-full" />
                    <div className="w-6 h-0.5 bg-white/70 rounded-full" />
                  </div>

                  {/* Student Name / Empty Label */}
                  <div className="my-auto text-center px-1">
                    {student ? (
                      <span className="font-heading font-bold text-xs sm:text-sm tracking-tight block leading-tight">
                        {student}
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono italic opacity-60 block">
                        {isBn ? 'খালি' : 'Empty'}
                      </span>
                    )}
                  </div>

                  {/* Bottom Handle & Lock Keyhole */}
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-600 shadow-inner mb-1" />
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Veranda base line */}
        <div className="h-2 bg-[#94A3B8] dark:bg-[#334155] rounded-full w-full mt-2" />
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

      {/* "What Happened" Summary Comparison */}
      <div className="mt-6 p-4 rounded-xl bg-[var(--brand-teal-light)]/20 dark:bg-[var(--brand-teal-light)]/10 border border-[var(--brand-teal)]/30 flex items-start gap-3">
        <Info
          className="w-5 h-5 text-[var(--brand-teal)] flex-shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div className="text-sm leading-relaxed text-[var(--text-ink)]">
          <p className="font-heading font-bold text-[var(--brand-teal)] mb-0.5">
            {isBn ? 'কী বুঝলাম?' : 'What Just Happened?'}
          </p>
          <p>
            {lastActionType === 'read' ? (
              isBn ? (
                <span>
                  <strong>ইনডেক্স ধরে পড়া:</strong> লকারের সংখ্যা ১০টি হোক বা
                  ১ কোটি, দূরত্ব জানা থাকায় সবসময় ঠিক <strong>১ ধাপেই</strong> পৌঁছানো
                  যায়।
                </span>
              ) : (
                <span>
                  <strong>Reading by index:</strong> Whether there are 10
                  lockers or 10 million, direct access always takes exactly{' '}
                  <strong>1 step</strong>.
                </span>
              )
            ) : lastActionType === 'insert' ? (
              isBn ? (
                <span>
                  <strong>মাঝখানে ঢোকানো:</strong> তানিয়াকে বসানোর জন্য তার
                  ডানপাশের শিক্ষার্থীদের এক ঘর করে সরাতে হয়েছে (
                  <strong>
                    {formatNumber(
                      activeStep ? activeStep.movesSoFar : 0,
                      lang
                    )}{' '}
                    বার সরানো
                  </strong>
                  )। মাঝখানে ঢোকানো বেশ খরচের!
                </span>
              ) : (
                <span>
                  <strong>Inserting in the middle:</strong> Every student to the
                  right had to shift one locker (
                  <strong>
                    {activeStep ? activeStep.movesSoFar : 0} moves
                  </strong>
                  ). Squeezing into the middle is costly!
                </span>
              )
            ) : lastActionType === 'append' ? (
              isBn ? (
                <span>
                  <strong>সবার শেষে যোগ করা:</strong> সারির পেছনে খালি লকার থাকায়
                  কাউকেই সরাতে হয়নি (<strong>০ বার সরানো</strong>)। শেষের দিকটা
                  খুবই সস্তা!
                </span>
              ) : (
                <span>
                  <strong>Adding at the end:</strong> The next locker was
                  already empty, so nobody had to move (
                  <strong>0 moves</strong>). The end is cheap!
                </span>
              )
            ) : lastActionType === 'delete' ? (
              isBn ? (
                <span>
                  <strong>মুছে ফেলা:</strong> ফাঁকা জায়গা পূরণ করতে ডানপাশের
                  সবাইকে এক ঘর বামে টানতে হয়েছে।
                </span>
              ) : (
                <span>
                  <strong>Removing:</strong> Subsequent students had to shift
                  left to close the newly opened gap.
                </span>
              )
            ) : isBn ? (
              <span>
                <strong>মূল সারমর্ম:</strong> ইনডেক্স ধরে পড়তে সবসময় ১ ধাপ।
                মাঝখানে ঢোকাতে গেলে অনেকজনকে সরাতে হয়।
              </span>
            ) : (
              <span>
                <strong>Key Takeaway:</strong> Reading is always 1 step.
                Inserting in the middle requires shifting many items.
              </span>
            )}
          </p>
        </div>
      </div>
    </LabWrapper>
  );
}
