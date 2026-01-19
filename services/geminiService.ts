
// Guidelines followed:
// - Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
// - Always use import {GoogleGenAI} from "@google/genai";
// - Use response.text property (not a method).
import { GoogleGenAI, Modality } from "@google/genai";

// Always initialize with named parameter and process.env.API_KEY
// Check if API key exists before initializing
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
const ai = apiKey && apiKey !== 'PLACEHOLDER_API_KEY' ? new GoogleGenAI({ apiKey }) : null;

// Audio decoding utilities (used by speakContent)
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const speakContent = async (text: string): Promise<void> => {
  if (!ai) {
    console.warn("Gemini API Key missing. Falling back to browser speech synthesis.");
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Read the following portfolio content in a professional, warm voice: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    // Directly access response.text property if needed, but for audio we extract binary data
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) return;

    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const audioBuffer = await decodeAudioData(
      decodeBase64(base64Audio),
      audioCtx,
      24000,
      1
    );

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);
    source.start();
  } catch (err) {
    console.error("TTS Error:", err);
    // Fallback to browser synthesis if Gemini fails
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
};

