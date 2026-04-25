import React, { useRef, useState, useEffect } from 'react';
import './PredictionResult.css';
import HumanBodyVisualizer from './HumanBodyVisualizer';
import DigitalRadarChart from './DigitalRadarChart';
import HeartAgeSimulator from './HeartAgeSimulator';
import { AlertTriangle, CheckCircle, Info, RefreshCw, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const PredictionResult = ({ result, onReset }) => {
  const { score: baseScore, level: baseLevel, data } = result;
  const reportRef = useRef(null);

  // What-If local state
  const [liveBP, setLiveBP] = useState(parseInt(data?.bloodPressure) || 120);
  const [liveChol, setLiveChol] = useState(parseInt(data?.cholesterol) || 200);
  const [calculatedScore, setCalculatedScore] = useState(baseScore);

  useEffect(() => {
    // Basic heuristic for real-time recalculation
    const bpDiff = liveBP - (parseInt(data?.bloodPressure) || 120);
    const cholDiff = liveChol - (parseInt(data?.cholesterol) || 200);
    const riskAdjustment = Math.round((bpDiff * 0.15) + (cholDiff * 0.1));
    let newScore = Math.min(100, Math.max(1, baseScore + riskAdjustment));
    setCalculatedScore(newScore);
  }, [liveBP, liveChol, baseScore, data]);

  let level = 'Healthy';
  if (calculatedScore >= 40) level = 'Moderate Risk';
  if (calculatedScore >= 70) level = 'High Risk';

  let colorClass = 'risk-low';
  let Icon = CheckCircle;
  let suggestion = 'Maintain your healthy lifestyle with regular exercise and a balanced diet.';

  if (level === 'Moderate Risk') {
    colorClass = 'risk-moderate';
    Icon = Info;
    suggestion = 'Consider scheduling a check-up with your doctor. Monitor your diet and physical activity.';
  } else if (level === 'High Risk') {
    colorClass = 'risk-high';
    Icon = AlertTriangle;
    suggestion = 'Please consult a healthcare professional immediately for a comprehensive evaluation.';
  }

  // Visualization data
  const chartData = [
    {
      name: 'Blood Pressure',
      YourValue: liveBP,
      Normal: 120,
    },
    {
      name: 'Cholesterol',
      YourValue: liveChol,
      Normal: 200,
    }
  ];

  const handleDownload = async () => {
    if (!reportRef.current) return;
    try {
      const canvas = await html2canvas(reportRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save('CardioAI-Risk-Report.pdf');
    } catch (error) {
      console.error("Failed to generate PDF", error);
    }
  };

  return (
    <div className="prediction-result animate-fade-in" ref={reportRef} style={{ background: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius)' }}>
      <div className={`result-header ${colorClass}`}>
        <Icon size={48} />
        <h2>{level}</h2>
      </div>

      <div className="result-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
        <div className="dashboard-visual" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <HumanBodyVisualizer riskPercentage={calculatedScore} />
        </div>
        
        <div className="dashboard-radar" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <DigitalRadarChart liveBP={liveBP} liveChol={liveChol} ageScore={Math.min(100, baseScore + 10)} bmiScore={Math.min(100, baseScore + parseInt(data?.age || 0)/2)} />
        </div>

        <div className="what-if-scenarios" style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: '15px', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>"What-If" Matrix</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Adjust variables to simulate real-time effects on your digital human avatar and localized risks.</p>
          
          <div className="slider-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Systolic Pressure</span>
              <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{liveBP} mm Hg</span>
            </label>
            <input type="range" min="80" max="220" value={liveBP} onChange={(e) => setLiveBP(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary)' }} />
          </div>

          <div className="slider-group">
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Total Cholesterol</span>
              <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{liveChol} mg/dl</span>
            </label>
            <input type="range" min="100" max="400" value={liveChol} onChange={(e) => setLiveChol(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary)' }} />
          </div>

          <div className="gauge-container" style={{ marginTop: '2rem', height: '10px', background: 'var(--border)', borderRadius: '5px', overflow: 'hidden', position: 'relative' }}>
            <div 
              style={{ 
                height: '100%',
                width: `${calculatedScore}%`, 
                background: level === 'High Risk' ? 'var(--secondary)' : level === 'Moderate Risk' ? '#f59e0b' : '#10b981',
                transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1), background 0.5s ease-out'
              }}
            ></div>
          </div>
          <p style={{textAlign: 'center', marginTop: '1rem', fontWeight: 'bold', fontSize: '1.2rem', color: level === 'High Risk' ? 'var(--secondary)' : level === 'Moderate Risk' ? '#f59e0b' : '#10b981'}}>
            Overall System Risk: {calculatedScore}%
          </p>
        </div>
      </div>

      <div className="viz-container" style={{ margin: '4rem 0 2rem 0', height: '250px' }}>
        <h3 style={{marginBottom: '2rem', textAlign: 'center'}}>Metrics Analysis</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" stroke="var(--text-muted)" />
            <YAxis stroke="var(--text-muted)" />
            <Tooltip contentStyle={{background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-main)', borderRadius: '8px'}} cursor={{fill: 'rgba(128,128,128,0.1)'}} />
            <Legend />
            <Bar dataKey="YourValue" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Normal" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="time-machine-container" style={{ margin: '2rem 0' }}>
        <HeartAgeSimulator currentScore={calculatedScore} />
      </div>

      <div className="result-details">
        <h3>Health Suggestion</h3>
        <p>{suggestion}</p>
        <p className="disclaimer-text">
          <strong>Disclaimer:</strong> This tool is not a substitute for professional medical advice.
        </p>
      </div>

      <div className="result-actions" style={{display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem'}} data-html2canvas-ignore>
        <button onClick={onReset} className="btn btn-outline reset-btn">
          <RefreshCw size={18} /> Take Another Test
        </button>
        <button onClick={handleDownload} className="btn btn-primary">
          <Download size={18} /> Download Report
        </button>
      </div>
    </div>
  );
};

export default PredictionResult;
