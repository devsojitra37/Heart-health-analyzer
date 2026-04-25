import React, { useState } from 'react';
import { Camera, Utensils, AlertTriangle, CheckCircle, Flame } from 'lucide-react';
import './MealScanner.css';

const MealScanner = ({ onScanComplete }) => {
  const [scanState, setScanState] = useState('idle'); // idle, scanning, analyzing, result
  const [selectedMeal, setSelectedMeal] = useState(null);

  const meals = [
    {
      id: 'samosa',
      name: 'Deep-Fried Samosas',
      icon: '🥟',
      impact: {
        sodium: '+680mg',
        lipids: '+18g',
        calories: '550',
        scoreModifier: +6,
        warning: 'High in sodium and trans fats. Negative cardiovascular impact.'
      }
    },
    {
      id: 'salad',
      name: 'Mediterranean Salad',
      icon: '🥗',
      impact: {
        sodium: '+120mg',
        lipids: '+5g (Healthy)',
        calories: '320',
        scoreModifier: -3,
        warning: 'Heart-healthy choice. Rich in olive oil and nutrients.'
      }
    },
    {
      id: 'pizza',
      name: 'Cheese Pizza',
      icon: '🍕',
      impact: {
        sodium: '+850mg',
        lipids: '+22g',
        calories: '750',
        scoreModifier: +5,
        warning: 'High in saturated fat and sodium. Watch portion sizes.'
      }
    }
  ];

  const handleScan = (meal) => {
    setSelectedMeal(meal);
    setScanState('scanning');
    
    // Simulate Vision processing
    setTimeout(() => {
      setScanState('analyzing');
      
      setTimeout(() => {
        setScanState('result');
        if(onScanComplete) onScanComplete(meal.impact);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="meal-scanner-container">
      <div className="scanner-header">
        <Camera className="scanner-icon" size={24} />
        <h4>AI Meal Impact Vision</h4>
      </div>

      {scanState === 'idle' && (
        <div className="meal-selection animate-fade-in">
          <p>Select a recent meal to simulate computer vision analysis of dietary cardiovascular impact.</p>
          <div className="meal-cards">
            {meals.map((m) => (
              <button key={m.id} className="meal-card-btn" onClick={() => handleScan(m)}>
                <span className="meal-emoji">{m.icon}</span>
                <span className="meal-name">{m.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {scanState === 'scanning' && (
        <div className="scanning-ui animate-fade-in">
          <div className="scan-target">
            <span className="huge-emoji">{selectedMeal.icon}</span>
            <div className="scanline"></div>
          </div>
          <p>Scanning macro-nutrients...</p>
        </div>
      )}

      {scanState === 'analyzing' && (
        <div className="analyzing-ui animate-fade-in">
          <Utensils className="pulsing-icon text-secondary" size={32} />
          <p>Dissecting lipid and sodium profiles...</p>
          <div className="cyber-loader"></div>
        </div>
      )}

      {scanState === 'result' && selectedMeal && (
        <div className="result-ui animate-fade-in">
          <div className="result-header">
            {selectedMeal.impact.scoreModifier > 0 ? (
              <AlertTriangle className="text-warning" size={24} />
            ) : (
              <CheckCircle className="text-success" size={24} />
            )}
            <h5>Analysis: {selectedMeal.name}</h5>
          </div>
          
          <div className="nutrition-breakdown">
            <div className="nut-item">
              <span className="nut-label">Sodium Drop</span>
              <span className="nut-value text-danger">{selectedMeal.impact.sodium}</span>
            </div>
            <div className="nut-item">
              <span className="nut-label">Lipids (Fats)</span>
              <span className="nut-value text-warning">{selectedMeal.impact.lipids}</span>
            </div>
            <div className="nut-item">
              <span className="nut-label"><Flame size={14}/> Cals</span>
              <span className="nut-value">{selectedMeal.impact.calories}</span>
            </div>
          </div>

          <p className="impact-warning">{selectedMeal.impact.warning}</p>

          <button className="reset-scan-btn" onClick={() => setScanState('idle')}>
            Scan Another Meal
          </button>
        </div>
      )}
    </div>
  );
};

export default MealScanner;
