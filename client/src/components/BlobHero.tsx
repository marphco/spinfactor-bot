import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Mic, 
  Mail,
  Headphones,
  Newspaper
} from 'lucide-react';
import HumanIcon from '../assets/human2.svg';
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
  stretchX?: number;
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
  stretchX = 1,
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
          whileHover={{ 
            scaleX: stretchX * 1.04, 
            scaleY: 1.04 
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className={`blob-button ${['#FFFFFF', '#E8EDDF', '#F5CB5C'].includes(color) ? 'is-white-blob' : ''}`}
          style={{ 
            '--blob-color': color,
            '--size': `${size}px`,
            scaleX: stretchX
          } as React.CSSProperties}
        >
          <div className="blob-bg"></div>
          <div 
            className="blob-content"
            style={{ transform: `scaleX(${1 / stretchX})` }}
          >
            {Icon && (
              typeof Icon === 'string' ? (
                <img 
                  src={Icon} 
                  className={`blob-icon custom-svg-icon ${['#FFFFFF', '#fdfdf5', '#f5cb5c', '#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF'].includes(color) ? 'white-blob-icon' : ''}`} 
                  style={{ 
                    width: (label === 'SIAMO' ? size * 0.14 : label === 'HUMAN' ? size * 0.32 : size * 0.18), 
                    height: 'auto' 
                  }} 
                  alt="" 
                />
              ) : (
                <Icon className={`blob-icon ${['#FFFFFF', '#fdfdf5', '#f5cb5c', '#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF'].includes(color) ? 'white-blob-icon' : ''}`} size={size * 0.18} />
              )
            )}
            <span className={`blob-label ${['#FFFFFF', '#fdfdf5', '#f5cb5c', '#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF'].includes(color) ? 'white-blob-text' : ''}`}>{label}</span>
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
  const [isLaptop, setIsLaptop] = useState(false);
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
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsLaptop(window.innerHeight < 940 && window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Dynamic Scaling Factors
    const coordsScale = isMobile ? 0.52 : 1.0; 
    const blobSizeScale = isMobile ? 0.52 : (isLaptop ? 0.82 : 1.0); 

    // Elliptical Logic for Laptop - Refined for more air
    const ySquash = isLaptop ? 0.75 : 1.0;
    const xScale = isLaptop ? 1.45 : 1.0;
    const stretchX = isLaptop ? 1.35 : 1.0;
    
    const finalCoordsScale = coordsScale;
    const finalBlobSizeScale = blobSizeScale;

    // All available sections
    const allSections = [
      { id: 'spin-talks', label: 'TALKS', icon: Mic },
      { id: 'chi-siamo', label: 'SIAMO', icon: SiamoIcon },
      { id: 'facciamo', label: 'FACCIAMO', icon: Zap },
      { id: 'stampa', label: 'STAMPA', icon: Newspaper },
      { id: 'podcast', label: 'PODCAST', icon: Headphones },
      { id: 'human-data', label: 'HUMAN', icon: HumanIcon },
      { id: 'contatti', label: 'CONTATTI', icon: Mail },
    ];

    const blobColors = [
      '#CAFFBF', // Pastel Green (Center)
      '#FFADAD', // Pastel Red
      '#FFD6A5', // Pastel Orange
      '#FDFFB6', // Pastel Yellow
      '#9BF6FF', // Pastel Cyan
      '#A0C4FF', // Pastel Blue
      '#BDB2FF', // Pastel Violet
    ];

    // Total Shuffle!
    const shuffled = [...allSections].sort(() => Math.random() - 0.5);
    
    // Fixed radial coordinates (0 is center, 1-6 are peripheral)
    const coords = [
      { x: 0, y: 0, size: 230, isCenter: true },      // Center Hub
      { x: 0, y: -260 * ySquash, size: 190 },         // Top
      { x: 230 * xScale, y: -130 * ySquash, size: 180 },       // Top Right
      { x: 230 * xScale, y: 130 * ySquash, size: 180 },        // Bottom Right
      { x: 0, y: 260 * ySquash, size: 200 },          // Bottom
      { x: -230 * xScale, y: 130 * ySquash, size: 200 },       // Bottom Left
      { x: -230 * xScale, y: -130 * ySquash, size: 180 },      // Top Left
    ];

    // Build the final sections array with explicit color mapping
    const finalSections = shuffled.map((p, i) => ({
      ...p,
      x: coords[i].x * finalCoordsScale,
      y: coords[i].y * finalCoordsScale,
      size: coords[i].size * finalBlobSizeScale,
      isCenter: coords[i].isCenter || false,
      color: blobColors[i] || '#009ABA',
      stretchX: stretchX,
    }));

    setShuffledSections(finalSections);
  }, [isMobile, isLaptop]);

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

    <div className="radial-nav-container" style={isMobile ? { height: '400px' } : {}}>
          {shuffledSections.map((section, index) => (
            <BlobButton 
              key={section.id}
              label={section.label}
              color={section.color}
              onClick={() => {
                if (section.id === 'human-data') {
                  onNavigate('human');
                } else if (section.id === 'chi-siamo') {
                  onNavigate('chi-siamo');
                } else if (section.id === 'stampa') {
                  onNavigate('stampa');
                } else {
                  onNavigate(section.id);
                }
              }}
              Icon={section.icon}
              continuousFloat={!section.isCenter}
              stretchX={section.stretchX}
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
