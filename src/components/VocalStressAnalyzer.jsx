import React, { useState, useEffect } from 'react';
import { Mic, Activity, CheckCircle, AlertOctagon } from 'lucide-react';
import './VocalStressAnalyzer.css';

const VocalStressAnalyzer = ({ onAnalyze }) => {
  const [state, setState] = useState('idle'); // idle, recording, analyzing, complete
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    let interval;
    if (state === 'recording') {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setState('analyzing');
            return 100;
          }
          return prev + 2; // 5 seconds roughly
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [state]);

  useEffect(() => {
    if (state === 'analyzing') {
      setTimeout(() => {
        // Mock result
        const stressLevel = Math.floor(Math.random() * 100);
        const classification = stressLevel > 70 ? 'High' : stressLevel > 40 ? 'Moderate' : 'Low';
        const modifier = stressLevel > 70 ? 8 : stressLevel > 40 ? 3 : -2;
        
        const res = { score: stressLevel, classification, modifier };
        setResult(res);
        setState('complete');
        if (onAnalyze) onAnalyze(res);
      }, 2000);
    }
  }, [state, onAnalyze]);

  const handleStart = () => {
    setState('recording');
    setProgress(0);
  };

  return (
    <div className="vocal-analyzer-container">
      <div className="vocal-header">
        <Mic className="text-secondary" size={24} />
        <h4>Vocal Biomarker Analyzer</h4>
      </div>
      <p className="vocal-desc">
        Micro-tremors in your voice can indicate hidden cortisol and cardiovascular stress.
      </p>

      {state === 'idle' && (
        <div className="vocal-action animate-fade-in">
          <button className="record-btn" onClick={handleStart}>
            <div className="record-circle"></div>
            Start Analysis
          </button>
          <p className="instruction">Read aloud: "I am taking steps to understand and improve my heart health today."</p>
        </div>
      )}

      {state === 'recording' && (
        <div className="vocal-active animate-fade-in">
          <div className="audio-visualizer">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <p className="recording-text">Listening... Keep speaking</p>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {state === 'analyzing' && (
        <div className="vocal-analyzing animate-fade-in">
          <Activity className="pulsing-icon text-primary" size={32} />
          <p>Processing vocal frequencies...</p>
        </div>
      )}

      {state === 'complete' && result && (
        <div className="vocal-result animate-fade-in">
          <div className="result-stat">
            {result.classification === 'High' ? (
              <AlertOctagon size={24} className="text-warning" />
            ) : (
              <CheckCircle size={24} className="text-success" />
            )}
            <h5>Vocal Stress: {result.classification}</h5>
          </div>
          <div className="stress-meter">
            <div 
              className="stress-fill" 
              style={{
                width: `${result.score}%`, 
                background: result.classification === 'High' ? '#ef4444' : result.classification === 'Moderate' ? '#f59e0b' : '#10b981'
              }}
            ></div>
          </div>
          <button className="text-btn" onClick={() => setState('idle')}>Retake Analysis</button>
        </div>
      )}
    </div>
  );
};

export default VocalStressAnalyzer;
