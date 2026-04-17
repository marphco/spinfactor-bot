import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cookie } from 'lucide-react';

interface LegalViewProps {
  type: 'privacy-policy' | 'cookie-policy';
}

const LegalView: React.FC<LegalViewProps> = ({ type }) => {
  const content = type === 'privacy-policy' ? {
    label: 'Legal & Privacy',
    title: 'Privacy Policy',
    tagline: 'Informazioni sul trattamento dei dati personali.',
    lastUpdated: '17 Aprile 2026',
    icon: ShieldCheck,
    sections: [
      {
        title: '1. Titolare del Trattamento',
        text: 'Il Titolare del trattamento è Spin Factor s.r.l., con sede legale in Via Vittoria Colonna, 14 - 80121 Napoli, Email: segreteria@spinfactor.it. Il Titolare garantisce la massima riservatezza e protezione dei dati personali dei propri utenti.'
      },
      {
        title: '2. Tipologia di Dati Raccolti',
        text: 'Fra i Dati Personali raccolti da questa Applicazione, in modo autonomo o tramite terze parti, ci sono: Cookie, Dati di utilizzo, Nome, Email e Messaggio tramite form di contatto.'
      },
      {
        title: '3. Modalità e Luogo del Trattamento',
        text: 'Il Titolare adotta le opportune misure di sicurezza volte ad impedire l\'accesso, la divulgazione, la modifica o la distruzione non autorizzate dei Dati Personali. Il trattamento viene effettuato mediante strumenti informatici.'
      },
      {
        title: '4. Finalità del Trattamento',
        text: 'I Dati sono raccolti per consentire al Titolare di fornire i propri Servizi, così come per le seguenti finalità: Contattare l\'Utente, Statistica e Interazione con social network e piattaforme esterne.'
      },
      {
        title: '5. Diritti dell\'Utente',
        text: 'Gli Utenti possono esercitare determinati diritti con riferimento ai Dati trattati dal Titolare, tra cui il diritto di rettifica, cancellazione e opposizione al trattamento.'
      }
    ]
  } : {
    label: 'Legal & Compliance',
    title: 'Cookie Policy',
    tagline: 'Gestione e utilizzo dei cookie su questo sito.',
    lastUpdated: '17 Aprile 2026',
    icon: Cookie,
    sections: [
      {
        title: 'Che cosa sono i cookie',
        text: 'I cookie sono piccoli file di testo che i siti visitati dagli utenti inviano ai loro terminali, ove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva.'
      },
      {
        title: 'Tipologie di cookie utilizzati',
        text: 'Questa Applicazione utilizza Cookie Tecnici (necessari per il funzionamento) e Cookie di Terze Parti (per analisi statistiche aggregate tramite Google Analytics 4).'
      },
      {
        title: 'Consenso e Gestione',
        text: 'L\'utente può gestire le preferenze relative ai cookie direttamente all\'interno del proprio browser o tramite l\'informativa breve presentata al primo accesso.'
      }
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="content-page"
    >
      <div className="content-inner">
        <section className="legal-header-refined">
          <div className="mag-label-wrapper">
            <div className="mag-cyan-line" />
            <span className="mag-label">{content.label}</span>
          </div>
          
          <h2 className="mag-h2-white" style={{ marginBottom: '1.5rem' }}>{content.title}</h2>
          
          <h3 className="mag-tagline" style={{ fontSize: '1.4rem', color: 'var(--primary)', maxWidth: '800px' }}>
            {content.tagline}
          </h3>
          <p className="mag-intro" style={{ fontSize: '0.9rem', opacity: 0.5, marginTop: '1rem', marginBottom: '4rem' }}>
            Ultimo aggiornamento: {content.lastUpdated}
          </p>
        </section>

        <div className="legal-body">
          {content.sections.map((section, idx) => (
            <motion.section 
              key={idx} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
              className="mag-card-legal"
            >
              <h4 style={{ 
                fontSize: '1.1rem', 
                fontWeight: 700, 
                color: 'white', 
                marginBottom: '1rem',
                letterSpacing: '-0.01em'
              }}>
                {section.title}
              </h4>
              <p className="mag-p" style={{ fontSize: '0.95rem', opacity: 0.8 }}>{section.text}</p>
            </motion.section>
          ))}
        </div>

        <div style={{ height: '80px' }} /> {/* Spacing fixed bottom */}
      </div>
    </motion.div>
  );
};

export default LegalView;
