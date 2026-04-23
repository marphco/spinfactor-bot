import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, 
  Handshake,
  Compass,
  MessageSquare,
  Trophy,
  X
} from 'lucide-react';
import { FormattedText } from '../FormattedText';
import { useSectionContent } from '../../hooks/useSectionContent';
import { useView } from '../../context/ViewContext';
import Platea1 from '../../assets/spin-talks1.jpg';
import Courtyard from '../../assets/spin-talks2.jpg';
import Platea2 from '../../assets/spin-talks6.jpeg';
import Fountain from '../../assets/spin-talks4.jpg';
import Talks5 from '../../assets/spin-talks5.jpg';


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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  
  const { content: spinContent, loading: spinLoading } = useSectionContent('Spin Talks Intro', SPIN_FALLBACK);
  const { content: capriContent, loading: capriLoading } = useSectionContent('Capri Talks Intro', CAPRI_FALLBACK);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    
    // Body scroll lock
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

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
              
              <div className={`mag-intro ${spinLoading ? 'loading-shimmer' : ''}`} style={{ marginBottom: '3rem' }}>
                {(spinContent || SPIN_FALLBACK).split('\n\n').slice(0, 1).map((p, i) => (
                  <p key={i}><FormattedText text={p} /></p>
                ))}
              </div>

              {/* Responsive Mosaic - Row-Based (Desktop) or Z-Pattern (Mobile) */}
              <div className="mag-row-mosaic" style={{ 
                margin: '4rem 0',
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '30px' : '20px'
              }}>
                {isMobile ? (
                  /* Mobile Z-Pattern Layout - Consistent heights */
                  <>
                    <motion.div 
                      onClick={() => setSelectedImage(Platea1)}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      style={{ alignSelf: 'flex-start', width: '85%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}
                    >
                      <img src={Platea1} alt="Spin Talks Event" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                    </motion.div>
                    <motion.div 
                      onClick={() => setSelectedImage(Fountain)}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      style={{ alignSelf: 'flex-end', width: '85%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}
                    >
                      <img src={Fountain} alt="HQ Fountain" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                    </motion.div>
                    <motion.div 
                      onClick={() => setSelectedImage(Courtyard)}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      style={{ alignSelf: 'flex-start', width: '85%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}
                    >
                      <img src={Courtyard} alt="HQ Courtyard" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                    </motion.div>
                    <motion.div 
                      onClick={() => setSelectedImage(Platea2)}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      style={{ alignSelf: 'flex-end', width: '85%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}
                    >
                      <img src={Platea2} alt="Talks Discussion" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                    </motion.div>
                  </>
                ) : (
                  /* Row 1: 60/40 split */
                  <>
                    <div style={{ display: 'flex', gap: '20px', height: '450px' }}>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onClick={() => setSelectedImage(Platea1)}
                        style={{ flex: '0.6', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.12)', cursor: 'pointer' }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <img src={Platea1} alt="Spin Talks Event" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        onClick={() => setSelectedImage(Fountain)}
                        style={{ flex: '0.4', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', cursor: 'pointer' }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <img src={Fountain} alt="HQ Fountain" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </motion.div>
                    </div>

                    {/* Row 2: 40/60 split */}
                    <div style={{ display: 'flex', gap: '20px', height: '400px' }}>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        onClick={() => setSelectedImage(Courtyard)}
                        style={{ flex: '0.4', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.12)', cursor: 'pointer' }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <img src={Courtyard} alt="HQ Courtyard" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        onClick={() => setSelectedImage(Platea2)}
                        style={{ flex: '0.6', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', cursor: 'pointer' }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <img src={Platea2} alt="Talks Discussion" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </motion.div>
                    </div>
                  </>
                )}
              </div>

              <div className={`mag-intro ${spinLoading ? 'loading-shimmer' : ''}`} style={{ marginTop: '4rem' }}>
                {(spinContent || SPIN_FALLBACK).split('\n\n').slice(1).map((p, i) => (
                  <p key={i} style={{ marginBottom: '1.8rem' }}><FormattedText text={p} /></p>
                ))}
              </div>

              {/* HQ Monumental Section */}
              <motion.section 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                style={{ 
                  marginTop: '6rem', 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  position: 'relative',
                  minHeight: '600px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  boxShadow: '0 40px 100px rgba(0,0,0,0.15)'
                }}
              >
                <img 
                  src={Talks5} 
                  alt="Headquarters - Via della Scrofa 117" 
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    objectPosition: 'bottom',
                    zIndex: 0
                  }} 
                />
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(to top, rgba(13,43,103,1) 0%, rgba(13,43,103,0.4) 50%, transparent 100%)',
                  zIndex: 1
                }} />
                
                <div style={{ 
                  position: 'relative', 
                  zIndex: 2, 
                  padding: 'clamp(2rem, 8vw, 6rem)', 
                  width: '100%',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  flexWrap: 'wrap',
                  gap: '3rem'
                }}>
                  <div style={{ flex: '1 1 400px' }}>
                    <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700, letterSpacing: '0.3em', opacity: 0.6, marginBottom: '1rem' }}>HEADQUARTERS</p>
                    <h2 style={{ margin: 0, fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: 900, lineHeight: 0.85, marginBottom: '2rem' }}>Roma.</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.9 }}>
                      <span style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', fontWeight: 500, letterSpacing: '0.02em' }}>Via della Scrofa, 117 — 00186 Roma</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => window.open('https://maps.google.com/?q=Via+della+Scrofa+117+Roma', '_blank')}
                    className="mag-btn-monumental"
                    style={{ 
                      padding: '14px 28px', 
                      borderRadius: '100px', 
                      background: 'white',
                      color: '#0D2B67',
                      border: 'none',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      cursor: 'pointer',
                      transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05) translateY(-3px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
                  >
                    Ottieni indicazioni
                  </button>
                </div>
              </motion.section>
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
                <span className="mag-badge" style={{ background: 'var(--accent)', color: 'var(--imperial-blue)', fontWeight: 800, padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', letterSpacing: '0.1em' }}>SAVE THE DATE</span>
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
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px', color: '#0D2B67' }}>{guide.title}</h4>
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
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px', color: '#0D2B67' }}>{guide.title}</h4>
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

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 999999,
                background: 'rgba(0,0,0,0.92)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                cursor: 'zoom-out'
              }}
            >
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                style={{
                  position: 'absolute',
                  top: '2rem',
                  right: '2rem',
                  background: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 1000000,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}
              >
                <X color="#0D2B67" size={24} />
              </motion.button>
              
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                src={selectedImage}
                alt="Enlarged view"
                style={{
                  maxWidth: '90vw',
                  maxHeight: '85vh',
                  borderRadius: '12px',
                  boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
                  objectFit: 'contain'
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SpinTalks;
