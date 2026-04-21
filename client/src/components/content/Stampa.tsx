import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';
import { getSortedPressItems } from '../../data/pressContent';
import type { PressItem } from '../../data/pressContent';

const Stampa: React.FC = () => {
  const sortedItems = getSortedPressItems();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="content-page"
    >
      <div className="content-inner">
        <section className="stampa-header">
          <div className="mag-label-wrapper">
            <div className="mag-cyan-line" />
            <span className="mag-label">Press & Media Relations</span>
          </div>
          <h2 className="mag-h2">Stampa.</h2>
          <h3 className="mag-tagline">La voce di Spin Factor nel dibattito pubblico.</h3>
          
          <div className="mag-intro">
            <p style={{ marginBottom: '1.8rem' }}>
              Attraverso rassegne stampa nazionali, interviste e approfondimenti, condividiamo la nostra visione 
              sull’attualità politica, sociale e tecnologica. 
            </p>
            <p style={{ marginBottom: '4rem' }}>
              Un racconto trasparente di come i dati interpretano il presente.
            </p>
          </div>
        </section>

        <div 
          className="mag-grid mag-grid--2" 
          style={{ 
            marginBottom: '80px',
            gridAutoRows: '1fr' // Force all cards in a row to have same height
          }}
        >
          {sortedItems.map((item: PressItem, idx: number) => (
            <motion.a 
              key={idx}
              href={item.href}
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
                  padding: '32px',
                  border: '1px solid rgba(0, 159, 183, 0.1)',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '24px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>
                    <img 
                      src={item.logo} 
                      alt={item.brand} 
                      style={{ 
                        height: '100%', 
                        width: 'auto',
                        maxWidth: '140px', 
                        objectFit: 'contain',
                        filter: 'drop-shadow(0px 0px 1px rgba(0,0,0,0.2))', // Defines edges for white logos without losing color
                        display: 'block'
                      }} 
                    />
                  </div>
                  <ExternalLink size={18} style={{ color: '#009fb7', opacity: 0.5 }} />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{ 
                    fontSize: '1.15rem', 
                    fontWeight: 700, 
                    lineHeight: 1.4, 
                    margin: 0,
                    color: '#020305',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.title}
                  </h4>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.45, fontSize: '0.8rem', fontWeight: 600 }}>
                  <Calendar size={14} />
                  <span>{item.date}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Stampa;
