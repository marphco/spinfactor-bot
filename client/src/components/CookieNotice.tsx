import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import { useView } from '../context/ViewContext';

const CookieNotice: React.FC = () => {
  const { setActiveView } = useView();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-accepted');
    if (!accepted) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-accepted', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="cookie-notice glass shadow-premium"
        >
          <div className="cookie-content">
            <div className="cookie-icon-wrapper">
              <ShieldCheck size={20} className="text-primary" />
            </div>
            <p className="cookie-text">
              Utilizziamo cookie tecnici e di terze parti per migliorare la tua esperienza. 
              Dettagli nella nostra <button onClick={() => setActiveView('cookie-policy')}>Cookie Policy</button>.
            </p>
            <div className="cookie-actions">
              <button onClick={handleAccept} className="cookie-accept-btn">
                Ho capito
              </button>
              <button onClick={() => setIsVisible(false)} className="cookie-close-btn" aria-label="Chiudi">
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieNotice;
