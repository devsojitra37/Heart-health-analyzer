import React, { useState, useEffect } from 'react';
import { Mic, Activity, Loader2 } from 'lucide-react';
import AncestryMap from './AncestryMap';
import './PredictionForm.css';

const PredictionForm = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    chestPain: '0',
    bloodPressure: '',
    cholesterol: '',
    fastingBloodSugar: '0',
    restingECG: '0',
    maxHeartRate: '',
    exerciseAngina: '0',
    ancestryModifier: 0
  });
  const [isListening, setIsListening] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Web Speech API
  const handleDictate = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support the Web Speech API. Please try Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      // Simple heuristic parsing for mock capability
      const newForm = { ...formData };
      
      const ageMatch = transcript.match(/age (is )?(\d+)/);
      if (ageMatch) newForm.age = ageMatch[2];
      
      const bpMatch = transcript.match(/blood pressure (is )?(\d+)/);
      if (bpMatch) newForm.bloodPressure = bpMatch[2];

      const cholMatch = transcript.match(/cholesterol (is )?(\d+)/);
      if (cholMatch) newForm.cholesterol = cholMatch[2];

      setFormData(newForm);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSyncWearable = () => {
    setIsSyncing(true);
    // Mock network request
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        age: prev.age || '42',
        bloodPressure: '128',
        cholesterol: '195',
        maxHeartRate: '155'
      }));
      setIsSyncing(false);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="prediction-form" onSubmit={step === 3 ? handleSubmit : handleNext}>
      
      <div className="quick-actions" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
        <button type="button" className={`btn ${isListening ? 'btn-danger' : 'btn-outline'}`} onClick={handleDictate} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Mic size={18} /> {isListening ? 'Listening...' : 'Voice Input'}
        </button>
        <button type="button" className="btn btn-outline" onClick={handleSyncWearable} disabled={isSyncing} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isSyncing ? <Loader2 size={18} className="spin" /> : <Activity size={18} />} 
          {isSyncing ? 'Syncing...' : 'Sync Wearable'}
        </button>
      </div>

      <div className="wizard-progress">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1. Basics</div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2. Vitals</div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3. Clinical</div>
      </div>

      <div className="form-grid">
        {step === 1 && (
          <>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input type="number" id="age" name="age" required min="1" max="120" value={formData.age} onChange={handleChange} placeholder="e.g. 45" />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <AncestryMap onSelectAncestry={(region) => setFormData(prev => ({ ...prev, ancestryModifier: region.modifier }))} />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="form-group">
              <label htmlFor="bloodPressure">Resting Blood Pressure (mm Hg)</label>
              <input type="number" id="bloodPressure" name="bloodPressure" required min="50" max="250" value={formData.bloodPressure} onChange={handleChange} placeholder="e.g. 120" />
            </div>
            <div className="form-group">
              <label htmlFor="cholesterol">Cholesterol Level (mg/dl)</label>
              <input type="number" id="cholesterol" name="cholesterol" required min="50" max="600" value={formData.cholesterol} onChange={handleChange} placeholder="e.g. 200" />
            </div>
            <div className="form-group">
              <label htmlFor="maxHeartRate">Maximum Heart Rate</label>
              <input type="number" id="maxHeartRate" name="maxHeartRate" required min="50" max="250" value={formData.maxHeartRate} onChange={handleChange} placeholder="e.g. 150" />
            </div>
            <div className="form-group">
              <label htmlFor="fastingBloodSugar">Fasting Blood Sugar &gt; 120 mg/dl</label>
              <select id="fastingBloodSugar" name="fastingBloodSugar" value={formData.fastingBloodSugar} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="form-group">
              <label htmlFor="chestPain">Chest Pain Type</label>
              <select id="chestPain" name="chestPain" value={formData.chestPain} onChange={handleChange}>
                <option value="0">Typical Angina</option>
                <option value="1">Atypical Angina</option>
                <option value="2">Non-anginal Pain</option>
                <option value="3">Asymptomatic</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="restingECG">Resting ECG Results</label>
              <select id="restingECG" name="restingECG" value={formData.restingECG} onChange={handleChange}>
                <option value="0">Normal</option>
                <option value="1">ST-T Wave Abnormality</option>
                <option value="2">Left Ventricular Hypertrophy</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exerciseAngina">Exercise-Induced Angina</label>
              <select id="exerciseAngina" name="exerciseAngina" value={formData.exerciseAngina} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </>
        )}
      </div>
      
      <div className="form-actions" style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
        {step > 1 && (
          <button type="button" className="btn btn-outline" onClick={handleBack}>
            Back
          </button>
        )}
        {step < 3 ? (
          <button type="submit" className="btn btn-primary submit-btn">
            Next
          </button>
        ) : (
          <button type="submit" className="btn btn-primary submit-btn">
            Analyze Risk Profile
          </button>
        )}
      </div>
    </form>
  );
};

export default PredictionForm;
