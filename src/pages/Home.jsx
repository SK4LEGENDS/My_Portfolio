import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, ExternalLink } from 'lucide-react';
import { GitHub } from '../components/Icons';

import PageWrapper from '../components/PageWrapper';
import { portfolioData } from '../data/portfolio';

const Home = () => {

  const roles = ["Prompt Engineer", "Agentic Automation Developer", "Photographer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const getArticle = (word) => {
    if (!word) return "A";
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return vowels.includes(word[0].toLowerCase()) ? "An" : "A";
  };

  useEffect(() => {
    const handleTyping = () => {
      const fullText = roles[currentRoleIndex];

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, roles]);

  return (
    <PageWrapper className="pt-24 pb-12 lg:py-0">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 mb-24">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left z-10 order-2 lg:order-1 px-4 lg:px-0">

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black leading-[1.1] mb-6 whitespace-nowrap"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Hello, I'm <span className="text-gradient">Kailash.</span>
          </motion.h1>

          <motion.h2
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-display font-black min-h-[1.2em] flex items-center justify-center lg:justify-start mb-8 tracking-tight whitespace-nowrap"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="text-white/60 font-medium">{getArticle(roles[currentRoleIndex])}</span>
            <span className="ml-2 md:ml-3 text-white/90">{currentText}</span>
            <span className="w-1 md:w-1.5 h-5 sm:h-6 md:h-8 lg:h-10 bg-primary ml-2 animate-pulse" />
          </motion.h2>

          <motion.p
            className="text-base lg:text-lg text-white/60 max-w-2xl mb-10 leading-relaxed text-center lg:text-left mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {portfolioData.summary}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <a href="#projects" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }} className="px-6 py-3 lg:px-8 lg:py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg shadow-primary/25 hover:-translate-y-1">
              View My Projects <ArrowRight size={20} />
            </a>
            <a href="#" className="px-6 py-3 lg:px-8 lg:py-4 glass border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center gap-2 hover:-translate-y-1">
              <Download size={20} /> Download CV
            </a>
          </motion.div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center lg:justify-center z-10 order-1 lg:order-2 px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
            className="relative w-56 h-56 md:w-72 md:h-72 lg:w-[380px] lg:h-[380px] xl:w-[420px] xl:h-[420px]"
          >
            {/* Decorative Rings */}
            <div className="absolute inset-[-10%] border border-primary/10 rounded-full animate-spin-slow" />
            <div className="absolute inset-[-20%] border border-primary/5 rounded-full animate-spin-slow-reverse" />

            <div className="absolute inset-0 bg-primary rounded-full blur-3xl opacity-20 animate-pulse" />

            <div className="relative w-full h-full rounded-[40px] lg:rounded-[60px] border-4 border-primary/20 p-3 glass overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="/src/assets/Kailash.png"
                alt="Kailash Profile"
                className="w-full h-full object-cover rounded-[30px] lg:rounded-[50px]"
                onError={(e) => { e.target.src = "https://via.placeholder.com/600?text=K"; }}
              />
            </div>

          </motion.div>
        </div>
      </section>


    </PageWrapper>
  );
};

export default Home;
