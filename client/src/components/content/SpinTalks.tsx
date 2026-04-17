import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Share2, 
  Handshake,
  Compass,
  MessageSquare,
  Trophy
} from 'lucide-react';
import { FormattedText } from '../FormattedText';
import { useSectionContent } from '../../hooks/useSectionContent';
import { useView } from '../../context/ViewContext';

const SPIN_FALLBACK = `Gli **Spin Talks** sono un ciclo di incontri creati per dare spazio a idee, esperienze e confronti sui grandi temi del nostro tempo: politica, istituzioni, media, economia, cultura, innovazione e società. 

Gli appuntamenti si tengono durante l’anno nella sede di Spin Factor a Roma, in via della Scrofa, e si estendono in un’edizione annuale a Capri. Dove il pensiero si traduce in relazione, confronto e posizionamento.`;

const CAPRI_FALLBACK = `L’isola azzurra ospita una volta l’anno in primavera panel, interviste e incontri dando ritmo a un’agenda strutturata e attenta alla qualità dei contenuti. I **Capri Talks** si distinguono per la capacità di costruire una rete tra esponenti delle istituzioni, del mondo dell’informazione e delle imprese. 

Ogni appuntamento è pensato per generare valore, opinioni e relazioni. Promossa con il patrocinio del Ministero della Cultura e della Città di Capri, l’iniziativa si inserisce in un contesto culturale e informativo unico in cui il luogo diventa parte integrante del dialogo.`;

const DISUNITI_TEXT = `**(Dis)Uniti** è il titolo dell’edizione 2026, in programma il **15 e 16 maggio**. 
Il tema scelto per il 2026, (Dis)Uniti, intende affrontare le questioni che stanno ridefinendo il nostro tempo. Economia reale e lavoro, cambiamenti climatici e transizione energetica, geopolitica e nuove fragilità richiedono scelte capaci di delineare progetti di lungo periodo. È in questi intrecci che i Capri Talks concentrano la propria energia. (Dis)Uniti è un invito ad esaminare le attuali frammentazioni e gli approcci settoriali, per individuare direzioni condivise e sostenibili, capaci di orientare scelte e visioni nel dibattito pubblico.`;

const CAPRI_GUIDELINES = [
  { icon: <Compass size={20} />, title: "Linee Guida", desc: "I Capri Talks si adattano all’attualità e anticipano i temi che animano il dibattito pubblico. Contaminazioni tra mondi diversi, connessioni tra idee, persone e territori." },
  { icon: <MessageSquare size={20} />, title: "Gli incontri", desc: "Il format privilegia un tono diretto e informale per favorire un confronto autentico. Interviste e faccia a faccia, dialoghi, networking e conversazioni." },
  { icon: <Trophy size={20} />, title: "I protagonisti", desc: "La selezione degli ospiti avviene in funzione della rilevanza dei temi trattati. Rappresentanti del mondo istituzionale, politico, imprenditoriale. Opinion leader e intellettuali." },
  { icon: <Share2 size={20} />, title: "Comunicazione", desc: "Creiamo contenuti che mirano a preservare il proprio valore nel tempo. Ogni appuntamento genera contenuti editoriali attraverso uffici stampa e diffusione social." },
  { icon: <Handshake size={20} />, title: "Partnership", desc: "Un’opportunità di posizionamento per partner interessati ad associare il proprio brand a un progetto di pensiero attraverso collaborazioni costruite in modo sartoriale." }
];

