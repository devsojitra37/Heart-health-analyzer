import React, { useState, useEffect } from 'react';
import PredictionForm from './PredictionForm';
import PredictionResult from './PredictionResult';
import { MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import WearableSync from './WearableSync';
import MealScanner from './MealScanner';
import VocalStressAnalyzer from './VocalStressAnalyzer';
import SmogVisualizer from './SmogVisualizer';
import './Analyzer.css';

const Analyzer = () => {
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [wearableData, setWearableData] = useState(null);
  const [mealImpact, setMealImpact] = useState(null);
  const [vocalStress, setVocalStress] = useState(null);
  const [smogImpact, setSmogImpact] = useState(null);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('heartHealthHistory');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });
  
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    // Mock Geo-Health retrieval
    setTimeout(() => {
      setGeoData({
        location: "Urban Metropolitan Area",
        airQuality: "Moderate (PM2.5: 55)",
        recommendation: "Your location suggests higher exposure to air pollutants. Consider indoor exercise today to protect cardiovascular health."
      });
    }, 1500);
  }, []);

  const handlePredict = (data) => {
    setIsAnalyzing(true);
    setResult(null);
    
    setTimeout(() => {
      let riskScore = 0;
      
      const age = parseInt(data.age) || 0;
      const bp = parseInt(data.bloodPressure) || 0;
      const chol = parseInt(data.cholesterol) || 0;
      const maxHr = parseInt(data.maxHeartRate) || 0;
      const cp = parseInt(data.chestPain) || 0;
      const exang = parseInt(data.exerciseAngina) || 0;
      
      if (age > 50) riskScore += 15;
      if (age > 65) riskScore += 10;
      if (bp > 130) riskScore += 15;
      if (bp > 140) riskScore += 10;
      if (chol > 200) riskScore += 15;
      if (chol > 240) riskScore += 10;
      if (maxHr > 0 && maxHr < 110) riskScore += 15; // Low max heart rate
      if (cp > 0 && cp < 3) riskScore += 15; // Typical/Atypical Angina
      if (exang == 1) riskScore += 20;
      
      // Apply Ancestry Modifier if present
      if (data.ancestryModifier) {
        riskScore += data.ancestryModifier;
      }

      riskScore += 5; // Base risk
      
      // Apply Wearable Modifiers
      if (wearableData) {
        if (wearableData.vo2max > 45) riskScore -= 5;
        if (wearableData.hrv > 50) riskScore -= 5;
        if (wearableData.restHr > 70) riskScore += 5;
      }
      
      // Apply Meal Modifiers
      if (mealImpact) {
        riskScore += mealImpact.scoreModifier;
      }
      
      // Apply Vocal Stress Modifiers
      if (vocalStress) {
        riskScore += vocalStress.modifier;
      }
      
      // Apply Smog Impact Modifiers
      if (smogImpact) {
        riskScore += smogImpact.modifier;
      }

      if (riskScore > 98) riskScore = 98;
      if (riskScore < 0) riskScore = 1;
      
      let riskLevel = 'Low Risk';
      if (riskScore > 35 && riskScore <= 65) riskLevel = 'Moderate Risk';
      else if (riskScore > 65) riskLevel = 'High Risk';
      
      const newResult = {
        score: riskScore,
        level: riskLevel,
        data: data
      };

      setResult(newResult);
      
      const historyItem = {
        date: new Date().toLocaleDateString(),
        score: riskScore
      };
      
      const updatedHistory = [...history, historyItem];
      setHistory(updatedHistory);
      localStorage.setItem('heartHealthHistory', JSON.stringify(updatedHistory));

      setIsAnalyzing(false);
    }, 2000);
  };

  const resetForm = () => {
    setResult(null);
  };

  return (
    <section id="analyzer" className="section analyzer-section">
      <div className="container">
        <div className="text-center animate-fade-in" style={{marginBottom: '3rem'}}>
          <h2 className="section-title">Check Your Risk</h2>
          <p className="section-subtitle">
            Fill out the health metrics below to receive your personalized heart risk assessment powered by our AI model.
          </p>
        </div>
        
        <div className="analyzer-container animate-fade-in">
          {geoData && (!result && !isAnalyzing) && (
            <div className="geo-context-card" style={{ background: 'var(--card-bg)', padding: '1rem 1.5rem', borderRadius: '1rem', marginBottom: '2rem', border: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '50%', color: 'white', marginTop: '0.2rem' }}>
                <MapPin size={20} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Environmental Context: {geoData.location}
                </h4>
                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>Air Quality: <strong>{geoData.airQuality}</strong></p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{geoData.recommendation}</p>
              </div>
            </div>
          )}
          
          {(!result && !isAnalyzing) && (
            <div className="add-ons" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <WearableSync onSyncComplete={setWearableData} />
              <MealScanner onScanComplete={setMealImpact} />
            </div>
          )}

          {(!result && !isAnalyzing) && (
            <div className="add-ons-row2" style={{ marginBottom: '2rem' }}>
              <VocalStressAnalyzer onAnalyze={setVocalStress} />
            </div>
          )}

          {(!result && !isAnalyzing) && <PredictionForm onSubmit={handlePredict} />}
          
          {(!result && !isAnalyzing) && (
            <div className="add-ons-row2" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
              <SmogVisualizer onUpdateEnvironment={setSmogImpact} />
            </div>
          )}
          
          {isAnalyzing && (
            <div className="analyzing-state">
              <div className="loader"></div>
              <h3>Analyzing your data...</h3>
              <p>Our model is processing multiple variables</p>
            </div>
          )}
          
          {result && (
            <PredictionResult result={result} onReset={resetForm} />
          )}
        </div>

        {history.length > 0 && (
          <div className="history-section animate-fade-in" style={{marginTop: '4rem', background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)'}}>
            <h3 style={{marginBottom: '1.5rem', textAlign: 'center'}}>Your Risk Assessment History</h3>
            <div style={{height: '300px', width: '100%'}}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="date" stroke="var(--text-muted)" />
                  <YAxis domain={[0, 100]} stroke="var(--text-muted)" />
                  <Tooltip contentStyle={{background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-main)', borderRadius: '8px'}} />
                  <Line type="monotone" dataKey="score" stroke="var(--secondary)" strokeWidth={3} dot={{r: 6, fill: 'var(--secondary)'}} activeDot={{r: 8}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Analyzer;
