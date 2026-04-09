import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface ServicesProps {
  onBack: () => void;
}

const Services: React.FC<ServicesProps> = ({ onBack }) => {
  const services = [
    { title: 'Digital Strategy', desc: 'Piani di comunicazione basati su analisi comportamentale.' },
    { title: 'Data Intelligence', desc: 'Monitoraggio in tempo reale dei trend e del sentiment.' },
    { title: 'Crisis Management', desc: 'Gestione rapida e strategica di situazioni critiche.' },
    { title: 'Content Engine', desc: 'Produzione di contenuti ad alto impatto emotivo e virale.' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="content-page"
    >
      <button onClick={onBack} className="back-btn">
        <ArrowLeft size={20} />
        <span>Torna ai Blob</span>
      </button>

      <div className="content-inner">
        <h2>I Nostri Servizi</h2>
        <p className="subtitle">Soluzioni sartoriali per ogni esigenza di crescita digitale.</p>
        
        <div className="services-grid">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="service-card glass"
            >
              <CheckCircle2 className="text-primary" size={24} />
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Services;
