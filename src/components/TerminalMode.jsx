import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Minimize2, Maximize2 } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const TerminalMode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Antigravity OS v1.0.0' },
    { type: 'system', text: `Type 'help' to see available commands.` },
  ]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            // Give it a tiny delay to focus input after opening
            setTimeout(() => inputRef.current?.focus(), 100);
          }
          return !prev;
        });
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    }
  }, [history, isOpen]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'user', text: `guest@kailash:~$ ${cmd}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available commands:
  whoami   - Display current user info
  ls       - List directory contents
  cat      - Read a file (usage: cat <filename>)
  clear    - Clear the terminal screen
  exit     - Close the terminal`
        });
        break;
      case 'whoami':
        newHistory.push({ type: 'output', text: `${portfolioData.name} - ${portfolioData.role}` });
        break;
      case 'ls':
        newHistory.push({ type: 'output', text: `projects/  skills/  resume.pdf  about.txt  contact.sh` });
        break;
      case 'cat about.txt':
        newHistory.push({ type: 'output', text: portfolioData.summary });
        break;
      case 'cat':
        newHistory.push({ type: 'error', text: `cat: missing operand. Try 'cat about.txt'` });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        setIsOpen(false);
        setInput('');
        return;
      case 'sudo':
        newHistory.push({ type: 'error', text: `Nice try! This incident will be reported.` });
        break;
      default:
        if (cmd.startsWith('cat ')) {
           newHistory.push({ type: 'error', text: `cat: ${cmd.split(' ')[1]}: Permission denied or file not found` });
        } else {
           newHistory.push({ type: 'error', text: `bash: ${cmd}: command not found` });
        }
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed z-[100] ${
              isFullScreen 
                ? 'inset-0 m-0 rounded-none' 
                : 'bottom-4 left-1/2 -translate-x-1/2 w-[90vw] md:w-[700px] h-[500px] rounded-xl'
            } bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-primary/20 flex flex-col font-mono text-sm overflow-hidden`}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Terminal Header */}
            <div className="bg-[#1a1a1a] px-4 py-2 border-b border-white/10 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-primary" />
                <span className="text-white/60 text-xs tracking-wider">guest@kailash: ~</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); setIsFullScreen(!isFullScreen); }} className="p-1 hover:bg-white/10 rounded text-white/40 hover:text-white transition-colors">
                  {isFullScreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="p-1 hover:bg-red-500/20 rounded text-white/40 hover:text-red-400 transition-colors">
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Terminal Output */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar text-green-400">
              {history.map((line, i) => (
                <div key={i} className={`mb-1 whitespace-pre-wrap ${
                  line.type === 'system' ? 'text-primary opacity-80' : 
                  line.type === 'user' ? 'text-white font-bold' : 
                  line.type === 'error' ? 'text-red-400' : 'text-green-400'
                }`}>
                  {line.text}
                </div>
              ))}
              
              {/* Input Line */}
              <form onSubmit={handleCommand} className="flex items-center mt-2">
                <span className="text-primary font-bold mr-2">guest@kailash:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none border-none text-white caret-primary"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Keyboard Shortcut Hint (Hidden, just for SEO/accessibility conceptually) */}
      <div className="hidden" aria-hidden="true">
        Press Ctrl+K to open the terminal.
      </div>
    </>
  );
};

export default TerminalMode;
