'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Type } from 'lucide-react';

interface VoiceInputProps {
  onProcess: (text: string) => void;
  isLoading: boolean;
}

export default function VoiceInput({ onProcess, isLoading }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setTranscript('');
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleProcess = () => {
    if (transcript.trim()) {
      onProcess(transcript);
    }
  };

  return (
    <div className="glass-panel w-full">
      <div className="mic-container">
        <button
          className={`mic-button ${isRecording ? 'recording' : ''}`}
          onClick={toggleRecording}
          disabled={isLoading}
          title={isRecording ? 'Stop Recording' : 'Start Recording'}
        >
          {isRecording ? <Square size={32} /> : <Mic size={32} />}
        </button>
        
        <textarea
          className="transcript-box"
          placeholder="Speak or type your problem here... (e.g. 'my landlord he is not giving deposit back...')"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          disabled={isLoading}
        />

        <div className="flex-row justify-center w-full">
          <button 
            className="action-button" 
            onClick={handleProcess}
            disabled={!transcript.trim() || isLoading || isRecording}
          >
            <Type size={20} />
            {isLoading ? 'Processing...' : 'Translate to Professional Request'}
          </button>
        </div>
      </div>
    </div>
  );
}
