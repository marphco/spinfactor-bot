import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';
import { getSortedRicercheItems } from '../../data/ricercheContent';
import type { RicercheItem } from '../../data/ricercheContent';
import { useView } from '../../context/ViewContext';

const Ricerche: React.FC = () => {
  const { activeView, setActiveView } = useView();
  const sortedItems = getSortedRicercheItems();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="content-page"
    >
      <div className="content-inner">
        {/* Toggle Nav */}
        <div className="tabs-nav glass" style={{ 
          marginBottom: '3rem', 
          position: 'relative', 
          zIndex: 10,
          display: 'flex' 
        }}>
          <button 
            className={activeView === 'human' ? 'active' : ''} 
            onClick={() => setActiveView('human')}
          >
            Human
          </button>
          <button 
            className={activeView === 'ricerche' ? 'active' : ''} 
            onClick={() => setActiveView('ricerche')}
          >
            Ricerche
          </button>
        </div>

        <section className="stampa-header">
          <div className="mag-label-wrapper">
            <div className="mag-cyan-line" />
            <span className="mag-label">Insight & Analysis</span>
          </div>
          <h2 className="mag-h2">Ricerche.</h2>
          <h3 className="mag-tagline">Human decodifica il dibattito digitale.</h3>
          
          <div className="mag-intro">
            <p style={{ marginBottom: '4rem' }}>
              Attraverso le nostre ricerche analizziamo linguaggi, conversazioni e sentiment online per restituire una lettura chiara dell’attualità.

            </p>
          </div>
        </section>

        <div 
          className="mag-grid mag-grid--2" 
          style={{ 
            marginBottom: '80px',
            gridAutoRows: '1fr'
          }}
        >
          {sortedItems.map((item: RicercheItem, idx: number) => (
            <motion.a 
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
              className="press-item-wrapper"
              style={{
                textDecoration: 'none',
                display: 'flex',
                height: '100%'
              }}
            >
              <div 
                className="mag-card" 
                style={{ 
                  background: '#fcfdfd', 
                  color: '#020305',
                  padding: '24px 28px 28px', // Reduced top padding
                  border: '1px solid rgba(0, 159, 183, 0.1)',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px', // Tighter gaps
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  position: 'relative'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '4px'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    opacity: 0.45, 
                    fontSize: '0.75rem', 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>
                  <ExternalLink size={16} style={{ color: '#009fb7', opacity: 0.5 }} />
                </div>

                <div style={{ flex: 1 }}>
                  <h4 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 700, 
                    lineHeight: 1.4, 
                    margin: 0,
                    color: '#020305'
                  }}>
                    {item.title}
                  </h4>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Ricerche;
