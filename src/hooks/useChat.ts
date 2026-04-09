import { useState } from 'react';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const useChat = (onNavigate: (view: string) => void) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      text: 'Benvenuti in Spin Factor. Sono la vostra IA di supporto. Come posso aiutarvi a navigare la nostra intelligence strategica?', 
      sender: 'bot', 
      timestamp: new Date() 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "";
      const lowerText = text.toLowerCase();

      if (lowerText.includes('fondatore') || lowerText.includes('tiberio brunetti')) {
        botResponse = "Tiberio Brunetti ha fondato Spin Factor nel 2018. Nel 2019, con un team qualificato di sviluppatori italiani, ha progettato Human, la nostra piattaforma di web e social listening basata su un algoritmo semantico in lingua italiana. Desiderate approfondire?";
      } else if (lowerText.includes('human') || lowerText.includes('ascolto') || lowerText.includes('web listening')) {
        botResponse = "Human è la nostra piattaforma di web e social listening, successivamente integrata con un sistema proprietario di intelligenza artificiale. Ad oggi rappresenta un unicum sul mercato. Posso portarvi alla sezione dedicata?";
      } else if (lowerText.includes('talks') || lowerText.includes('capri')) {
        botResponse = "I Capri Talks sono un'estensione annuale a Capri degli Spin Talks. L'edizione 2026, intitolata '(Dis)Uniti', si terrà il 15 e 16 maggio. Volete vedere il programma?";
      } else if (lowerText.includes('sede') || lowerText.includes('roma') || lowerText.includes('napoli')) {
        botResponse = "Sede Principale a ROMA in via della Scrofa, 117. Sede Legale e Amministrativa a NAPOLI in via Vittoria Colonna, 14. Posso fornirvi i recapiti per un contatto diretto?";
      } else if (lowerText.includes('preventivo') || lowerText.includes('costo') || lowerText.includes('prezzi')) {
        botResponse = "Ci hai provato! La nostra consulenza strategica è altamente personalizzata. Per definire un percorso su misura, vi invito a contattarci tramite il nostro form ufficiale. Procediamo?";
      } else {
        botResponse = "Spin Factor si distingue per un approccio innovativo e integrato, combinando dati, relazioni e comunicazione. Quale area della nostra società vi interessa approfondire?";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);

      if (botResponse.includes('form ufficiale') || botResponse.includes('contattarci')) {
        setTimeout(() => onNavigate('contatti'), 2000);
      }
    }, 1000);
  };

  return { messages, sendMessage, isTyping };
};
