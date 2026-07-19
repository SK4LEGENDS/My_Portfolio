import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  X, 
  BookOpen, 
  CheckCircle2, 
  Tag,
  ArrowRight,
  User
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { getBlogs } from '../utils/markdown';
import ReactMarkdown from 'react-markdown';
import Tilt from 'react-parallax-tilt';

const blogData = getBlogs();

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    setVisibleCount(4);
  }, [selectedCategory, searchQuery]);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const categories = ["All", ...new Set(blogData.map(post => post.category))];

  const filteredPosts = blogData.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  const handleOpenPost = (post) => {
    setSelectedPost(post);
    setActiveMediaIndex(0);
  };

  const handleNextMedia = (length) => {
    setActiveMediaIndex((prev) => (prev + 1) % length);
  };

  const handlePrevMedia = (length) => {
    setActiveMediaIndex((prev) => (prev - 1 + length) % length);
  };

  // Helper to assign glowing border colors based on category
  const getCategoryColor = (category) => {
    switch (category) {
      case "Tech Community Event": return "text-blue-400 bg-black/70 border-blue-500/30 shadow-lg shadow-black/50";
      case "Workshop & Seminar": return "text-cyan-400 bg-black/70 border-cyan-500/30 shadow-lg shadow-black/50";
      case "Hackathon": return "text-orange-400 bg-black/70 border-orange-500/30 shadow-lg shadow-black/50";
      case "Leadership & Organization": return "text-purple-400 bg-black/70 border-purple-500/30 shadow-lg shadow-black/50";
      default: return "text-primary bg-black/70 border-primary/30 shadow-lg shadow-black/50";
    }
  };

  return (
    <PageWrapper>
      {/* Title Header */}
      <div className="text-center max-w-5xl mx-auto mb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-2 text-primary text-sm font-bold tracking-wider uppercase"
        >
          <Sparkles size={16} /> My Activity Feed
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-display font-black tracking-tight text-white mb-1"
        >
          Events, Conducted & <span className="text-gradient">Attended</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base text-text-secondary leading-relaxed text-center"
        >
          Explore workshops I have conducted, hackathons and conferences I have attended, alongside technical guides sharing key insights on AI agent development and automation engineering.
        </motion.p>
      </div>

      {/* Control Panel: Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-start items-center mb-8 glass border border-white/5 p-4 rounded-3xl max-w-[1400px] mx-auto">
        {/* Search */}
        <div className="relative w-full md:w-80 group shrink-0">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search events, topics, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-dark/40 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-text-secondary/50"
          />
        </div>

        {/* Mobile Filter Dropdown */}
        <div className="relative w-full md:hidden group shrink-0">
          <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors pointer-events-none" />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-transparent text-text-secondary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
        <AnimatePresence>
          {filteredPosts.length > 0 ? (
            visiblePosts.map((post, index) => (
              <Tilt
                key={post.id}
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => handleOpenPost(post)}
                  className="group relative bg-dark-surface border border-white/5 hover:border-primary/30 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-colors duration-300 flex flex-col cursor-pointer h-full relative"
                >
                  {/* Image Section */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-dark-muted border-b border-white/5 flex items-center justify-center">
                    {post.media && post.media.length > 0 ? (
                      <>
                        {/* Blurred backdrop */}
                        <img 
                          src={post.media[0].url} 
                          alt="" 
                          className="absolute inset-0 w-full h-full object-cover blur-md opacity-40 scale-110 group-hover:scale-125 transition-transform duration-700"
                        />
                        {/* Crisp foreground */}
                        <img 
                          src={post.media[0].url} 
                          alt={post.title} 
                          className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-dark opacity-50" />
                    )}
                    {/* Category Pill */}
                    <span className={`absolute z-20 top-4 left-4 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border backdrop-blur-md ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                    
                    {/* Glass Card Shadow Overlay */}
                    <div className="absolute z-20 inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent opacity-60 pointer-events-none" />
                  </div>
  
                  {/* Content */}
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[11px] font-bold text-text-secondary mb-2.5">
                      <span className="flex items-center gap-1"><Calendar size={12} className="text-primary" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} className="text-primary" /> {post.period}</span>
                    </div>
  
                    <h3 className="text-lg font-display font-black text-white mb-2.5 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
  
                    <p className="text-text-secondary text-xs mb-5 leading-relaxed line-clamp-3 font-normal text-justify">
                      {post.summary}
                    </p>
  
                    <div className="flex items-center justify-between mt-auto pt-3.5 border-t border-white/5 gap-2">
                      {/* Role Pill */}
                      <div className="text-[9px] font-bold text-text-primary px-2 py-1 bg-white/5 rounded-md uppercase tracking-tight flex items-center gap-1.5 text-left flex-1 mr-2 overflow-hidden min-w-0">
                        <User size={9} className="text-primary shrink-0" /> 
                        <span className="truncate block w-full">{post.role}</span>
                      </div>
                      <span className="text-xs font-bold text-primary flex items-center gap-1 shrink-0">
                        Read Story <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Tilt>
            ))
          ) : (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center glass border border-white/5 rounded-3xl"
            >
              <h3 className="text-2xl font-black mb-2">No event stories found</h3>
              <p className="text-text-secondary">Try updating your filters or searching for another keyword.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {visibleCount < filteredPosts.length && (
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
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-zoom-out"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl bg-dark-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 my-8 flex flex-col max-h-[90vh]"
            >
              {/* Top Header Sticky Controls */}
              <div className="sticky top-0 bg-dark-surface/90 backdrop-blur-md p-6 border-b border-white/5 flex items-center justify-between z-30">
                <div>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${getCategoryColor(selectedPost.category)}`}>
                    {selectedPost.category}
                  </span>
                  <h2 className="text-xl md:text-3xl font-display font-black text-white mt-3 leading-tight">{selectedPost.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="p-3 bg-white/5 hover:bg-primary/20 hover:text-white rounded-full text-text-secondary transition-all cursor-pointer shadow-inner ml-4 shrink-0"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Container Content */}
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                <div className="p-6 md:p-8 pb-12 md:pb-16">
                  
                  {/* Media Carousel */}
                  {selectedPost.media && selectedPost.media.length > 0 ? (
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-dark-muted border border-white/5 mb-8 shadow-inner group">
                      <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-black/20">
                        {/* Blurred backdrop */}
                        <img 
                          src={selectedPost.media[activeMediaIndex].url} 
                          alt="" 
                          className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110"
                        />
                        {/* Crisp foreground */}
                        <img 
                          src={selectedPost.media[activeMediaIndex].url} 
                          alt={selectedPost.media[activeMediaIndex].caption} 
                          className="relative z-10 w-full h-full object-contain"
                        />
                        
                        {/* Caption Overlay */}
                        <div className="absolute z-20 bottom-0 left-0 right-0 bg-gradient-to-t from-dark/95 via-dark/50 to-transparent p-6 pt-12">
                          <p className="text-sm font-semibold text-white tracking-wide">
                            {selectedPost.media[activeMediaIndex].caption}
                          </p>
                        </div>

                        {/* Carousel Controls */}
                        {selectedPost.media.length > 1 && (
                          <>
                            <button
                              onClick={(e) => { e.stopPropagation(); handlePrevMedia(selectedPost.media.length); }}
                              className="absolute z-30 left-4 top-1/2 -translate-y-1/2 p-3 bg-dark/70 hover:bg-primary text-white rounded-full backdrop-blur-sm transition-all cursor-pointer shadow-lg"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleNextMedia(selectedPost.media.length); }}
                              className="absolute z-30 right-4 top-1/2 -translate-y-1/2 p-3 bg-dark/70 hover:bg-primary text-white rounded-full backdrop-blur-sm transition-all cursor-pointer shadow-lg"
                            >
                              <ChevronRight size={20} />
                            </button>

                            {/* Bullet navigation indicators */}
                            <div className="absolute z-30 top-4 right-4 flex gap-1.5 bg-dark/65 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                              {selectedPost.media.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={(e) => { e.stopPropagation(); setActiveMediaIndex(idx); }}
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
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-dark opacity-50 flex items-center justify-center">
                      <span className="text-text-secondary text-sm">Visuals coming soon</span>
                    </div>
                  )}

                  {/* Main Event Data details */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Article Content Pane */}
                    <div className="lg:col-span-2 space-y-8">
                      <div>
                        <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                          <BookOpen size={20} className="text-primary animate-pulse" /> Full Story & Event Context
                        </h4>
                        <div className="text-text-secondary leading-relaxed text-base font-normal prose prose-invert max-w-none prose-p:mb-4 prose-p:text-justify prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                          <ReactMarkdown>
                            {selectedPost.content}
                          </ReactMarkdown>
                        </div>
                      </div>

                      {/* Takeaways segment */}
                      {selectedPost.takeaways && selectedPost.takeaways.length > 0 && (
                        <div>
                          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <CheckCircle2 size={20} className="text-primary" /> Key Contributions & Outcomes
                          </h4>
                          <ul className="space-y-3.5">
                            {selectedPost.takeaways.map((takeaway, idx) => (
                              <li key={idx} className="flex items-start gap-3.5 text-text-secondary text-sm md:text-base leading-relaxed text-justify">
                                <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                                <span>{takeaway}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Metadata Sidebar Pane */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-6 h-fit">
                      {/* Date Meta */}
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/5 rounded-xl text-primary border border-white/5">
                          <Calendar size={20} />
                        </div>
                        <div>
                          <span className="text-xs text-text-secondary block font-bold uppercase tracking-wider">Date</span>
                          <span className="text-white font-medium text-sm">{selectedPost.date}</span>
                        </div>
                      </div>

                      {/* Duration Meta */}
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/5 rounded-xl text-primary border border-white/5">
                          <Clock size={20} />
                        </div>
                        <div>
                          <span className="text-xs text-text-secondary block font-bold uppercase tracking-wider">Duration</span>
                          <span className="text-white font-medium text-sm">{selectedPost.period}</span>
                        </div>
                      </div>

                      {/* Role Meta */}
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/5 rounded-xl text-primary border border-white/5">
                          <User size={20} />
                        </div>
                        <div>
                          <span className="text-xs text-text-secondary block font-bold uppercase tracking-wider">My Role</span>
                          <span className="text-white font-medium text-sm">{selectedPost.role}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="pt-4 border-t border-white/5">
                        <h5 className="text-xs text-text-secondary font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <Tag size={14} className="text-primary" /> Tags
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedPost.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="text-xs font-semibold px-2.5 py-1 bg-dark border border-white/5 text-white/95 rounded-lg shrink-0"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
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

export default Blog;
