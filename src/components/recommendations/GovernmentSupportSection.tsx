'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Landmark, ExternalLink, ShieldCheck, Gift } from 'lucide-react';
import schemesData from '@/lib/data/governmentSchemes.json';
import { useLanguage } from '@/context/LanguageContext';

export function GovernmentSupportSection() {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'ta' ? 'ta' : 'en';

  return (
    <Card className="w-full bg-slate-900 text-white border-slate-800 shadow-xl overflow-hidden mt-8">
      <CardHeader className="p-6 border-b border-slate-800 bg-slate-950/70">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-950">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>{lang === 'ta' ? 'அரசு நலத்திட்டங்கள் & நிதி உதவி (PM-AJAY Support)' : 'Government Schemes & PM-AJAY Financial Support'}</span>
              <Badge variant="outline" className="border-emerald-500 text-emerald-400 text-xs">
                Verified Schemes
              </Badge>
            </CardTitle>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified hardcoded government sources only — 100% authentic government links</span>
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schemesData.map((scheme) => (
            <div
              key={scheme.id}
              className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-emerald-500 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <Badge className="bg-emerald-950 text-emerald-300 border-emerald-800 text-[10px]">
                    <Landmark className="w-3 h-3 mr-1" />
                    {scheme.type}
                  </Badge>
                  <span className="text-[10px] text-slate-400 font-mono">Official Scheme</span>
                </div>

                <h4 className="font-bold text-white text-sm leading-snug">{scheme.name}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{scheme.description}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-700/60 text-xs">
                <div className="flex items-start gap-1.5 text-emerald-300 font-medium">
                  <Gift className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{scheme.benefits}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">Source: {scheme.ministry}</span>
                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-bold underline"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
