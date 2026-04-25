import React, { useState, useEffect } from 'react';
import { Hourglass, TrendingDown, TrendingUp, Activity } from 'lucide-react';
import './HeartAgeSimulator.css';

const HeartAgeSimulator = ({ currentScore }) => {
  const [years, setYears] = useState(0);
  const [projections, setProjections] = useState(null);

  useEffect(() => {
    // Calculate projections based on current score
    const currentPath = Math.min(100, currentScore + (years * 1.5));
    const optimized = Math.max(0, currentScore - (years * 0.8));
    const declining = Math.min(100, currentScore + (years * 3));

    setProjections({
      currentPath: Math.round(currentPath),
      optimized: Math.round(optimized),
      declining: Math.round(declining)
    });
  }, [years, currentScore]);

  const handleSlider = (e) => {
    setYears(parseInt(e.target.value));
  };

  return (
    <div className="heart-age-container">
      <div className="simulator-header">
        <Hourglass className="simulator-icon text-secondary" size={24} />
        <h4>Heart Age Time-Machine</h4>
      </div>
      <p className="simulator-desc">See how your cardiovascular risk score evolves over time based on lifestyle choices.</p>

      <div className="slider-section">
        <div className="slider-labels">
          <span>Today</span>
          <span className="years-display">+{years} Years Future</span>
          <span>+30 Yrs</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="30" 
          step="5" 
          value={years} 
          onChange={handleSlider}
          className="time-slider"
        />
      </div>

      {projections && (
        <div className="projections-container animate-fade-in">
          <div className="projection-card declining">
            <div className="proj-header">
              <TrendingUp size={16} />
              <span>Declining Habits</span>
            </div>
            <div className="proj-score">{projections.declining}</div>
            <div className="proj-bar-wrapper">
              <div className="proj-bar" style={{ width: `${projections.declining}%`, background: '#ef4444' }}></div>
            </div>
          </div>

          <div className="projection-card current">
            <div className="proj-header">
              <Activity size={16} />
              <span>Current Trajectory</span>
            </div>
            <div className="proj-score">{projections.currentPath}</div>
            <div className="proj-bar-wrapper">
              <div className="proj-bar" style={{ width: `${projections.currentPath}%`, background: '#f59e0b' }}></div>
            </div>
          </div>

          <div className="projection-card optimized">
            <div className="proj-header">
              <TrendingDown size={16} />
              <span>Optimized Lifestyle</span>
            </div>
            <div className="proj-score">{projections.optimized}</div>
            <div className="proj-bar-wrapper">
              <div className="proj-bar" style={{ width: `${projections.optimized}%`, background: '#10b981' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeartAgeSimulator;
