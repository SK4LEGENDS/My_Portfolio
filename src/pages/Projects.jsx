import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  X, 
  Calendar, 
  Target, 
  Award, 
  Cpu, 
  Play, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Sparkles,
  Search
} from 'lucide-react';
import { GitHub } from '../components/Icons';
import PageWrapper from '../components/PageWrapper';
import { getProjects } from '../utils/markdown';
import ReactMarkdown from 'react-markdown';
import Tilt from 'react-parallax-tilt';

const projectsData = getProjects();

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    setVisibleCount(3);
  }, [filter, searchQuery]);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [playVideoPlaceholder, setPlayVideoPlaceholder] = useState(false);

  const categories = ['All', ...new Set(projectsData.map(p => p.category))];

  const filteredProjects = projectsData.filter(p => {
    const matchCategory = filter === 'All' || p.category === filter;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  // Close modal on escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const handleNextMedia = (mediaLength) => {
    setPlayVideoPlaceholder(false);
    setActiveMediaIndex((prev) => (prev + 1) % mediaLength);
  };

  const handlePrevMedia = (mediaLength) => {
    setPlayVideoPlaceholder(false);
    setActiveMediaIndex((prev) => (prev - 1 + mediaLength) % mediaLength);
  };

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setActiveMediaIndex(0);
    setPlayVideoPlaceholder(false);
  };

  return (
    <PageWrapper>
      <div className="mb-6">
        <h1 className="text-3xl md:text-5xl font-display font-black mb-1">My <span className="text-gradient">Projects</span></h1>
        <p className="text-base text-text-secondary max-w-4xl">
          A showcase of custom Agentic AI agent systems, Generative AI engines, and enterprise intelligent automations.
        </p>
      </div>

      {/* Control Panel: Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-start items-center mb-8 glass border border-white/5 p-4 rounded-3xl w-full">
        {/* Search */}
        <div className="relative w-full md:w-80 shrink-0 group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search projects, tech, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-dark/40 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-text-secondary/50"
          />
        </div>

        {/* Mobile Filter Dropdown */}
        <div className="relative w-full md:hidden group shrink-0">
          <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors pointer-events-none" />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-12 pr-10 py-3 bg-dark/40 border border-white/10 rounded-2xl text-white text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-dark text-white uppercase font-bold">
                {cat}
              </option>
            ))}
          </select>
          <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:flex flex-wrap gap-2 justify-start w-full px-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === cat 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-transparent text-text-secondary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode='popLayout'>
          {visibleProjects.map((project) => (
            <Tilt 
              key={project.id}
              tiltMaxAngleX={8} 
              tiltMaxAngleY={8} 
              perspective={1000} 
              transitionSpeed={400} 
              scale={1.02}
              glareEnable={true} 
              glareMaxOpacity={0.15} 
              glareColor="#ffffff" 
              glarePosition="all"
              glareBorderRadius="24px"
              className="h-full rounded-3xl"
            >
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleOpenModal(project)}
                className="bg-dark-surface rounded-3xl overflow-hidden border border-white/5 group cursor-pointer hover:border-primary/30 transition-colors duration-300 flex flex-col justify-between h-full shadow-xl hover:shadow-primary/10 relative"
              >
                <div>
                  {project.media && project.media.length > 0 && (
                    <div className="aspect-video bg-dark-muted relative overflow-hidden flex items-center justify-center">
                      {/* Blurred backdrop */}
                      <img 
                        src={project.media[0].url} 
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover blur-md opacity-40 scale-110 group-hover:scale-125 transition-transform duration-700"
                      />
                      {/* Crisp foreground */}
                      <img 
                        src={project.media[0].url} 
                        alt={project.title}
                        className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute z-20 inset-0 bg-dark/20 group-hover:bg-dark/40 transition-colors pointer-events-none" />
                      <div className="absolute z-30 inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-dark/65 backdrop-blur-sm">
                        <span className="px-6 py-3 bg-primary rounded-2xl font-bold text-white text-sm tracking-wide shadow-lg shadow-primary/20 scale-90 group-hover:scale-100 transition-all flex items-center gap-2">
                          <Sparkles size={16} /> View Details
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-1 bg-primary/10 rounded">{project.category}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-text-secondary text-sm mb-6 leading-relaxed line-clamp-3 text-justify">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] text-text-secondary bg-white/5 px-2 py-1 rounded">#{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </AnimatePresence>
      </motion.div>

      {visibleCount < filteredProjects.length && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 flex justify-center w-full"
        >
          <button 
            onClick={() => setVisibleCount(prev => prev + 3)}
            className="px-8 py-3 bg-dark-surface border border-primary/30 hover:border-primary text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-primary/20 flex items-center gap-2 group cursor-pointer"
          >
            Load More <ChevronDown className="group-hover:translate-y-1 transition-transform" size={18} />
          </button>
        </motion.div>
      )}

      {/* Premium Detail Modal Popup */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            {/* Backdrop overlay with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-zoom-out"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl bg-dark-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 my-8 flex flex-col max-h-[90vh]"
            >
              {/* Top Header Controls */}
              <div className="sticky top-0 bg-dark-surface/90 backdrop-blur-md p-6 border-b border-white/5 flex items-center justify-between z-30">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-1 bg-primary/10 rounded mb-2 inline-block">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-xl md:text-3xl font-display font-black text-white">{selectedProject.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-3 bg-white/5 hover:bg-primary/20 hover:text-white rounded-full text-text-secondary transition-all cursor-pointer shadow-inner ml-4"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Container Content */}
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                <div className="p-6 md:p-8 pb-12 md:pb-16">
                
                {/* Media Presentation Box (Carousel) */}
                {selectedProject.media && selectedProject.media.length > 0 && (
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-dark-muted border border-white/5 mb-8 shadow-inner group">
                    <div className="w-full h-full relative">
                      
                      {/* Play Video Placeholder Trigger */}
                      {playVideoPlaceholder ? (
                        <div className="absolute inset-0 bg-dark flex flex-col items-center justify-center p-6 text-center">
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-pulse text-white mb-4">
                            <Play size={32} className="ml-1" />
                          </div>
                          <h4 className="text-lg font-bold text-white mb-2">Walkthrough Video Sandbox</h4>
                          <p className="text-text-secondary text-sm max-w-md">
                            (This is a video element placeholder. You can easily link a demo mp4 or YouTube walk-through later!)
                          </p>
                          <button 
                            onClick={() => setPlayVideoPlaceholder(false)}
                            className="mt-6 px-5 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-white font-bold text-sm transition-all border border-white/10 cursor-pointer"
                          >
                            Show Project Screen
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-black/20">
                          {/* Blurred backdrop */}
                          <img 
                            src={selectedProject.media[activeMediaIndex].url} 
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110"
                          />
                          {/* Crisp foreground */}
                          <img 
                            src={selectedProject.media[activeMediaIndex].url} 
                            alt={selectedProject.media[activeMediaIndex].caption}
                            className="relative z-10 w-full h-full object-contain"
                          />
                          <div className="absolute z-20 bottom-0 left-0 right-0 bg-gradient-to-t from-dark/95 to-transparent p-6 pt-12">
                            <p className="text-sm font-semibold text-white tracking-wide">
                              {selectedProject.media[activeMediaIndex].caption}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Video Player Demo Toggle Overlay (if user wants to mock play) */}
                      {!playVideoPlaceholder && (
                        <button 
                          onClick={() => setPlayVideoPlaceholder(true)}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-primary/95 text-white rounded-full scale-90 hover:scale-100 hover:bg-primary transition-all shadow-xl hover:shadow-primary/20 flex items-center justify-center cursor-pointer z-10"
                          title="Play Walkthrough Video Demo"
                        >
                          <Play size={24} className="ml-0.5" />
                        </button>
                      )}

                      {/* Left/Right Carousel Controls */}
                      {selectedProject.media.length > 1 && !playVideoPlaceholder && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); handlePrevMedia(selectedProject.media.length); }}
                            className="absolute z-30 left-4 top-1/2 -translate-y-1/2 p-3 bg-dark/70 hover:bg-primary text-white rounded-full backdrop-blur-sm transition-all cursor-pointer shadow-lg"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleNextMedia(selectedProject.media.length); }}
                            className="absolute z-30 right-4 top-1/2 -translate-y-1/2 p-3 bg-dark/70 hover:bg-primary text-white rounded-full backdrop-blur-sm transition-all cursor-pointer shadow-lg"
                          >
                            <ChevronRight size={20} />
                          </button>

                          {/* Bullet navigation indicators */}
                          <div className="absolute z-30 top-4 right-4 flex gap-1.5 bg-dark/65 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                            {selectedProject.media.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => { e.stopPropagation(); setPlayVideoPlaceholder(false); setActiveMediaIndex(idx); }}
                                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                                  activeMediaIndex === idx ? "bg-primary w-5" : "bg-white/30 hover:bg-white/50"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}

                    </div>
                  </div>
                )}

                {/* Grid Split Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left Main Information Pane */}
                  <div className="lg:col-span-2 space-y-8">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <Target size={20} className="text-primary" /> Core Project Summary
                      </h4>
                      <div className="text-text-secondary leading-relaxed text-base font-normal prose prose-invert max-w-none prose-p:mb-4 prose-p:text-justify prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                        <ReactMarkdown>
                          {selectedProject.longDescription || selectedProject.description}
                        </ReactMarkdown>
                      </div>
                    </div>

                    {selectedProject.features && selectedProject.features.length > 0 && (
                      <div>
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <Award size={20} className="text-primary" /> Key Implementations & Achievements
                        </h4>
                        <ul className="space-y-3.5">
                          {selectedProject.features.map((feat, index) => (
                            <li key={index} className="flex items-start gap-3.5 text-text-secondary text-sm md:text-base leading-relaxed text-justify">
                              <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Right Meta Sidebar Pane */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-6 h-fit">
                    
                    {/* Period metadata */}
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-xl text-primary border border-white/5">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <span className="text-xs text-text-secondary block font-bold uppercase tracking-wider">Duration</span>
                        <span className="text-white font-medium text-sm">{selectedProject.period || "N/A"}</span>
                      </div>
                    </div>

                    {/* Role metadata */}
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-xl text-primary border border-white/5">
                        <Sparkles size={20} />
                      </div>
                      <div>
                        <span className="text-xs text-text-secondary block font-bold uppercase tracking-wider">Role</span>
                        <span className="text-white font-medium text-sm">{selectedProject.role || "Developer"}</span>
                      </div>
                    </div>

                    {/* Tech Stack Chip Collection */}
                    <div className="pt-2 border-t border-white/5">
                      <h5 className="text-xs text-text-secondary font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Cpu size={14} className="text-primary" /> Built With
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((technology) => (
                          <span 
                            key={technology} 
                            className="text-xs font-semibold px-3 py-1.5 bg-dark border border-white/5 text-white/95 rounded-lg shrink-0"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Call to Actions buttons */}
                    <div className="pt-4 border-t border-white/5">
                      <a 
                        href={selectedProject.github} 
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/10 hover:-translate-y-0.5 cursor-pointer text-sm"
                      >
                        View Source Code <GitHub size={16} />
                      </a>
                    </div>

                  </div>
                </div>

                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default Projects;
