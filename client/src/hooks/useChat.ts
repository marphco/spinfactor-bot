import { useState } from 'react';

export interface ChatAction {
  label: string;
  view: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  actions?: ChatAction[];
}

export const useChat = (_onNavigate: (view: string) => void) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      text: 'Benvenuti in Spin Factor. Sono il vostro Spin Assistant. In che modo posso guidarvi attraverso la nostra visione strategica?', 
      sender: 'bot', 
      timestamp: new Date() 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Helper to detect navigation suggestions in AI text
  const parseActions = (text: string): ChatAction[] => {
    const t = text.toLowerCase();
    const matches: { label: string; view: string; index: number }[] = [];
    
    const check = (keywords: string[], label: string, view: string) => {
      let firstIndex = -1;
      for (const kw of keywords) {
        const idx = t.indexOf(kw);
        if (idx !== -1 && (firstIndex === -1 || idx < firstIndex)) {
          firstIndex = idx;
        }
      }
      if (firstIndex !== -1) {
        matches.push({ label, view, index: firstIndex });
      }
    };

    check(['chi siamo', 'tiberio brunetti', 'fondatore'], 'Scopri Chi Siamo', 'chi-siamo');
    check(['talks', 'eventi', 'capri'], 'Esplora i Talk', 'spin-talks');
    check(['podcast', 'ascolta'], 'Vai ai Podcast', 'podcast');
    check(['aree di intervento', 'servizi', 'cosa facciamo'], 'Aree di Intervento', 'facciamo');
    check(['contattaci', 'scrivici', 'form', 'email', 'parliamo'], 'Vai ai Contatti', 'contatti');
    
    // Sort by appearance in text
    return matches
      .sort((a, b) => a.index - b.index)
      .map(({ label, view }) => ({ label, view }));
  };

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
      
      // Initialize bot message
      const botMsgId = (Date.now() + 1).toString();
      const initialBotMsg: Message = {
        id: botMsgId,
        text: '',
        sender: 'bot',
        timestamp: new Date(),
        actions: []
      };
      
      setMessages(prev => [...prev, initialBotMsg]);
      setIsTyping(false); // Stop typing indicator once stream starts

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (reader) {
        let fullText = '';
        let displayedText = '';
        let isStreaming = true;

        // Typewriter effect loop (Accelerated)
        const interval = setInterval(() => {
          if (displayedText.length < fullText.length) {
            // Dynamic catch-up: if buffer is large, move faster
            const diff = fullText.length - displayedText.length;
            const jump = diff > 30 ? 3 : 1; 
            
            displayedText += fullText.slice(displayedText.length, displayedText.length + jump);
            setMessages(prev => prev.map(m => 
              m.id === botMsgId ? { ...m, text: displayedText } : m
            ));
          } else if (!isStreaming) {
            clearInterval(interval);
            
            // Final pass for actions
            const finalActions = parseActions(fullText);
            setMessages(prev => prev.map(m => 
              m.id === botMsgId ? { ...m, actions: finalActions } : m
            ));
          }
        }, 12); // Faster pulse (approx 80fps)

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');
            
            for (const line of lines) {
              let content = line.trim();
              if (content.startsWith('data: ')) content = content.replace('data: ', '');
              if (content === '[DONE]') continue;

              // Parse JSON or extract via regex
              if (content.startsWith('{') && content.endsWith('}')) {
                try {
                  const parsed = JSON.parse(content);
                  fullText += parsed.text || parsed.answer || parsed.token || '';
                } catch (e) {
                  fullText += content;
                }
              } else if (content) {
                const match = content.match(/"text":"(.*?)"/);
                if (match) {
                  fullText += match[1].replace(/\\n/g, '\n').replace(/\\u[\dA-F]{4}/gi, (m) => 
                    String.fromCharCode(parseInt(m.replace(/\\u/g, ''), 16))
                  );
                } else {
                  fullText += content;
                }
              }
            }
          }
        } finally {
          isStreaming = false;
        }
      }

    } catch (error) {
      console.error('Error sending message:', error);
      
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Siamo spiacenti, il sistema AI è temporaneamente offline. Ti preghiamo di riprovare più tardi.",
        sender: 'bot',
        timestamp: new Date(),
        actions: [{ label: 'Vai ai Contatti', view: 'contatti' }]
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, sendMessage, isTyping };
};
