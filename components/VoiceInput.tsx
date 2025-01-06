'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SpeechRecognition, SpeechRecognitionEvent } from '@/lib/speech-types';

export function VoiceInput({ onTranscript }: { onTranscript: (text: string) => void }) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      setRecognition(recognition);
    }
  }, []);

  const handleResult = useCallback(
    (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');

      if (event.results[0].isFinal) {
        onTranscript(transcript);
      }
    },
    [onTranscript]
  );

  const toggleListening = useCallback(() => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  }, [isListening, recognition]);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = handleResult;
    recognition.onerror = () => {
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognition.stop();
    };
  }, [recognition, handleResult]);

  if (!recognition) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleListening}
      className={isListening ? 'bg-red-100 hover:bg-red-200' : ''}
    >
      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
    </Button>
  );
}
