import React from 'react';
import './Testimonials.css';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Patient",
      text: "CardioAI gave me the heads up I needed to visit my doctor. The early warning helped me prevent a major issue.",
      rating: 5
    },
    {
      name: "Dr. Robert Chen",
      role: "Cardiologist",
      text: "An excellent tool for preliminary screening. I often recommend this to patients for monitoring their own risk factors.",
      rating: 5
    },
    {
      name: "Michael Thompson",
      role: "Fitness Enthusiast",
      text: "Super easy to use and very intuitive. I check my risk periodically as I adjust my diet and workout routines.",
      rating: 4
    }
  ];

  return (
    <section className="section testimonials">
      <div className="container">
        <div className="text-center animate-fade-in" style={{marginBottom: '4rem'}}>
          <h2 className="section-title">What People Say</h2>
          <p className="section-subtitle">Real experiences from users and medical professionals.</p>
        </div>
        
        <div className="testimonials-grid">
          {reviews.map((review, index) => (
            <div key={index} className="testimonial-card animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="stars">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p className="testimonial-text">"{review.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{review.name.charAt(0)}</div>
                <div>
                  <h4 className="author-name">{review.name}</h4>
                  <span className="author-role">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
