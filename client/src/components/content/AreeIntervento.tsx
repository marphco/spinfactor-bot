import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  BrainCircuit, 
  ShieldCheck, 
  Megaphone, 
  PenTool, 
  Network, 
  LineChart 
} from 'lucide-react';
import { useSectionContent } from '../../hooks/useSectionContent';

const FALLBACK_INTRO = "Spin Factor trasforma la complessità dei dati in percorsi strategici di successo attraverso un ecosistema integrato di competenze e tecnologie proprietarie.";

const AreeIntervento: React.FC = () => {
  const { content, loading } = useSectionContent('Aree di Intervento', FALLBACK_INTRO);

  const areas = [
    {
      icon: <BrainCircuit size={32} />,
      title: "Intelligence Strategica",
      subtitle: "Dati, relazioni e comunicazione di alto livello.",
      desc: "Spin Factor è la società leader in Italia per la consulenza strategica in ambito politico e aziendale basata sull’analisi dei dati. Trasformiamo la complessità dei dati in percorsi strategici di successo."
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Human®",
      subtitle: "L’algoritmo al servizio della reputazione.",
      desc: "Basato su un modello semantico proprietario integrato con un sistema proprietario di intelligenza artificiale, Human® monitora costantemente le principali evoluzioni dell’opinione pubblica."
    },
    {
      icon: <LineChart size={32} />,
      title: "Human Index",
      subtitle: "Il super indicatore.",
      desc: "La convergenza tra Big Data e Demoscopia. L’Human Index è l'esclusivo indicatore di convergenza sviluppato per eliminare ogni zona d'ombra nel monitoraggio dell'opinione pubblica."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Consulenza Politica e Istituzionale",
      subtitle: "Vincere è un’attitudine.",
      desc: "Sviluppiamo e attuiamo piani di consulenza strategica con percorsi di comunicazione integrata su tutti i livelli, comprese le campagne elettorali e il campaign management."
    },
    {
      icon: <Megaphone size={32} />,
      title: "Media Relations",
      subtitle: "Governare la narrazione.",
      desc: "Pianifichiamo azioni mirate per consolidare l’identità del cliente attraverso media engagement nazionale coerente e gestione tempestiva delle crisi reputazionali."
    },
    {
      icon: <PenTool size={32} />,
      title: "Creatività e Contenuti Social",
      subtitle: "Dare forma visibile alla strategia.",
      desc: "Ogni creatività è declinata sui vari strumenti di comunicazione online e offline: studio di naming, loghi, claim e gestione integrata dei canali digitali."
    },
    {
      icon: <Network size={32} />,
      title: "Relazioni Istituzionali",
      subtitle: "Accreditarsi per crescere.",
      desc: "Definiamo e sviluppiamo percorsi esclusivi per costruire relazioni pubbliche stabili, efficaci e coerenti con gli obiettivi del committente attraverso mappature mirate."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="content-page"
    >
      <div className="content-inner">
        <h2>Aree di Intervento</h2>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0.6 : 1 }}
          className={`text-block ${loading ? 'loading-shimmer' : ''}`}
          style={{ marginBottom: '40px', transition: 'opacity 0.5s ease' }}
        >
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', opacity: 0.9 }}>
            {content}
          </p>
        </motion.div>

        <div className="areas-grid-7">
          {areas.map((area, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="area-card glass"
            >
              <div className="area-icon text-primary h-mb-20">
                {area.icon}
              </div>
              <p className="area-subtitle text-primary">{area.subtitle}</p>
              <h3>{area.title}</h3>
              <p className="area-desc">{area.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AreeIntervento;
