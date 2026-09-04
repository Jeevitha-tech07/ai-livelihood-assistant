'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  Briefcase,
  CheckCircle,
  Heart,
  Accessibility,
  Wallet,
  MapPin,
  Pencil,
  Check,
  X,
  LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProfileFieldKey } from '@/types/profile';

interface ProfileReviewRowProps {
  fieldKey: ProfileFieldKey;
  label: string;
  value: string | string[];
  onSave: (fieldKey: ProfileFieldKey, newValue: string | string[]) => void;
}

const ICON_MAP: Record<ProfileFieldKey, LucideIcon> = {
  education: GraduationCap,
  family_occupation: Users,
  current_livelihood: Briefcase,
  skills: CheckCircle,
  interests: Heart,
  mobility_constraints: Accessibility,
  work_preference: Wallet,
  location: MapPin,
};

export function ProfileReviewRow({
  fieldKey,
  label,
  value,
  onSave,
}: ProfileReviewRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(
    Array.isArray(value) ? value.join(', ') : value || ''
  );

  const IconComponent = ICON_MAP[fieldKey] || CheckCircle;

  const handleSave = () => {
    if (fieldKey === 'skills' || fieldKey === 'interests') {
      const items = editValue
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      onSave(fieldKey, items);
    } else {
      onSave(fieldKey, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(Array.isArray(value) ? value.join(', ') : value || '');
    setIsEditing(false);
  };

  const displayString = Array.isArray(value) ? value.join(', ') : value || '';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all hover:border-emerald-200 dark:hover:border-emerald-900 gap-3">
      {/* Field Label & Icon */}
      <div className="flex items-center gap-3.5 min-w-[200px]">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <IconComponent className="w-5 h-5" />
        </div>
        <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
          {label}
        </span>
      </div>

      {/* Editable Content or View */}
      <div className="flex-1 flex items-center justify-between gap-3">
        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 h-10 px-3 rounded-lg border border-emerald-500 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              autoFocus
            />
            <Button
              onClick={handleSave}
              size="sm"
              className="h-10 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
              title="Save"
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleCancel}
              size="sm"
              variant="ghost"
              className="h-10 px-3 text-slate-500 hover:bg-slate-100 rounded-lg"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 text-right sm:text-left text-sm font-medium text-slate-700 dark:text-slate-300">
              {Array.isArray(value) ? (
                <div className="flex flex-wrap gap-1.5 justify-end sm:justify-start">
                  {value.length > 0 ? (
                    value.map((item, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 text-xs px-2.5 py-0.5"
                      >
                        {item}
                      </Badge>
                    ))
                  ) : (
                    <span className="italic text-slate-400">Not specified</span>
                  )}
                </div>
              ) : (
                <span>{displayString || <span className="italic text-slate-400">Not specified</span>}</span>
              )}
            </div>

            {/* Pencil Icon Edit Trigger */}
            <Button
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="ghost"
              className="h-9 w-9 p-0 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-lg shrink-0"
              title={`Edit ${label}`}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
