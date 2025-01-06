'use client'

import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  onResult: (text: string) => void;
}

export const VoiceInput = ({ onResult }: Props) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  const startListening = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        onResult(text);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.start();
      setIsListening(true);
      setRecognition(recognition);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <Button
      onClick={toggleListening}
      className={`rounded-none border-4 border-black p-2 ${
        isListening ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
    </Button>
  );
};