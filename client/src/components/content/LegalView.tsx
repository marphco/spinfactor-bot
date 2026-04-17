import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cookie } from 'lucide-react';

interface LegalViewProps {
  type: 'privacy' | 'cookie';
}

const LegalView: React.FC<LegalViewProps> = ({ type }) => {
  const isPrivacy = type === 'privacy';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="content-page"
    >
      <div className="content-inner">
        <section className="mag-section" style={{ borderTop: 'none', paddingTop: 0 }}>
          <div className="mag-label-wrapper">
             <div className="mag-cyan-line" />
             <span className="mag-label">Legal & Compliance</span>
          </div>
          <h2 className="mag-h2">
            {isPrivacy ? 'Privacy Policy.' : 'Cookie Policy.'}
          </h2>

          <div className="mag-icon-box" style={{ width: '48px', height: '48px', marginBottom: '2rem' }}>
            {isPrivacy ? <ShieldCheck size={24} /> : <Cookie size={24} />}
          </div>

          <div className="mag-intro legal-text-content">
            {isPrivacy ? (
              <>
                <h3>1. Titolare del Trattamento</h3>
                <p>Spin Factor s.r.l., con sede in via della Scrofa 117, 00186 Roma (RM), email: segreteria@spinfactor.it.</p>
                
                <h3>2. Tipologia di Dati Raccolti</h3>
                <p>Tra i Dati Personali raccolti da questa Applicazione, in modo autonomo o tramite terze parti, ci sono: Cookie, Dati di utilizzo, Nome, Email e Messaggio tramite form di contatto.</p>

                <h3>3. Modalità e Luogo del Trattamento</h3>
                <p>Il Titolare adotta le opportune misure di sicurezza volte ad impedire l’accesso, la divulgazione, la modifica o la distruzione non autorizzate dei Dati Personali.</p>
                
                <h3>4. Finalità del Trattamento</h3>
                <p>I Dati sono raccolti per consentire al Titolare di fornire i propri Servizi, così come per le seguenti finalità: Contattare l'Utente, Statistica e Interazione con social network e piattaforme esterne.</p>

                <h3>5. Diritti dell’Utente</h3>
                <p>Gli Utenti possono esercitare determinati diritti con riferimento ai Dati trattati dal Titolare, tra cui il diritto di rettifica, cancellazione e opposizione al trattamento.</p>
              </>
            ) : (
              <>
                <h3>Cosa sono i Cookie</h3>
                <p>I cookie sono piccoli file di testo che i siti visitati dall'utente inviano e registrano sul suo computer o dispositivo mobile, per essere poi ritrasmessi agli stessi siti alla successiva visita.</p>
                
                <h3>Cookie utilizzati da questo sito</h3>
                <p>Questo sito utilizza cookie tecnici e di terze parti per monitorare il traffico e migliorare l'esperienza utente. Non vengono utilizzati cookie di profilazione proprietari.</p>

                <h3>Cookie di Terze Parti</h3>
                <p>Potrebbero essere installati cookie di terze parti (es. Google Analytics) per finalità statistiche in forma aggregata e anonima.</p>

                <h3>Come disabilitare i Cookie</h3>
                <p>L'utente può gestire le preferenze relative ai cookie direttamente all'interno del proprio browser ed impedire – ad esempio – che terze parti possano installarne.</p>
              </>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default LegalView;
