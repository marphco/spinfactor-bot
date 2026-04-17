import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ViewContextType {
  activeView: string;
  setActiveView: (view: string) => void;
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

const VIEW_TO_PATH: Record<string, string> = {
  'home': '/',
  'chi-siamo': '/siamo',
  'societa': '/societa',
  'diciamo': '/diciamo',
  'facciamo': '/facciamo',
  'spin-talks': '/spin-talks',
  'capri-talks': '/capri-talks',
  'human': '/human',
  'podcast': '/podcast',
  'contatti': '/contatti',
  'press': '/press',
  'privacy-policy': '/privacy-policy',
  'cookie-policy': '/cookie-policy'
};

const PATH_TO_VIEW: Record<string, string> = Object.entries(VIEW_TO_PATH).reduce(
  (acc, [view, path]) => ({ ...acc, [path]: view }), {}
);

export const ViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeView, setActiveViewState] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Sync state with URL on mount and location change
  useEffect(() => {
    const view = PATH_TO_VIEW[location.pathname] || 'home';
    setActiveViewState(view);
  }, [location.pathname]);

  const setActiveView = (view: string) => {
    const path = VIEW_TO_PATH[view] || '/';
    navigate(path);
  };

  return (
    <ViewContext.Provider value={{ activeView, setActiveView, isChatOpen, setIsChatOpen }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) throw new Error('useView must be used within a ViewProvider');
  return context;
};
