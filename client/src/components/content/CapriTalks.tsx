import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  MapPin, 
  Globe, 
  Network, 
  Eye,
  Users,
  MessageSquare,
  Link2,
  Building2,
  Newspaper,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { useView } from '../../context/ViewContext';

// Import isolated light theme
import '../../capri-talks.css';

const CapriTalks: React.FC = () => {
  const { setActiveView } = useView();
  const currentYear = new Date().getFullYear();
  // Adding a class to body or HTML might be tricky for SPA, 
  // we rely on the .capri-talks-page scoping, 
  // but let's ensure the body scrollbar is standard if needed.
  useEffect(() => {
    // Optional: if the global body has a dark background that bleeds through
    // we can temporarily override it here.
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#ffffff';
    
    return () => {
      document.body.style.backgroundColor = originalBg;
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="capri-talks-page"
    >
      {/* LOCAL HEADER */}
      <div className="ct-header">
        <div className="ct-header-container">
          <button onClick={() => setActiveView('home')} className="ct-logo-link">
            <img src="/src/assets/logo.svg" alt="Spin Factor" style={{ filter: 'brightness(0)' }} height="32" />
          </button>
        </div>
      </div>

      <div className="ct-container">
        
        {/* HERO SECTION */}
        <div className="ct-hero">
          <h1 className="ct-hero-title">CAPRI TALKS</h1>
          
          <div className="ct-hero-image">
            {/* Placeholder - replace with actual image later */}
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
              [Immagine Panoramica Faraglioni]
            </div>
          </div>

          <div className="ct-sponsors">
            <div className="ct-sponsor-group">
              <span className="ct-sponsor-label">UN PROGETTO</span>
              <div className="ct-sponsor-logos">
                <img src="/src/assets/logo.svg" alt="Spin Factor" className="ct-sponsor-logo" style={{ filter: 'brightness(0)' }} />
              </div>
            </div>
            
            <div className="ct-sponsor-group">
              <span className="ct-sponsor-label">CON IL PATROCINIO DI</span>
              <div className="ct-sponsor-logos">
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Ministero della Cultura</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Ministero del Turismo</span>
              </div>
            </div>

            <div className="ct-sponsor-group">
              <span className="ct-sponsor-label">MEDIA PARTNER</span>
              <div className="ct-sponsor-logos">
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Sky tg24</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Adnkronos</span>
              </div>
            </div>
          </div>
        </div>

        {/* IL CONCEPT */}
        <h2 className="ct-section-title">IL CONCEPT</h2>
        
        <div className="ct-concept-top">
          <div className="ct-concept-paragraph">
            <Lightbulb size={48} className="ct-concept-icon" strokeWidth={1.5} />
            <p>
              Gli Spin Talks sono un ciclo di incontri creati per dare spazio a <strong>idee, esperienze e confronti</strong> sui grandi temi del nostro tempo: politica, istituzioni, media, economia, cultura, innovazione e società.
            </p>
          </div>
          
          <div className="ct-concept-paragraph">
            <p>
              Gli appuntamenti si tengono durante l'anno nella sede di Spin Factor a <strong>Roma</strong>, in via della Scrofa, e si estendono in un'<strong>edizione annuale a Capri</strong>.
            </p>
            <MapPin size={48} className="ct-concept-icon red" strokeWidth={1.5} />
          </div>
        </div>

        <div className="ct-concept-split">
          <div className="ct-concept-image">
            {/* Placeholder square image */}
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
              [Foto Quadrata Capri]
            </div>
          </div>
          <div className="ct-concept-text">
            <p>
              L'isola azzurra il 15 e il 16 maggio ospiterà <strong>panel, interviste e incontri</strong> dando ritmo a un'agenda strutturata e attenta alla <strong>qualità</strong> dei contenuti.
            </p>
            <p>
              I Capri Talks si distinguono per la capacità di costruire una rete solida e diretta tra amministratori locali, imprese, protagonisti dell'attualità e media.
            </p>
            <p>
              Ogni appuntamento è pensato per generare <strong>valore, opinioni e relazioni.</strong>
            </p>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              L'evento, curato da Davide Desario, direttore dell'Adnkronos, è promosso con il patrocinio della Presidenza del Consiglio dei Ministri, dei Ministeri della Cultura e del Turismo. Media partner sono Skytg24 e Adnkronos.
            </p>
          </div>
        </div>

        {/* CAPRI TALKS 2026 (DIS)UNITI */}
        <h2 className="ct-section-title">CAPRI TALKS 2026 (DIS)UNITI</h2>
        
        <div className="ct-columns-text">
          <p>
            Il tema scelto per il 2026, <strong>(Dis)Uniti</strong>, intende affrontare le questioni che stanno ridefinendo il nostro tempo. Economia reale e lavoro, cambiamenti climatici e transizione energetica, geopolitica e nuove fragilità richiedono scelte capaci di <strong>delineare progetti di lungo periodo.</strong>
          </p>
          <div className="ct-divider"></div>
          <p>
            È in questi intrecci che i Capri Talks concentrano la propria energia. (Dis)Uniti è un invito ad esaminare le attuali frammentazioni e gli approcci settoriali, per individuare <strong>direzioni condivise e sostenibili</strong>, capaci di orientare scelte e visioni nel dibattito pubblico.
          </p>
        </div>

        <div className="ct-panoramic-image">
          {/* Placeholder panoramic image */}
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
            [Immagine Panoramica Bassa Faraglioni]
          </div>
        </div>

        {/* LINEE GUIDA */}
        <h2 className="ct-section-title">LINEE GUIDA</h2>
        
        <div className="ct-diagram">
          <div className="ct-diagram-node">
            <div className="ct-icon-circle coral">
              <Globe size={32} />
            </div>
            <div>
              <h4>Contaminazioni</h4>
              <p>tra mondi diversi</p>
            </div>
          </div>
          
          <div className="ct-arrow">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0,12 Q20,0 40,12" fill="none" />
              <polyline points="35,7 40,12 35,17" />
            </svg>
          </div>
          
          <div className="ct-diagram-node">
            <div className="ct-icon-circle cyan">
              <Network size={32} />
            </div>
            <div>
              <h4>Connessioni</h4>
              <p>tra idee, persone e territori</p>
            </div>
          </div>
          
          <div className="ct-arrow">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0,12 Q20,24 40,12" fill="none" />
              <polyline points="35,7 40,12 35,17" />
            </svg>
          </div>
          
          <div className="ct-diagram-node">
            <div className="ct-icon-circle coral">
              <Eye size={32} />
            </div>
            <div>
              <h4>Visioni</h4>
              <p>sulle trasformazioni in atto</p>
            </div>
          </div>
        </div>
        
        <p className="ct-centered-text">
          I Capri Talks si adattano all'attualità e anticipano i temi che animano il dibattito pubblico.
        </p>

        {/* GLI INCONTRI */}
        <h2 className="ct-section-title">GLI INCONTRI</h2>
        
        <div className="ct-cards-grid">
          <div className="ct-card cyan">
            <Users size={36} />
            <h4>Interviste<br />e faccia a faccia</h4>
          </div>
          <div className="ct-card coral">
            <MessageSquare size={36} />
            <h4>Dialoghi<br />e conversazioni</h4>
          </div>
          <div className="ct-card cyan">
            <Link2 size={36} />
            <h4>Networking</h4>
          </div>
        </div>

        <p className="ct-centered-text">
          Il format privilegia un tono <strong>diretto e informale</strong> per favorire un confronto autentico e di qualità.
        </p>

        {/* I PROTAGONISTI */}
        <h2 className="ct-section-title">I PROTAGONISTI</h2>
        
        <div className="ct-diagram">
          <div className="ct-diagram-node" style={{ width: '130px' }}>
            <div className="ct-icon-circle cyan">
              <Building2 size={28} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.8rem' }}>Rappresentanti del mondo istituzionale e politico</h4>
            </div>
          </div>
          
          <div className="ct-arrow">
            <svg width="30" height="20" viewBox="0 0 30 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0,10 Q15,0 30,10" fill="none" />
              <polyline points="25,5 30,10 25,15" />
            </svg>
          </div>
          
          <div className="ct-diagram-node" style={{ width: '130px' }}>
            <div className="ct-icon-circle coral">
              <Newspaper size={28} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.8rem' }}>Direttori di testata e giornalisti</h4>
            </div>
          </div>
          
          <div className="ct-arrow">
            <svg width="30" height="20" viewBox="0 0 30 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0,10 Q15,20 30,10" fill="none" />
              <polyline points="25,5 30,10 25,15" />
            </svg>
          </div>
          
          <div className="ct-diagram-node" style={{ width: '130px' }}>
            <div className="ct-icon-circle cyan">
              <Briefcase size={28} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.8rem' }}>Imprenditori e manager</h4>
            </div>
          </div>

          <div className="ct-arrow">
            <svg width="30" height="20" viewBox="0 0 30 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0,10 Q15,0 30,10" fill="none" />
              <polyline points="25,5 30,10 25,15" />
            </svg>
          </div>

          <div className="ct-diagram-node" style={{ width: '130px' }}>
            <div className="ct-icon-circle coral">
              <GraduationCap size={28} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.8rem' }}>Opinion leader e intellettuali</h4>
            </div>
          </div>
        </div>

        <p className="ct-centered-text" style={{ paddingBottom: '40px' }}>
          La selezione degli ospiti avviene in funzione della rilevanza dei temi trattati e della capacità di offrire chiavi di lettura autorevoli e non convenzionali.
        </p>

      </div>

      {/* LOCAL STATIC FOOTER */}
      <div className="ct-footer">
        <div className="footer-container">
          <div className="footer-section">
            <span style={{ fontSize: '0.9rem' }}>© {currentYear} Spin Factor s.r.l.</span>
          </div>

          <div className="footer-section socials" style={{ display: 'flex', gap: '16px' }}>
            <a href="https://www.instagram.com/spin.factor" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <FaInstagram size={18} />
            </a>
            <a href="https://www.tiktok.com/@spin.factor" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <FaTiktok size={18} />
            </a>
            <a href="https://x.com/SpinFactorIT" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <FaXTwitter size={18} />
            </a>
            <a href="https://www.linkedin.com/company/spinfactor" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <FaLinkedinIn size={18} />
            </a>
          </div>

          <div className="footer-section legal-links">
            <button onClick={() => setActiveView('privacy-policy')} className="footer-text-link">Privacy</button>
            <span className="footer-divider">•</span>
            <button onClick={() => setActiveView('cookie-policy')} className="footer-text-link">Cookie</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CapriTalks;
