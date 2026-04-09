import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useView } from '../context/ViewContext';
import Logo from './Logo';
import ChatBar from './ChatBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { activeView, setActiveView } = useView();
  const isHome = activeView === 'home';

  return (
    <div className="layout">
      <header className="nav-header">
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
      
      <main className={`main-content ${!isHome ? 'subpage-padding' : ''}`}>
        {children}
      </main>
      
      <div className="bottom-fixed">
        <ChatBar />
      </div>
    </div>
  );
};

export default Layout;
