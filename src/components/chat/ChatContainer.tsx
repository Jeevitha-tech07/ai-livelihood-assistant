'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChatProgressHeader } from './ChatProgressHeader';
import { ChatMessageBubble } from './ChatMessageBubble';
import { ChatInputForm } from './ChatInputForm';
import { ExtractedProfilePreview } from './ExtractedProfilePreview';
import { BeneficiaryProfile, ChatMessage, QuestionStep } from '@/types/profile';
import { useLanguage } from '@/context/LanguageContext';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QUESTION_STEPS: QuestionStep[] = [
  {
    key: 'location',
    label: { en: 'Location', ta: 'இருப்பிடம்' },
    prompt: {
      en: "Welcome! To begin, which district or town in Tamil Nadu or India are you currently living in?",
      ta: "வணக்கம்! நீங்கள் தற்போது தமிழ்நாட்டின் எந்த மாவட்டம் அல்லது ஊரில் வசிக்கிறீர்கள்?",
    },
    placeholder: {
      en: "e.g., Salem, Madurai, Chennai, Coimbatore...",
      ta: "எ.கா: சேலம், மதுரை, சென்னை, கோயம்புத்தூர்...",
    },
  },
  {
    key: 'education',
    label: { en: 'Education', ta: 'கல்வித்தகுதி' },
    prompt: {
      en: "Thank you. What is your highest level of education or formal schooling completed?",
      ta: "நன்றி! உங்கள் கல்வித்தகுதி என்ன? (எ.கா: 10-ஆம் வகுப்பு, 12-ஆம் வகுப்பு, ஐ.டி.ஐ, பட்டப்படிப்பு)",
    },
    placeholder: {
      en: "e.g., 10th pass, 12th, ITI Diploma, Graduate...",
      ta: "எ.கா: 10ஆம் வகுப்பு, 12ஆம் வகுப்பு, ITI...",
    },
  },
  {
    key: 'family_occupation',
    label: { en: 'Family Occupation', ta: 'குடும்ப தொழில்' },
    prompt: {
      en: "What is your family's traditional or main occupation background?",
      ta: "உங்கள் குடும்பத்தின் பாரம்பரிய அல்லது முதன்மை தொழில் பின்னணி என்ன?",
    },
    placeholder: {
      en: "e.g., Agriculture, Handloom weaving, Retail shop...",
      ta: "எ.கா: விவசாயம், கைத்தறி நெசவு, சிறு வணிகம்...",
    },
  },
  {
    key: 'current_livelihood',
    label: { en: 'Current Work', ta: 'தற்போதைய வேலை' },
    prompt: {
      en: "Are you currently working, self-employed, or seeking new work? What is your current work activity?",
      ta: "தற்போது நீங்கள் என்ன வேலை செய்து வருகிறீர்கள் அல்லது தேடுகிறீர்கள்?",
    },
    placeholder: {
      en: "e.g., Daily wage worker, Assistant electrician, Seeking work...",
      ta: "எ.கா: கூலி வேலை, உதவியாளர், புதிய வேலை தேடுகிறேன்...",
    },
  },
  {
    key: 'skills',
    label: { en: 'Skills & Experience', ta: 'திறன்கள்' },
    prompt: {
      en: "What practical skills, tools, or machinery do you know how to operate or work with?",
      ta: "உங்களுக்கு என்னென்ன நடைமுறை திறன்கள் அல்லது கருவிகள் கையாள தெரியும்?",
    },
    placeholder: {
      en: "e.g., Wiring, Tailoring, Driving, Computer basic...",
      ta: "எ.கா: ஒயரிங், தையல், வாகனம் ஓட்டுதல்...",
    },
  },
  {
    key: 'interests',
    label: { en: 'Interests & Aspirations', ta: 'ஆர்வங்கள்' },
    prompt: {
      en: "What type of sector or work interest aligns best with your career aspirations?",
      ta: "எந்தத் துறையில் அல்லது பணியில் உங்களுக்கு ஆர்வம் உள்ளது?",
    },
    placeholder: {
      en: "e.g., Electronics, Healthcare, Automotive, Solar...",
      ta: "எ.கா: எலக்ட்ரானிக்ஸ், ஆட்டோமொபைல், தையல் கலை...",
    },
  },
  {
    key: 'mobility_constraints',
    label: { en: 'Mobility & Constraints', ta: 'சுழற்சி / கட்டுப்பாடுகள்' },
    prompt: {
      en: "Do you have any location, timing, or travel constraints? Are you open to local work only?",
      ta: "உங்களுக்கு ஏதேனும் வேலை நேர அல்லது இடமாற்றக் கட்டுப்பாடுகள் உள்ளனவா?",
    },
    placeholder: {
      en: "e.g., Local only within 10km, Open to relocate...",
      ta: "எ.கா: உள்ளூர் வேலை மட்டும், 10 கி.மீ சுற்றளவு...",
    },
  },
  {
    key: 'work_preference',
    label: { en: 'Work Preference', ta: 'வேலை விருப்பம்' },
    prompt: {
      en: "Finally, do you prefer regular wage employment, self-employment/business, or hybrid work?",
      ta: "இறுதியாக, மாதாந்திர ஊதிய வேலையா அல்லது சுய தொழிலா எது உங்கள் விருப்பம்?",
    },
    placeholder: {
      en: "e.g., Salaried job, Self-employed shop, Apprenticeship...",
      ta: "எ.கா: மாதாந்திர சம்பள வேலை, சுய தொழில்...",
    },
  },
];

