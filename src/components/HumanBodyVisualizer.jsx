import React from 'react';
import { motion } from 'framer-motion';

const HumanBodyVisualizer = ({ riskPercentage = 10 }) => {
  const isHighRisk = riskPercentage > 50;
  // A glowing effect color
  const heartColor = isHighRisk ? "#ef4444" : "#10b981"; // Red if high risk, Green if low
  
  // Pulse animation variants limit the scale and opacity based on risk
  const pulseVariants = {
    animate: {
      scale: [1, isHighRisk ? 1.5 : 1.2, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: isHighRisk ? 0.6 : 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '350px', 
      width: '100%', 
      borderRadius: '15px', 
      backgroundColor: 'var(--card-bg)',
      border: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Techy background grid */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        opacity: 0.5
      }} />

      <svg width="200" height="300" viewBox="0 0 200 300" style={{ zIndex: 1, filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.3))' }}>
        <defs>
          <radialGradient id="heartGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor={heartColor} stopOpacity="1" />
            <stop offset="100%" stopColor={heartColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Abstract Human Torso Outline */}
        <path 
          d="M100 20 C80 20, 70 40, 70 55 C70 65, 75 75, 80 80 C60 85, 30 110, 25 150 C20 190, 15 250, 15 290 L185 290 C185 250, 180 190, 175 150 C170 110, 140 85, 120 80 C125 75, 130 65, 130 55 C130 40, 120 20, 100 20 Z" 
          fill="none" 
          stroke="var(--primary)" 
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
        
        {/* Inner wireframe accents */}
        <path 
          d="M80 80 L100 100 L120 80 M70 150 L100 160 L130 150 M60 220 L100 210 L140 220 M100 100 L100 290" 
          fill="none" 
          stroke="var(--primary)" 
          strokeWidth="1"
          opacity="0.3"
          strokeDasharray="4 4"
        />

        {/* Glowing Heart Area */}
        <motion.circle 
          cx="110" // Slightly offset to the left of the body (user's right, anatomical left)
          cy="120" 
          r="15" 
          fill="url(#heartGlow)"
          variants={pulseVariants}
          animate="animate"
        />
        
        {/* Heart core */}
        <motion.circle 
          cx="110"
          cy="120"
          r="4"
          fill={heartColor}
          variants={pulseVariants}
          animate="animate"
        />
      </svg>
      
      {/* Scanline overlay for that tech aesthetic */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1))',
        backgroundSize: '100% 4px',
        zIndex: 2,
        pointerEvents: 'none',
        opacity: 0.15
      }} />
    </div>
  );
};

export default HumanBodyVisualizer;
