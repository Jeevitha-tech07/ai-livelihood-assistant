'use client';

import React from 'react';
import { CoreSkillNode, PathwayBranchNode } from '@/lib/nsqf/matchingEngine';
import { Shirt, Scissors, Store, Home, ShoppingCart, Wrench, Zap, GitBranch, BadgeCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

interface LivelihoodBranchMapProps {
  coreNode: CoreSkillNode;
  onSelectBranch?: (branch: PathwayBranchNode) => void;
}

const ICON_MAP = {
  Shirt,
  Scissors,
  Store,
  Home,
  ShoppingCart,
  Wrench,
  Zap,
};

export function LivelihoodBranchMap({ coreNode, onSelectBranch }: LivelihoodBranchMapProps) {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'ta' ? 'ta' : 'en';

  const CoreIcon = ICON_MAP[coreNode.iconType as keyof typeof ICON_MAP] || Shirt;

  return (
    <Card className="w-full bg-slate-900 text-white border-slate-800 shadow-xl overflow-hidden">
      <CardHeader className="p-6 border-b border-slate-800 bg-slate-950/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/50">
              <GitBranch className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-xl font-extrabold text-white flex items-center gap-2">
                <span>{lang === 'ta' ? 'வாழ்வாதார வாய்ப்பு வரைபடம்' : 'Livelihood Opportunity Map'}</span>
                <Badge variant="outline" className="border-emerald-500 text-emerald-400 text-xs">
                  NSQF Tree
                </Badge>
              </CardTitle>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'ta'
                  ? 'உங்கள் முதன்மை திறனிலிருந்து பிரியும் வாழ்வாதார வழிகள்'
                  : 'Branching career pathways derived from your confirmed core skills'}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-8">
        {/* Core Skill Node (Root) */}
        <div className="relative flex flex-col items-center text-center">
          <div className="z-10 p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl shadow-emerald-950 border border-emerald-400/30 max-w-lg w-full">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <CoreIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-200">
                Core Skill Node
              </span>
            </div>

            <h3 className="text-lg font-bold">{coreNode.title[lang]}</h3>
            <p className="text-xs text-emerald-100/90 mt-1">{coreNode.description[lang]}</p>
          </div>

          {/* SVG Connecting Tree Lines */}
          <div className="w-full max-w-2xl h-12 flex items-center justify-center relative">
            <svg className="w-full h-full stroke-emerald-500/50 stroke-2 fill-none">
              <line x1="50%" y1="0" x2="50%" y2="100%" />
            </svg>
          </div>
        </div>

        {/* Branch Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative">
          {coreNode.branches.map((branch) => {
            const BranchIcon = ICON_MAP[branch.iconType] || Shirt;

            return (
              <div
                key={branch.id}
                onClick={() => onSelectBranch && onSelectBranch(branch)}
                className="group relative p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/80 transition-all duration-200 cursor-pointer shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Branch Icon & NSQF Level Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <BranchIcon className="w-5 h-5" />
                    </div>
                    <Badge className="bg-emerald-950 text-emerald-300 border-emerald-800 font-mono text-[11px]">
                      <BadgeCheck className="w-3 h-3 mr-1" />
                      NSQF Level {branch.nsqfLevel}
                    </Badge>
                  </div>

                  {/* Branch Title & Description */}
                  <h4 className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">
                    {branch.title[lang]}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {branch.description[lang]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono text-emerald-400/90">{branch.matchedQualificationCode}</span>
                  <span className="font-medium text-slate-300">{branch.employmentType}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
