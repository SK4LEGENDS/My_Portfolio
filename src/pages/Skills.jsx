import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Box, Code2, Database, FileCode2, Flame, Hexagon, Link, MessageSquare, RefreshCw, Server, TerminalSquare, Wind, Workflow, Frame,
  Layout, Smile, Network, Cpu, FileText, Terminal, Code, Send, BarChart
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

// Tech stack items (Languages, Frontend, Backend, Databases)
const techStack = [
  { name: 'Python', icon: FileCode2, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { name: 'TypeScript', icon: FileCode2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'JavaScript', icon: FileCode2, color: 'text-yellow-300', bg: 'bg-yellow-300/10' },
  { name: 'SQL', icon: Database, color: 'text-blue-300', bg: 'bg-blue-300/10' },
  { name: 'React', icon: Code2, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  { name: 'Next.js', icon: Code2, color: 'text-white', bg: 'bg-white/10' },
  { name: 'Tailwind CSS', icon: Wind, color: 'text-teal-400', bg: 'bg-teal-400/10' },
  { name: 'Framer Motion', icon: Frame, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { name: 'ShadCN UI', icon: Layout, color: 'text-gray-300', bg: 'bg-gray-300/10' },
  { name: 'FastAPI', icon: TerminalSquare, color: 'text-teal-500', bg: 'bg-teal-500/10' },
  { name: 'Node.js', icon: Server, color: 'text-green-500', bg: 'bg-green-500/10' },
  { name: 'Express.js', icon: Server, color: 'text-gray-400', bg: 'bg-gray-400/10' },
  { name: 'REST APIs', icon: Link, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { name: 'MongoDB', icon: Database, color: 'text-green-400', bg: 'bg-green-400/10' },
  { name: 'SQLite', icon: Database, color: 'text-blue-300', bg: 'bg-blue-300/10' },
  { name: 'Firebase', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { name: 'C Programming', icon: Terminal, color: 'text-indigo-400', bg: 'bg-indigo-400/10' }
];

// Tools items (AI & ML, Automation, AI Tools, APIs)
const tools = [
  { name: 'Prompt Engineering', icon: MessageSquare, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { name: 'Agentic AI', icon: Bot, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { name: 'RAG Systems', icon: Database, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'LangChain', icon: Link, color: 'text-green-500', bg: 'bg-green-500/10' },
  { name: 'LangGraph', icon: Workflow, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { name: 'Ollama', icon: Box, color: 'text-gray-300', bg: 'bg-gray-300/10' },
  { name: 'Hugging Face', icon: Smile, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { name: 'Vector Databases', icon: Database, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { name: 'Embedding Models', icon: Network, color: 'text-pink-400', bg: 'bg-pink-400/10' },
  { name: 'Local LLM Deployment', icon: Server, color: 'text-green-400', bg: 'bg-green-400/10' },
  { name: 'UiPath', icon: Workflow, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Workflow Automation', icon: RefreshCw, color: 'text-green-400', bg: 'bg-green-400/10' },
  { name: 'Process Automation', icon: Cpu, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { name: 'Intelligent Document Processing', icon: FileText, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { name: 'ChatGPT', icon: Bot, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { name: 'Claude', icon: Bot, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { name: 'Antigravity CLI', icon: Terminal, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { name: 'Antigravity IDE', icon: Code, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { name: 'Cursor', icon: TerminalSquare, color: 'text-white', bg: 'bg-white/10' },
  { name: 'Claude Code', icon: Code, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { name: 'Kimi', icon: Bot, color: 'text-red-400', bg: 'bg-red-400/10' },
  { name: 'Deepseek', icon: Bot, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Postman', icon: Send, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { name: 'Power BI', icon: BarChart, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { name: 'Pentaho', icon: Database, color: 'text-teal-500', bg: 'bg-teal-500/10' }
];

// To make the marquee seamless, we duplicate the arrays a few times so they are wide enough.
// The CSS translation will move it 50% left, so if we duplicate it 4 times, it seamlessly loops across 2 sets.
const MarqueeRow = ({ items, reverse = false }) => {
  if (!items || items.length === 0) return null;
  const duplicatedItems = [...items, ...items, ...items, ...items, ...items, ...items];
  
  return (
    <div className="overflow-hidden relative w-full py-4 group mask-horizontal">
      <div 
        className={`flex min-w-full gap-6 whitespace-nowrap w-max ${reverse ? 'animate-marquee-right' : 'animate-marquee-left'} group-hover:[animation-play-state:paused]`}
      >
        {duplicatedItems.map((item, idx) => (
          <div 
            key={`${item.name}-${idx}`} 
            className="flex items-center gap-3 px-5 py-3 rounded-full bg-dark-surface border border-white/5 transition-all hover:border-primary/50 cursor-default"
          >
            <div className={`p-1.5 rounded-full ${item.bg}`}>
              <item.icon size={18} className={item.color} />
            </div>
            <span className="font-semibold text-base text-text-primary/90">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState('Tech Stack');

  const currentItems = activeTab === 'Tech Stack' ? techStack : tools;
  const half = Math.ceil(currentItems.length / 2);
  const topRow = currentItems.slice(0, half);
  const bottomRow = currentItems.slice(half);

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-black mb-4">
            <span className="text-gradient">Skills</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto flex items-center justify-center gap-2">
            A modern tech stack designed for impact, efficiency, and scale <span role="img" aria-label="chart">📈</span>
          </p>
        </motion.div>

        {/* Filter Toggle */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 p-1.5 bg-dark-surface border border-white/10 rounded-full mb-12 md:mb-16"
        >
          {['Tech Stack', 'Tools'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeTab === tab 
                  ? 'bg-primary text-white shadow-orange' 
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Marquee Section */}
        <div className="w-full relative min-h-[160px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col gap-4"
            >
              <MarqueeRow items={topRow} reverse={false} />
              <MarqueeRow items={bottomRow} reverse={true} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Skills;
