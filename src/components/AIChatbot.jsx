import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';
import './AIChatbot.css';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your virtual cardiologist assistant. How can I help you understand your heart health today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateMockResponse = (input) => {
    const normalize = input.toLowerCase();
    if (normalize.includes('diet') || normalize.includes('eat') || normalize.includes('food')) {
      return "For a heart-healthy diet, I recommend the DASH diet. Focus on vegetables, fruits, whole grains, and lean proteins while reducing sodium, saturated fats, and added sugars.";
    }
    if (normalize.includes('exercise') || normalize.includes('workout')) {
      return "The American Heart Association recommends at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous aerobic activity per week. Even brisk walking helps immensely!";
    }
    if (normalize.includes('pressure')) {
      return "High blood pressure puts extra strain on your heart. You can manage it by reducing sodium intake, managing stress, staying active, and avoiding tobacco.";
    }
    if (normalize.includes('cholesterol')) {
      return "To improve your cholesterol, reduce saturated fats (found in red meat and full-fat dairy) and eliminate trans fats. Eating foods rich in omega-3 fatty acids and increasing soluble fiber can help lower your LDL (bad) cholesterol.";
    }
    if (normalize.includes('stress')) {
      return "Chronic stress can increase your risk of heart disease. Try relaxation techniques like deep breathing, meditation, yoga, or spending time in nature.";
    }
    return "That's an interesting question. Maintaining a balanced lifestyle is key. I'm a simple AI assistant right now, so for specific medical advice, please consult your real-world physician!";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { sender: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Mock API processing delay
    setTimeout(() => {
      const responseText = generateMockResponse(userMessage.text);
      setMessages((prev) => [...prev, { sender: 'bot', text: responseText }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <button className="chatbot-toggle shadow-lg" onClick={() => setIsOpen(true)} style={{ display: isOpen ? 'none' : 'flex' }}>
        <MessageSquare size={24} color="white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chatbot-window shadow-xl"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="chatbot-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bot size={20} />
                <h3>Virtual Cardiologist</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="close-btn">
                <X size={20} />
              </button>
            </div>

            <div className="chatbot-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender}`}>
                  {msg.sender === 'bot' && <div className="avatar bot-avatar"><Bot size={14} /></div>}
                  <div className="message-content">
                    {msg.text}
                  </div>
                  {msg.sender === 'user' && <div className="avatar user-avatar"><User size={14} /></div>}
                </div>
              ))}
              {isTyping && (
                <div className="chat-message bot typing-indicator">
                  <div className="avatar bot-avatar"><Bot size={14} /></div>
                  <div className="message-content">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="chatbot-input" onSubmit={handleSend}>
              <input 
                type="text" 
                placeholder="Ask about diet, exercise..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" disabled={!inputValue.trim()}>
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
