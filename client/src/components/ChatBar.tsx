import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, X } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { useView } from '../context/ViewContext';
import { FormattedText } from './FormattedText';
import brandIcon from '../assets/icona.svg';

const ChatBar: React.FC = () => {
  const { setActiveView, isChatOpen: showHistory, setIsChatOpen: setShowHistory } = useView();
  const { messages, sendMessage, isTyping } = useChat(setActiveView);
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Close chat on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (windowRef.current && !windowRef.current.contains(event.target as Node)) {
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
    <div className={`chat-wrapper ${showHistory ? 'is-expanded' : ''}`}>
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="chat-backdrop"
            onClick={() => setShowHistory(false)}
          />
        )}
      </AnimatePresence>

      <motion.div 
        ref={windowRef}
        layout
        initial={false}
        animate={{ 
          height: showHistory ? 'min(640px, 80vh)' : '52px',
          width: showHistory ? 'min(860px, calc(100vw - 40px))' : 'min(860px, calc(100vw - 40px))'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`chat-window ${isFocused ? 'focused' : ''} ${showHistory ? 'open' : 'closed'}`}
        onClick={() => !showHistory && setShowHistory(true)}
      >
        <AnimatePresence mode="wait">
          {showHistory ? (
            <motion.div 
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="chat-full-content"
            >
              <div className="chat-window-header">
                <div className="bot-info-minimal">
                  <img src={brandIcon} alt="Spin Factor" />
                  <span>Spin Assistant</span>
                </div>
                <button onClick={() => setShowHistory(false)} className="close-window-btn">
                  <X size={18} />
                </button>
              </div>

              <div className="chat-messages-scroll" ref={scrollRef}>
                {messages.map((msg, idx) => (
                  <div key={msg.id} className={`message-item ${msg.sender}`}>
                    <div className="message-wrapper">
                      <div className="message-bubble-premium">
                        <FormattedText text={msg.text} />
                      </div>
                      
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="message-actions-premium">
                          {msg.actions.map((action, i) => (
                            <button 
                              key={i} 
                              onClick={() => {
                                setActiveView(action.view);
                                setShowHistory(false);
                              }}
                              className="action-chip-premium"
                            >
                              <span className="dot" />
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {idx === 0 && messages.length === 1 && !isTyping && (
                        <div className="suggestions-grid-premium">
                          {suggestions.map((s, i) => (
                            <button key={i} onClick={() => handleSuggestion(s)} className="suggestion-item-premium">
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="message-item bot">
                    <div className="message-bubble-premium typing-premium">
                      <span>.</span><span>.</span><span>.</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="chat-input-area">
          <form onSubmit={handleSubmit} className="chat-input-row">
            <div className="input-icon-wrapper">
              <MessageSquare size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Chiedi a Spin Assistant..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <button type="submit" className="send-btn-premium" disabled={!input.trim()}>
              <Send size={18} />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatBar;
