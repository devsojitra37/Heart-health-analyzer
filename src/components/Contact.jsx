import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, Loader2 } from 'lucide-react';

const Contact = () => {
  const [status, setStatus] = useState('idle'); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      e.target.reset(); // clear the form
      setTimeout(() => setStatus('idle'), 3000); // reset status after 3s
    }, 1500);
  };

  return (
    <section id="contact" className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="text-center animate-fade-in" style={{ marginBottom: '3rem' }}>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">Have questions or feedback? We'd love to hear from you.</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
            <div style={{ padding: '1rem', background: 'var(--background)', borderRadius: '50%', color: 'var(--primary)' }}>
              <Mail size={24} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ margin: 0 }}>Email Support</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>devansh@gmail.com</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
            <div style={{ padding: '1rem', background: 'var(--background)', borderRadius: '50%', color: 'var(--primary)' }}>
              <MapPin size={24} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ margin: 0 }}>Office Location</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>Devansh Workspace, Tech Innovation Park, Tower B, 4th Floor</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
            <div style={{ padding: '1rem', background: 'var(--background)', borderRadius: '50%', color: 'var(--primary)' }}>
              <Phone size={24} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ margin: 0 }}>Call Us</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>+91 9876543210</p>
            </div>
          </div>

          <form style={{ width: '100%', marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" required disabled={status !== 'idle'} style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-main)' }} />
            <input type="email" placeholder="Your Email" required disabled={status !== 'idle'} style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-main)' }} />
            <textarea placeholder="Your Message" rows="4" required disabled={status !== 'idle'} style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-main)', resize: 'vertical' }}></textarea>
            
            <button 
              type="submit" 
              className={`btn ${status === 'success' ? 'btn-success' : 'btn-primary'}`} 
              disabled={status !== 'idle'}
              style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: status === 'success' ? '#10b981' : '' }}
            >
              {status === 'idle' && <><Send size={18} /> Send Message</>}
              {status === 'submitting' && <><Loader2 size={18} className="spin" /> Sending...</>}
              {status === 'success' && <><CheckCircle size={18} /> Message Sent!</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
