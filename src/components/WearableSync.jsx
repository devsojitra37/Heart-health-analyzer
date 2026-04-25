import React, { useState, useEffect } from 'react';
import { Watch, Heart, Activity, Bluetooth, CheckCircle } from 'lucide-react';
import './WearableSync.css';

const WearableSync = ({ onSyncComplete }) => {
  const [syncState, setSyncState] = useState('idle'); // idle, scanning, syncing, complete
  const [device, setDevice] = useState('');
  const [mockData, setMockData] = useState(null);

  const startSync = (selectedDevice) => {
    setDevice(selectedDevice);
    setSyncState('scanning');
    
    // Simulate finding device
    setTimeout(() => {
      setSyncState('syncing');
      
      // Simulate downloading data
      setTimeout(() => {
        const data = {
          hrv: Math.floor(Math.random() * 30 + 30), // 30-60 ms
          vo2max: Math.floor(Math.random() * 15 + 35), // 35-50
          restHr: Math.floor(Math.random() * 20 + 55), // 55-75 bpm
          steps: Math.floor(Math.random() * 5000 + 5000) // 5000-10000
        };
        setMockData(data);
        setSyncState('complete');
        if(onSyncComplete) onSyncComplete(data);
      }, 2500);
    }, 1500);
  };

  return (
    <div className="wearable-sync-container">
      <div className="wearable-header">
        <Watch className="wearable-icon" size={24} />
        <h4>Smartwatch Health Sync</h4>
      </div>
      
      {syncState === 'idle' && (
        <div className="device-selection animate-fade-in">
          <p>Import live cardiovascular metrics directly from your wearable device.</p>
          <div className="device-buttons">
            <button className="device-btn apple" onClick={() => startSync('Apple Watch')}>
               Watch
            </button>
            <button className="device-btn fitbit" onClick={() => startSync('Fitbit')}>
              Fitbit
            </button>
            <button className="device-btn garmin" onClick={() => startSync('Garmin')}>
              Garmin
            </button>
          </div>
        </div>
      )}

      {syncState === 'scanning' && (
        <div className="sync-status animate-fade-in">
          <div className="radar-spinner"></div>
          <p>Looking for {device}...</p>
        </div>
      )}

      {syncState === 'syncing' && (
        <div className="sync-status animate-fade-in">
          <Bluetooth className="pulsing-icon bluetooth-color" size={32} />
          <p>Connected. Streaming live secure health data...</p>
          <div className="progress-bar-container">
            <div className="progress-bar fill-animation"></div>
          </div>
        </div>
      )}

      {syncState === 'complete' && mockData && (
        <div className="sync-results animate-fade-in">
          <div className="success-header">
            <CheckCircle className="success-icon" size={20} />
            <h5>Live Data Synced</h5>
          </div>
          <div className="metrics-grid">
            <div className="metric-card">
              <Activity size={16} />
              <span className="metric-label">HRV</span>
              <span className="metric-value">{mockData.hrv} ms</span>
            </div>
            <div className="metric-card">
              <Heart size={16} />
              <span className="metric-label">Resting HR</span>
              <span className="metric-value">{mockData.restHr} bpm</span>
            </div>
            <div className="metric-card">
              <Activity size={16} />
              <span className="metric-label">VO₂ Max</span>
              <span className="metric-value">{mockData.vo2max}</span>
            </div>
          </div>
          <button className="reset-sync-btn" onClick={() => setSyncState('idle')}>
            Switch Device
          </button>
        </div>
      )}
    </div>
  );
};

export default WearableSync;
