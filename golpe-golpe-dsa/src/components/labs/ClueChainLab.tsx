'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Locale } from '@/lib/i18n/config';
import { formatNumber } from '@/lib/i18n/dictionaries';
import {
  ClueNode,
  LinkedListStep,
  INITIAL_CLUES,
  KITCHEN_CLUE,
  traverseSteps,
  insertAfterSteps,
  deleteSteps,
} from '@/lib/algorithms/linkedList';
import { LabWrapper } from './LabWrapper';
import { StepPlayer } from './StepPlayer';
import {
  Footprints,
  PlusCircle,
  Trash2,
  RotateCcw,
  ArrowRight,
  Sparkles,
  CornerDownRight,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface ClueChainLabProps {
  lang: Locale;
}

export function ClueChainLab({ lang }: ClueChainLabProps) {
  const isBn = lang === 'bn';
  const shouldReduceMotion = useReducedMotion();

  // State
  const [chain, setChain] = useState<ClueNode[]>([...INITIAL_CLUES]);
  const [selectedClueIndex, setSelectedClueIndex] = useState<number>(2); // Default to Mango tree (index 2)
  const [steps, setSteps] = useState<LinkedListStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(750);
  const [lastAction, setLastAction] = useState<
    'walk' | 'insert' | 'remove' | null
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

  const activeStep: LinkedListStep | undefined =
    currentStepIndex >= 0 && currentStepIndex < steps.length
      ? steps[currentStepIndex]
      : undefined;

  // Sync chain on completion of animation
  useEffect(() => {
    if (steps.length > 0 && currentStepIndex === steps.length - 1) {
      setChain(steps[steps.length - 1].chainState);
    }
  }, [currentStepIndex, steps]);

  const displayChain = activeStep ? activeStep.chainState : chain;
  const isKitchenPresent = displayChain.some((node) => node.id === 'kitchen');

  // Action handlers
  const handleWalk = () => {
    if (isPlaying) return;
    const s = traverseSteps(chain, selectedClueIndex);
    setLastAction('walk');
    setSteps(s);
    setCurrentStepIndex(0);
    setIsPlaying(s.length > 1);
  };

  const handleInsert = () => {
    if (isPlaying || isKitchenPresent) return;
    const s = insertAfterSteps(chain, selectedClueIndex, KITCHEN_CLUE);
    setLastAction('insert');
    setSteps(s);
    setCurrentStepIndex(0);
    setIsPlaying(s.length > 1);
  };

  const handleRemove = () => {
    if (isPlaying) return;
    const s = deleteSteps(chain, selectedClueIndex);
    setLastAction('remove');
    setSteps(s);
    setCurrentStepIndex(0);
    setIsPlaying(s.length > 1);
  };

  const handleReset = () => {
    if (isPlaying) return;
    setChain([...INITIAL_CLUES]);
    setSelectedClueIndex(Math.min(selectedClueIndex, INITIAL_CLUES.length - 1));
    setSteps([]);
    setCurrentStepIndex(-1);
    setIsPlaying(false);
    setLastAction(null);
  };

  // Live Step Message
  const currentMessage = activeStep
    ? isBn
      ? activeStep.messageBn
      : activeStep.messageEn
    : isBn
    ? 'চিরকুট নম্বর নির্বাচন করে উপরের বোতামে চাপ দিন।'
    : 'Select a clue number and click any action button above.';

  const accessibleDescription = isBn
    ? `চিরকুটের শিকলে বর্তমানে ${formatNumber(displayChain.length, lang)}টি চিরকুট রয়েছে। শুরু: ${
        displayChain[0]?.nameBn || ''
      }`
    : `Chain of ${displayChain.length} clues, starting at ${
        displayChain[0]?.nameEn || ''
      }`;

  return (
    <LabWrapper
      id="clue-chain-lab"
      title={
        isBn
          ? 'চিরকুটের শিকল ল্যাব (Clue Chain Lab)'
          : 'Interactive Clue Chain Lab'
      }
      description={
        isBn
          ? 'গুপ্তধন খোঁজার চিরকুটের শিকলে হেঁটে যাওয়া এবং নতুন চিরকুট জুড়ে দেওয়ার কৌশল পরীক্ষা করে দেখুন।'
          : 'Explore a treasure hunt chain of clues to see why traversal requires hops, but inserting only changes 1 or 2 links.'
      }
    >
      {/* Selector & Actions Bar */}
      <div className="p-4 sm:p-5 rounded-xl bg-[var(--bg-page)] border border-[var(--border-line)] mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border-line)] mb-4">
          {/* Clue selector */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="clue-select"
              className="text-xs sm:text-sm font-semibold text-[var(--text-ink)]"
            >
              {isBn ? 'চিরকুট নম্বর নির্বাচন:' : 'Select Clue #:'}
            </label>
            <select
              id="clue-select"
              value={selectedClueIndex}
              onChange={(e) => setSelectedClueIndex(Number(e.target.value))}
              disabled={isPlaying}
              className="px-3 py-2 rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] text-[var(--text-ink)] font-mono font-bold text-base focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)] min-h-[44px]"
            >
              {displayChain.map((node, i) => (
                <option key={node.id} value={i}>
                  {formatNumber(i + 1, lang)}. {isBn ? node.nameBn : node.nameEn}
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* 1. Walk to this clue */}
          <button
            type="button"
            onClick={handleWalk}
            disabled={isPlaying}
            className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[var(--bg-surface)] text-[var(--text-ink)] border border-[var(--border-line)] hover:border-[var(--brand-teal)] hover:text-[var(--brand-teal)] shadow-sm disabled:opacity-50 transition-all min-h-[44px] focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)]"
          >
            <Footprints className="w-4 h-4 text-[var(--brand-teal)]" aria-hidden="true" />
            <span>{isBn ? 'এই চিরকুটে হেঁটে যান' : 'Walk to this clue'}</span>
          </button>

          {/* 2. Insert Kitchen after this clue */}
          <button
            type="button"
            onClick={handleInsert}
            disabled={isPlaying || isKitchenPresent}
            className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[var(--brand-teal)] text-white hover:bg-[#0D655E] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all min-h-[44px] focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)]"
            title={
              isKitchenPresent
                ? isBn
                  ? 'রান্নাঘর ইতোমধ্যেই শিকলে আছে। পুনরায় পরীক্ষা করতে রিসেট করুন।'
                  : 'Kitchen is already in the chain. Press Reset to try again.'
                : undefined
            }
          >
            <PlusCircle className="w-4 h-4" aria-hidden="true" />
            <span>
              {isBn
                ? 'পরে রান্নাঘর যোগ করুন'
                : 'Insert Kitchen after this clue'}
            </span>
          </button>

          {/* 3. Remove this clue */}
          <button
            type="button"
            onClick={handleRemove}
            disabled={isPlaying || displayChain.length <= 1}
            className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[var(--bg-surface)] text-rose-600 border border-[var(--border-line)] hover:border-rose-600 shadow-sm disabled:opacity-50 transition-all min-h-[44px] focus-visible:outline-2 focus-visible:outline-rose-600"
          >
            <Trash2 className="w-4 h-4 text-rose-600" aria-hidden="true" />
            <span>{isBn ? 'এই চিরকুটটি সরান' : 'Remove this clue'}</span>
          </button>
        </div>

        {isKitchenPresent && (
          <p className="mt-3 text-xs text-[var(--text-muted)] italic">
            {isBn
              ? '* "রান্নাঘর" চিরকুটটি বর্তমানে শিকলে যুক্ত রয়েছে। আবার নতুন করে পরীক্ষা করতে "রিসেট" বাটনে চাপুন।'
              : '* "Kitchen" is already placed in the chain. Press "Reset" to test a different position.'}
          </p>
        )}
      </div>

      {/* Live Step Announcement Region (ARIA LIVE) */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="p-3.5 sm:p-4 rounded-xl bg-[var(--bg-surface)] border-l-4 border-[var(--brand-teal)] shadow-sm mb-6 min-h-[60px] flex items-center justify-between gap-4"
      >
        <p className="text-sm sm:text-base font-medium text-[var(--text-ink)] leading-snug">
          {currentMessage}
        </p>

        {activeStep && (
          <div className="flex-shrink-0 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-[var(--brand-teal-light)]/40 text-[var(--brand-teal)]">
              <Footprints className="w-3.5 h-3.5" aria-hidden="true" />
              <span>
                {isBn
                  ? `হপ: ${formatNumber(activeStep.hopsSoFar, lang)}`
                  : `Hops: ${activeStep.hopsSoFar}`}
              </span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>
                {isBn
                  ? `পয়েন্টার পরিবর্তন: ${formatNumber(
                      activeStep.pointerChangesSoFar,
                      lang
                    )}`
                  : `Pointers: ${activeStep.pointerChangesSoFar}`}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Accessible Text Description */}
      <p className="sr-only">{accessibleDescription}</p>

      {/* Visual Chain Workspace: Wrapping Cards (Never scrolls horizontally) */}
      <div
        className="p-5 sm:p-7 rounded-2xl border border-[var(--border-line)] bg-[var(--bg-surface)] shadow-sm"
        role="region"
        aria-label="Linked List Clue Chain Visualizer"
      >
        {/* Main Chain */}
        <div className="flex flex-wrap items-center gap-y-6 gap-x-2 sm:gap-x-3">
          {displayChain.map((node, idx) => {
            const isHead = idx === 0;
            const isTail = idx === displayChain.length - 1;
            const isSelected = selectedClueIndex === idx;
            const isActive = activeStep?.activeNodeId === node.id;
            const isSource = activeStep?.sourceNodeId === node.id;

            return (
              <div
                key={`node-${node.id}`}
                className="flex items-center gap-2 sm:gap-3"
              >
                {/* Clue Card */}
                <motion.div
                  tabIndex={0}
                  role="button"
                  aria-label={`${formatNumber(idx + 1, lang)}. ${
                    isBn ? node.nameBn : node.nameEn
                  }${isHead ? ' (Start/Head)' : ''}${isTail ? ' (End/Tail)' : ''}`}
                  onClick={() => !isPlaying && setSelectedClueIndex(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      !isPlaying && setSelectedClueIndex(idx);
                    }
                  }}
                  layout={!shouldReduceMotion}
                  animate={
                    isActive
                      ? {
                          scale: shouldReduceMotion ? 1 : 1.05,
                          y: shouldReduceMotion ? 0 : -4,
                        }
                      : { scale: 1, y: 0 }
                  }
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  className={`relative p-3 sm:p-4 rounded-xl border-2 flex flex-col justify-between min-w-[125px] sm:min-w-[145px] min-h-[92px] select-none transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-[var(--brand-teal)] cursor-pointer ${
                    isSelected
                      ? 'ring-2 ring-[var(--brand-teal)] shadow-md'
                      : ''
                  } ${
                    isActive
                      ? 'bg-[var(--brand-teal)] text-white border-[#0D655E] ring-2 ring-[var(--brand-teal-light)]'
                      : isSource
                      ? 'bg-amber-500 text-white border-amber-600 ring-2 ring-amber-300'
                      : node.id === 'kitchen'
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-900 dark:text-amber-100'
                      : 'bg-[var(--bg-page)] text-[var(--text-ink)] border-[var(--border-line)] hover:border-[var(--brand-teal)]'
                  }`}
                >
                  {/* Top Bar: Start/End Tag & Number */}
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        isHead
                          ? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100'
                          : isTail
                          ? 'bg-rose-200 text-rose-900 dark:bg-rose-900 dark:text-rose-100'
                          : 'opacity-0'
                      }`}
                    >
                      {isHead
                        ? isBn
                          ? 'শুরু'
                          : 'Start'
                        : isTail
                        ? isBn
                          ? 'শেষ'
                          : 'End'
                        : ''}
                    </span>

                    <span className="text-[11px] font-mono font-bold opacity-75">
                      #{formatNumber(idx + 1, lang)}
                    </span>
                  </div>

                  {/* Clue Label */}
                  <div className="font-heading font-extrabold text-xs sm:text-sm leading-tight my-auto">
                    {isBn ? node.nameBn : node.nameEn}
                  </div>

                  {/* Bottom indicator */}
                  <div className="text-[9px] font-mono opacity-60 mt-1">
                    {isTail
                      ? isBn
                        ? 'পরবর্তী: নেই (null)'
                        : 'next: null'
                      : isBn
                      ? 'পরবর্তী লিংক →'
                      : 'link →'}
                  </div>
                </motion.div>

                {/* Arrow Pointer to Next Card */}
                {!isTail && (
                  <div
                    className="flex-shrink-0 flex items-center justify-center text-[var(--brand-teal)]"
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-5 h-5 animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Floating Pending Node (When inserting in the middle) */}
        {activeStep?.newPendingNode && (
          <div className="mt-8 pt-6 border-t border-dashed border-[var(--border-line)]">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <CornerDownRight className="w-4 h-4" />
              <span>
                {isBn
                  ? 'নতুন তৈরি চিরকুট (শিকলে যুক্ত হওয়ার অপেক্ষায়):'
                  : 'New slip prepared (waiting to be linked):'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3.5 sm:p-4 rounded-xl border-2 border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100 min-w-[140px] shadow-md animate-bounce">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block mb-0.5">
                  {isBn ? 'নতুন নোড' : 'New Node'}
                </span>
                <span className="font-heading font-extrabold text-sm sm:text-base block">
                  {isBn
                    ? activeStep.newPendingNode.nameBn
                    : activeStep.newPendingNode.nameEn}
                </span>
                <span className="text-[10px] font-mono opacity-80 block mt-1">
                  {activeStep.pendingNextId
                    ? isBn
                      ? `লিংক → ${
                          displayChain.find(
                            (n) => n.id === activeStep.pendingNextId
                          )?.nameBn || ''
                        }`
                      : `points to → ${
                          displayChain.find(
                            (n) => n.id === activeStep.pendingNextId
                          )?.nameEn || ''
                        }`
                    : isBn
                    ? 'লিংক এখনো যুক্ত হয়নি'
                    : 'next: not connected'}
                </span>
              </div>

              {activeStep.pendingNextId && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    {isBn
                      ? 'ধাপ ২ সম্পন্ন: নতুনটির লিংক পুরোনো পরেরটার দিকে যুক্ত!'
                      : 'Step 2 done: new slip linked to old next slip!'}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
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

      {/* "What Happened" / Comparison Card */}
      <div className="mt-6 p-4 rounded-xl bg-[var(--brand-teal-light)]/20 dark:bg-[var(--brand-teal-light)]/10 border border-[var(--brand-teal)]/30 flex items-start gap-3">
        <Info
          className="w-5 h-5 text-[var(--brand-teal)] flex-shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div className="text-sm leading-relaxed text-[var(--text-ink)]">
          <p className="font-heading font-bold text-[var(--brand-teal)] mb-0.5">
            {isBn ? 'অ্যারে বনাম লিংকড লিস্টের তফাত' : 'Array vs Linked List Comparison'}
          </p>
          <p>
            {isBn ? (
              <span>
                <strong>লিংকড লিস্ট:</strong> নির্দিষ্ট কোনো চিরকুটে পৌঁছাতে শুরু
                থেকে লিংক ধরে ধরে <strong>হপ (hops)</strong> করতে হয়, কিন্তু
                একবার পৌঁছালে পরিবর্তন করতে লাগে মাত্র <strong>১ বা ২টি পয়েন্টার পরিবর্তন</strong> (কাউকে
                সরাতে হয় না, ০টি কার্ড সরানো)।
                <br className="my-1" />
                <strong>অ্যারে (লকার):</strong> ইনডেক্স ধরে সরাসরি ১ ধাপেই পৌঁছানো
                যায়, কিন্তু মাঝখানে কাউকে ঢোকাতে গেলে পেছনের সবাইকে ঠেলে সরাতে
                হয়।
              </span>
            ) : (
              <span>
                <strong>Linked list:</strong> Reaching a spot takes hops, but
                changing the chain is only a couple of pointer changes (0 cards
                moved).
                <br className="my-1" />
                <strong>Array:</strong> Reaching a spot takes 1 step, but
                inserting in the middle shifts many items.
              </span>
            )}
          </p>
        </div>
      </div>
    </LabWrapper>
  );
}
