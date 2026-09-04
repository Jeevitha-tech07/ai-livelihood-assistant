'use client';

import React, { useState } from 'react';
import { WelcomeHero } from './WelcomeHero';
import { LanguageSelectorCard } from './LanguageSelectorCard';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { ProfileReviewScreen } from '@/components/profile/ProfileReviewScreen';
import { NSQFMatchingContainer } from '@/components/nsqf/NSQFMatchingContainer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, Keyboard, Globe, ChevronRight, Languages } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { BeneficiaryProfile } from '@/types/profile';

type AppStep = 'welcome' | 'chat' | 'review' | 'nsqf';

export function WelcomeContainer() {
  const { currentLanguage, availableLanguages, selectedLanguageOption } = useLanguage();
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [currentStep, setCurrentStep] = useState<AppStep>('welcome');
  const [extractedProfile, setExtractedProfile] = useState<Partial<BeneficiaryProfile>>({});
  const [confirmedProfile, setConfirmedProfile] = useState<BeneficiaryProfile | null>(null);

  const labels = {
    en: {
      voiceAction: 'Start Voice Assessment',
      voiceSub: 'Speak in your native language',
      textAction: 'Continue with Text',
      textSub: 'Type or choose your preferences',
      languageAction: 'Choose Language',
      languageSub: 'Selected: English',
      chooseLangHeader: 'Select Preferred Language',
      chooseLangSub: 'Speech recognition and guidance will adapt to your language',
      closePicker: 'Done',
    },
    ta: {
      voiceAction: 'குரல் வழிகாட்டுதல் தொடங்குக',
      voiceSub: 'உங்கள் தாய்மொழியில் பேசுங்கள்',
      textAction: 'உரையுடன் தொடரவும்',
      textSub: 'தட்டச்சு செய்து தேர்வு செய்யவும்',
      languageAction: 'மொழியைத் தேர்ந்தெடுக்கவும்',
      languageSub: 'தேர்ந்தெடுக்கப்பட்டது: தமிழ்',
      chooseLangHeader: 'விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
      chooseLangSub: 'குரல் அங்கீகாரம் மற்றும் வழிகாட்டுதல் உங்கள் மொழிக்கு ஏற்ப அமைவுறும்',
      closePicker: 'முடிந்தது',
    },
  };

  const t = labels[currentLanguage as keyof typeof labels] || labels.en;

  const handleStartInterview = () => {
    setCurrentStep('chat');
  };

  const handleChatComplete = (profile: BeneficiaryProfile) => {
    setExtractedProfile(profile);
    setCurrentStep('review');
  };

  const handleProfileConfirmed = (finalProfile: BeneficiaryProfile) => {
    setConfirmedProfile(finalProfile);
    setCurrentStep('nsqf');
  };

  if (currentStep === 'chat') {
    return (
      <ChatContainer
        onCompleteProfile={handleChatComplete}
        _onBackToWelcome={() => setCurrentStep('welcome')}
      />
    );
  }

  if (currentStep === 'review') {
    return (
      <ProfileReviewScreen
        initialProfile={extractedProfile}
        onConfirmProfile={handleProfileConfirmed}
      />
    );
  }

  if (currentStep === 'nsqf' && confirmedProfile) {
    return <NSQFMatchingContainer profile={confirmedProfile} />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center min-h-[85vh] space-y-10">
      {/* Hero Section */}
      <WelcomeHero />

      {/* Main Interactive Container */}
      <div className="w-full max-w-xl space-y-6">
        {!showLanguagePicker ? (
          /* Three Primary Action Buttons */
          <div className="flex flex-col gap-4">
            {/* Action 1: Start Voice Assessment */}
            <Button
              onClick={handleStartInterview}
              size="lg"
              className="w-full h-auto py-4 px-6 justify-between bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-none group"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg leading-snug">{t.voiceAction}</div>
                  <div className="text-xs text-emerald-100 font-normal">{t.voiceSub}</div>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 opacity-80 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Action 2: Continue with Text */}
            <Button
              onClick={handleStartInterview}
              variant="outline"
              size="lg"
              className="w-full h-auto py-4 px-6 justify-between border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/30 dark:hover:bg-slate-900 rounded-2xl group"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-slate-700 dark:text-slate-300">
                  <Keyboard className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-lg text-slate-900 dark:text-slate-100 leading-snug">
                    {t.textAction}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                    {t.textSub}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Action 3: Choose Language */}
            <Button
              onClick={() => setShowLanguagePicker(true)}
              variant="secondary"
              size="lg"
              className="w-full h-auto py-3.5 px-6 justify-between bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-800 rounded-2xl group"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400 shadow-sm">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-base text-slate-800 dark:text-slate-200">
                    {t.languageAction}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                    {selectedLanguageOption.flag} {selectedLanguageOption.nativeName} ({selectedLanguageOption.name})
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="bg-white dark:bg-slate-900 text-xs px-3 py-1 font-medium">
                {selectedLanguageOption.nativeName}
              </Badge>
            </Button>
          </div>
        ) : (
          /* Interactive Language Selection View */
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h2 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                  {t.chooseLangHeader}
                </h2>
              </div>
              <Button
                onClick={() => setShowLanguagePicker(false)}
                size="sm"
                variant="ghost"
                className="text-emerald-600 dark:text-emerald-400 font-semibold"
              >
                {t.closePicker}
              </Button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.chooseLangSub}
            </p>

            {/* Language Cards Grid */}
            <div className="grid grid-cols-1 gap-3">
              {availableLanguages.map((option) => (
                <LanguageSelectorCard
                  key={option.code}
                  option={option}
                  onSelect={() => setShowLanguagePicker(false)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