const SpinTalks: React.FC = () => {
  const { activeView, setActiveView } = useView();
  const isCapri = activeView === 'capri-talks';
  
  const { content: spinContent, loading: spinLoading } = useSectionContent('Spin Talks Intro', SPIN_FALLBACK);
  const { content: capriContent, loading: capriLoading } = useSectionContent('Capri Talks Intro', CAPRI_FALLBACK);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="content-page"
    >
      <div className="content-inner">
        {/* Toggle Nav */}
        <div className="tabs-nav glass" style={{ marginBottom: '3rem' }}>
          <button 
            className={!isCapri ? 'active' : ''} 
            onClick={() => setActiveView('spin-talks')}
          >
            Spin Talks
          </button>
          <button 
            className={isCapri ? 'active' : ''} 
            onClick={() => setActiveView('capri-talks')}
          >
            Capri Talks
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!isCapri ? (
            <motion.div 
              key="spin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="talks-content"
            >
              <div className="mag-label-wrapper">
                <div className="mag-cyan-line" />
                <span className="mag-label">Institutional Meetings</span>
              </div>
              <h2 className="mag-h2">Spin Talks.</h2>
              <h3 className="mag-tagline">Dove il pensiero si traduce in relazione, confronto e posizionamento.</h3>
              
              <div className={`mag-intro ${spinLoading ? 'loading-shimmer' : ''}`}>
                {(spinContent || SPIN_FALLBACK).split('\n\n').map((p, i) => (
                  <p key={i} style={{ marginBottom: '1.8rem' }}><FormattedText text={p} /></p>
                ))}
              </div>

              <div className="mag-card" style={{ maxWidth: '450px', flexDirection: 'row', alignItems: 'center', gap: '24px', padding: '32px' }}>
                <div className="mag-icon-box" style={{ minWidth: '48px', height: '48px' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>Headquarters Roma</h3>
                  <p style={{ margin: 0, opacity: 0.7, fontSize: '0.95rem', lineHeight: 1.5 }}>Via della Scrofa, 117 — 00186 Roma</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="capri"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="talks-content"
            >
              <div className="mag-label-wrapper">
                <div className="mag-cyan-line" />
                <span className="mag-label">Annual Global Edition</span>
              </div>
              
              <div className="premium-badge-wrapper" style={{ marginBottom: '1.5rem', display: 'flex', gap: '12px' }}>
                <span className="mag-badge" style={{ background: 'var(--primary)', color: 'black', fontWeight: 800, padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', letterSpacing: '0.1em' }}>SAVE THE DATE</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>15-16 Maggio 2026</span>
              </div>

              <h2 className="mag-h2">Capri Talks.</h2>
              <h3 className="mag-tagline">L’eccellenza del confronto tra le onde.</h3>
              
              <div className={`mag-intro ${capriLoading ? 'loading-shimmer' : ''}`}>
                {(capriContent || CAPRI_FALLBACK).split('\n\n').map((p, i) => (
                  <p key={i} style={{ marginBottom: '1.8rem' }}><FormattedText text={p} /></p>
                ))}
              </div>

              <div className="mag-grid mag-grid--3" style={{ marginBottom: '30px', gridAutoRows: '1fr' }}>
                {CAPRI_GUIDELINES.slice(0, 3).map((guide, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="mag-card"
                    style={{ padding: '32px', height: '100%' }}
                  >
                    <div className="mag-icon-box" style={{ marginBottom: '20px' }}>{guide.icon}</div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px', color: 'white' }}>{guide.title}</h4>
                    <p style={{ fontSize: '0.85rem', lineHeight: 1.6, opacity: 0.7 }}>{guide.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mag-grid mag-grid--2" style={{ marginBottom: '6rem' }}>
                {CAPRI_GUIDELINES.slice(3, 5).map((guide, idx) => (
                  <motion.div 
                    key={idx + 3}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (0.1 * idx) }}
                    className="mag-card"
                    style={{ padding: '32px' }}
                  >
                    <div className="mag-icon-box" style={{ marginBottom: '20px' }}>{guide.icon}</div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px', color: 'white' }}>{guide.title}</h4>
                    <p style={{ fontSize: '0.85rem', lineHeight: 1.6, opacity: 0.7 }}>{guide.desc}</p>
                  </motion.div>
                ))}
              </div>

              <section className="mag-section" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4rem' }}>
                <div className="mag-label-wrapper">
                  <div className="mag-cyan-line" />
                  <span className="mag-label">Focus Edizione 2026</span>
                </div>
                <h2 className="mag-h2">(Dis)Uniti.</h2>
                <div className="mag-intro" style={{ opacity: 0.9 }}>
                  <p><FormattedText text={DISUNITI_TEXT} /></p>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SpinTalks;
