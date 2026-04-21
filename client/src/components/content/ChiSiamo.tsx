import React from 'react';
import { motion } from 'framer-motion';
import { Wine } from 'lucide-react';
import { useSectionContent } from '../../hooks/useSectionContent';
import { FormattedText } from '../FormattedText';

const CORPORATE_FALLBACK = `Spin Factor è un hub di consulenza strategica che agisce nel punto in cui le decisioni prendono forma.

Tra stimolo e risposta, la differenza risiede nell’elaborazione.
In Spin Factor, ogni processo cognitivo umano è supportato da un’architettura tecnologica proprietaria. L’unione consente di trasformare i dati e le informazioni in comunicazione, le relazioni in posizionamenti strutturati.`;

const FOUNDER_FALLBACK = `Caprese. Dopo la laurea in Psicologia, con tesi su “La comunicazione politica tra nuove tecnologie e social network”, si dedica alla consulenza politica e istituzionale, con particolare attenzione al mondo digitale.
Nel 2018 fonda Spin Factor, inizialmente specializzata in strategia politica, distinguendosi per un approccio innovativo, integrato e altamente personalizzato. A seguito di una scia record di campagne elettorali di successo, la società amplia il proprio raggio d’azione, incluse consulenza strategica e posizionamento istituzionale.

Nel 2019, con un team qualificato di sviluppatori italiani, progetta Human, una piattaforma di web e social listening basata su un algoritmo semantico in lingua italiana. Human viene successivamente integrata con un sistema proprietario di intelligenza artificiale ed oggi rappresenta un unicum sul mercato.

Nel 2023 la società si apre alle relazioni istituzionali, al networking e al corporate. Nel 2025 nascono gli Spin Talks e i Capri Talks.`;

import TiberioImage from '../../assets/tiberio.png';
import CertificazioneImage from '../../assets/certificazione.jpg';

const ChiSiamo: React.FC = () => {
  const { content: corporateContent, loading: corporateLoading } = useSectionContent(
    'Siamo', 
    CORPORATE_FALLBACK,
    `Forniscimi una descrizione istituzionale e visionaria per la sezione "Siamo" di Spin Factor. 
     Focalizzati sulla storia, i valori e l'innovazione.`
  );
  const { content: founderContent, loading: founderLoading } = useSectionContent('Tiberio Brunetti Fondatore', FOUNDER_FALLBACK);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="content-page"
    >
      <div className="content-inner">
        <section className="corporate-section">
          <div className="mag-label-wrapper">
            <div className="mag-cyan-line" />
            <span className="mag-label">IDENTITY & STRATEGY</span>
          </div>
          <h2 className="mag-h2">Siamo.</h2>

          <div className={`mag-intro ${corporateLoading ? 'loading-shimmer' : ''}`}>
            {(corporateContent || CORPORATE_FALLBACK).split('\n\n').map((p, i) => (
              <p key={i} style={{ marginBottom: '1.8rem' }}>
                <FormattedText text={p} />
              </p>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mag-card" 
            style={{ 
              marginTop: '1rem',
              marginBottom: '4rem',
              border: '1px solid rgba(0, 159, 183, 0.4)',
              background: 'rgba(0, 159, 183, 0.05)',
              padding: 'clamp(20px, 5vw, 32px)',
              textAlign: 'center'
            }}
          >
            <h3 style={{ 
              margin: 0, 
              color: 'var(--primary)', 
              fontSize: 'clamp(1.1rem, 4.5vw, 1.5rem)', 
              fontWeight: 600, 
              lineHeight: 1.6,
              letterSpacing: '-0.01em'
            }}>
              Comprendere per decidere. <br/>
              Comunicare per posizionare. <br/>
              Accreditarsi per crescere.
            </h3>
          </motion.div>
        </section>

        <section className="mag-section" style={{ borderTop: 'none', paddingTop: 0 }}>
          <div className="mag-label-wrapper">
            <div className="mag-cyan-line" />
            <span className="mag-label">COMMITMENT & QUALITY</span>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mag-card" 
            style={{ 
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 'clamp(24px, 5vw, 40px)',
              border: '1px solid rgba(0, 159, 183, 0.3)',
              background: 'linear-gradient(135deg, rgba(0, 159, 183, 0.04) 0%, rgba(255, 255, 255, 0.05) 100%)',
              padding: 'clamp(20px, 4vw, 32px)',
              marginTop: '1rem',
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ flex: '1', minWidth: '280px' }}>
              <h4 style={{ 
                margin: '0 0 12px 0', 
                color: 'var(--primary)', 
                fontSize: '1.2rem', 
                fontWeight: 700,
                letterSpacing: '-0.02em'
              }}>
                Eccellenza e Qualità Certificata.
              </h4>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.85 }}>
                Spin Factor adotta un Sistema di Gestione per la Qualità conforme ai requisiti della normativa internazionale <strong>UNI EN ISO 9001:2015</strong>. Un impegno costante nel garantire rigore metodologico e standard d'eccellenza in ogni processo consulenziale.
              </p>
            </div>
            
            <div style={{ 
              width: '120px', 
              height: 'auto', 
              background: 'white', 
              padding: '12px', 
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0, 159, 183, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto'
            }}>
              <img 
                src={CertificazioneImage} 
                alt="Certificazione UNI EN ISO 9001:2015" 
                style={{ width: '100%', height: 'auto', borderRadius: '4px' }} 
              />
            </div>
          </motion.div>
        </section>

        <section className="mag-section">
          <div className="mag-label-wrapper">
            <div className="mag-cyan-line" />
            <span className="mag-label">Il Fondatore</span>
          </div>
          <h2 className="mag-h2">Tiberio Brunetti.</h2>
          
          <div className="mag-founder-layout">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mag-founder-image-wrapper floating"
            >
              <img src={TiberioImage} alt="Tiberio Brunetti" className="mag-founder-image" />
            </motion.div>

            <div className={`mag-intro ${founderLoading ? 'loading-shimmer' : ''}`} style={{ color: 'var(--text-dim)', marginBottom: '3rem', maxWidth: 'none' }}>
              {(founderContent || FOUNDER_FALLBACK).split('\n\n').map((p, i) => (
                <p key={i} style={{ marginBottom: '1.8rem' }}><FormattedText text={p} /></p>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mag-card" 
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                gap: '24px',
                border: '1px solid rgba(0, 159, 183, 0.3)',
                background: 'rgba(0, 159, 183, 0.03)',
                marginTop: '1rem',
                clear: 'both'
              }}
            >
              <div className="mag-icon-box" style={{ minWidth: '48px', height: '48px', borderRadius: '50%' }}>
                <Wine size={24} />
              </div>
              <p style={{ margin: 0, fontSize: '1rem', opacity: 0.9, fontStyle: 'italic', lineHeight: 1.6 }}>
                Imprenditore vinicolo a tempo perso, porta avanti sull’isola di Capri la ultrasecolare traditione enologica di famiglia.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default ChiSiamo;
