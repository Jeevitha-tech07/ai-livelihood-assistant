'use client';

import React from 'react';
import { Sparkles, Compass } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function WelcomeHero() {
  const { currentLanguage } = useLanguage();

  const content = {
    en: {
      badge: 'Government NSQF Aligned',
      title: 'AI Voice Livelihood Assistant',
      subtitle:
        'Discover official NSQF skill qualifications, government-aligned career pathways, and customized livelihood opportunities in your preferred language.',
    },
    ta: {
      badge: 'அரசு NSQF தரநிலை கொண்டது',
      title: 'செயற்கை நுண்ணறிவு வாழ்வாதார உதவியாளர்',
      subtitle:
        'அரசு அங்கீகாரம் பெற்ற NSQF திறன் தகுதிகள் மற்றும் உங்களுக்கான வேலைவாய்ப்பு வழிகளை உங்கள் தாய்மொழியில் கண்டறியுங்கள்.',
    },
  };

  const text = content[currentLanguage as keyof typeof content] || content.en;

  return (
    <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
      {/* Hero Icon Badge */}
      <div className="relative flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 ring-8 ring-emerald-50 dark:ring-emerald-950/30 shadow-lg shadow-emerald-100/50">
        <Sparkles className="w-10 h-10 animate-pulse" />
        <Compass className="w-5 h-5 absolute -bottom-1 -right-1 text-emerald-700 dark:text-emerald-300" />
      </div>

      {/* Tagline Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
        <Sparkles className="w-3.5 h-3.5" />
        {text.badge}
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
        {text.title}
      </h1>

      {/* One-Line Value Proposition */}
      <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
        {text.subtitle}
      </p>
    </div>
  );
}
