'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { LanguageOption } from '@/types/language';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface LanguageSelectorCardProps {
  option: LanguageOption;
  onSelect?: () => void;
}

export function LanguageSelectorCard({ option, onSelect }: LanguageSelectorCardProps) {
  const { currentLanguage, setLanguage } = useLanguage();
  const isSelected = currentLanguage === option.code;

  const handleSelect = () => {
    if (option.isAvailable) {
      setLanguage(option.code);
      if (onSelect) onSelect();
    }
  };

  return (
    <Card
      onClick={handleSelect}
      className={cn(
        'relative cursor-pointer transition-all duration-200 hover:shadow-md border-2',
        isSelected
          ? 'border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 dark:border-emerald-500 ring-2 ring-emerald-500/20'
          : 'border-slate-200 hover:border-emerald-300 dark:border-slate-800 dark:hover:border-emerald-700',
        !option.isAvailable && 'opacity-60 cursor-not-allowed hover:shadow-none hover:border-slate-200'
      )}
    >
      <CardContent className="p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-3xl select-none" role="img" aria-label={option.name}>
            {option.flag}
          </span>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                {option.nativeName}
              </span>
              <span className="text-xs text-slate-500 font-medium">({option.name})</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
              {option.description}
            </span>
          </div>
        </div>

        <div>
          {isSelected ? (
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
          ) : !option.isAvailable ? (
            <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
              Soon
            </Badge>
          ) : (
            <div className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-700" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
