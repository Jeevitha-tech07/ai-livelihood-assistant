import { NextResponse } from 'next/server';
import { sarvamService } from '@/lib/voice/sarvam';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const languageCode = (formData.get('languageCode') as string) || 'ta-IN';

    if (!file) {
      console.warn('[Sarvam STT API Route] Missing audio file in request');
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);

    // SAFE LOGGING (NO API KEYS)
    console.log("Selected language:", languageCode);
    console.log("STT language:", languageCode);

    console.log('[Sarvam STT API Route] Received audio recording:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      languageCode,
      hasApiKey: Boolean(sarvamService.getApiKey()),
    });

    if (file.size === 0) {
      return NextResponse.json({ error: 'Audio recording is empty' }, { status: 400 });
    }

    const result = await sarvamService.speechToText(audioBuffer, languageCode);

    if (result && result.transcript) {
      console.log('[Sarvam STT API Route] Successfully transcribed:', result.transcript);
      return NextResponse.json({
        success: true,
        transcript: result.transcript,
        languageCode: result.languageCode,
      });
    }

    console.warn('[Sarvam STT API Route] STT returned empty transcript or API error');
    return NextResponse.json(
      { error: 'No speech transcript recognized. Please speak clearly and try again.' },
      { status: 500 }
    );
  } catch (error) {
    console.error('[Sarvam STT API Route Error]:', error);
    return NextResponse.json(
      { error: 'Server error processing audio recording' },
      { status: 500 }
    );
  }
}
