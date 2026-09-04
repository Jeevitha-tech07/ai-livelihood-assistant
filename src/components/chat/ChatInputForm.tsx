'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Mic, Square, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface ChatInputFormProps {
  onSendMessage: (text: string) => void;
  placeholder?: string;
  isProcessing?: boolean;
}

type MicState = 'idle' | 'recording' | 'processing';

export function ChatInputForm({
  onSendMessage,
  placeholder,
  isProcessing = false,
}: ChatInputFormProps) {
  const [inputText, setInputText] = useState('');
  const [micState, setMicState] = useState<MicState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const { currentLanguage } = useLanguage();

  const defaultPlaceholder = {
    en: 'Type your answer or tap mic to speak...',
    ta: 'உங்கள் பதிலைத் தட்டச்சு செய்க அல்லது பேச மைக்கைத் தொடவும்...',
  }[currentLanguage as 'en' | 'ta'] || 'Type your answer...';

  // Clean up media streams on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleStartRecording = async () => {
    setErrorMessage(null);

    // Check browser support
    if (!navigator?.mediaDevices?.getUserMedia) {
      console.warn('[ChatInputForm] navigator.mediaDevices.getUserMedia unsupported');
      setErrorMessage('Microphone access is not supported by this browser.');
      fallbackWebSpeechSTT();
      return;
    }

    try {
      console.log('[ChatInputForm] Requesting microphone permission...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = getSupportedMimeType();
      console.log('[ChatInputForm] Starting MediaRecorder with MIME type:', mimeType);

      const mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        console.log('[ChatInputForm] MediaRecorder stopped. Total chunks:', audioChunksRef.current.length);
        
        // Stop stream tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }

        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType || 'audio/webm' });
        console.log('[ChatInputForm] Created audio blob, size:', audioBlob.size, 'bytes');

        if (audioBlob.size < 100) {
          setErrorMessage(
            currentLanguage === 'ta'
              ? 'ஒலிப்பதிவு காலியாக உள்ளது. மீண்டும் பேசவும்.'
              : 'Recording is empty. Please try speaking again.'
          );
          setMicState('idle');
          return;
        }

        await processAudioWithSarvamSTT(audioBlob);
      };

      mediaRecorder.start(250); // collect data every 250ms
      setMicState('recording');
    } catch (err: unknown) {
      console.error('[ChatInputForm Microphone Access Error]:', err);
      const errorObj = err as { name?: string; message?: string };

      if (errorObj.name === 'NotAllowedError' || errorObj.name === 'PermissionDeniedError') {
        setErrorMessage(
          currentLanguage === 'ta'
            ? 'மைக்ரோஃபோன் அனுமதி மறுக்கப்பட்டது. உலாவி அமைப்புகளில் அனுமதிக்கவும்.'
            : 'Microphone access denied. Please enable microphone permissions in your browser settings.'
        );
      } else if (errorObj.name === 'NotFoundError' || errorObj.name === 'DevicesNotFoundError') {
        setErrorMessage(
          currentLanguage === 'ta'
            ? 'மைக்ரோஃபோன் சாதனம் கண்டறியப்படவில்லை.'
            : 'No microphone device detected on this computer.'
        );
      } else {
        setErrorMessage(
          currentLanguage === 'ta'
            ? 'தமிழ் குரலை பெற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
            : `Microphone error: ${errorObj.message || 'Unable to access microphone'}`
        );
      }

      setMicState('idle');
      fallbackWebSpeechSTT();
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      console.log('[ChatInputForm] Stopping recording manually...');
      setMicState('processing');
      mediaRecorderRef.current.stop();
    }
  };

  const getSupportedMimeType = (): string => {
    if (typeof MediaRecorder === 'undefined') return '';
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      'audio/wav',
      'audio/mp4',
    ];
    for (const t of types) {
      if (MediaRecorder.isTypeSupported(t)) return t;
    }
    return '';
  };

  const processAudioWithSarvamSTT = async (audioBlob: Blob) => {
    setMicState('processing');
    const langCode = currentLanguage === 'ta' ? 'ta-IN' : currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    
    // SAFE LOGGING (NO API KEYS)
    console.log('Selected language:', currentLanguage);
    console.log('STT language:', langCode);

    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.webm');
      formData.append('languageCode', langCode);

      const response = await fetch('/api/voice/stt', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success && data.transcript) {
        console.log('[ChatInputForm] Received transcript from Sarvam STT:', data.transcript);
        setInputText(data.transcript);
        setMicState('idle');
        setErrorMessage(null);
        return;
      }

      console.warn('[ChatInputForm] Sarvam STT API error or empty transcript:', data);
      setErrorMessage(
        currentLanguage === 'ta'
          ? 'தமிழ் குரலை புரிந்துகொள்ள முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
          : data.error || 'Speech not recognized. Please try speaking clearly again.'
      );
      fallbackWebSpeechSTT();
    } catch (err) {
      console.error('[ChatInputForm STT Fetch Error]:', err);
      setErrorMessage(
        currentLanguage === 'ta'
          ? 'தமிழ் குரலை புரிந்துகொள்ள முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
          : 'Network error connecting to Speech-to-Text service.'
      );
      fallbackWebSpeechSTT();
    } finally {
      setMicState('idle');
    }
  };

  const fallbackWebSpeechSTT = () => {
    console.log('[ChatInputForm] Attempting Web Speech API fallback for Speech Recognition...');
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as unknown as { SpeechRecognition?: typeof React.Component }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: typeof React.Component }).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const recognition = new (SpeechRecognition as any)();
          const targetLang = currentLanguage === 'ta' ? 'ta-IN' : 'en-IN';
          recognition.lang = targetLang;
          recognition.interimResults = false;

          console.log('[ChatInputForm WebSpeech Fallback] Set recognition.lang =', targetLang);

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            if (transcript) {
              console.log('[ChatInputForm WebSpeech Fallback] Recognized:', transcript);
              setInputText(transcript);
              setErrorMessage(null);
            }
          };

          recognition.onerror = (e: unknown) => {
            console.warn('[ChatInputForm WebSpeech Fallback Error]:', e);
          };

          recognition.start();
        } catch (e) {
          console.warn('[ChatInputForm WebSpeech Fallback exception]:', e);
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isProcessing) {
      onSendMessage(inputText.trim());
      setInputText('');
      setErrorMessage(null);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 sticky bottom-0 z-10 shadow-lg p-3 sm:p-4 space-y-2">
      {/* Error Message Notification Banner */}
      {errorMessage && (
        <div className="max-w-4xl mx-auto p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-xs underline text-red-600 dark:text-red-400 shrink-0 ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Form & Input Bar */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex items-center gap-2">
        {/* Microphone Button with 3 Dynamic States */}
        {micState === 'idle' && (
          <Button
            type="button"
            onClick={handleStartRecording}
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-xl shrink-0 border-slate-200 dark:border-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-slate-800 transition-all cursor-pointer"
            title="Tap to speak (Sarvam Voice Input)"
          >
            <Mic className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </Button>
        )}

        {micState === 'recording' && (
          <Button
            type="button"
            onClick={handleStopRecording}
            variant="destructive"
            size="icon"
            className="h-12 w-12 rounded-xl shrink-0 bg-red-600 hover:bg-red-700 text-white animate-pulse transition-all cursor-pointer shadow-lg shadow-red-200 dark:shadow-none"
            title="Listening... Click to stop"
          >
            <Square className="w-5 h-5 fill-white" />
          </Button>
        )}

        {micState === 'processing' && (
          <Button
            type="button"
            disabled
            variant="secondary"
            size="icon"
            className="h-12 w-12 rounded-xl shrink-0 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
            title="Converting speech with Sarvam AI..."
          >
            <Loader2 className="w-5 h-5 animate-spin" />
          </Button>
        )}

        {/* Text Input Field displaying live speech transcript */}
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            micState === 'recording'
              ? 'Listening to your speech... speak clearly!'
              : micState === 'processing'
              ? 'Converting speech to text via Sarvam AI...'
              : placeholder || defaultPlaceholder
          }
          disabled={isProcessing || micState === 'processing'}
          className={cn(
            'flex-1 h-12 px-4 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all disabled:opacity-60',
            micState === 'recording' && 'border-red-400 ring-2 ring-red-400/30 bg-red-50/20',
            micState === 'processing' && 'border-amber-400 bg-amber-50/20'
          )}
        />

        {/* Send Button to Submit Transcript */}
        <Button
          type="submit"
          disabled={!inputText.trim() || isProcessing || micState !== 'idle'}
          size="icon"
          className="h-12 w-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 shadow-md shadow-emerald-200 dark:shadow-none disabled:opacity-50"
          title="Send message to AI assistant"
        >
          <Send className="w-5 h-5" />
        </Button>
      </form>

      {/* Mic State Indicator Tagline */}
      <div className="max-w-4xl mx-auto text-[11px] text-slate-400 flex items-center justify-between px-1">
        <span>
          {micState === 'idle' && 'Tap mic to speak or type your answer'}
          {micState === 'recording' && '🔴 Recording... Tap stop button when done'}
          {micState === 'processing' && '⏳ Converting speech to Tamil/English text via Sarvam AI...'}
        </span>
        <span className="font-mono text-[10px]">Sarvam Voice STT</span>
      </div>
    </div>
  );
}
