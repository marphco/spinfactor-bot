import React from 'react';
import { motion } from 'framer-motion';
import { Headphones, Radio } from 'lucide-react';

const Podcast: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="content-page"
    >
      <div className="content-inner" style={{ textAlign: 'center', paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="icon-wrapper" style={{ margin: '0 auto 30px', width: '80px', height: '80px', background: 'rgba(0, 159, 183, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Headphones size={40} className="text-primary" />
        </div>
        <h2>Spin Factor Podcast</h2>
        <div className="text-block" style={{ maxWidth: '800px', margin: '0 auto 60px', textAlign: 'left' }}>
          <p>La rivoluzione dei dati e dell’intelligenza artificiale spiegata attraverso le voci dei protagonisti. Il podcast di Spin Factor esplora le nuove frontiere della comunicazione politica e aziendale, analizzando come l’algoritmo semantico stia trasformando il modo in cui comprendiamo il consenso.</p>
          <p>Ogni episodio è un viaggio nelle strategie di posizionamento, nel crisis management e nel social listening, con un focus particolare sugli scenari digitali che definiscono il futuro del networking istituzionale.</p>
        </div>
        
        <div className="glass" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', border: '1px dashed rgba(0, 159, 183, 0.3)', borderRadius: '16px' }}>
          <Radio size={24} className="text-primary" style={{ marginBottom: '16px' }} />
          <p style={{ margin: 0, fontWeight: 500, opacity: 0.9 }}>Il canale ufficiale sarà presto disponibile su Spotify, Apple Podcast e Amazon Music.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Podcast;
