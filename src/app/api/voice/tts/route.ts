import { NextResponse } from 'next/server';
import { sarvamService } from '@/lib/voice/sarvam';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, languageCode = 'ta-IN' } = body as {
      text: string;
      languageCode?: string;
    };

    if (!text) {
      return NextResponse.json({ error: 'Missing text parameter' }, { status: 400 });
    }

    // SAFE LOGGING (NO API KEYS)
    console.log("TTS text:", text);
    console.log("TTS language_code:", languageCode);

    console.log('[Sarvam TTS API Route] Requesting TTS for:', {
      textLength: text.length,
      languageCode,
      hasApiKey: Boolean(sarvamService.getApiKey()),
    });

    const audioBuffer = await sarvamService.textToSpeech({
      text,
      targetLanguageCode: languageCode,
    });

    if (audioBuffer && audioBuffer.length > 0) {
      console.log('[Sarvam TTS API Route] Audio generated successfully, bytes:', audioBuffer.length);
      const uint8 = new Uint8Array(audioBuffer);
      return new Response(uint8, {
        status: 200,
        headers: {
          'Content-Type': 'audio/wav',
          'Content-Length': uint8.byteLength.toString(),
          'Cache-Control': 'no-cache',
        },
      });
    }

    console.warn('[Sarvam TTS API Route] No audio buffer returned from Sarvam service');
    return NextResponse.json(
      { error: 'Failed to generate audio from Sarvam TTS' },
      { status: 502 }
    );
  } catch (error) {
    console.error('[Sarvam TTS API Route Error]:', error);
    return NextResponse.json(
      { error: 'Internal Server Error during TTS generation' },
      { status: 500 }
    );
  }
}
