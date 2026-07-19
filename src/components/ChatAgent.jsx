import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Minimize2, Maximize2, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const initialMessages = [
  {
    id: 1,
    sender: 'bot',
    text: `Hi! I'm ${portfolioData.name}'s AI Agent. I can tell you about his projects, skills, or experience. What would you like to know?`,
  }
];

const predefinedResponses = [
  {
    keywords: ['hi', 'hello', 'hey'],
    response: `Hello there! I'm an AI assistant built by ${portfolioData.name}. How can I help you explore his portfolio today?`
  },
  {
    keywords: ['experience', 'work', 'job', 'internship', 'virtusa'],
    response: `Scrolling to Resume... ${portfolioData.name} worked as a GenAI Developer Intern at Virtusa, developing a GenAI-powered chat application.`,
    action: 'resume'
  },
  {
    keywords: ['education', 'college', 'university', 'degree'],
    response: `Scrolling to Resume... He is currently pursuing his M.Tech in AI & ML at VIT Chennai.`,
    action: 'resume'
  },
  {
    keywords: ['skill', 'tech', 'stack', 'languages', 'tools'],
    response: `Navigating to Skills... His tech stack is highly specialized in Agentic AI and Automation.`,
    action: 'skills'
  },
  {
    keywords: ['project', 'portfolio', 'build'],
    response: `Taking you to Projects... He has built incredible Agentic AI projects and automation systems!`,
    action: 'projects'
  },
  {
    keywords: ['blog', 'article', 'post', 'writing'],
    response: `Scrolling to Blog... Check out his latest articles and thoughts here.`,
    action: 'blog'
  },
  {
    keywords: ['contact', 'hire', 'email', 'phone', 'reach'],
    response: `Scrolling to Contact... You can reach him at ${portfolioData.email} or use the form below!`,
    action: 'contact'
  },
  {
    keywords: ['resume', 'cv'],
    response: `You can view or download his full professional resume from the Resume section in the navigation bar. Navigating to Resume...`,
    action: 'resume'
  },
  {
    keywords: ['about', 'who'],
    response: `Scrolling to About... Learn more about ${portfolioData.name}'s journey!`,
    action: 'about'
  }
];

const sectionPlaceholders = {
  home: "Ask me anything...",
  about: "Ask about his background...",
  projects: "Ask how he built these...",
  skills: "Ask about his tech stack...",
  resume: "Ask about his qualifications...",
  blog: "Ask about his writing...",
  contact: "Ask for his contact info..."
};

const ChatAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'skills', 'resume', 'blog', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking and responding
    setTimeout(() => {
      let aiResponse = `I'm just a simple demo agent! I don't know the answer to that, but you can always reach out to ${portfolioData.name} directly via the Contact page.`;
      let actionToTake = null;
      
      const lowerInput = userMessage.text.toLowerCase();
      
      for (const item of predefinedResponses) {
        if (item.keywords.some(kw => lowerInput.includes(kw))) {
          aiResponse = item.response;
          if (item.action) actionToTake = item.action;
          break;
        }
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: aiResponse
      }]);
      setIsTyping(false);

      if (actionToTake) {
        setTimeout(() => {
          document.getElementById(actionToTake)?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }, 1200);
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 p-4 bg-primary text-white rounded-full shadow-orange hover:scale-110 active:scale-95 transition-all z-50 flex items-center justify-center group"
          >
            <Bot size={28} />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 border-2 border-dark rounded-full animate-pulse"></span>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-4 bg-dark-surface border border-white/10 px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap flex items-center gap-2 shadow-xl pointer-events-none">
              <Sparkles size={16} className="text-primary" /> Ask my AI Agent!
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed right-4 md:right-6 bottom-6 w-[calc(100vw-2rem)] md:w-[400px] bg-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden ${isMinimized ? 'h-[60px]' : 'h-[500px] max-h-[80vh]'}`}
          >
            {/* Header */}
            <div className="p-4 bg-dark-surface border-b border-white/5 flex items-center justify-between cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center relative">
                  <Bot size={18} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-dark-surface rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-sm flex items-center gap-2">Kailash's Agent <Sparkles size={12} className="text-primary" /></h3>
                  <p className="text-xs text-text-secondary">Online and ready to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="p-1.5 text-text-secondary hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); setIsMinimized(false); }} className="p-1.5 text-text-secondary hover:text-white hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            {!isMinimized && (
              <>
                <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-4 bg-gradient-to-b from-dark-surface/50 to-dark relative">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-primary text-white rounded-tr-sm' 
                          : 'bg-white/5 border border-white/5 text-text-primary rounded-tl-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-dark-surface border-t border-white/5">
                  <form onSubmit={handleSend} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={sectionPlaceholders[activeSection] || "Ask me anything..."}
                      className="flex-1 bg-dark px-4 py-2.5 rounded-xl border border-white/10 focus:border-primary outline-none transition-all text-sm text-white"
                    />
                    <button 
                      type="submit"
                      disabled={!inputValue.trim() || isTyping}
                      className="p-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary transition-colors flex items-center justify-center"
                    >
                      <Send size={18} />
                    </button>
                  </form>
                  <p className="text-[10px] text-center text-text-secondary mt-2 opacity-60">
                    AI responses may be mocked for this demo.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAgent;
