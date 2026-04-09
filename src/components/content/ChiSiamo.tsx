import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, ShieldCheck, Wine } from 'lucide-react';

const ChiSiamo: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="content-page"
    >
      <div className="content-inner">
        <section className="corporate-section">
          <h2>Chi Siamo</h2>
          <div className="text-block">
            <p>Spin Factor è la società leader in Italia per la consulenza strategica in ambito politico e aziendale basata sull’analisi dei dati.</p>
            <p>Un approccio innovativo, integrato e altamente personalizzato che trasforma la complessità dei dati in percorsi strategici di successo.</p>
          </div>

          <div className="features-grid">
            <div className="feature-item glass">
              <div className="icon-wrapper">
                <Target size={32} className="text-primary" />
              </div>
              <h3>Intelligence Strategica</h3>
              <p>Dati, relazioni e comunicazione di alto livello per costruire vantaggi competitivi duraturi.</p>
            </div>
            <div className="feature-item glass">
              <div className="icon-wrapper">
                <Users size={32} className="text-primary" />
              </div>
              <h3>Approccio Integrato</h3>
              <p>Connettiamo eccellenze e decisori in percorsi di valore per favorire interlocuzioni qualificate.</p>
            </div>
            <div className="feature-item glass">
              <div className="icon-wrapper">
                <ShieldCheck size={32} className="text-primary" />
              </div>
              <h3>Analisi Dinamica</h3>
              <p>Trasformiamo la complessità dei dati in percorsi strategici di successo per leader e aziende.</p>
            </div>
          </div>
        </section>

        <section className="founder-integration-section" style={{ marginTop: '80px', borderTop: '1px solid rgba(0, 159, 183, 0.15)', paddingTop: '60px' }}>
          <p className="founder-label text-primary" style={{ fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.2em', marginBottom: '1rem' }}>IL FONDATORE</p>
          <h2 style={{ marginBottom: '2rem' }}>Tiberio Brunetti</h2>
          
          <div className="text-block" style={{ columns: window.innerWidth > 1024 ? '2' : '1', columnGap: '40px' }}>
            <p>Caprese. Dopo la laurea in Psicologia, con tesi su “La comunicazione politica tra nuove tecnologie e social network”, si dedica alla consulenza politica e istituzionale, con particolare attenzione al mondo digitale. </p>
            <p>Nel 2018 fonda Spin Factor, inizialmente specializzata in strategia politica, distinguendosi per un approccio innovativo, integrato e altamente personalizzato. A seguito di una scia record di campagne elettorali di successo, la società amplia il proprio raggio d’azione, includendo consulenza strategica e posizionamento istituzionale.</p>
            <p>Nel 2019, con un team qualificato di sviluppatori italiani, progetta Human, una piattaforma di web e social listening basata su un algoritmo semantico in lingua italiana. Human viene successivamente integrata con un sistema proprietario di intelligenza artificiale ed oggi rappresenta un unicum sul mercato.</p>
            <p>Nel 2023 la società si apre alle relazioni istituzionali, al networking e al corporate. Nel 2025 nascono gli Spin Talks e i Capri Talks.</p>
          </div>

          <div className="founder-footer glass" style={{ marginTop: '40px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className="icon-wrapper" style={{ margin: 0, minWidth: '40px', height: '40px', background: 'rgba(0, 159, 183, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wine size={20} className="text-primary" />
            </div>
            <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>
              Imprenditore vinicolo a tempo perso, porta avanti sull’isola di Capri la ultrasecolare tradizione enologica di famiglia.
            </p>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default ChiSiamo;
