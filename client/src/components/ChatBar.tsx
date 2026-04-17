import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, X } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { useView } from '../context/ViewContext';
import { FormattedText } from './FormattedText';
import brandIcon from '../assets/icona.svg';

const ChatBar: React.FC = () => {
  const { setActiveView } = useView();
  const { messages, sendMessage, isTyping } = useChat(setActiveView);
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Close chat on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (historyRef.current && !historyRef.current.contains(event.target as Node)) {
        setShowHistory(false);
      }
    };

    if (showHistory) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
    setShowHistory(true);
  };

  const suggestions = [
    "Cos'è Spin Factor?",
    "Il Metodo Human®",
    "Spin Talks",
    "Come contattarvi?"
  ];

  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
    setShowHistory(true);
  };

  return (
    <div className="chat-wrapper">
      <AnimatePresence>
        {showHistory && (
          <motion.div 
            ref={historyRef}
            layout // Enable magic layout transitions
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="chat-history shadow-premium"
          >
            <div className="history-header">
              <div className="bot-info">
                <img src={brandIcon} alt="Spin Factor" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                <span style={{ letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '11px', fontWeight: 700, opacity: 0.8 }}>
                  Spin Assistant
                </span>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHistory(false);
                }}
                className="close-chat-btn"
                style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  padding: '8px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white'
                }}
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="messages-list" ref={scrollRef}>
              {messages.map((msg, idx) => (
                <div key={msg.id} className={`message-item ${msg.sender}`}>
                  <div className="message-wrapper" style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}>
                    <div className="message-bubble shadow-premium" style={{ width: 'fit-content', maxWidth: '100%' }}>
                      <FormattedText text={msg.text} />
                    </div>
                    
                    {msg.actions && msg.actions.length > 0 && (
                      <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                        }}
                        className="message-actions" 
                        style={{ 
                          display: 'flex', 
                          gap: '10px', 
                          marginTop: '10px', 
                          flexWrap: 'wrap',
                          justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                        }}
                      >
                        {msg.actions.map((action, i) => (
                          <motion.button 
                            key={i} 
                            variants={{
                              hidden: { opacity: 0, y: 10, scale: 0.9 },
                              visible: { opacity: 1, y: 0, scale: 1 }
                            }}
                            whileHover={{ 
                              scale: 1.05, 
                              backgroundColor: 'rgba(0, 159, 183, 0.15)',
                              borderColor: 'rgba(0, 159, 183, 0.5)',
                              boxShadow: '0 0 15px rgba(0, 159, 183, 0.25)' 
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setActiveView(action.view);
                              setShowHistory(false);
                            }}
                            className="action-chip glass"
                            style={{ 
                              padding: '8px 18px', 
                              borderRadius: '24px', 
                              fontSize: '0.8rem', 
                              fontWeight: 600,
                              background: 'rgba(10, 25, 30, 0.4)',
                              border: '1px solid rgba(0, 159, 183, 0.3)',
                              color: 'var(--text)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              letterSpacing: '0.01em',
                              transition: 'border-color 0.3s ease, background-color 0.3s ease'
                            }}
                          >
                            <span style={{ 
                              width: '6px', 
                              height: '6px', 
                              borderRadius: '50%', 
                              background: 'var(--primary)', 
                              boxShadow: '0 0 8px var(--primary)' 
                            }}></span>
                            {action.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}

                    {/* Show suggestions after the first message (welcome) if no other messages exist */}
                    {idx === 0 && messages.length === 1 && !isTyping && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="chat-suggestions-internal"
                        style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}
                      >
                        {suggestions.map((s, i) => (
                          <button 
                            key={i} 
                            onClick={() => handleSuggestion(s)}
                            className="suggestion-chip glass"
                            style={{ 
                              padding: '8px 16px', 
                              borderRadius: '20px', 
                              fontSize: '0.8rem', 
                              color: 'var(--text-dim)',
                              background: 'rgba(255,255,255,0.03)',
                              transition: 'all 0.3s ease',
                              border: '1px solid rgba(0, 159, 183, 0.15)',
                              cursor: 'pointer'
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message-item bot">
                  <div className="message-bubble typing">
                    <span>.</span><span>.</span><span>.</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="chat-interface-container">

        <motion.div 
          layout
          className={`chat-container glass ${(isFocused || showHistory) ? 'focused' : ''}`}
          style={{
            transform: (isFocused && !showHistory) ? 'translateY(-2px)' : 'none'
          }}
          onClick={() => !showHistory && messages.length > 0 && setShowHistory(true)}
        >
          <form onSubmit={handleSubmit} className="chat-content">
            <div className="chat-icon">
              <MessageSquare size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Chiedi a Spin Assistant..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <button type="submit" className="send-btn">
              <Send size={20} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatBar;
