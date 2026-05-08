import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedinIn, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { Download, Play } from 'lucide-react';
import { useView } from '../../context/ViewContext';

// Import isolated light theme
import '../../capri-talks.css';

// Import Assets for Production
import logo from '../../assets/logo.svg';
import capri1 from '../../assets/capri1.png';
import capri2 from '../../assets/capri2.png';
import capri3 from '../../assets/capri3.png';
import palazzoChigi from '../../assets/palazzo-chigi.svg';
import mic from '../../assets/mic.svg';
import mit from '../../assets/mit.svg';
import skytg24 from '../../assets/skytg24.svg';
import adn from '../../assets/adn.svg';
import lampadina from '../../assets/lampadina.svg';
import pin from '../../assets/pin.svg';
import contaminazioni from '../../assets/contaminazioni.svg';
import freccia1 from '../../assets/freccia1.svg';
import connessioni from '../../assets/connessioni.svg';
import freccia2 from '../../assets/freccia2.svg';
import visioni from '../../assets/visioni.svg';
import interviste from '../../assets/interviste.svg';
import dialoghi from '../../assets/dialoghi.svg';
import networking from '../../assets/networking.svg';
import rappresentanti from '../../assets/rappresentanti.svg';
import freccia1_1 from '../../assets/freccia1-1.svg';
import direttori from '../../assets/direttori.svg';
import freccia1_2 from '../../assets/freccia1-2.svg';
import imprenditori from '../../assets/imprenditori.svg';
import freccia1_3 from '../../assets/freccia1-3.svg';
import leader from '../../assets/leader.svg';
import metaLogo from '../../assets/meta.svg';
import cittaCapri from '../../assets/citta-capri.jpg';
import enavLogo from '../../assets/enav.svg';
import enelLogo from '../../assets/enel.svg';
import gseLogo from '../../assets/gse.svg';
import autostradeLogo from '../../assets/autostrade.svg';
import renexiaLogo from '../../assets/renexia.svg';
import wintimeLogo from '../../assets/wintime.svg';
import marinaLogo from '../../assets/marina.svg';
import fivenLogo from '../../assets/fiven.svg';
import snavLogo from '../../assets/snav.svg';
import tiberioLogo from '../../assets/tiberio.svg';
import lapalmaLogo from '../../assets/lapalma.svg';
import anemaLogo from '../../assets/anema.svg';
import redLogo from '../../assets/red.svg';

type Speaker = { name: string; role: string };
type Block = { speakers: Speaker[]; moderator?: Speaker };
type Panel = { title: string; blocks: Block[] };
type DayProgram = { dayLabel: string; time: string; panels: Panel[] };

