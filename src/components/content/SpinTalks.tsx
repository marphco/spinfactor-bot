import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Mic2, 
  LineChart, 
  Globe, 
  Share2, 
  Handshake 
} from 'lucide-react';

interface SpinTalksProps {
  showCapriInitially?: boolean;
}

const SpinTalks: React.FC<SpinTalksProps> = ({ showCapriInitially }) => {
  const [activeTab, setActiveTab] = useState<'spin' | 'capri'>(showCapriInitially ? 'capri' : 'spin');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="content-page"
    >
      <div className="content-inner">
        <div className="tabs-nav glass">
          <button 
            className={activeTab === 'spin' ? 'active' : ''} 
            onClick={() => setActiveTab('spin')}
          >
            Spin Talks
          </button>
          <button 
            className={activeTab === 'capri' ? 'active' : ''} 
            onClick={() => setActiveTab('capri')}
          >
            Capri Talks
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'spin' ? (
            <motion.div 
              key="spin"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="talks-content"
            >
              <h2>Spin Talks</h2>
              <p className="subtitle text-primary">Dove il pensiero si traduce in relazione, confronto e posizionamento.</p>
              
              <div className="text-block">
                <p>Gli Spin Talks sono un ciclo di incontri creati per dare spazio a idee, esperienze e confronti sui grandi temi del nostro tempo: politica, istituzioni, media, economia, cultura, innovazione e società.</p>
                <p>Gli appuntamenti si tengono durante l’anno nella sede di Spin Factor a Roma, in via della Scrofa, e si estendono in un’edizione annuale a Capri.</p>
              </div>

              <div className="feature-item glass h-mt-40">
                <div className="icon-wrapper">
                  <MapPin size={32} className="text-primary" />
                </div>
                <h3>Sede di Roma</h3>
                <p>via della Scrofa, 117 — 00186 Roma</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="capri"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="talks-content"
            >
              <div className="capri-badge">Edizione 2026: 15-16 Maggio</div>
              <h2>Capri Talks</h2>
              <p className="subtitle text-primary">(Dis)Uniti</p>
              
              <div className="text-block">
                <p>Il tema scelto per il 2026, (Dis)Uniti, intende affrontare le questioni che stanno ridefinendo il nostro tempo. Economia reale e lavoro, cambiamenti climatici e transizione energetica, geopolitica e nuove fragilità richiedono scelte capaci di delineare progetti di lungo periodo.</p>
                <p>È in questi intrecci che i Capri Talks concentrano la propria energia. (Dis)Uniti è un invito ad esaminare le attuali frammentazioni e gli approcci settoriali, per individuare direzioni condivise e sostenibili, capaci di orientare scelte e visioni nel dibattito pubblico.</p>
              </div>

              <div className="capri-features">
                <div className="c-feat glass">
                  <div className="icon-wrapper">
                    <Globe size={24} className="text-primary" />
                  </div>
                  <h4>Networking esclusivo</h4>
                </div>
                <div className="c-feat glass">
                  <div className="icon-wrapper">
                    <Users size={24} className="text-primary" />
                  </div>
                  <h4>Stakeholder di rilievo</h4>
                </div>
                <div className="c-feat glass">
                  <div className="icon-wrapper">
                    <Mic2 size={24} className="text-primary" />
                  </div>
                  <h4>Idee & Visioni</h4>
                </div>
              </div>

              <div className="capri-detailed-grid h-mt-60">
                <div className="capri-info-card glass">
                  <div className="card-header">
                    <LineChart size={20} className="text-primary" />
                    <h4>Linee Guida</h4>
                  </div>
                  <p>i Capri Talks si adattano all’attualità e anticipano i temi che animano il dibattito pubblico. Contaminazioni tra mondi diversi. Connessioni tra idee, persone e territori. Visioni sulle trasformazioni in atto.</p>
                </div>
                
                <div className="capri-info-card glass">
                  <div className="card-header">
                    <Mic2 size={20} className="text-primary" />
                    <h4>Gli incontri</h4>
                  </div>
                  <p>il format privilegia un tono diretto e informale per favorire un confronto autentico e di qualità. Interviste e faccia a faccia. Dialoghi. Networking e conversazioni.</p>
                </div>

                <div className="capri-info-card glass">
                  <div className="card-header">
                    <Users size={20} className="text-primary" />
                    <h4>I protagonisti</h4>
                  </div>
                  <p>La selezione degli ospiti avviene in funzione della rilevanza dei temi trattati e della capacità di offrire chiavi di lettura autorevoli e non convenzionali. Rappresentanti del mondo istituzionale e politico, imprenditori e manager, direttori di testata e giornalisti, opinion leader e intellettuali.</p>
                </div>

                <div className="capri-info-card glass">
                  <div className="card-header">
                    <Share2 size={20} className="text-primary" />
                    <h4>Comunicazione e visibilità</h4>
                  </div>
                  <p>Creiamo contenuti e relazioni che mirano a preservare il proprio valore nel tempo. Ogni appuntamento genera contenuti editoriali e di comunicazione attraverso attività di ufficio stampa, contenuti digitali, diffusione social.</p>
                </div>

                <div className="capri-info-card glass full-width">
                  <div className="card-header">
                    <Handshake size={20} className="text-primary" />
                    <h4>Partnership</h4>
                  </div>
                  <p>I Capri Talks rappresentano un’opportunità di posizionamento e relazione per partner e stakeholder interessati ad associare il proprio brand a un progetto di pensiero e contenuti. Le collaborazioni sono costruite in modo sartoriale, in funzione degli obiettivi condivisi.</p>
                </div>

                <div className="capri-info-card glass full-width" style={{ borderColor: 'var(--primary)' }}>
                  <div className="card-header">
                    <Calendar size={20} className="text-primary" />
                    <h4>(Dis)Uniti — Tema 2026</h4>
                  </div>
                  <p>Il tema scelto per il 2026 intende affrontare le questioni che stanno ridefinendo il nostro tempo. Economia reale e lavoro, cambiamenti climatici e transizione energetica, geopolitica e nuove fragilità richiedono scelte capaci di delineare progetti di lungo periodo.</p>
                  <p>È in questi intrecci che i Capri Talks concentrano la propria energia. Un invito ad esaminare le attuali frammentazioni per individuare direzioni condivise e sostenibili, capaci di orientare scelte e visioni nel dibattito pubblico.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SpinTalks;