interface ChatContainerProps {
  onCompleteProfile?: (profile: BeneficiaryProfile) => void;
  _onBackToWelcome?: () => void;
}

export function ChatContainer({ onCompleteProfile }: ChatContainerProps) {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === 'ta' ? 'ta' : 'en';

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const firstStep = QUESTION_STEPS[0];
    return [
      {
        id: 'msg-0',
        sender: 'assistant',
        text: firstStep.prompt[lang],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        fieldTargeted: firstStep.key,
      },
    ];
  });
  const [profile, setProfile] = useState<Partial<BeneficiaryProfile>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (userText: string) => {
    if (isProcessing || isCompleted) return;

    const currentStep = QUESTION_STEPS[currentStepIndex];

    // Add user message to transcript
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);

    try {
      // Call API turn endpoint to extract profile JSON
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fieldKey: currentStep.key,
          userResponse: userText,
          currentProfile: profile,
          language: currentLanguage === 'ta' ? 'ta-IN' : 'en-IN',
        }),
      });

      const data = await res.json();

      if (data.success && data.updatedProfile) {
        setProfile((prev) => ({ ...prev, ...data.updatedProfile }));
      }
    } catch (err) {
      console.error('Extraction error:', err);
    }

    const nextIndex = currentStepIndex + 1;

    if (nextIndex < QUESTION_STEPS.length) {
      setCurrentStepIndex(nextIndex);
      const nextStep = QUESTION_STEPS[nextIndex];

      setTimeout(() => {
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: nextStep.prompt[lang],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          fieldTargeted: nextStep.key,
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsProcessing(false);
      }, 500);
    } else {
      // Completed all questions
      setIsCompleted(true);
      setTimeout(() => {
        const finalMsg: ChatMessage = {
          id: `ai-final`,
          sender: 'assistant',
          text:
            lang === 'ta'
              ? 'மிக்க நன்றி! உங்கள் வாழ்வாதார தகவல்கள் சேகரிக்கப்பட்டுவிட்டன. உங்களுக்கான NSQF தகுதிகளை இப்போது காணலாம்.'
              : 'Thank you! Your beneficiary profile has been extracted. Proceeding to NSQF skill mapping and recommendations.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, finalMsg]);
        setIsProcessing(false);
      }, 500);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setProfile({});
    setIsCompleted(false);
    const firstStep = QUESTION_STEPS[0];
    const initialMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: firstStep.prompt[lang],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fieldTargeted: firstStep.key,
    };
    setMessages([initialMsg]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Progress Header at Top */}
      <ChatProgressHeader
        currentStepIndex={currentStepIndex}
        totalSteps={QUESTION_STEPS.length}
        onReset={handleRestart}
      />

      {/* Main Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Chat Conversation */}
        <div className="md:col-span-2 flex flex-col justify-between space-y-4">
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {messages.map((msg) => (
              <ChatMessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          {!isCompleted ? (
            <ChatInputForm
              onSendMessage={handleSendMessage}
              isProcessing={isProcessing}
              placeholder={QUESTION_STEPS[currentStepIndex]?.placeholder[lang]}
            />
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Interview Assessment Completed!</span>
              </div>
              <Button
                onClick={() => onCompleteProfile && onCompleteProfile(profile as BeneficiaryProfile)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3"
              >
                <span>View NSQF Livelihood Recommendations</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>

        {/* Right Column: Real-Time Extracted Profile Preview */}
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <ExtractedProfilePreview profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}
