import React from 'react';
import { useView } from '../context/ViewContext';

const Footer: React.FC = () => {
  const { setActiveView } = useView();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>© {currentYear} Spin Factor s.r.l. • Tutti i diritti riservati.</p>
        </div>
        <div className="footer-right">
          <button onClick={() => setActiveView('privacy-policy')} className="footer-link">
            Privacy Policy
          </button>
          <span className="footer-divider">•</span>
          <button onClick={() => setActiveView('cookie-policy')} className="footer-link">
            Cookie Policy
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
