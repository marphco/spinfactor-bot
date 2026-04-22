import React from 'react';
import { useView } from '../context/ViewContext';
import { FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const SOCIAL_LINKS = [
  { 
    id: "instagram", 
    label: "Instagram", 
    href: "https://www.instagram.com/spin.factor", 
    icon: FaInstagram 
  },
  /* { 
    id: "x", 
    label: "X", 
    href: "https://x.com/SpinFactorIT", 
    icon: FaXTwitter 
  }, */
  { 
    id: "linkedin", 
    label: "LinkedIn", 
    href: "https://www.linkedin.com/company/spinfactor", 
    icon: FaLinkedinIn 
  },
];

interface FooterProps {
  isHome?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isHome = false }) => {
  const { setActiveView } = useView();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`fixed-footer ${!isHome ? 'is-footer-subpage' : ''}`}>
      <div className="footer-container">
        {/* Left: Copyright */}
        <div className="footer-section copyright">
          <span>© {currentYear} Spin Factor s.r.l.</span>
        </div>

        {/* Center: Social Links */}
        <div className="footer-section socials">
          {SOCIAL_LINKS.map((social) => (
            <a key={social.id} href={social.href} target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <social.icon size={16} />
            </a>
          ))}
        </div>

        {/* Right: Legal Links */}
        <div className="footer-section legal-links">
          <button onClick={() => setActiveView('privacy-policy')} className="footer-text-link">Privacy</button>
          <span className="footer-divider">•</span>
          <button onClick={() => setActiveView('cookie-policy')} className="footer-text-link">Cookie</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
