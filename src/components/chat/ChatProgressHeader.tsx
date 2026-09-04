'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/context/LanguageContext';

interface ChatProgressHeaderProps {
  currentStepIndex: number;
  totalSteps: number;
  onReset?: () => void;
}

export function ChatProgressHeader({
  currentStepIndex,
  totalSteps,
  onReset,
}: ChatProgressHeaderProps) {
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage();

  const percentage = Math.round(((currentStepIndex) / totalSteps) * 100);

  const text = {
    en: {
      title: 'Livelihood Assessment',
      step: `Question ${Math.min(currentStepIndex + 1, totalSteps)} of ${totalSteps}`,
      completed: `${percentage}% Completed`,
      reset: 'Restart Interview',
    },
    ta: {
      title: 'வாழ்வாதார மதிப்பீடு',
      step: `கேள்வி ${Math.min(currentStepIndex + 1, totalSteps)} / ${totalSteps}`,
      completed: `${percentage}% முடிந்தது`,
      reset: 'மீண்டும் தொடங்கு',
    },
  }[currentLanguage as 'en' | 'ta'] || {
    title: 'Livelihood Assessment',
    step: `Question ${Math.min(currentStepIndex + 1, totalSteps)} of ${totalSteps}`,
    completed: `${percentage}% Completed`,
    reset: 'Restart Interview',
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sm:px-6 sticky top-0 z-10 shadow-sm">
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg">
              {text.title}
            </h2>
            
            {/* Interactive Language Switcher Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
              {availableLanguages
                .filter((l) => l.code === 'en' || l.code === 'ta')
                .map((langOpt) => (
                  <button
                    key={langOpt.code}
                    type="button"
                    onClick={() => setLanguage(langOpt.code)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1 ${
                      currentLanguage === langOpt.code
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                    title={`Switch language to ${langOpt.nativeName}`}
                  >
                    <span>{langOpt.flag}</span>
                    <span>{langOpt.nativeName}</span>
                  </button>
                ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span>{text.step}</span>
            {onReset && (
              <button
                onClick={onReset}
                className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors underline"
              >
                {text.reset}
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="space-y-1">
          <Progress value={percentage} className="h-2.5" />
          <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span>{text.completed}</span>
            <span>
              {totalSteps - currentStepIndex > 0
                ? `${totalSteps - currentStepIndex} remaining`
                : 'Finalizing'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
