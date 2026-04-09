import React from 'react';
import { motion } from 'framer-motion';

export const Metodo: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="content-page"
    >
      <div className="content-inner">
        <h2>Il Metodo</h2>
        <p className="subtitle text-primary">Il nostro metodo si fonda sulla combinazione di dati, relazioni e comunicazione.</p>
        
        <div className="method-steps">
          <div className="method-step glass">
            <div className="step-num">01</div>
            <h3>Data intelligence</h3>
            <p>Ascolto dinamico e monitoraggio costante per conoscere ed anticipare i trend.</p>
          </div>
          <div className="method-step glass">
            <div className="step-num">02</div>
            <h3>Strategia e Posizionamento</h3>
            <p>Definizione della traiettoria e degli obiettivi per favorire la crescita del committente.</p>
          </div>
          <div className="method-step glass">
            <div className="step-num">03</div>
            <h3>Relazioni Istituzionali</h3>
            <p>Costruzione di un network solido e coerente per accreditare la visione e le ambizioni.</p>
          </div>
          <div className="method-step glass">
            <div className="step-num">04</div>
            <h3>Comunicazione Digitale</h3>
            <p>Creazione di contenuti originali e gestione dei canali per viralizzare i messaggi strategici.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Societa: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="content-page"
    >
      <div className="content-inner">
        <h2>La Società</h2>
        <div className="text-block">
          <p>Spin Factor si distingue per un approccio innovativo, integrato e altamente personalizzato.</p>
          <p>La nostra mission è trasformare la complessità dei dati in percorsi strategici di successo.</p>
          <p>Con sedi a Roma e Napoli, operiamo su tutto il territorio nazionale assistendo leader politici, istituzioni e grandi aziende.</p>
        </div>
      </div>
    </motion.div>
  );
};
