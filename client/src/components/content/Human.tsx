import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, CheckCircle2, Zap, Target, Search } from 'lucide-react';
import { useSectionContent } from '../../hooks/useSectionContent';
import { useView } from '../../context/ViewContext';
import { FormattedText } from '../FormattedText';

const HUMAN_FALLBACK = `Human® è la piattaforma di proprietà di Spin Factor, con brevetto depositato e realizzata interamente con algoritmo italiano.`;

const INDEX_FALLBACK = `La convergenza tra Big Data e Demoscopia. L’Human Index è l'esclusivo indicatore di convergenza sviluppato da Spin Factor per eliminare ogni zona d'ombra nel monitoraggio dell'opinione pubblica.`;

const Human: React.FC = () => {
  const { activeView, setActiveView } = useView();
  const { content: humanContent, loading: humanLoading } = useSectionContent(
    'Human Tecnologia', 
    HUMAN_FALLBACK,
    `Forniscimi una descrizione istituzionale per Human®, la piattaforma AI di Spin Factor.`
  );
  
  const { content: indexContent, loading: indexLoading } = useSectionContent(
    'Human Index Intro', 
    INDEX_FALLBACK
  );

  const humanBullets = [
    {
      title: "Interpretazione complessa",
      desc: "Human® distingue e interpreta strutture linguistiche complesse, rilevando il sentiment ovvero l'orientamento emotivo e cognitivo degli utenti.",
      icon: <BrainCircuit size={20} />
    },
    {
      title: "Analisi semantica",
      desc: "Grazie a modelli di deep learning e strumenti di linguistica computazionale, riproduciamo le funzioni cognitive del cervello umano per decodificare il significato profondo delle interazioni.",
      icon: <Search size={20} />
    },
    {
      title: "Rilevazione dei pattern",
      desc: "Attraverso tecniche di analisi semantica, riconoscimento delle entità e individuazione delle narrative, la piattaforma intercetta connessioni, segnali deboli e traiettorie emergenti.",
      icon: <Zap size={20} />
    },
    {
      title: "Capacità predittiva",
      desc: "I modelli di classificazione e gli algoritmi previsionali consentono di anticipare possibili evoluzioni dell’opinione pubblica.",
      icon: <Target size={20} />
    },
    {
      title: "Insight strategici",
      desc: "Human® si presenta come uno strumento avanzato per monitorare il posizionamento digitale, presidiare la reputazione e guidare strategie di comunicazione.",
      icon: <CheckCircle2 size={20} />
    }
  ];

  const indexBullets = [
    {
      title: "Integrazione Unica",
      desc: "Unisce i dati delle ricerche demoscopiche con i temi rilevati da Human® in rete."
    },
    {
      title: "Media Ponderata",
      desc: "L’indice esprime il peso reale di ciascuna tematica, incrociando ciò che le persone dicono (social) con ciò che dichiarano (sondaggi)."
    },
    {
      title: "Contesto Totale",
      desc: "Nessun dettaglio resta fuori dal contesto, garantendo dati rappresentativi su ogni tematica oggetto di indagine."
    }
  ];

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

        {/* SECTION 1: HUMAN® */}
        <section className="human-main-section">
          <div className="mag-label-wrapper">
            <div className="mag-cyan-line" style={{ width: '30px' }} />
            <span className="mag-label">Proprietary Technology</span>
          </div>

          <h2 className="mag-h2">Human®.</h2>

          <h3 className="mag-tagline">La tecnologia al servizio del pensiero.</h3>

          <div className={`mag-intro ${humanLoading ? 'loading-shimmer' : ''}`}>
            {(humanContent || HUMAN_FALLBACK).split('\n\n').map((p, i) => (
              <p key={i} style={{ marginBottom: '1.8rem' }}><FormattedText text={p} /></p>
            ))}
          </div>

          <div className="human-features-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '6rem' }}>
            {humanBullets.map((bullet, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="mag-card"
                style={{ flexDirection: 'row', alignItems: 'center', gap: '24px', padding: '24px' }}
              >
                <div className="mag-icon-box" style={{ minWidth: '44px', height: '44px' }}>
                  {bullet.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', color: '#0D2B67' }}>{bullet.title}</h4>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.75, margin: 0 }}>{bullet.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 2: HUMAN INDEX */}
        <section className="mag-section">
          <div className="mag-label-wrapper">
            <div className="mag-cyan-line" />
            <span className="mag-label">Human Index – Il Super Indicatore</span>
          </div>
          
          <h2 className="mag-h2">La convergenza tra Big Data e Demoscopia.</h2>

          <div className={`mag-intro ${indexLoading ? 'loading-shimmer' : ''}`} style={{ color: 'var(--text-dim)' }}>
            {(indexContent || INDEX_FALLBACK).split('\n\n').map((p, i) => (
              <p key={i} style={{ marginBottom: '1.8rem' }}><FormattedText text={p} /></p>
            ))}
          </div>

          <div className="mag-grid mag-grid--3" style={{ gridAutoRows: '1fr' }}>
            {indexBullets.map((bullet, idx) => (
              <div key={idx} className="mag-card" style={{ padding: '24px', height: '100%' }}>
                <h4 style={{ color: '#0D2B67', fontSize: '1rem', fontWeight: 800, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {bullet.title}
                </h4>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, opacity: 0.75, margin: 0 }}>
                  {bullet.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Human;
