import React, { useState, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';

interface AudioTranscriberButtonProps {
  onTranscribed: (text: string) => void;
  className?: string;
  buttonText?: string;
}

export const AudioTranscriberButton: React.FC<AudioTranscriberButtonProps> = ({
  onTranscribed,
  className = '',
  buttonText = 'Dictate with Voice (AI)',
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      const mimeType = MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : 'audio/mp4';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        await transcribeAudioBlob(audioBlob, mimeType);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone access denied:', err);
      alert('Microphone access is required to use the voice dictation feature.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  };

  const transcribeAudioBlob = async (blob: Blob, mimeType: string) => {
    setIsTranscribing(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64Audio = reader.result as string;

        const res = await fetch('/api/ai/transcribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ audioBase64: base64Audio, mimeType }),
        });

        const data = await res.json();
        if (data.success && data.text) {
          onTranscribed(data.text);
        } else {
          alert(data.error || 'Could not transcribe voice audio. Please try speaking closer to the microphone.');
        }
      };
    } catch (err) {
      console.error('Transcription error:', err);
    } finally {
      setIsTranscribing(false);
    }
  };

  if (isTranscribing) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-[#0B2545] text-xs font-semibold border border-sky-200 animate-pulse">
        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00B4D8]" />
        <span>Transcribing via gemini-3.5-transcribe...</span>
      </span>
    );
  }

  if (isRecording) {
    return (
      <button
        type="button"
        onClick={stopRecording}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-sm animate-pulse cursor-pointer"
        title="Click to finish and transcribe"
      >
        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
        <MicOff className="w-3.5 h-3.5" />
        <span>Stop ({recordingSeconds}s) & Transcribe</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={startRecording}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-[#0B2545] text-xs font-medium border border-slate-200 transition-colors cursor-pointer ${className}`}
      title="Speak your project requirements directly using your microphone"
    >
      <Mic className="w-3.5 h-3.5 text-[#00B4D8]" />
      <span>{buttonText}</span>
    </button>
  );
};
