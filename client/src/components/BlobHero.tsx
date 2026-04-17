import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Mic, 
  Mail,
  Headphones,
  Newspaper
} from 'lucide-react';
import HumanIcon from '../assets/human.svg';
import SiamoIcon from '../assets/siamo.svg';

interface BlobButtonProps {
  label: string;
  onClick: () => void;
  Icon?: React.ElementType | string;
  color?: string;
  delay?: number;
  size?: number;
  className?: string;
  opacity?: number;
  x?: number;
  y?: number;
  isMobile?: boolean;
  continuousFloat?: boolean;
}

const BlobButton: React.FC<BlobButtonProps> = ({ 
  label, 
  onClick, 
  Icon,
  color = 'var(--primary)', 
  delay = 0, 
  size = 200, 
  className = "",
  opacity = 1,
  x = 0,
  y = 0,
  isMobile = false,
  continuousFloat = true
}) => {
  const desktopAnimate = {
    x,
    y,
    opacity,
    scale: 1,
  };

  const mobileAnimate = {
    x,
    y,
    opacity,
    scale: 1,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, x, y }}
      animate={isMobile ? mobileAnimate : desktopAnimate}
      transition={{ 
        delay, 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={`blob-button-outer ${className} ${isMobile ? 'mobile-blob-radial' : 'desktop-blob'}`}
      style={{ position: 'absolute', left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        animate={continuousFloat ? {
          y: [0, -6, 0],
          rotate: [0, 1, -1, 0]
        } : {}}
        transition={{
          repeat: Infinity,
          duration: 4 + Math.random() * 2,
          ease: "easeInOut"
        }}
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className="blob-button"
          style={{ 
            '--blob-color': color,
            '--size': `${size}px`
          } as React.CSSProperties}
        >
          <div className="blob-bg"></div>
          <div className="blob-content">
            {Icon && (
              typeof Icon === 'string' ? (
                <img 
                  src={Icon} 
                  className="blob-icon custom-svg-icon" 
                  style={{ 
                    width: (label === 'SIAMO' ? size * 0.14 : size * 0.18), 
                    height: 'auto' 
                  }} 
                  alt="" 
                />
              ) : (
                <Icon className="blob-icon" size={size * 0.18} />
              )
            )}
            <span className="blob-label">{label}</span>
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

interface BlobHeroProps {
  onNavigate: (view: string) => void;
}

const BlobHero: React.FC<BlobHeroProps> = ({ onNavigate }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [shuffledSections, setShuffledSections] = useState<any[]>([]);

  // Viewport Lock: Ensure Home is always zero-scroll without affecting internal pages
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.height = 'auto';
    };
  }, []);

  useEffect(() => {
    // Breakpoint fix: Switch to mobile only at 768px as requested
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    // All available sections
    const allSections = [
      { id: 'spin-talks', label: 'TALKS', icon: Mic },
      { id: 'chi-siamo', label: 'SIAMO', icon: SiamoIcon },
      { id: 'facciamo', label: 'FACCIAMO', icon: Zap },
      { id: 'diciamo', label: 'DICIAMO', icon: Newspaper },
      { id: 'podcast', label: 'PODCAST', icon: Headphones },
      { id: 'human-data', label: 'HUMAN', icon: HumanIcon },
      { id: 'contatti', label: 'CONTATTI', icon: Mail },
    ];

    // Total Shuffle!
    const shuffled = [...allSections].sort(() => Math.random() - 0.5);
    
    // Dynamic Scaling Factors
    const coordsScale = isMobile ? 0.52 : 1.0; 
    const blobSizeScale = isMobile ? 0.52 : 1.0; 

    // Fixed radial coordinates (0 is center, 1-6 are peripheral)
    const coords = [
      { x: 0, y: 0, size: 230, isCenter: true },      // Center Hub
      { x: 0, y: -260, size: 190 },                  // Top
      { x: 230, y: -130, size: 180 },                // Top Right
      { x: 230, y: 130, size: 180 },                 // Bottom Right
      { x: 0, y: 260, size: 200 },                   // Bottom
      { x: -230, y: 130, size: 200 },                // Bottom Left
      { x: -230, y: -130, size: 180 },               // Top Left
    ];

    // Build the final sections array
    const finalSections = shuffled.map((p, i) => ({
      ...p,
      x: coords[i].x * coordsScale,
      y: coords[i].y * coordsScale,
      size: coords[i].size * blobSizeScale,
      isCenter: coords[i].isCenter || false,
      color: palette[i],
    }));

    setShuffledSections(finalSections);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  /* 
    PREVIOUS PALETTE (Cyberpunk / Deep Tones):
    const palette = [
      '#009FB7', // Teal
      '#7209B7', // Amethyst (Premium Violet)
      '#3A0CA3', // Deep Indigo
      '#06D6A0', // Emerald Green
      '#F72585', // Electric Rose
      '#4CC9F0', // Vivid Azure
      '#03045E', // Midnight Blue
    ];
  */

  const palette = [
    '#FF0055', // Electric Rose (Neon Red-ish)
    '#FF5E00', // Neon Orange
    '#FFCC00', // Cyber Yellow
    '#00FF88', // Spring Green (Neon Mint)
    '#009FB7', // Spin Cyan (Teal)
    '#4361EE', // Electric Blue (Deeper contrast)
    '#7209B7', // Amethyst (Premium Violet)
  ];

  if (shuffledSections.length === 0) return null;

  return (
    <div className="hero-page">
      <div className="hero-aura"></div>
      <div className="hero-container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hero-header"
        >
          <p className="hero-tagline">l’algoritmo del consenso</p>
        </motion.div>

        <div className="radial-nav-container">
          {shuffledSections.map((section, index) => (
            <BlobButton 
              key={section.id}
              label={section.label}
              onClick={() => {
                if (section.id === 'human-data') {
                  onNavigate('human');
                } else if (section.id === 'chi-siamo') {
                  onNavigate('chi-siamo');
                } else {
                  onNavigate(section.id);
                }
              }}
              Icon={section.icon}
              color={section.color}
              delay={0.1 * index}
              size={section.size}
              x={section.x}
              y={section.y}
              isMobile={isMobile}
              className={section.isCenter ? 'hub' : ''}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlobHero;
