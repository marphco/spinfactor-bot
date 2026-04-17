import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Mic2, Megaphone, Calendar, Radio } from 'lucide-react';
import { useSectionContent } from '../../hooks/useSectionContent';
import { useGridContent } from '../../hooks/useGridContent';
import { FormattedText } from '../FormattedText';

const PODCAST_FALLBACK = `Dare continuità al confronto. Estendere il dialogo nello spazio digitale.
Ideiamo, realizziamo e promuoviamo podcast come strumenti di approfondimento, posizionamento e costruzione della relazione con il pubblico di riferimento.
Crediamo che il podcast non sia soltanto un prodotto editoriale, ma uno spazio di ascolto e narrazione in cui temi complessi e attualità possono essere affrontati con chiarezza e visione strategica.`;

const PODCAST_GRID_FALLBACK = [
  { icon: <Lightbulb size={24} />, title: "Ideazione editoriale", desc: "definiamo concept, format, rubriche, tono di voce e architettura narrativa del podcast." },
  { icon: <Mic2 size={24} />, title: "Produzione e realizzazione", desc: "curiamo tutte le fasi operative, dalla scrittura alla registrazione, fino alla post-produzione." },
  { icon: <Megaphone size={24} />, title: "Promozione e diffusione", desc: "sviluppiamo piani di lancio e distribuzione per ampliare la visibilità del progetto e rafforzarne il posizionamento." },
  { icon: <Calendar size={24} />, title: "Eventi", desc: "il podcast prolunga temi, relazioni e contenuti nati negli incontri fisici, mantenendo vivo il confronto anche oltre il tempo dell’evento." }
];

const HIGHLIGHT_FALLBACK = `In questo percorso, siamo al lavoro anche su un format proprietario, **Spin Podcast**: un approfondimento digitale pensato per estendere il dialogo oltre l’evento fisico, analizzando l’attualità attraverso i dati di **Human®️**. Un progetto concepito per leggere i fenomeni del presente, interpretarli in chiave strategica e restituirli attraverso conversazioni tra professionisti, punti di vista autorevoli e chiavi di lettura basate sui dati.`;

const Podcast: React.FC = () => {
  const { content: introContent, loading: introLoading } = useSectionContent(
    'Podcast', 
    PODCAST_FALLBACK,
    `Forniscimi una visione strategica sul perché il podcasting è fondamentale per la comunicazione moderna di Spin Factor.`
  );
  const { items: podcastItems, loading: gridLoading } = useGridContent('Fasi Podcast', 4, PODCAST_GRID_FALLBACK);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="content-page"
    >
      <div className="content-inner">
        <section className="podcast-header">
          <div className="mag-label-wrapper">
            <div className="mag-cyan-line" />
            <span className="mag-label">Podcast & New Media</span>
          </div>
          <h2 className="mag-h2">Podcast.</h2>
          
          <h3 className="mag-tagline">
            Dare continuità al confronto. Estendere il dialogo nello spazio digitale.
          </h3>

          <div className={`mag-intro ${introLoading ? 'loading-shimmer' : ''}`}>
            {introLoading ? (
               <div key="skel" className="skeleton-line" style={{ width: '100%', height: '80px', background: 'rgba(255,255,255,0.05)' }} />
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {(introContent || PODCAST_FALLBACK).split('\n\n').map((paragraph, index) => (
                   <p key={index} style={{ marginBottom: '1.8rem' }}>
                    <FormattedText text={paragraph} />
                  </p>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        <div className="mag-grid mag-grid--2" style={{ marginBottom: '80px' }}>
          {gridLoading ? (
            [1, 2, 3, 4].map(n => (
              <div key={`sk-${n}`} className="mag-card loading-shimmer" style={{ minHeight: '180px' }} />
            ))
          ) : (
            podcastItems.map((phase, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="mag-card"
              >
                <div className="mag-icon-box" style={{ width: '44px', height: '44px' }}>
                  {React.cloneElement(PODCAST_GRID_FALLBACK[idx].icon as React.ReactElement<any>, { size: 20 })}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', fontWeight: 700 }}>{phase.title}</h4>
                  <p style={{ opacity: 0.7, fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                    <FormattedText text={phase.desc} />
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mag-card highlight-section" 
          style={{ 
            padding: '40px',
            border: '1px solid rgba(0, 159, 183, 0.3)',
            background: 'linear-gradient(135deg, rgba(0, 159, 183, 0.05) 0%, transparent 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.05 }}>
            <Radio size={120} className="text-primary" />
          </div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', margin: 0, opacity: 0.9 }}>
              <FormattedText text={HIGHLIGHT_FALLBACK} />
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Podcast;
