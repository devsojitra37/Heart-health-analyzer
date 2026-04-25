import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './DataVisualization.css';

const DataVisualization = () => {
  const data = [
    { ageGroup: '30-39', lowRisk: 75, moderateRisk: 20, highRisk: 5 },
    { ageGroup: '40-49', lowRisk: 60, moderateRisk: 30, highRisk: 10 },
    { ageGroup: '50-59', lowRisk: 40, moderateRisk: 40, highRisk: 20 },
    { ageGroup: '60-69', lowRisk: 25, moderateRisk: 45, highRisk: 30 },
    { ageGroup: '70+', lowRisk: 15, moderateRisk: 35, highRisk: 50 },
  ];

  return (
    <section className="section dataviz">
      <div className="container">
        <div className="dataviz-header text-center animate-fade-in">
          <h2 className="section-title">Global Health Trends</h2>
          <p className="section-subtitle">
            Observe the cardiovascular risk distribution across different age groups based on aggregated clinical data.
          </p>
        </div>
        
        <div className="chart-container animate-fade-in" style={{ marginBottom: '4rem' }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="ageGroup" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }}
                cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
              />
              <Bar dataKey="lowRisk" name="Low Risk" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
              <Bar dataKey="moderateRisk" name="Moderate Risk" stackId="a" fill="#f59e0b" />
              <Bar dataKey="highRisk" name="High Risk" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="gamification-section text-center">
          <h2 className="section-title">Your Achievements</h2>
          <p className="section-subtitle">Earn badges for positive changes in your health history.</p>
          <div className="badges-grid" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            <div className="badge-item" style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'pulse 2s infinite' }}>🎖️</div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Cholesterol Crusher</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Reduced LDL by 10%</p>
            </div>
            <div className="badge-item" style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'bounce 2s infinite' }}>🏃‍♂️</div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Active Lifestyle</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Synced 5,000 steps</p>
            </div>
            <div className="badge-item" style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', opacity: 0.5 }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', filter: 'grayscale(100%)' }}>❤️</div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>BP Champion</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Reach normal resting BP</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataVisualization;
