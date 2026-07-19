import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Terminal, Sparkles, Layers, Rocket, Monitor, FileCode2, Zap } from 'lucide-react';

const techPool = [
  { id: 1, name: 'React 19', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { id: 2, name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg' },
  { id: 3, name: 'Tailwind v4', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { id: 4, name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { id: 5, name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { id: 6, name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { id: 7, name: 'Markdown', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg' },
  { id: 8, name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { id: 9, name: 'NPM', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg' },
  { id: 10, name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { id: 11, name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
  { id: 12, name: 'ESLint', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg' }
];

const TechBox = ({ tech }) => {
  return (
    <div className="relative w-full aspect-square md:aspect-auto md:h-40 lg:h-44 glass rounded-3xl border border-white/10 overflow-hidden hover:border-primary/40 transition-colors group">
      <AnimatePresence mode="wait">
        <motion.div
          key={tech.id}
          initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateX: -90 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4"
        >
          <img src={tech.icon} alt={tech.name} className="w-14 h-14 lg:w-16 lg:h-16 object-contain group-hover:scale-110 transition-transform duration-500" />
          <span className="text-white font-bold text-sm md:text-base text-center">{tech.name}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const TechGrid = () => {
  const [displayed, setDisplayed] = useState(techPool.slice(0, 10));

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayed(prev => {
        // Find technologies not currently displayed (the 2 unused ones)
        const currentIds = prev.map(t => t.id);
        const unused = techPool.filter(t => !currentIds.includes(t.id));
        
        // Pick a random number of boxes to change (between 2 and 5)
        const numToChange = Math.floor(Math.random() * 4) + 2; 
        
        const newDisplayed = [...prev];
        
        // Randomly select the indices of the boxes we want to flip
        const indicesToChange = [];
        while(indicesToChange.length < numToChange) {
           let r = Math.floor(Math.random() * 10);
           if (!indicesToChange.includes(r)) indicesToChange.push(r);
        }
        
        // Gather the technologies currently in those boxes, plus the unused ones
        let itemsToDistribute = [...unused];
        for (let idx of indicesToChange) {
           itemsToDistribute.push(newDisplayed[idx]);
        }
        
        // Shuffle the available items
        itemsToDistribute.sort(() => Math.random() - 0.5);
        
        // Assign the newly shuffled items back to those chosen boxes
        for (let i = 0; i < indicesToChange.length; i++) {
           newDisplayed[indicesToChange[i]] = itemsToDistribute[i];
        }
        
        return newDisplayed;
      });
    }, 3500); // Flips multiple random boxes every 3.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
      {displayed.map((tech, i) => (
        <TechBox key={i} tech={tech} />
      ))}
    </div>
  );
};

const Docs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex-grow relative z-10 pt-24 pb-20 px-4 md:px-8 w-full max-w-5xl mx-auto">
      
      {/* ---------------- INTRO SECTION ---------------- */}
      <section id="intro" className="min-h-[75vh] flex flex-col lg:flex-row items-center justify-between gap-12 mb-32">
        <div className="flex-1 z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 w-max"
          >
            <Code2 size={16} />
            <span className="text-sm font-bold tracking-wider uppercase">The Reveal</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black font-display mb-6 tracking-tight text-white"
          >
            How It's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Built.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
          >
            A static resume is just a piece of paper on a screen. This portfolio was engineered from the ground up to be a living, interactive application that reacts to your every move. It combines cutting-edge web technologies, game-engine physics, and custom state machines to deliver an experience unlike any standard portfolio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-row gap-3 md:gap-4 w-full max-w-2xl"
          >
             <div className="glass px-3 md:px-4 py-4 rounded-2xl border border-white/5 flex-1 text-center">
                <div className="text-2xl md:text-3xl font-black text-white mb-1">5</div>
                <div className="text-[10px] md:text-xs text-text-secondary uppercase tracking-wider font-bold">Easter Eggs</div>
             </div>
             <div className="glass px-3 md:px-4 py-4 rounded-2xl border border-white/5 flex-1 text-center">
                <div className="text-2xl md:text-3xl font-black text-white mb-1">60fps</div>
                <div className="text-[10px] md:text-xs text-text-secondary uppercase tracking-wider font-bold">Animations</div>
             </div>
             <div className="glass px-3 md:px-4 py-4 rounded-2xl border border-white/5 flex-1 text-center">
                <div className="text-2xl md:text-3xl font-black text-white mb-1">100%</div>
                <div className="text-[10px] md:text-xs text-text-secondary uppercase tracking-wider font-bold">Custom UI</div>
             </div>
          </motion.div>
        </div>

        {/* Right side animation */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex-1 w-full max-w-lg relative mt-12 lg:mt-0"
        >
          {/* Glowing background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
          
          {/* Main Code Block */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass p-6 md:p-8 rounded-2xl border border-white/10 relative z-10 shadow-2xl"
          >
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <pre className="text-sm md:text-base font-mono text-text-secondary overflow-hidden">
              <code className="text-primary">const</code> portfolio = <code className="text-blue-400">new</code> <code className="text-green-400">Experience</code>({`{`}<br/>
              &nbsp;&nbsp;engine: <code className="text-orange-400">'React 19'</code>,<br/>
              &nbsp;&nbsp;styling: <code className="text-orange-400">'Tailwind v4'</code>,<br/>
              &nbsp;&nbsp;physics: <code className="text-blue-400">true</code>,<br/>
              &nbsp;&nbsp;easterEggs: [<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<code className="text-green-400">'matrix'</code>, <code className="text-green-400">'retro'</code>,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<code className="text-green-400">'gravity'</code>, <code className="text-green-400">'pong'</code><br/>
              &nbsp;&nbsp;]<br/>
              {`}`});<br/><br/>
              portfolio.<code className="text-blue-400">init</code>();
            </pre>
          </motion.div>

          {/* Floating Badge */}
          <motion.div
             animate={{ y: [10, -10, 10] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -bottom-8 -right-4 md:-right-8 glass p-4 rounded-xl border border-white/10 shadow-xl z-20 backdrop-blur-xl"
          >
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Sparkles className="text-primary" size={20} />
               </div>
               <div>
                  <div className="text-white font-bold text-sm">Interactive DOM</div>
                  <div className="text-text-secondary text-xs">Zero static pages</div>
               </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ---------------- DATA SCALE SECTION ---------------- */}
      <section id="scale" className="mb-32 pt-16 relative">
        <div className="w-full">
          
          {/* Explanatory Text */}
          <div className="space-y-8 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-2"
            >
              <div className="w-12 h-12 bg-dark-surface rounded-xl flex items-center justify-center border border-white/10 relative overflow-hidden group">
                <Monitor className="text-primary relative z-10" />
              </div>
              <h2 className="text-4xl font-black font-display text-white">Handling Scale</h2>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary text-lg leading-relaxed"
            >
              As the portfolio grows with more projects and events, maintaining performance and organization becomes crucial. I engineered a robust architecture to handle this seamlessly.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="glass p-6 md:p-8 rounded-xl border border-white/5 border-t-4 border-t-primary/60 hover:border-primary/30 transition-colors">
                <h4 className="text-xl text-white font-bold mb-4 flex items-center gap-3"><FileCode2 size={24} className="text-primary"/> Markdown CMS</h4>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Instead of hardcoding projects directly into React components, I engineered a custom-built Vite parser that allows me to write content in clean, lightweight <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded">.md</code> files.
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-2">
                  <li>Extracts YAML frontmatter for fast metadata loading</li>
                  <li>Transforms raw Markdown into rich React components</li>
                  <li>Significantly reduces boilerplate code overhead</li>
                </ul>
              </div>
              
              <div className="glass p-6 md:p-8 rounded-xl border border-white/5 border-t-4 border-t-[#ffbd2e]/60 hover:border-[#ffbd2e]/30 transition-colors">
                <h4 className="text-xl text-white font-bold mb-4 flex items-center gap-3"><Zap size={24} className="text-[#ffbd2e]"/> Lazy Rendering</h4>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Rendering massive amounts of project history all at once can bottleneck the browser. By implementing a modular pagination strategy paired with a dedicated "Load More" system, the portfolio scales effortlessly.
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-2">
                  <li>Prevents infinite DOM expansion to maintain 60fps</li>
                  <li>Dramatically cuts down initial network payloads</li>
                  <li>Guarantees a seamless browsing experience on mobile</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------- TECH STACK SECTION ---------------- */}
      <section id="tech-stack" className="mb-32 pt-16">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-dark-surface rounded-xl flex items-center justify-center border border-white/10">
            <Layers className="text-primary" />
          </div>
          <h2 className="text-4xl font-black font-display text-white">The Tech Stack</h2>
        </div>

        {/* 5x2 Animated Tech Grid */}
        <TechGrid />
      </section>

      {/* ---------------- EASTER EGGS SECTION ---------------- */}
      <section id="easter-eggs" className="mb-24 pt-16">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-dark-surface rounded-xl flex items-center justify-center border border-white/10">
            <Terminal className="text-primary" />
          </div>
          <h2 className="text-4xl font-black font-display text-white">The Easter Egg Engine</h2>
        </div>

        <p className="text-text-secondary text-xl leading-relaxed mb-12">
          Hidden beneath the main interface is a custom state machine. A global event listener constantly monitors your keystrokes. When specific sequences are matched, it dispatches custom window events that trigger system-wide transformations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="glass p-8 rounded-3xl border border-white/5 group hover:border-primary/30 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-green-500 font-mono tracking-widest text-sm block mb-2">m-a-t-r-i-x</span>
              The Matrix Engine
            </h3>
            <p className="text-text-secondary leading-relaxed">
              When triggered, it halts rendering and plays a cinematic terminal boot sequence. Then, it injects a <code>matrix-theme</code> class onto the body tag. This single class cascades down, overriding all primary colors and backgrounds to neon green and pure black, while mounting a high-performance HTML5 Canvas digital rain effect.
            </p>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/5 group hover:border-primary/30 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-blue-400 font-mono tracking-widest text-sm block mb-2">r-e-t-r-o</span>
              1980s Retro Mode
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Instantly converts the entire UI to an 80s terminal aesthetic. It overrides standard fonts with monospace, strips away border radii, and applies a custom CSS overlay that simulates CRT scanlines and screen flicker.
            </p>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/5 group hover:border-primary/30 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-orange-400 font-mono tracking-widest text-sm block mb-2">g-r-a-v-i-t-y</span>
              Physics Simulation
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Injects the <code>matter.js</code> 2D physics engine. It scans the DOM for specific UI elements, detaches them from normal document flow, and replaces them with physical bodies that fall to the bottom of the screen, reacting to mouse collisions.
            </p>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/5 group hover:border-primary/30 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-purple-400 font-mono tracking-widest text-sm block mb-2">Idle 60s</span>
              AFK Pong
            </h3>
            <p className="text-text-secondary leading-relaxed">
              A timeout function detects mouse and keyboard inactivity. If you step away for 60 seconds, the site defends itself from "AI Takeover" by letting you play Pong against a rudimentary AI script overlaying the portfolio.
            </p>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/5 group hover:border-primary/30 transition-colors md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-yellow-400 font-mono tracking-widest text-sm block mb-2">F12</span>
              Console Log Secret
            </h3>
            <p className="text-text-secondary leading-relaxed">
              A custom ASCII art message is logged directly to the browser's developer console on initial load using styled <code>console.log()</code> directives, waiting to greet curious developers who peek under the hood.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
};

export default Docs;