const PROGRAM: DayProgram[] = [
  {
    dayLabel: 'Venerdì 15 Maggio',
    time: 'Ore 17:30',
    panels: [
      {
        title: 'Saluti istituzionali',
        blocks: [
          { speakers: [{ name: 'Paolo Falco', role: 'Sindaco di Capri' }] },
        ],
      },
      {
        title: 'Vivere meglio per vivere di più',
        blocks: [
          {
            speakers: [{ name: 'Orazio Schillaci', role: 'Ministro della Salute' }],
            moderator: { name: 'Davide Desario', role: 'Direttore Adnkronos' },
          },
        ],
      },
      {
        title: "La cultura dell'artificiale",
        blocks: [
          {
            speakers: [
              { name: 'Alberto Barachini', role: "Sottosegretario all'Editoria" },
              { name: 'Gabriella Buontempo', role: 'Presidente Centro Sperimentale di Cinematografia' },
              { name: 'Stefano Graziano', role: 'Deputato Partito Democratico' },
              { name: 'Paolo Emilio Russo', role: 'Deputato Forza Italia' },
            ],
            moderator: { name: 'Francesco Maesano', role: 'Giornalista TG1' },
          },
        ],
      },
      {
        title: '(In)sicurezza energetica',
        blocks: [
          {
            speakers: [
              { name: 'Gilberto Pichetto', role: "Ministro dell'Ambiente e della Sicurezza Energetica" },
              { name: 'Vinicio Vigilante', role: 'Amministratore Delegato GSE' },
              { name: "Pier Lorenzo Dell'Orco", role: 'Amministratore Delegato Italgas Reti' },
              { name: 'Laura Bononcini', role: 'Responsabile relazioni istituzionali sud Europa Meta' },
              { name: 'Edoardo De Luca', role: 'Responsabile affari centrali ENEL' },
              { name: 'Andrea Porchera', role: 'Responsabile relazioni istituzionali Renexia' },
            ],
            moderator: { name: 'Maria Antonietta Spadorcia', role: 'Vice direttore TG2' },
          },
        ],
      },
    ],
  },
  {
    dayLabel: 'Sabato 16 Maggio',
    time: 'Ore 17:30',
    panels: [
      {
        title: 'The italian job',
        blocks: [
          {
            speakers: [{ name: 'Claudio Durigon', role: 'Sottosegretario al Lavoro e alle Politiche Sociali' }],
            moderator: { name: 'Davide Desario', role: 'Direttore Adnkronos' },
          },
          {
            speakers: [
              { name: 'Gabriele Fava', role: 'Presidente INPS' },
              { name: 'Marta Schifone', role: "Deputato Fratelli d'Italia" },
              { name: 'Luigi Marattin', role: 'Segretario Partito Liberaldemocratico' },
              { name: 'Davide Ferraro', role: 'Amministratore Delegato WinTime' },
            ],
            moderator: { name: 'Francesco Maesano', role: 'Giornalista TG1' },
          },
        ],
      },
      {
        title: "(Ri)connettere l'Italia",
        blocks: [
          {
            speakers: [
              { name: 'Leonardo Massa', role: 'Vice presidente sud Europa MSC Cruise' },
              { name: 'Simone Stellato', role: 'Responsabile comunicazione esterna ENAV' },
            ],
            moderator: { name: 'Maria Antonietta Spadorcia', role: 'Vice direttore TG2' },
          },
        ],
      },
      {
        title: 'La diplomazia del dialogo',
        blocks: [
          {
            speakers: [
              { name: 'Zakia Attanasio', role: 'Presidente Fondazione Mama Sofia Ets' },
              { name: 'Isabella Rauti', role: 'Sottosegretario alla Difesa' },
            ],
            moderator: { name: 'Michele Cagiano De Azevedo', role: 'Vice direttore Sky TG24' },
          },
        ],
      },
      {
        title: 'Difendere la libertà',
        blocks: [
          {
            speakers: [{ name: 'Carlo Calenda', role: 'Segretario Azione' }],
            moderator: { name: 'Francesco Maesano', role: 'Giornalista TG1' },
          },
        ],
      },
    ],
  },
];

