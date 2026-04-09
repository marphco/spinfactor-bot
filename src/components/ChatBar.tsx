import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, MessageSquare, X } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { useView } from '../context/ViewContext';

const ChatBar: React.FC = () => {
  const { setActiveView } = useView();
  const { messages, sendMessage, isTyping } = useChat(setActiveView);
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
    setShowHistory(true);
  };

  return (
    <div className="chat-wrapper">
      <AnimatePresence>
        {showHistory && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="chat-history glass"
          >
            <div className="history-header">
              <div className="bot-info">
                <Sparkles size={16} className="text-primary" />
                <span>Spin Factor AI</span>
              </div>
              <button onClick={() => setShowHistory(false)}>
                <X size={16} />
              </button>
            </div>
            
            <div className="messages-list" ref={scrollRef}>
              {messages.map((msg) => (
                <div key={msg.id} className={`message-item ${msg.sender}`}>
                  <div className="message-bubble">
                    {msg.text}
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

      <motion.div 
        className={`chat-container glass ${isFocused || showHistory ? 'focused' : ''}`}
        onClick={() => !showHistory && messages.length > 0 && setShowHistory(true)}
      >
        <form onSubmit={handleSubmit} className="chat-content">
          <div className="chat-icon">
            <MessageSquare size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Chiedimi della crescita di Spin Factor..."
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
  );
};

export default ChatBar;
