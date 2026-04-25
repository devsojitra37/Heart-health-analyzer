import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const DigitalRadarChart = ({ liveBP, liveChol, ageScore, bmiScore }) => {
  // Normalize data for the radar chart (0-100 scale ideally)
  const normalizedBP = Math.min(100, Math.max(0, ((liveBP - 80) / (200 - 80)) * 100));
  const normalizedChol = Math.min(100, Math.max(0, ((liveChol - 100) / (300 - 100)) * 100));
  
  const data = [
    {
      metric: 'Blood Pressure',
      UserValue: Math.round(normalizedBP),
      Baseline: 30, // Representing a healthy normal normalized roughly
      fullMark: 100,
    },
    {
      metric: 'Cholesterol',
      UserValue: Math.round(normalizedChol),
      Baseline: 40,
      fullMark: 100,
    },
    {
      metric: 'Age Risk',
      UserValue: ageScore || 50,
      Baseline: 30,
      fullMark: 100,
    },
    {
      metric: 'Cardio Stress',
      UserValue: bmiScore || 50,
      Baseline: 30,
      fullMark: 100,
    },
    {
      metric: 'Vascular Health',
      UserValue: Math.round((normalizedBP + normalizedChol) / 2),
      Baseline: 35,
      fullMark: 100,
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'var(--surface)',
          padding: '10px 15px',
          border: '1px solid var(--primary)',
          borderRadius: '8px',
          color: 'var(--text-main)',
          boxShadow: '0 0 15px rgba(59,130,246,0.3)',
        }}>
          <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: 'var(--primary)' }}>{payload[0].payload.metric}</p>
          <p style={{ margin: '0', fontSize: '0.9rem' }}>User Context: <span style={{color: '#ef4444'}}>{payload[0].value}%</span></p>
          <p style={{ margin: '0', fontSize: '0.9rem' }}>Optimal: <span style={{color: '#10b981'}}>{payload[1].value}%</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      width: '100%',
      height: '350px',
      backgroundColor: 'var(--card-bg)',
      borderRadius: '15px',
      border: '1px solid var(--border)',
      position: 'relative',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', textAlign: 'center', fontSize: '1.2rem', color: 'var(--text-main)' }}>
        Diagnostic Matrix
      </h3>
      <div style={{ flex: 1, position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="var(--border)" strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Healthy Baseline */}
            <Radar 
              name="Optimal Range" 
              dataKey="Baseline" 
              stroke="#10b981" 
              fill="#10b981" 
              fillOpacity={0.1} 
              strokeDasharray="4 4"
            />
            
            {/* User dynamic values */}
            <Radar 
              name="Your Matrix" 
              dataKey="UserValue" 
              stroke="var(--primary)" 
              strokeWidth={2}
              fill="var(--primary)" 
              fillOpacity={0.4} 
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DigitalRadarChart;
