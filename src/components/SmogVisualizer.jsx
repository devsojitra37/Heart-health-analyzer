import React, { useState, useEffect } from 'react';
import { CloudFog, Wind, AlertTriangle } from 'lucide-react';
import './SmogVisualizer.css';

const SmogVisualizer = ({ onUpdateEnvironment }) => {
  const [aqiLevel, setAqiLevel] = useState(50); // 0 to 300
  const [impactModifier, setImpactModifier] = useState(0);

  useEffect(() => {
    // Calculate cardiovascular impact based on AQI (PM2.5)
    let modifier = 0;
    if (aqiLevel > 150) modifier = 6;
    else if (aqiLevel > 100) modifier = 3;
    else if (aqiLevel < 40) modifier = -2;

    setImpactModifier(modifier);
    if(onUpdateEnvironment) {
      onUpdateEnvironment({ aqi: aqiLevel, modifier });
    }
  }, [aqiLevel, onUpdateEnvironment]);

  // Determine styles and labels based on AQI
  let statusText = "Good (Clean Air)";
  let color = "#10b981"; // green
  let fogOpacity = 0;
  
  if (aqiLevel > 150) {
    statusText = "Unhealthy (Heavy Smog)";
    color = "#ef4444"; // red
    fogOpacity = 0.8;
  } else if (aqiLevel > 100) {
    statusText = "Moderate (Polluted)";
    color = "#f59e0b"; // orange
    fogOpacity = 0.4;
  }

  const handleSlider = (e) => {
    setAqiLevel(parseInt(e.target.value));
  };

  return (
    <div className="smog-container">
      <div className="smog-header">
        <Wind className="text-secondary" size={24} />
        <h4>Atmospheric Smog Visualizer</h4>
      </div>
      <p className="smog-desc">
        Environmental cardiology shows micro-particles (PM2.5) directly spike inflammation. Simulate your local air quality.
      </p>

      <div className="environment-box" style={{ borderColor: color }}>
        <div className="particle-layer" style={{ opacity: fogOpacity }}></div>
        <div className="haze-layer" style={{ background: `rgba(100, 100, 100, ${fogOpacity * 0.7})` }}></div>
        
        <div className="env-content">
          <div className="env-status">
            <CloudFog size={48} color={color} className={aqiLevel > 100 ? 'pulse-slow' : ''} />
            <div className="env-text">
              <h5>Air Quality Index (AQI): {aqiLevel}</h5>
              <span style={{ color: color, fontWeight: 500 }}>{statusText}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="aqi-slider-container">
        <input 
          type="range" 
          min="10" 
          max="300" 
          value={aqiLevel} 
          onChange={handleSlider}
          className="aqi-slider"
          style={{ background: `linear-gradient(90deg, #10b981 10%, #f59e0b 40%, #ef4444 80%)` }}
        />
        <div className="slider-labels">
          <span>Pristine Alps</span>
          <span>Urban City</span>
          <span>Industrial Zone</span>
        </div>
      </div>

      {impactModifier > 0 && (
        <div className="smog-warning animate-fade-in">
          <AlertTriangle size={16} className="text-danger" />
          <span>Inflammatory Risk Modifier: <strong>+{impactModifier}</strong></span>
        </div>
      )}
      
      {impactModifier < 0 && (
        <div className="smog-bonus animate-fade-in">
          <span>Clean Air Bonus: <strong>{impactModifier} Risk</strong></span>
        </div>
      )}

    </div>
  );
};

export default SmogVisualizer;
