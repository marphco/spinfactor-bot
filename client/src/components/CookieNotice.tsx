import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useView } from '../context/ViewContext';

const CookieNotice: React.FC = () => {
  const { setActiveView, isChatOpen } = useView();
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="cookie-notice-capri"
        >
          <div className="cookie-content-minimal">
            <span className="cookie-text-minimal">
              Utilizziamo i cookie per migliorare la tua esperienza. 
              <button 
                onClick={() => setActiveView('cookie-policy')}
                className="cookie-link-minimal"
              >
                Dettagli
              </button>
            </span>
            <div className="cookie-actions-minimal">
              <button onClick={handleAccept} className="cookie-btn-minimal accept">
                ACCETTA
              </button>
              <button 
                onClick={() => setIsVisible(false)} 
                className="cookie-btn-minimal close"
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
