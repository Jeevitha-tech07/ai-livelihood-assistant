'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, CheckCircle2, XCircle, Compass } from 'lucide-react';
import { RegionalMapThumbnail } from './RegionalMapThumbnail';
import { evaluateLocalOpportunity } from '@/lib/nsqf/opportunityEngine';
import { BeneficiaryProfile } from '@/types/profile';
import { NSQFQualification } from '@/types/nsqf';
import { useLanguage } from '@/context/LanguageContext';

interface LocalOpportunityCardProps {
  profile: BeneficiaryProfile;
  qualification: NSQFQualification;
}

export function LocalOpportunityCard({
  profile,
  qualification,
}: LocalOpportunityCardProps) {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'ta' ? 'ta' : 'en';

  const opportunity = evaluateLocalOpportunity(profile, qualification);

  return (
    <Card className="w-full bg-slate-50/70 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800 shadow-sm mt-6">
      <CardHeader className="p-5 border-b border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>{lang === 'ta' ? 'உள்ளூர் வேலைவாய்ப்பு பகுப்பாய்வு' : 'Local Opportunity & Practicality Analysis'}</span>
            </CardTitle>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Location Context: <strong>{opportunity.districtName} District</strong></span>
            </p>
          </div>
        </div>

        <Badge variant="outline" className="text-xs font-bold border-emerald-500 text-emerald-700 bg-white dark:bg-slate-900 px-3 py-1 self-start sm:self-center">
          {opportunity.practicalityScore}% Practical ({opportunity.feasibilityRating})
        </Badge>
      </CardHeader>

      <CardContent className="p-5 space-y-6">
        {/* Map Thumbnail Visual */}
        <RegionalMapThumbnail
          districtName={opportunity.districtName}
          trainingCenters={opportunity.nearbyTrainingCenters}
        />

        {/* 5 Practical Feasibility Criteria Checklist Rows */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Practical Feasibility Checklist (5 Core Criteria)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {opportunity.criteriaList.map((crit) => (
              <div
                key={crit.key}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs transition-all ${
                  crit.status
                    ? 'bg-emerald-50/60 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800 text-slate-900 dark:text-slate-100'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {crit.status ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <div className="truncate">
                    <span className="font-bold block truncate">{crit.label}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">
                      {crit.details}
                    </span>
                  </div>
                </div>

                <Badge
                  variant={crit.status ? 'default' : 'secondary'}
                  className="text-[10px] px-2 py-0.5 shrink-0"
                >
                  {crit.status ? 'Passed' : 'Pending'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
