'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, CheckCircle2, Loader2, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface MilestoneStage {
  id: string;
  label: { en: string; ta: string };
  description: { en: string; ta: string };
  status: 'done' | 'in_progress' | 'pending';
}

export function MyJourneyTracker() {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'ta' ? 'ta' : 'en';

  const stages: MilestoneStage[] = [
    {
      id: 'assessment',
      label: { en: '1. Voice Assessment', ta: '1. குரல் மதிப்பீடு' },
      description: { en: 'Beneficiary speech & interview completed', ta: 'குரல் வழியே நேர்காணல் முடிந்தது' },
      status: 'done',
    },
    {
      id: 'profile',
      label: { en: '2. Profile Extraction', ta: '2. சுயவிவரம் எடுத்தல்' },
      description: { en: '8 structured JSON fields confirmed', ta: '8 சுயவிவரத் தகவல்கள் உறுதிசெய்யப்பட்டன' },
      status: 'done',
    },
    {
      id: 'skill_gap',
      label: { en: '3. NSQF Skill Gap', ta: '3. திறன் இடைவெளி பகுப்பாய்வு' },
      description: { en: 'Competencies analyzed against dataset', ta: 'NSQF தரவுத்தளத்துடன் ஒப்பீடு முடிந்தது' },
      status: 'done',
    },
    {
      id: 'training',
      label: { en: '4. NSQF Level 4 Training', ta: '4. NSQF பயிற்சி' },
      description: { en: '400-hour Self Employed Tailor course in progress', ta: '400 மணிநேர தையல் பயிற்சி நடைபெறுகிறது' },
      status: 'in_progress',
    },
    {
      id: 'training_centre',
      label: { en: '5. Training Centre Allocation', ta: '5. பயிற்சி மைய ஒதுக்கீடு' },
      description: { en: 'Government ITI Salem (4.2 km)', ta: 'சேலம் அரசு ITI பயிற்சி மையம்' },
      status: 'pending',
    },
    {
      id: 'employment_business',
      label: { en: '6. PM-AJAY & Enterprise Launch', ta: '6. PM-AJAY & சுயதொழில்' },
      description: { en: '₹50,000 capital subsidy application', ta: '₹50,000 மானிய விண்ணப்பம்' },
      status: 'pending',
    },
    {
      id: 'livelihood_goal',
      label: { en: '7. Livelihood Goal Accomplished', ta: '7. வாழ்வாதார இலக்கு அடைதல்' },
      description: { en: 'Sustainable monthly income & boutique growth', ta: 'நிலையான மாதாந்திர வருமான வளர்ச்சி' },
      status: 'pending',
    },
  ];

  return (
    <Card className="w-full bg-slate-900 text-white border-slate-800 shadow-xl overflow-hidden mt-8">
      <CardHeader className="p-6 border-b border-slate-800 bg-slate-950/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-950">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-xl font-extrabold text-white flex items-center gap-2">
                <span>{lang === 'ta' ? 'எனது வாழ்வாதாரப் பயணம் (My Journey)' : 'My Journey — Progress Tracker'}</span>
                <Badge variant="outline" className="border-emerald-500 text-emerald-400 text-xs">
                  Live Status
                </Badge>
              </CardTitle>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'ta'
                  ? '7 நிலைகளிலும் உங்கள் முன்னேற்றத்தைக் கண்காணிக்கும் நேரலை வரைபடம்'
                  : 'Real-time status tracking across all 7 assessment and livelihood lifecycle stages'}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Stages Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                stage.status === 'done'
                  ? 'bg-emerald-950/30 border-emerald-800/80 text-white'
                  : stage.status === 'in_progress'
                  ? 'bg-amber-950/30 border-amber-800/80 text-white ring-1 ring-amber-500/30'
                  : 'bg-slate-800/50 border-slate-700/60 text-slate-400'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                {/* Status Icon */}
                {stage.status === 'done' && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                {stage.status === 'in_progress' && (
                  <Loader2 className="w-5 h-5 text-amber-400 animate-spin shrink-0 mt-0.5" />
                )}
                {stage.status === 'pending' && (
                  <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                )}

                <div className="min-w-0">
                  <h4 className="font-bold text-sm leading-snug text-white truncate">
                    {stage.label[lang]}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                    {stage.description[lang]}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <Badge
                variant="outline"
                className={`text-[10px] uppercase font-bold shrink-0 ${
                  stage.status === 'done'
                    ? 'border-emerald-500 text-emerald-400 bg-emerald-950/60'
                    : stage.status === 'in_progress'
                    ? 'border-amber-500 text-amber-400 bg-amber-950/60 animate-pulse'
                    : 'border-slate-700 text-slate-500 bg-slate-900'
                }`}
              >
                {stage.status === 'done' ? 'Done' : stage.status === 'in_progress' ? 'In Progress' : 'Pending'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
