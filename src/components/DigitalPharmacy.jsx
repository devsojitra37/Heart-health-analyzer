import React, { useState } from 'react';
import { Pill, Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import './DigitalPharmacy.css';

const DigitalPharmacy = ({ onUpdateSupplements }) => {
  const [shelfItems, setShelfItems] = useState([
    { id: 'statin', name: 'Statins', icon: '💊', color: '#3b82f6', benefit: 'Lowers LDL Cholesterol', modifier: -8 },
    { id: 'omega3', name: 'Omega-3', icon: '🐟', color: '#f59e0b', benefit: 'Reduces Triglycerides', modifier: -3 },
    { id: 'aspirin', name: 'Baby Aspirin', icon: '⚪', color: '#ef4444', benefit: 'Prevents Clotting', modifier: -4 },
    { id: 'coq10', name: 'CoQ10', icon: '🟡', color: '#eab308', benefit: 'Supports Heart Muscle', modifier: -2 }
  ]);

  const [organizerItems, setOrganizerItems] = useState([]);

  const handleDragStart = (e, item, source) => {
    e.dataTransfer.setData('itemId', item.id);
    e.dataTransfer.setData('source', source);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropToOrganizer = (e) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    const source = e.dataTransfer.getData('source');
    
    if (source === 'shelf') {
      const item = shelfItems.find(i => i.id === itemId);
      if (item) {
        setShelfItems(shelfItems.filter(i => i.id !== itemId));
        const newOrganizer = [...organizerItems, item];
        setOrganizerItems(newOrganizer);
        if(onUpdateSupplements) onUpdateSupplements(newOrganizer);
      }
    }
  };

  const handleDropToShelf = (e) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    const source = e.dataTransfer.getData('source');
    
    if (source === 'organizer') {
      const item = organizerItems.find(i => i.id === itemId);
      if (item) {
        setOrganizerItems(organizerItems.filter(i => i.id !== itemId));
        const newOrganizer = organizerItems.filter(i => i.id !== itemId);
        setShelfItems([...shelfItems, item]);
        if(onUpdateSupplements) onUpdateSupplements(newOrganizer);
      }
    }
  };

  const moveToOrganizer = (item) => {
    setShelfItems(shelfItems.filter(i => i.id !== item.id));
    const newOrganizer = [...organizerItems, item];
    setOrganizerItems(newOrganizer);
    if(onUpdateSupplements) onUpdateSupplements(newOrganizer);
  };

  const moveToShelf = (item) => {
    setOrganizerItems(organizerItems.filter(i => i.id !== item.id));
    const newOrganizer = organizerItems.filter(i => i.id !== item.id);
    setShelfItems([...shelfItems, item]);
    if(onUpdateSupplements) onUpdateSupplements(newOrganizer);
  };

  const totalBenefit = organizerItems.reduce((acc, curr) => acc + curr.modifier, 0);

  return (
    <div className="pharmacy-container">
      <div className="pharmacy-header">
        <Pill className="text-secondary" size={24} />
        <h4>Digital Pharmacy</h4>
      </div>
      <p className="pharmacy-desc">
        Drag and drop your daily medications & supplements into the organizer to simulate their chemical benefits.
      </p>

      <div className="pharmacy-layout">
        {/* Shelf */}
        <div 
          className="shelf-area"
          onDragOver={handleDragOver}
          onDrop={handleDropToShelf}
        >
          <div className="area-title">Supplement Shelf</div>
          <div className="items-container">
            {shelfItems.length === 0 && <span className="empty-text">Shelf empty</span>}
            {shelfItems.map(item => (
              <div 
                key={item.id} 
                className="pill-draggable" 
                draggable
                onDragStart={(e) => handleDragStart(e, item, 'shelf')}
                onClick={() => moveToOrganizer(item)}
              >
                <span className="pill-icon">{item.icon}</span>
                <div className="pill-info">
                  <span className="pill-name">{item.name}</span>
                  <span className="pill-benefit">{item.benefit}</span>
                </div>
                <Plus size={14} className="move-icon" />
              </div>
            ))}
          </div>
        </div>

        <div className="drag-indicator">
          <ArrowRight className="text-muted bounce-horizontal" size={24} />
        </div>

        {/* Organizer */}
        <div 
          className="organizer-area"
          onDragOver={handleDragOver}
          onDrop={handleDropToOrganizer}
        >
          <div className="area-title">Daily Organizer</div>
          <div className="items-container organizer-glow">
            {organizerItems.length === 0 && <span className="empty-text">Drag items here</span>}
            {organizerItems.map(item => (
              <div 
                key={item.id} 
                className="pill-draggable active-pill" 
                draggable
                onDragStart={(e) => handleDragStart(e, item, 'organizer')}
                onClick={() => moveToShelf(item)}
                style={{ borderLeftColor: item.color }}
              >
                <span className="pill-icon">{item.icon}</span>
                <span className="pill-name">{item.name}</span>
                <span className="modifier-badge">{item.modifier} Risk</span>
              </div>
            ))}
          </div>
          
          {organizerItems.length > 0 && (
            <div className="benefit-summary animate-fade-in">
              <ShieldCheck size={16} className="text-success" />
              <span>Total Simulated Benefit: <strong>{totalBenefit} Point Reduction</strong></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalPharmacy;
