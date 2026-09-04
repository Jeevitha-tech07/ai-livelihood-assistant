'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, XCircle, BarChart2 } from 'lucide-react';
import { SkillGapChart } from './SkillGapChart';
import { analyzeSkillGap } from '@/lib/nsqf/skillGapEngine';
import { useLanguage } from '@/context/LanguageContext';

interface SkillGapAnalysisCardProps {
  userSkills: string[];
  requiredCompetencies: string[];
}

export function SkillGapAnalysisCard({
  userSkills,
  requiredCompetencies,
}: SkillGapAnalysisCardProps) {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'ta' ? 'ta' : 'en';

  const { evaluations, overallMatchScore } = analyzeSkillGap(userSkills, requiredCompetencies);

  const getStatusBadge = (status: 'met' | 'partial' | 'missing') => {
    switch (status) {
      case 'met':
        return (
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-4 h-4" />
            <span>Met (100%)</span>
          </div>
        );
      case 'partial':
        return (
          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold text-xs bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
            <AlertCircle className="w-4 h-4" />
            <span>Partial (50%)</span>
          </div>
        );
      case 'missing':
        return (
          <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-bold text-xs bg-red-50 dark:bg-red-950/40 px-2.5 py-1 rounded-full border border-red-200 dark:border-red-800">
            <XCircle className="w-4 h-4" />
            <span>Missing (0%)</span>
          </div>
        );
    }
  };

  return (
    <Card className="w-full bg-slate-50/70 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800 shadow-sm mt-6">
      <CardHeader className="p-5 border-b border-slate-200/60 dark:border-slate-800 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
              {lang === 'ta' ? 'திறன் இடைவெளி பகுப்பாய்வு (Skill Gap Analysis)' : 'Competency Skill Gap Analysis'}
            </CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {lang === 'ta' ? 'அரசு NSQF தகுதித் தேவைகளுடன் ஒப்பீடு' : 'Deterministic match against official NSQF requirements'}
            </p>
          </div>
        </div>

        <Badge variant="outline" className="text-xs font-bold border-emerald-500 text-emerald-700 bg-white dark:bg-slate-900 px-3 py-1">
          {overallMatchScore}% Match
        </Badge>
      </CardHeader>

      <CardContent className="p-5 space-y-6">
        {/* Recharts Horizontal Bar Chart */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Competency Proficiency Chart
          </h4>
          <SkillGapChart evaluations={evaluations} />
        </div>

        {/* Per-Competency Rows with Required Status Icons */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Detailed Competency Breakdown
          </h4>

          {evaluations.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                {item.status === 'met' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                {item.status === 'partial' && <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />}
                {item.status === 'missing' && <XCircle className="w-5 h-5 text-red-600 shrink-0" />}

                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {item.competencyName}
                  </span>
                  {item.matchedSkills.length > 0 && (
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                      Matched: {item.matchedSkills.join(', ')}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3">
                {getStatusBadge(item.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
