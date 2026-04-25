import React from 'react';
import './About.css';
import { BrainCircuit, ShieldCheck, Zap } from 'lucide-react';

const About = () => {
  const cards = [
    {
      icon: <BrainCircuit size={32} className="about-icon" />,
      title: 'Advanced Machine Learning',
      description: 'Our proprietary algorithm analyzes multiple health markers simultaneously to provide an accurate risk assessment.'
    },
    {
      icon: <Zap size={32} className="about-icon" />,
      title: 'Real-Time Results',
      description: 'No more waiting. Get an instant evaluation of your heart disease probability within seconds of filling out the form.'
    },
    {
      icon: <ShieldCheck size={32} className="about-icon" />,
      title: 'Data Privacy',
      description: 'Your health data is not saved or transmitted to any external servers. Computations are done securely in real-time.'
    }
  ];

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-header text-center animate-fade-in">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Harnessing the power of AI to detect early signs of cardiovascular issues.
          </p>
        </div>
        
        <div className="about-grid">
          {cards.map((card, index) => (
            <div key={index} className="about-card animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="icon-wrapper">
                {card.icon}
              </div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-text">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
