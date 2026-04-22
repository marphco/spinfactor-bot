import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Mail, Building2, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useView } from '../context/ViewContext';
import { API_BASE_URL } from '../apiConfig';
import SedeCorte from '../assets/hq-courtyard.jpg';

const ContactForm: React.FC = () => {
  const { setActiveView } = useView();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '' // Honeypot field
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          company: formData.company // Honeypot
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', company: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Qualcosa è andato storto. Riprova più tardi.');
      }
    } catch (error) {
      // console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage('Errore di connessione. Controlla la tua rete e riprova.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="content-page"
    >
      <div className="content-inner">
        <section className="contact-intro">
          <div className="mag-label-wrapper">
            <div className="mag-cyan-line"></div>
            <span className="mag-label">NETWORK & GLOBAL PRESENCE</span>
          </div>
          <h2 className="mag-h2">Contatti e Sedi.</h2>
          
          <div className="mag-intro">
            <p>Spin Factor s.r.l. — Trasformiamo la complessità dei dati in percorsi strategici di successo attraverso un ecosistema integrato di competenze e tecnologie proprietarie.</p>
          </div>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="success-message"
                style={{ textAlign: 'center', padding: '40px 0' }}
              >
                <CheckCircle2 size={48} className="text-primary" style={{ margin: '0 auto 16px' }} />
                <h3>Messaggio Inviato!</h3>
                <p>Ti risponderemo al più presto.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="submit-btn"
                  style={{ marginTop: '24px', cursor: 'pointer' }}
                >
                  Invia un altro messaggio
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                className="contact-form" 
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="form-row">
                  <div className="input-group">
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nome" 
                      required
                      disabled={status === 'loading'}
                    />
                  </div>
                  
                  <div className="input-group">
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email" 
                      required
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                {/* Honeypot field - hidden from users */}
                <div style={{ display: 'none' }}>
                  <input 
                    type="text" 
                    name="company" 
                    value={formData.company} 
                    onChange={handleChange} 
                    tabIndex={-1} 
                    autoComplete="off" 
                  />
                </div>
                
                <div className="input-group">
                  <textarea 
                    rows={4} 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Scrivi il tuo messaggio..." 
                    required
                    disabled={status === 'loading'}
                  ></textarea>
                </div>
                
                {status === 'error' && (
                  <div className="error-notice" style={{ color: '#ff4d4d', fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="privacy-notice" style={{ marginTop: '24px', fontSize: '11px', color: 'var(--text-dim)', textAlign: 'center', opacity: 0.8 }}>
                  Inviando accetti l' <button type="button" onClick={() => setActiveView('privacy-policy')} style={{ background: 'none', border: 'none', color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', padding: 0, fontSize: 'inherit', fontWeight: 'inherit', fontFamily: 'inherit' }}>Informativa Privacy</button>.
                </div>
                <button 
                  type="submit" 
                  className="submit-btn" 
                  disabled={status === 'loading'}
                  style={{ 
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer', 
                    pointerEvents: 'auto', 
                    marginTop: '24px',
                    opacity: status === 'loading' ? 0.7 : 1,
                    marginBottom: '40px'
                  }}
                >
                  {status === 'loading' ? (
                    <>
                      <span>Invio in corso...</span>
                      <Loader2 size={18} className="animate-spin" style={{ display: 'inline' }} />
                    </>
                  ) : (
                    <>
                      <span>Invia</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </section>

        <section className="mag-section" style={{ borderTop: 'none', paddingTop: 0 }}>
          <div className="mag-section-header" style={{ borderTop: '1px solid rgba(0, 159, 183, 0.15)', paddingTop: '80px' }}>
            <div className="mag-label-wrapper">
              <div className="mag-cyan-line"></div>
              <span className="mag-label">LE NOSTRE SEDI</span>
            </div>
          </div>

          <div className="mag-grid mag-grid--2" style={{ alignItems: 'stretch' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="mag-card">
                <div className="mag-icon-box">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '4px' }}>ROMA</h4>
                  <p className="mag-label" style={{ fontSize: '0.65rem', marginBottom: '12px', display: 'block' }}>Sede Principale</p>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.5 }}>
                    <p>via della Scrofa, 117</p>
                    <p>00186</p>
                  </div>
                </div>
              </div>
              
              <div className="mag-card">
                <div className="mag-icon-box">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '4px' }}>NAPOLI</h4>
                  <p className="mag-label" style={{ fontSize: '0.65rem', marginBottom: '12px', display: 'block' }}>Sede Legale</p>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.5 }}>
                    <p>via Vittoria Colonna, 14</p>
                    <p>80121</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ 
                borderRadius: '16px', 
                overflow: 'hidden', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                height: '100%'
              }}
            >
              <img src={SedeCorte} alt="Spin Factor HQ Courtyard" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
          </div>
        </section>

        <section className="mag-section" style={{ paddingTop: '100px' }}>
          <div className="mag-card" style={{ padding: '24px' }}>
            <div className="mag-grid mag-grid--2" style={{ gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="mag-icon-box" style={{ width: '32px', height: '32px' }}>
                  <Building2 size={18} />
                </div>
                <p style={{ fontSize: '0.9rem', opacity: 0.9 }}><strong>P.IVA:</strong> 08521911217</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="mag-icon-box" style={{ width: '32px', height: '32px' }}>
                  <Mail size={18} />
                </div>
                <p style={{ fontSize: '0.9rem', opacity: 0.9 }}><strong>EMAIL:</strong> segreteria@spinfactor.it</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default ContactForm;
