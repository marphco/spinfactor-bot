import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Mail, Building2, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useView } from '../context/ViewContext';

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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
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
      console.error('Submission error:', error);
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
        <div className="form-container glass">
          <h2>CONTATTI E SEDI</h2>
          <p className="subtitle text-primary" style={{ marginBottom: '32px' }}>Spin Factor s.r.l.</p>
          
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
                  Inviando il modulo, accetti la nostra <button type="button" onClick={() => setActiveView('privacy-policy')} style={{ background: 'none', border: 'none', color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>Privacy Policy</button>.
                </div>
                <button 
                  type="submit" 
                  className="submit-btn" 
                  disabled={status === 'loading'}
                  style={{ 
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer', 
                    pointerEvents: 'auto', 
                    marginTop: '12px',
                    opacity: status === 'loading' ? 0.7 : 1
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
        </div>

        <div className="offices-grid">
          <div className="office-item glass">
            <div className="card-header-icon">
              <MapPin className="text-primary" size={24} />
              <h4>ROMA</h4>
            </div>
            <p className="office-type">Sede Principale</p>
            <div className="address-block">
              <p>via della Scrofa, 117</p>
              <p className="zip">00186</p>
            </div>
          </div>
          
          <div className="office-item glass">
            <div className="card-header-icon">
              <MapPin className="text-primary" size={24} />
              <h4>NAPOLI</h4>
            </div>
            <p className="office-type">Sede Legale e Amministrativa</p>
            <div className="address-block">
              <p>via Vittoria Colonna, 14</p>
              <p className="zip">80121</p>
            </div>
          </div>
        </div>

        <div className="legal-info glass">
          <div className="legal-row">
            <div className="legal-item">
              <Building2 size={20} className="text-primary" />
              <p><strong>P.IVA:</strong> 08521911217</p>
            </div>
            <div className="legal-item">
              <Mail size={20} className="text-primary" />
              <p><strong>EMAIL:</strong> segreteria@spinfactor.it</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactForm;
