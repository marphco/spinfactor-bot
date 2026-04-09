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

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      
      if (data.reply.includes('form ufficiale') || data.reply.includes('contattarci')) {
        setTimeout(() => onNavigate('contatti'), 2000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback local response if backend is down
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Siamo spiacenti, il sistema AI è temporaneamente offline. Ti preghiamo di riprovare più tardi o di contattarci direttamente.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, sendMessage, isTyping };
};
