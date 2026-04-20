import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useView } from '../context/ViewContext';
import Logo from './Logo';
import ChatBar from './ChatBar';
import Footer from './Footer';
import CookieNotice from './CookieNotice';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { activeView, setActiveView } = useView();
  const isHome = activeView === 'home';
  const isCapriTalks = activeView === 'capri-talks';

  return (
    <div className={`layout ${isHome ? 'is-home-state' : ''}`}>
      {!isCapriTalks && (
        <header className={`nav-header ${isHome ? 'is-navbar-home' : ''}`}>
          <div className="header-container-aligned">
          <AnimatePresence>
            {!isHome && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="header-back-wrapper"
              >
                <button onClick={() => setActiveView('home')} className="header-back-btn">
                  <ArrowLeft size={20} />
                  <span>Torna alla Home</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div 
            layout
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`header-logo-container ${isHome ? 'centered' : 'right-shift'}`}
          >
            <Logo />
          </motion.div>
        </div>
      </header>
      )}
      
      <main className={`main-content ${(!isHome && !isCapriTalks) ? 'subpage-padding' : ''}`}>
        {children}
      </main>
      
      <div className={`bottom-fixed ${(!isHome && !isCapriTalks) ? 'is-subpage' : ''}`}>
        <CookieNotice />
        {!isCapriTalks && <ChatBar />}
        {!isCapriTalks && <Footer isHome={isHome} />}
      </div>
    </div>
  );
};

export default Layout;
