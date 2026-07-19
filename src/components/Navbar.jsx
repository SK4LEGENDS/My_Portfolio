import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { cn } from '../utils/cn';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  
  const location = useLocation();
  const navigate = useNavigate();
  const isDocsPage = location.pathname === '/docs';

  const navLinks = isDocsPage 
    ? [
        { name: 'Intro', path: '#intro' },
        { name: 'Architecture', path: '#scale' },
        { name: 'Tech Stack', path: '#tech-stack' },
        { name: 'Easter Eggs', path: '#easter-eggs' }
      ]
    : portfolioData.navLinks;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll Spy Logic
      const sections = navLinks.map(link => link.path.substring(1));
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 150)) {
          current = '#' + section;
        }
      }
      if (current) {
        setActiveSection(current);
      } else {
        // Default to first section when at the very top
        setActiveSection('#home');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Logo click on docs page
    if (targetId === '#home' && isDocsPage) {
      navigate(`/${targetId}`);
      return;
    }


    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // adjust for navbar height
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "glass py-3 shadow-premium" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-[#ff6b00] rounded-[14px] flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.4)] group-hover:shadow-[0_0_25px_rgba(255,107,0,0.6)] transition-shadow duration-300 shrink-0">
            <span className="text-white font-black text-2xl tracking-tighter font-display">K</span>
          </div>
          <span className="text-2xl font-display font-black tracking-tight text-white group-hover:text-primary transition-colors">
            {portfolioData.name.split(' ')[0]}<span className="text-[#ff6b00]">.</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={(e) => handleSmoothScroll(e, link.path)}
              className={cn(
                "text-sm font-medium transition-all hover:text-primary relative py-1",
                activeSection === link.path ? "text-primary" : "text-text-secondary"
              )}
            >
              {link.name}
              {activeSection === link.path && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
          {isDocsPage ? (
            <Link 
              to="/"
              className="px-5 py-2 bg-dark-muted text-white rounded-full text-sm font-bold border border-white/10 hover:bg-white/10 transition-all active:scale-95 flex items-center gap-2"
            >
              ← Back to Portfolio
            </Link>
          ) : (
            <a 
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="px-5 py-2 bg-primary text-white rounded-full text-sm font-bold bg-gradient-orange hover:orange-glow transition-all active:scale-95"
            >
              Hire Me
            </a>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-text-primary p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass overflow-hidden border-t border-white/5"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleSmoothScroll(e, link.path)}
                  className={cn(
                    "text-xl font-bold transition-colors",
                    activeSection === link.path ? "text-primary" : "text-text-secondary"
                  )}
                >
                  {link.name}
                </a>
              ))}
              {isDocsPage ? (
                <Link 
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 bg-dark-muted text-white border border-white/10 rounded-xl text-center font-bold"
                >
                  ← Back to Portfolio
                </Link>
              ) : (
                <a 
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, '#contact')}
                  className="w-full py-4 bg-primary text-white rounded-xl text-center font-bold bg-gradient-orange shadow-orange"
                >
                  Let's Talk
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
