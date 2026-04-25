import React from 'react';
import './Features.css';
import { Activity, FastForward, Lock, Smartphone } from 'lucide-react';

const Features = () => {
  const featuresList = [
    {
      icon: <Activity />,
      title: "AI-Driven Accuracy",
      description: "Our predictive model is trained on thousands of clinical datasets to provide highly accurate risk assessments."
    },
    {
      icon: <FastForward />,
      title: "Lightning Fast",
      description: "Experience zero latency. Get your cardiovascular risk profile instantly without waiting for manual reviews."
    },
    {
      icon: <Lock />,
      title: "Bank-Grade Security",
      description: "Your health information never leaves your browser. All computations are securely processed on your device."
    },
    {
      icon: <Smartphone />,
      title: "Mobile Optimized",
      description: "Designed from the ground up to provide a seamless experience across all your devices, big or small."
    }
  ];

  return (
    <section id="features" className="section features">
      <div className="container">
        <div className="text-center animate-fade-in" style={{marginBottom: '4rem'}}>
          <h2 className="section-title">Why Choose CardioAI?</h2>
          <p className="section-subtitle">Delivering enterprise-grade health analytics directly to you.</p>
        </div>
        
        <div className="features-grid">
          {featuresList.map((feature, index) => (
            <div key={index} className="feature-item animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
