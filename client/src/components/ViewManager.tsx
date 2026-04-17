import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import BlobHero from './BlobHero';
import ChiSiamo from './content/ChiSiamo';
import { Societa } from './content/SocietaMetodo';
import Diciamo from './content/Diciamo';
import AreeIntervento from './content/AreeIntervento';
import SpinTalks from './content/SpinTalks';
import Podcast from './content/Podcast';
import ContactForm from './ContactForm';
import Human from './content/Human';
import LegalView from './content/LegalView';
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
            <Route path="/diciamo" element={<Diciamo key="diciamo" />} />
            <Route path="/facciamo" element={<AreeIntervento key="facciamo" />} />
            <Route path="/spin-talks" element={<SpinTalks key="spin-talks" />} />
            <Route path="/capri-talks" element={<SpinTalks key="capri-talks" />} />
            <Route path="/human" element={<Human key="human" />} />
            <Route path="/podcast" element={<Podcast key="podcast" />} />
            <Route path="/contatti" element={<ContactForm key="contatti" />} />
            <Route path="/privacy-policy" element={<LegalView key="privacy" type="privacy" />} />
            <Route path="/cookie-policy" element={<LegalView key="cookie" type="cookie" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ViewManager;
