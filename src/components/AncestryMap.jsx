import React, { useState } from 'react';
import { Globe, MapPin, Dna } from 'lucide-react';
import './AncestryMap.css';

const AncestryMap = ({ onSelectAncestry }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regions = [
    { id: 'south-asian', name: 'South Asian', modifier: +8, desc: 'Higher genetic propensity for early-onset CAD.', color: '#ef4444' },
    { id: 'mediterranean', name: 'Mediterranean', modifier: -4, desc: 'Generally lower risk profile, often tied to regional diet/genetics.', color: '#10b981' },
    { id: 'nordic', name: 'Northern European', modifier: +2, desc: 'Slightly elevated familial hypercholesterolemia risks.', color: '#f59e0b' },
    { id: 'african', name: 'African / Afro-Caribbean', modifier: +5, desc: 'Higher propensity for hypertension-related risks.', color: '#f97316' },
    { id: 'east-asian', name: 'East Asian', modifier: -2, desc: 'Generally lower baseline risk, but rising with westernization.', color: '#3b82f6' },
    { id: 'hispanic', name: 'Hispanic / Latino', modifier: +3, desc: 'Higher incidence of metabolic syndrome factors and insulin resistance.', color: '#ec4899' },
    { id: 'middle-eastern', name: 'Middle Eastern', modifier: +4, desc: 'Elevated risk of coronary interventions at a comparatively younger age.', color: '#8b5cf6' },
    { id: 'indigenous', name: 'Indigenous American', modifier: +5, desc: 'Significant incidence of cardiometabolic risks and vascular conditions.', color: '#06b6d4' }
  ];

  const handleSelect = (region) => {
    setSelectedRegion(region);
    if(onSelectAncestry) onSelectAncestry(region);
  };

  return (
    <div className="ancestry-container">
      <div className="ancestry-header">
        <Globe className="text-primary" size={24} />
        <h4>Ancestral Gene-Mapping</h4>
      </div>
      <p className="ancestry-desc">
        Cardiovascular risks vary by genetic heritage. Select your primary ancestry to calibrate the AI model.
      </p>

      <div className="ancestry-grid">
        {regions.map(region => (
          <button 
            key={region.id} 
            className={`region-btn ${selectedRegion?.id === region.id ? 'active' : ''}`}
            onClick={() => handleSelect(region)}
            style={{ 
              borderColor: selectedRegion?.id === region.id ? region.color : 'var(--border)',
              boxShadow: selectedRegion?.id === region.id ? `0 0 10px ${region.color}40` : 'none'
            }}
          >
            <div className="region-icon-wrapper" style={{ color: region.color }}>
              <MapPin size={20} />
            </div>
            <span>{region.name}</span>
          </button>
        ))}
      </div>

      {selectedRegion && (
        <div className="ancestry-insight animate-fade-in" style={{ borderLeftColor: selectedRegion.color }}>
          <div className="insight-header">
            <Dna size={16} />
            <strong>Genetic Insight: {selectedRegion.name}</strong>
          </div>
          <p>{selectedRegion.desc}</p>
        </div>
      )}
    </div>
  );
};

export default AncestryMap;
