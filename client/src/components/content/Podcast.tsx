import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Mic2, Megaphone, Calendar, Radio } from 'lucide-react';

const Podcast: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="content-page"
    >
      <div className="content-inner">
        <motion.h2 variants={itemVariants}>Podcast</motion.h2>
        
        <motion.p 
          variants={itemVariants} 
          className="subtitle"
          style={{ fontWeight: 700, fontSize: '1.4rem', color: 'var(--text)', marginBottom: '40px' }}
        >
          Dare continuità al confronto. Estendere il dialogo nello spazio digitale.
        </motion.p>

        <motion.div variants={itemVariants} className="text-block" style={{ marginBottom: '60px' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '24px', opacity: 0.9 }}>
            Ideiamo, realizziamo e promuoviamo podcast come strumenti di approfondimento, posizionamento e costruzione della relazione con il pubblico di riferimento.
          </p>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Crediamo che il podcast non sia soltanto un prodotto editoriale, ma uno spazio di ascolto e narrazione in cui temi complessi e attualità possono essere affrontati con chiarezza e visione strategica.
          </p>
          <p style={{ marginTop: '32px', fontSize: '1.1rem', opacity: 0.9 }}>
            Ogni progetto nasce da un impianto editoriale preciso:
          </p>
        </motion.div>

        <div className="podcast-grid">
          {[
            { 
              icon: <Lightbulb size={24} />, 
              title: "Ideazione editoriale", 
              desc: "definiamo concept, format, rubriche, tono di voce e architettura narrativa del podcast." 
            },
            { 
              icon: <Mic2 size={24} />, 
              title: "Produzione e realizzazione", 
              desc: "curiamo tutte le fasi operative, dalla scrittura alla registrazione, fino alla post-produzione." 
            },
            { 
              icon: <Megaphone size={24} />, 
              title: "Promozione e diffusione", 
              desc: "sviluppiamo piani di lancio e distribuzione per ampliare la visibilità del progetto e rafforzarne il posizionamento." 
            },
            { 
              icon: <Calendar size={24} />, 
              title: "Eventi", 
              desc: "il podcast prolunga temi, relazioni e contenuti nati negli incontri fisici, mantenendo vivo il confronto anche oltre il tempo dell’evento." 
            }
          ].map((phase, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="service-card glass"
              style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="icon-wrapper text-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {phase.icon}
                </div>
                <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>{phase.title}</h4>
              </div>
              <p style={{ color: 'var(--text-dim)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                {phase.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={itemVariants}
          className="glass highlight-section" 
          style={{ 
            padding: '48px', 
            borderRadius: '32px', 
            maxWidth: '100%', 
            margin: '40px 0 0', 
            border: '1px solid rgba(0, 159, 183, 0.3)',
            background: 'linear-gradient(135deg, rgba(10, 25, 30, 0.5) 0%, rgba(0, 159, 183, 0.05) 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1 }}>
            <Radio size={120} className="text-primary" />
          </div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: '1.15rem', lineHeight: '1.8', margin: 0, opacity: 0.95 }}>
              In questo percorso, siamo al lavoro anche su un format proprietario, <strong>Spin Podcast</strong>: un approfondimento digitale pensato per estendere il dialogo oltre l’evento fisico, analizzando l’attualità attraverso i dati di <strong>Human®</strong>. Un progetto concepito per leggere i fenomeni del presente, interpretarli in chiave strategica e restituirli attraverso conversazioni tra professionisti, punti di vista autorevoli e chiavi di lettura basate sui dati.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Podcast;
