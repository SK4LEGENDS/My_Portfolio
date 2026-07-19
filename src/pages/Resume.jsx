import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Printer, Share2, Mail, Phone, Globe } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { portfolioData } from '../data/portfolio';

const Resume = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div>
          <h1 className="text-4xl md:text-6xl font-display font-black mb-4">Resume</h1>
          <p className="text-xl text-text-secondary">My professional experience and technical expertise summarized.</p>
        </div>
        <div className="flex gap-4">
          <a href="/Kailash_Resume.pdf" download="Kailash_Resume.pdf" className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold bg-gradient-orange shadow-orange hover:scale-105 transition-all">
            <Download size={20} /> Download PDF
          </a>
          <button onClick={() => window.print()} className="p-3 glass rounded-xl text-white hover:bg-white/10 transition-all cursor-pointer">
            <Printer size={20} />
          </button>
        </div>
      </div>

      {/* Resume Layout */}
      <div className="bg-white text-dark p-6 md:p-10 rounded-[40px] shadow-2xl max-w-5xl mx-auto overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between border-b-2 border-dark/10 pb-6 mb-6 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2">{portfolioData.name}</h2>
            <h3 className="text-xl font-bold text-primary mb-4">{portfolioData.role}</h3>
            <div className="flex flex-wrap gap-4 text-sm font-medium opacity-70">
              <span className="flex items-center gap-2"><Mail size={16} /> {portfolioData.email}</span>
              <span className="flex items-center gap-2"><Phone size={16} /> {portfolioData.phone}</span>
              <span className="flex items-center gap-2"><Globe size={16} /> {portfolioData.website}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="md:col-span-8 space-y-8">
            <section>
              <h4 className="text-lg font-black uppercase tracking-widest mb-4 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-dark" /> Experience
              </h4>
              <div className="space-y-6">
                {portfolioData.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="text-xl font-bold">{exp.role}</h5>
                      <span className="text-sm font-bold opacity-60 shrink-0 ml-2">{exp.period}</span>
                    </div>
                    <h6 className="text-primary font-bold mb-2">{exp.company}</h6>
                    <p className="text-dark/70 text-sm leading-relaxed text-justify">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h4 className="text-lg font-black uppercase tracking-widest mb-4 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-dark" /> Education
              </h4>
              <div className="space-y-6">
                {portfolioData.education.map((edu, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="text-xl font-bold">{edu.degree}</h5>
                      <span className="text-sm font-bold opacity-60 shrink-0 ml-2">{edu.period}</span>
                    </div>
                    <h6 className="text-primary font-bold mb-2">{edu.institution}</h6>
                    {edu.description && <p className="text-dark/70 text-sm leading-relaxed text-justify">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h4 className="text-lg font-black uppercase tracking-widest mb-4 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-dark" /> Volunteering & Leadership
              </h4>
              <div className="space-y-6">
                {portfolioData.volunteer.map((vol, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="text-xl font-bold">{vol.role}</h5>
                      <span className="text-sm font-bold opacity-60 shrink-0 ml-2">{vol.period}</span>
                    </div>
                    <h6 className="text-primary font-bold mb-2">{vol.organization}</h6>
                    <p className="text-dark/70 text-sm leading-relaxed text-justify">{vol.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 space-y-8">
            <section>
               <h4 className="text-lg font-black uppercase tracking-widest mb-4">Profile</h4>
               <p className="text-sm text-dark/70 leading-relaxed text-justify">
                 Automation Developer specializing in the intersection of Agentic AI, Generative AI, and intelligent automation. Expert in building scalable AI-driven solutions using LLMs, API integrations, and enterprise platforms like UiPath. Focused on designing context-aware automation systems that evolve legacy workflows into adaptive, decision-oriented AI solutions.
               </p>
            </section>

            <section>
              <h4 className="text-lg font-black uppercase tracking-widest mb-4">Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.flatMap(s => s.items).map(skill => (
                  <span key={skill.name} className="px-2 py-1 bg-dark/5 rounded text-xs font-bold uppercase tracking-tight">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h4 className="text-lg font-black uppercase tracking-widest mb-4">Certifications</h4>
              <ul className="space-y-3">
                {portfolioData.certifications.map((cert, i) => (
                  <li key={i} className="text-sm font-medium opacity-70 border-l-2 border-primary pl-3">
                    {cert}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Resume;
