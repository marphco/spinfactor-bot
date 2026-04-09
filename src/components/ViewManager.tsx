import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useView } from '../context/ViewContext';
import BlobHero from './BlobHero';
import ChiSiamo from './content/ChiSiamo';
import { Societa, Metodo } from './content/SocietaMetodo';
import AreeIntervento from './content/AreeIntervento';
import SpinTalks from './content/SpinTalks';
import Podcast from './content/Podcast';
import ContactForm from './ContactForm';

const ViewManager: React.FC = () => {
  const { activeView, setActiveView } = useView();

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <BlobHero key="home" onNavigate={setActiveView} />;
      case 'chi-siamo':
        return <ChiSiamo key="chi-siamo" />;
      case 'societa':
        return <Societa key="societa" />;
      case 'metodo':
        return <Metodo key="metodo" />;
      case 'aree':
        return <AreeIntervento key="aree" />;
      case 'spin-talks':
        return <SpinTalks key="spin-talks" />;
      case 'capri-talks':
        return <SpinTalks key="capri-talks" showCapriInitially />;
      case 'podcast':
        return <Podcast key="podcast" />;
      case 'contatti':
        return <ContactForm key="contatti" />;
      default:
        return <BlobHero key="home" onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="view-manager">
      <AnimatePresence mode="wait">
        {renderView()}
      </AnimatePresence>
    </div>
  );
};

export default ViewManager;
