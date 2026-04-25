import React from 'react';
import './Hero.css';
import { Activity } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="container hero-container animate-fade-in">
        <div className="hero-content">
          <div className="badge">
            <Activity size={16} />
            <span>AI-Powered Diagnostics</span>
          </div>
          <h1 className="hero-title">
            AI-Powered Heart <br />
            <span className="text-gradient">Health Analyzer</span>
          </h1>
          <p className="hero-subtitle">
            Predict your heart disease risk in seconds using advanced machine learning. 
            Empowering proactive cardiovascular health through cutting-edge AI.
          </p>
          <div className="hero-actions">
            <a href="#analyzer" className="btn btn-primary hero-btn">
              Analyze Now
            </a>
            <a href="#about" className="btn btn-outline hero-btn">
              Learn More
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="ecg-container">
            <svg viewBox="0 0 500 200" className="ecg-line">
              <path 
                d="M 0 100 L 100 100 L 120 70 L 140 180 L 170 20 L 200 120 L 220 100 L 350 100 L 370 70 L 390 180 L 420 20 L 450 120 L 470 100 L 500 100" 
                fill="none" 
                stroke="url(#ecg-gradient)" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <defs>
                <linearGradient id="ecg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="glow-orb"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
