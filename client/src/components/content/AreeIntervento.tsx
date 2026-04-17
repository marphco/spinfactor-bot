import React from 'react';
import { motion } from 'framer-motion';
import { 
  Megaphone, 
  PenTool, 
  Network, 
  Target,
  Library,
  Newspaper,
  AlertTriangle,
  Layout,
  Users,
  Award,
  Heart
} from 'lucide-react';
import { FormattedText } from '../FormattedText';
import { useSectionContent } from '../../hooks/useSectionContent';

const FALLBACK_INTRO = "Spin Factor trasforma la complessità dei dati in percorsi strategici di successo attraverso un ecosistema integrato di competenze e tecnologie proprietarie.";

const AreeIntervento: React.FC = () => {
  const { content: introContent, loading: introLoading } = useSectionContent(
    'Facciamo Intro', 
    FALLBACK_INTRO,
    `Forniscimi un'introduzione di alto livello per la sezione "Facciamo" di Spin Factor (Aree di Intervento).`
  );

  const pillars = [
    {
      label: "Consulenza Politica",
      tagline: "Vincere è un’attitudine.",
      intro: "Sviluppiamo e attuiamo piani di consulenza strategica con percorsi di comunicazione integrata su tutti i livelli, comprese le campagne elettorali.",
      features: [
        { title: "Comunicazione Politica e Istituzionale", desc: "Studio, pianificazione e coordinamento strategico della comunicazione integrata per partiti, ministeri, enti e relativi vertici.", icon: <Megaphone size={18} /> },
        { title: "Campaign Management", desc: "Ideazione, pianificazione e coordinamento di campagne elettorali per candidati sindaco, presidenti di Regione, Parlamento nazionale ed europeo.", icon: <Target size={18} /> },
        { title: "Campagne Istituzionali", desc: "Studio e creazione di campagne di comunicazione specifiche focalizzate sul target del committente.", icon: <Library size={18} /> }
      ]
    },
    {
      label: "Media Relations",
      tagline: "Governare la narrazione.",
      intro: "Pianifichiamo azioni mirate per consolidare l’identità del cliente attraverso azioni specifiche e continuative.",
      features: [
        { title: "Media Engagement", desc: "Azioni mirate e targettizzate con i media nazionali di riferimento per rafforzarne il posizionamento in maniera continuativa.", icon: <Newspaper size={18} /> },
        { title: "Comunicazione di Crisi", desc: "Gestione tempestiva di tutte le fasi della crisi reputazionale, in pieno coordinamento con l’area legal.", icon: <AlertTriangle size={18} /> }
      ]
    },
    {
      label: "Social Creativity",
      tagline: "Dare forma visibile alla strategia.",
      intro: "Ogni creatività è declinata sui vari strumenti di comunicazione online e offline per rafforzare i temi di interesse del cliente.",
      features: [
        { title: "Visual & Naming", desc: "Studio di set grafici-semantici originali, loghi e claim coerenti con il posizionamento istituzionale.", icon: <PenTool size={18} /> },
        { title: "Content Production", desc: "Ideazione e realizzazione di contenuti testuali, grafici e video originali per ogni piattaforma.", icon: <Layout size={18} /> },
        { title: "Social Engineering", desc: "Gestione integrata dei canali digitali e rafforzamento della comunità online per favorire la viralizzazione dei contenuti.", icon: <Users size={18} /> }
      ]
    },
    {
      label: "Relazioni Istituzionali",
      tagline: "Accreditarsi per crescere.",
      intro: "Definiamo e sviluppiamo percorsi esclusivi e particolareggiati per costruire relazioni pubbliche e istituzionali stabili, efficaci e coerenti.",
      features: [
        { title: "Mappatura Interlocutori", desc: "Identifichiamo gli attori rilevanti per il posizionamento del cliente e per l’attivazione di relazioni significative.", icon: <Network size={18} /> },
        { title: "Percorsi di Accreditamento", desc: "Traiettorie relazionali su misura per favorire interlocuzioni qualificate, credibili e continuative.", icon: <Award size={18} /> },
        { title: "Cura delle relazioni", desc: "Accompagniamo il cliente nel consolidamento di relazioni stabili, orientate a rafforzarne autorevolezza e riconoscibilità.", icon: <Heart size={18} /> }
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="content-page"
    >
      <div className="content-inner">
        <section className="facciamo-intro">
          <div className="mag-label-wrapper">
            <div className="mag-cyan-line" />
            <span className="mag-label">Digital & Strategic Ecosystem</span>
          </div>
          <h2 className="mag-h2">Facciamo.</h2>
          
          <div className={`mag-intro ${introLoading ? 'loading-shimmer' : ''}`}>
            {(introContent || FALLBACK_INTRO).split('\n\n').map((p, i) => (
              <p key={i} style={{ marginBottom: '1.8rem' }}><FormattedText text={p} /></p>
            ))}
          </div>
        </section>

        <div className="pillars-list">
          {pillars.map((pillar, pIdx) => (
            <section key={pIdx} className="mag-section">
              <div className="mag-label-wrapper">
                <div className="mag-cyan-line" />
                <span className="mag-label">{pillar.label}</span>
              </div>

              <h3 className="mag-tagline">{pillar.tagline}</h3>

              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, opacity: 0.9, marginBottom: '3rem', maxWidth: '800px' }}>
                {pillar.intro}
              </p>

              <div 
                className={`mag-grid ${pillar.features.length === 3 ? 'mag-grid--3' : 'mag-grid--2'}`}
                style={{ gridAutoRows: '1fr' }}
              >
                {pillar.features.map((feat, fIdx) => (
                  <div key={fIdx} className="mag-card" style={{ height: '100%' }}>
                    <div className="mag-icon-box">
                      {feat.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: 'white' }}>
                        {feat.title}
                      </h4>
                      <p style={{ fontSize: '0.85rem', lineHeight: 1.6, opacity: 0.75, margin: 0 }}>
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AreeIntervento;
