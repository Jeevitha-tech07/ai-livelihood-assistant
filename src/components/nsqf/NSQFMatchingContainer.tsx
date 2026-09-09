'use client';

import React, { useState, useEffect } from 'react';
import { NSQFLoadingState } from './NSQFLoadingState';
import { RecommendationsContainer } from '@/components/recommendations/RecommendationsContainer';
import { BeneficiaryProfile } from '@/types/profile';
import { NSQFQualification } from '@/types/nsqf';
import { CoreSkillNode } from '@/lib/nsqf/matchingEngine';

interface NSQFMatchingContainerProps {
  profile: BeneficiaryProfile;
}

export function NSQFMatchingContainer({ profile }: NSQFMatchingContainerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [coreNode, setCoreNode] = useState<CoreSkillNode | null>(null);
  const [matchedQualifications, setMatchedQualifications] = useState<NSQFQualification[]>([]);

  useEffect(() => {
    async function fetchMatches() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/nsqf/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profile }),
        });
        const data = await res.json();
        if (data.success) {
          setCoreNode(data.coreNode);
          setMatchedQualifications(data.matchedQualifications);
        }
      } catch (err) {
        console.error('NSQF Match error:', err);
      } finally {
        setTimeout(() => setIsLoading(false), 1200);
      }
    }

    fetchMatches();
  }, [profile]);

  if (isLoading) {
    return <NSQFLoadingState />;
  }

  return (
    <RecommendationsContainer
      profile={profile}
      qualifications={matchedQualifications}
      coreNode={coreNode}
    />
  );
}
