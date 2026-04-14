// source_handbook: week11-hackathon-preparation
'use client';

import React, { useState } from 'react';
import VoiceInput from '@/components/VoiceInput';
import OutputCard from '@/components/OutputCard';

interface OutputData {
  professionalStatement: string;
  summary: string;
  nextStep: string;
}

export default function Home() {
  const [data, setData] = useState<OutputData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleProcess = async (text: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch('/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to process the text');
      }

      setData(result.data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <VoiceInput onProcess={handleProcess} isLoading={isLoading} />
      <OutputCard data={data} error={error} isLoading={isLoading} />
    </>
  );
}
