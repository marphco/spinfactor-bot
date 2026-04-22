import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useView } from '../context/ViewContext';

const CookieNotice: React.FC = () => {
  const { activeView, setActiveView, isChatOpen } = useView();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-accepted');
    if (!accepted) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-accepted', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && !isChatOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="mag-cookie-notice"
        >
          <div className="mag-cookie-background"></div>
          <div className="mag-cookie-content">
            <div className="mag-cookie-text-area">
              <span className="mag-cookie-title">Informativa sui Cookie</span>
              <p className="mag-cookie-description">
                Utilizziamo i cookie per analizzare il traffico e migliorare la tua esperienza sul nostro hub. 
                Scegliendo "Accetta", acconsenti al nostro utilizzo dei cookie.
              </p>
              <button 
                onClick={() => setActiveView('cookie-policy')}
                className="mag-cookie-link"
              >
                Scopri di più
              </button>
            </div>
            <div className="mag-cookie-actions">
              <button onClick={handleAccept} className="mag-cookie-btn accept">
                ACCETTA TUTTO
              </button>
              <button 
                onClick={() => setIsVisible(false)} 
                className="mag-cookie-btn close"
                aria-label="Chiudi"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieNotice;