const CapriTalks: React.FC = () => {
  const { setActiveView } = useView();
  const currentYear = new Date().getFullYear();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoStarted, setVideoStarted] = useState(false);

  const handlePlayVideo = () => {
    setVideoStarted(true);
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => { /* autoplay blocked, user can press controls */ });
    });
  };
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
            <img src={logo} alt="Spin Factor" height="32" />
          </button>
        </div>
      </div>

      <div className="ct-container">
        
        {/* HERO SECTION */}
        <div className="ct-hero">
          <h1 className="ct-hero-title">CAPRI TALKS</h1>

          <div className="ct-hero-image">
            <img src={capri1} alt="Capri Talks Panoramica" />
          </div>
        </div>

        {/* VIDEO */}
        <div className="ct-video-wrapper">
          <div className="ct-video-frame">
            {!videoStarted && (
              <button
                type="button"
                className="ct-video-poster"
                onClick={handlePlayVideo}
                aria-label="Riproduci video Capri Talks"
              >
                <img src="/media/capri-talks-poster.jpg" alt="" loading="lazy" decoding="async" />
                <span className="ct-video-play-badge" aria-hidden="true">
                  <Play size={28} />
                </span>
              </button>
            )}
            {videoStarted && (
              <video
                ref={videoRef}
                className="ct-video"
                src="/media/capri-talks.mp4"
                poster="/media/capri-talks-poster.jpg"
                preload="metadata"
                playsInline
                controls
              />
            )}
          </div>
        </div>

        {/* PROGRAMMA */}
        <h2 className="ct-section-title">PROGRAMMA</h2>

        <div className="ct-program-download-wrapper ct-program-download-top">
          <a
            className="ct-program-download"
            href="/media/programma-capri-talks-2026.pdf"
            download
          >
            <Download size={18} />
            <span>Scarica il programma in PDF</span>
          </a>
        </div>

        <div className="ct-program-grid">
          {PROGRAM.map((day) => (
            <div key={day.dayLabel} className="ct-program-day">
              <div className="ct-program-day-header">
                <span className="ct-program-day-label">{day.dayLabel}</span>
                <span className="ct-program-day-time">{day.time}</span>
              </div>

              <div className="ct-program-panels">
                {day.panels.map((panel) => (
                  <div key={panel.title} className="ct-program-panel">
                    <h3 className="ct-program-panel-title">{panel.title}</h3>
                    {panel.blocks.map((block, bIdx) => (
                      <div key={bIdx} className="ct-program-block">
                        <ul className="ct-program-speakers">
                          {block.speakers.map((s) => (
                            <li key={s.name} className="ct-program-speaker">
                              <span className="ct-program-speaker-name">{s.name}</span>
                              <span className="ct-program-speaker-role">{s.role}</span>
                            </li>
                          ))}
                        </ul>
                        {block.moderator && (
                          <div className="ct-program-moderator">
                            <span className="ct-program-moderator-label">/ Conduce</span>
                            <span className="ct-program-speaker-name">{block.moderator.name}</span>
                            <span className="ct-program-speaker-role">{block.moderator.role}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SPONSORS */}
        <div className="ct-sponsors">
          <div className="ct-sponsors-row">
            <div className="ct-sponsor-group">
              <span className="ct-sponsor-label">UN PROGETTO</span>
              <div className="ct-sponsor-logos">
                <img src={logo} alt="Spin Factor" className="ct-sponsor-logo" />
              </div>
            </div>

            <div className="ct-sponsor-group">
              <span className="ct-sponsor-label">CON IL PATROCINIO DI</span>
              <div className="ct-sponsor-logos ct-patrocini-grid">
                <img src={palazzoChigi} alt="Palazzo Chigi" className="ct-sponsor-logo" style={{ height: '40px' }} />
                <img src={mic} alt="Ministero della Cultura" className="ct-sponsor-logo" style={{ height: '32px' }} />
                <img src={mit} alt="Ministero del Turismo" className="ct-sponsor-logo" style={{ height: '32px' }} />
                <img src={cittaCapri} alt="Città di Capri" className="ct-sponsor-logo" style={{ height: '48px' }} />
              </div>
            </div>
          </div>

          <div className="ct-sponsors-row">
            <div className="ct-sponsor-group">
              <span className="ct-sponsor-label">MEDIA PARTNER</span>
              <div className="ct-sponsor-logos">
                <img src={skytg24} alt="Sky TG24" className="ct-sponsor-logo" style={{ height: '28px' }} />
                <img src={adn} alt="Adnkronos" className="ct-sponsor-logo" style={{ height: '24px' }} />
              </div>
            </div>

            <div className="ct-sponsor-group">
              <span className="ct-sponsor-label">PARTNER TECNICO</span>
              <div className="ct-sponsor-logos">
                <img src={metaLogo} alt="Meta" className="ct-sponsor-logo" style={{ height: '18px' }} />
              </div>
            </div>
          </div>

          <div className="ct-sponsor-group ct-sponsor-group-wide">
            <span className="ct-sponsor-label">IN COLLABORAZIONE CON</span>
            <div className="ct-sponsor-logos ct-collab-grid">
              <img src={enavLogo} alt="ENAV" className="ct-sponsor-logo" style={{ height: '44px' }} />
              <img src={enelLogo} alt="Enel" className="ct-sponsor-logo" style={{ height: '36px' }} />
              <img src={gseLogo} alt="GSE" className="ct-sponsor-logo" style={{ height: '44px' }} />
              <img src={autostradeLogo} alt="Autostrade per l'Italia" className="ct-sponsor-logo" style={{ height: '32px' }} />
              <img src={renexiaLogo} alt="Renexia" className="ct-sponsor-logo" style={{ height: '36px' }} />
              <img src={wintimeLogo} alt="WinTime" className="ct-sponsor-logo" style={{ height: '52px' }} />
              <img src={marinaLogo} alt="Marina di Capri" className="ct-sponsor-logo" style={{ height: '52px' }} />
              <img src={fivenLogo} alt="Fiven AI Driven" className="ct-sponsor-logo" style={{ height: '36px' }} />
            </div>
          </div>

          <div className="ct-sponsor-group ct-sponsor-group-wide">
            <span className="ct-sponsor-label">CON IL SUPPORTO DI</span>
            <div className="ct-sponsor-logos ct-support-row">
              <img src={snavLogo} alt="SNAV" className="ct-sponsor-logo" style={{ height: '32px' }} />
              <img src={tiberioLogo} alt="Tiberio" className="ct-sponsor-logo" style={{ height: '36px' }} />
              <img src={lapalmaLogo} alt="Hotel La Palma" className="ct-sponsor-logo" style={{ height: '40px' }} />
              <img src={anemaLogo} alt="Anema e Core" className="ct-sponsor-logo ct-logo-anema" />
              <img src={redLogo} alt="RED Rescue & Emergency Devices" className="ct-sponsor-logo" style={{ height: '36px' }} />
            </div>
          </div>
        </div>

        {/* IL CONCEPT */}
        <h2 className="ct-section-title">IL CONCEPT</h2>
        
        <div className="ct-concept-top">
          <div className="ct-concept-paragraph left">
            <img src={lampadina} alt="Concept Idea" className="ct-concept-icon" />
            <p>
              Gli Spin Talks sono un ciclo di incontri creati per dare spazio a <strong>idee, esperienze e confronti</strong> sui grandi temi del nostro tempo: politica, istituzioni, media, economia, cultura, innovazione e società.
            </p>
          </div>
          
          <div className="ct-concept-paragraph right">
            <img src={pin} alt="Location" className="ct-concept-icon" />
            <p>
              Gli appuntamenti si tengono durante l'anno nella sede di Spin Factor a <strong>Roma</strong>, in via della Scrofa, e si estendono in un'<strong>edizione annuale a Capri</strong>.
            </p>
          </div>
        </div>

        <div className="ct-concept-split">
          <div className="ct-concept-image">
            <img src={capri2} alt="Capri Talks Meeting" />
          </div>
          <div className="ct-concept-text">
            <p>
              L'isola azzurra in tra la fine della primavera e l’estate ospita <strong>panel, interviste e incontri</strong> dando ritmo a un'agenda strutturata e attenta alla <strong>qualità</strong> dei contenuti.
            </p>
            <p>
              I Capri Talks si distinguono per la capacità di costruire una rete solida e diretta tra amministratori locali, imprese, protagonisti dell'attualità e media.
            </p>
            <p>
              Ogni appuntamento è pensato per generare <strong>valore, opinioni e relazioni.</strong>
            </p>
          </div>
        </div>

        <div className="ct-concept-credits">
          <p>
            L'evento, curato da Davide Desario, direttore dell'Adnkronos, è promosso con il patrocinio della Presidenza del Consiglio dei Ministri, dei Ministeri della Cultura e del Turismo e del Comune di Capri. Media partner sono Skytg24 e Adnkronos. Partner tecnico Meta.
          </p>
        </div>

        {/* CAPRI TALKS 2026 (DIS)UNITI */}
        <h2 className="ct-section-title">CAPRI TALKS 2026 (DIS)UNITI</h2>
        <div className="ct-date-subtitle">15 — 16 maggio</div>
        
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
          <img src={capri3} alt="Capri Talks Orizzontale" />
        </div>

        {/* LINEE GUIDA */}
        <h2 className="ct-section-title">LINEE GUIDA</h2>
        
        <div className="ct-diagram ct-diagram-guidelines">
          <div className="ct-diagram-node">
            <img src={contaminazioni} alt="Contaminazioni" className="ct-diagram-img" />
            <div>
              <h4>Contaminazioni</h4>
              <p>tra mondi diversi</p>
            </div>
          </div>
          
          <div className="ct-arrow">
            <img src={freccia1} alt="arrow" />
          </div>
          
          <div className="ct-diagram-node lowered">
            <img src={connessioni} alt="Connessioni" className="ct-diagram-img" />
            <div>
              <h4>Connessioni</h4>
              <p>tra idee, persone e territori</p>
            </div>
          </div>
          
          <div className="ct-arrow">
            <img src={freccia2} alt="arrow" />
          </div>
          
          <div className="ct-diagram-node">
            <img src={visioni} alt="Visioni" className="ct-diagram-img" />
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
            <img src={interviste} alt="Interviste" style={{ height: '48px', objectFit: 'contain' }} />
            <h4>Interviste<br />e faccia a faccia</h4>
          </div>
          <div className="ct-card coral">
            <img src={dialoghi} alt="Dialoghi" style={{ height: '48px', objectFit: 'contain' }} />
            <h4>Dialoghi<br />e conversazioni</h4>
          </div>
          <div className="ct-card cyan">
            <img src={networking} alt="Networking" style={{ height: '48px', objectFit: 'contain' }} />
            <h4>Networking</h4>
          </div>
        </div>

        <p className="ct-centered-text">
          Il format privilegia un tono <strong>diretto e informale</strong> per favorire un confronto autentico e di qualità.
        </p>

        {/* I PROTAGONISTI */}
        <h2 className="ct-section-title">I&nbsp;PROTAGONISTI</h2>
        
        <div className="ct-diagram ct-diagram-guidelines">
          <div className="ct-diagram-node" style={{ width: '130px' }}>
            <img src={rappresentanti} alt="Rappresentanti" className="ct-diagram-img" />
            <div>
              <h4 style={{ fontSize: '0.8rem' }}>Rappresentanti del mondo istituzionale e politico</h4>
            </div>
          </div>
          
          <div className="ct-arrow">
            <img src={freccia1_1} alt="arrow" />
          </div>
          
          <div className="ct-diagram-node lowered" style={{ width: '130px' }}>
            <img src={direttori} alt="Direttori" className="ct-diagram-img" />
            <div>
              <h4 style={{ fontSize: '0.8rem' }}>Direttori di testata e giornalisti</h4>
            </div>
          </div>
          
          <div className="ct-arrow">
            <img src={freccia1_2} alt="arrow" />
          </div>
          
          <div className="ct-diagram-node" style={{ width: '130px' }}>
            <img src={imprenditori} alt="Imprenditori" className="ct-diagram-img" />
            <div>
              <h4 style={{ fontSize: '0.8rem' }}>Imprenditori e manager</h4>
            </div>
          </div>

          <div className="ct-arrow">
            <img src={freccia1_3} alt="arrow" />
          </div>

          <div className="ct-diagram-node lowered" style={{ width: '130px' }}>
            <img src={leader} alt="Opinion leader" className="ct-diagram-img" />
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
