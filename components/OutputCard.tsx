'use client';

import React from 'react';
import { FileText, Zap, ArrowRight, AlertCircle } from 'lucide-react';

interface OutputData {
  professionalStatement: string;
  summary: string;
  nextStep: string;
}

interface OutputCardProps {
  data: OutputData | null;
  error: string | null;
  isLoading: boolean;
}

export default function OutputCard({ data, error, isLoading }: OutputCardProps) {
  if (isLoading) {
    return (
      <div className="glass-panel w-full mt-4">
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Analyzing and formulating statement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel w-full mt-4">
        <div className="error-message">
          <AlertCircle size={24} />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="glass-panel w-full mt-4">
      <div className="output-card">
        
        <div className="output-section">
          <div className="output-label">
            <FileText size={18} /> Professional Statement
          </div>
          <div className="output-content">
            {data.professionalStatement}
          </div>
        </div>

        <div className="output-section success">
          <div className="output-label">
            <Zap size={18} /> In One Sentence
          </div>
          <div className="output-content">
            {data.summary}
          </div>
        </div>

        <div className="output-section">
          <div className="output-label">
            <ArrowRight size={18} /> Next Step
          </div>
          <div className="output-content">
            {data.nextStep}
          </div>
        </div>

      </div>
    </div>
  );
}
