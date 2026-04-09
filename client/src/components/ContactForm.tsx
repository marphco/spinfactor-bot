import React from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Building2 } from 'lucide-react';

const ContactForm: React.FC = () => {
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
          
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <label>Nome e Cognome</label>
              <input type="text" placeholder="Mario Rossi" />
            </div>
            
            <div className="input-group">
              <label>Email Professionale</label>
              <input type="email" placeholder="segreteria@spinfactor.it" />
            </div>
            
            <div className="input-group">
              <label>Messaggio</label>
              <textarea rows={4} placeholder="Come possiamo aiutarvi?"></textarea>
            </div>
            
            <button type="submit" className="submit-btn" style={{ cursor: 'pointer', pointerEvents: 'auto', marginTop: '12px' }}>
              <span>Invia Messaggio</span>
              <Send size={18} />
            </button>
          </form>
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
