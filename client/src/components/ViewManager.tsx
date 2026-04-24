import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import BlobHero from './BlobHero';
import ChiSiamo from './content/ChiSiamo';
import { Societa } from './content/SocietaMetodo';
import Stampa from './content/Stampa';
import AreeIntervento from './content/AreeIntervento';
import SpinTalks from './content/SpinTalks';
import CapriTalks from './content/CapriTalks';
import Podcast from './content/Podcast';
import LegalView from './content/LegalView';
import ContactForm from './ContactForm';
import Human from './content/Human';
import Ricerche from './content/Ricerche';
import { useView } from '../context/ViewContext';

const ViewManager: React.FC = () => {
  const { setActiveView } = useView();
  const location = useLocation();

  return (
    <div className="view-manager">
      <AnimatePresence mode="wait">
        <motion.div 
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>
            <Route path="/" element={<BlobHero key="home" onNavigate={setActiveView} />} />
            <Route path="/siamo" element={<ChiSiamo key="chi-siamo" />} />
            <Route path="/societa" element={<Societa key="societa" />} />
            <Route path="/stampa" element={<Stampa key="stampa" />} />
            <Route path="/ricerche" element={<Ricerche key="ricerche" />} />
            <Route path="/facciamo" element={<AreeIntervento key="facciamo" />} />
            <Route path="/spin-talks" element={<SpinTalks key="spin-talks" />} />
            <Route path="/capri-talks" element={<CapriTalks key="capri-talks" />} />
            <Route path="/human" element={<Human key="human" />} />
            <Route path="/podcast" element={<Podcast key="podcast" />} />
            <Route path="/privacy-policy" element={<LegalView type="privacy-policy" />} />
            <Route path="/cookie-policy" element={<LegalView type="cookie-policy" />} />
            <Route path="/contatti" element={<ContactForm key="contatti" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ViewManager;
