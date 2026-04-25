import React from 'react';
import './Footer.css';
import { HeartPulse } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <HeartPulse className="logo-icon animate-pulse-heart" />
            <span>CardioAI</span>
          </div>
          <p className="footer-desc">
            Empowering individuals to take control of their heart health through advanced predictive modeling.
          </p>
        </div>
        
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#analyzer">Analyzer</a></li>
            <li><a href="#features">Features</a></li>
          </ul>
        </div>
        
        <div className="footer-links">
          <h4>Legal</h4>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p className="disclaimer">
            <strong>Disclaimer:</strong> CardioAI is for informational and educational purposes only. 
            It is not a substitute for professional medical advice, diagnosis, or treatment. 
            Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>
          <p className="copyright">&copy; {new Date().getFullYear()} CardioAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
