'use client';

import { Play, Pause, SkipForward, SkipBack, RotateCcw, Gauge } from 'lucide-react';
import { Locale } from '@/lib/i18n/config';
import { getDictionary, formatNumber } from '@/lib/i18n/dictionaries';

interface StepPlayerProps {
  currentStepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number; // in ms per step, e.g. 1000, 600, 300
  lang: Locale;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBack: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  disabled?: boolean;
}

export function StepPlayer({
  currentStepIndex,
  totalSteps,
  isPlaying,
  speed,
  lang,
  onPlay,
  onPause,
  onStepForward,
  onStepBack,
  onReset,
  onSpeedChange,
  disabled = false,
}: StepPlayerProps) {
  const dict = getDictionary(lang);
  const isAtStart = currentStepIndex <= 0;
  const isAtEnd = currentStepIndex >= totalSteps - 1;

  const speedOptions = [
    { label: '0.5x', value: 1200 },
    { label: '1x', value: 700 },
    { label: '2x', value: 350 },
  ];

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-xl bg-[var(--bg-page)] border border-[var(--border-line)] mt-6"
      role="toolbar"
      aria-label="Algorithm playback controls"
    >
      {/* Playback Buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onReset}
          disabled={disabled || (isAtStart && !isPlaying)}
          className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] text-[var(--text-ink)] hover:border-[var(--brand-teal)] hover:text-[var(--brand-teal)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title={dict.lab.reset}
          aria-label={dict.lab.reset}
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onStepBack}
          disabled={disabled || isPlaying || isAtStart}
          className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] text-[var(--text-ink)] hover:border-[var(--brand-teal)] hover:text-[var(--brand-teal)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title={dict.lab.prevStep}
          aria-label={dict.lab.prevStep}
        >
          <SkipBack className="w-4 h-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={isPlaying ? onPause : onPlay}
          disabled={disabled || (isAtEnd && !isPlaying)}
          className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-4 py-2.5 rounded-lg bg-[var(--brand-teal)] text-white font-medium hover:bg-[#0D655E] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
          aria-label={isPlaying ? dict.lab.pause : dict.lab.play}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 mr-1.5" aria-hidden="true" />
              <span>{dict.lab.pause}</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-1.5" aria-hidden="true" />
              <span>{dict.lab.play}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onStepForward}
          disabled={disabled || isPlaying || isAtEnd}
          className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] text-[var(--text-ink)] hover:border-[var(--brand-teal)] hover:text-[var(--brand-teal)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title={dict.lab.nextStep}
          aria-label={dict.lab.nextStep}
        >
          <SkipForward className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* Step Counter & Speed */}
      <div className="flex items-center gap-4 text-xs sm:text-sm font-medium">
        <div className="text-[var(--text-muted)]">
          <span>{dict.lab.step}: </span>
          <span className="font-bold text-[var(--text-ink)]">
            {formatNumber(totalSteps > 0 ? currentStepIndex + 1 : 0, lang)}
          </span>
          <span> / </span>
          <span>{formatNumber(totalSteps, lang)}</span>
        </div>

        {/* Speed toggle */}
        <div className="flex items-center gap-1 bg-[var(--bg-surface)] p-1 rounded-lg border border-[var(--border-line)]">
          <Gauge className="w-3.5 h-3.5 text-[var(--text-muted)] ml-1" aria-hidden="true" />
          {speedOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSpeedChange(opt.value)}
              className={`px-2 py-1 rounded text-xs min-h-[32px] font-semibold transition-colors ${
                speed === opt.value
                  ? 'bg-[var(--brand-teal)] text-white'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-ink)]'
              }`}
              aria-pressed={speed === opt.value}
              aria-label={`Playback speed ${opt.label}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

