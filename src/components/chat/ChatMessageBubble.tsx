'use client';

import React, { useState } from 'react';
import { Bot, User, Volume2, VolumeX } from 'lucide-react';
import { ChatMessage } from '@/types/profile';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const { currentLanguage } = useLanguage();
  const isAssistant = message.sender === 'assistant';

  const fallbackSpeechSynthesis = () => {
    console.log('[ChatMessageBubble] Executing Web Speech API fallback speech synthesis');
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      // Prevent English WebSpeech engine from reading Tamil unicode codepoints as "one zero..."
      if (currentLanguage === 'ta') {
        const voices = window.speechSynthesis.getVoices();
        const taVoice = voices.find((v) => v.lang.toLowerCase().includes('ta'));
        if (!taVoice) {
          console.warn('[ChatMessageBubble] Native browser Tamil voice unavailable; suppressing WebSpeech fallback to prevent numeric codepoint readout.');
          setIsPlayingAudio(false);
          return;
        }
      }

      const cleanText = message.text
        .replace(/```[a-z]*\n?/gi, '')
        .replace(/```/g, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/#+\s*/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = currentLanguage === 'ta' ? 'ta-IN' : 'en-IN';
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 2000);
    }
  };

  const handleReplayAudio = async () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    setIsPlayingAudio(true);
    const langCode = currentLanguage === 'ta' ? 'ta-IN' : currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';

    // SAFE LOGGING (NO API KEYS)
    console.log("TTS text:", message.text);
    console.log("TTS language:", currentLanguage === 'ta' ? 'Tamil' : 'English');
    console.log("TTS language_code:", langCode);

    try {
      const response = await fetch('/api/voice/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: message.text,
          languageCode: langCode,
        }),
      });

      console.log("TTS HTTP status:", response.status);

      if (response.ok) {
        const audioBlob = await response.blob();
        if (audioBlob && audioBlob.size > 0) {
          console.log('[ChatMessageBubble] Received Sarvam audio blob, size:', audioBlob.size, 'bytes');
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);

          audio.onended = () => {
            console.log('[ChatMessageBubble] Sarvam audio playback completed');
            setIsPlayingAudio(false);
            URL.revokeObjectURL(audioUrl);
          };

          audio.onerror = (e) => {
            console.error('[ChatMessageBubble Audio Element Playback Error]:', e);
            setIsPlayingAudio(false);
            URL.revokeObjectURL(audioUrl);
            if (currentLanguage === 'ta') {
              console.warn('தமிழ் குரல் பதிலை இயக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.');
            } else {
              fallbackSpeechSynthesis();
            }
          };

          try {
            await audio.play();
            console.log('[ChatMessageBubble] Audio playback started successfully');
            return;
          } catch (playErr) {
            console.warn('[ChatMessageBubble Autoplay Restriction Error]:', playErr);
            setIsPlayingAudio(false);
            URL.revokeObjectURL(audioUrl);
            if (currentLanguage !== 'ta') {
              fallbackSpeechSynthesis();
            }
            return;
          }
        }
      }

      console.warn('[ChatMessageBubble] Sarvam TTS API route returned empty or non-200 status:', response.status);
      setIsPlayingAudio(false);
      if (currentLanguage === 'ta') {
        console.warn('தமிழ் குரல் பதிலை இயக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.');
      } else {
        fallbackSpeechSynthesis();
      }
    } catch (err) {
      console.error('[ChatMessageBubble Network Error]:', err);
      setIsPlayingAudio(false);
      if (currentLanguage === 'ta') {
        console.warn('தமிழ் குரல் பதிலை இயக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.');
      } else {
        fallbackSpeechSynthesis();
      }
    }
  };

  return (
    <div
      className={cn(
        'flex gap-3 my-4 animate-in fade-in slide-in-from-bottom-2 duration-300',
        isAssistant ? 'justify-start' : 'justify-end'
      )}
    >
      {/* AI Bot Avatar (Left) */}
      {isAssistant && (
        <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-200 dark:shadow-none mt-1">
          <Bot className="w-5 h-5" />
        </div>
      )}

      {/* Message Content & Replay Icon */}
      <div
        className={cn(
          'relative max-w-[82%] sm:max-w-[75%] rounded-2xl p-4 sm:p-5 shadow-sm text-sm sm:text-base leading-relaxed',
          isAssistant
            ? 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-sm'
            : 'bg-emerald-600 text-white rounded-tr-sm'
        )}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>

        <div
          className={cn(
            'flex items-center justify-between mt-2 pt-2 border-t text-[11px]',
            isAssistant
              ? 'border-slate-100 dark:border-slate-800 text-slate-400'
              : 'border-emerald-500/50 text-emerald-100'
          )}
        >
          <span className="font-medium">{message.timestamp}</span>

          {/* Small Volume2 / Replay Icon on AI Bubble */}
          {isAssistant && (
            <button
              onClick={handleReplayAudio}
              title="Play / Replay Sarvam AI Audio"
              className={cn(
                'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer',
                isPlayingAudio
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 animate-pulse'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              )}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Playing...</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Listen AI Voice</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* User Avatar (Right) */}
      {!isAssistant && (
        <div className="w-10 h-10 rounded-2xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-md mt-1">
          <User className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
