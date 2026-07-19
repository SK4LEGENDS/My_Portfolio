import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, MapPin, Mail, Users } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { portfolioData } from '../data/portfolio';

const About = () => {
  return (
    <PageWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Info Card */}
        <div className="lg:col-span-4 relative lg:sticky lg:top-32 z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-dark-surface rounded-3xl p-8 border border-white/5 animate-float">
            <div className="w-32 h-32 bg-primary rounded-2xl mb-6 mx-auto flex items-center justify-center text-white text-5xl font-black">
              {portfolioData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h1 className="text-3xl font-display font-bold text-center mb-2">{portfolioData.name}</h1>
            <p className="text-primary font-medium text-center mb-6">{portfolioData.role}</p>

            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="flex items-center gap-3 text-text-secondary">
                <MapPin size={18} className="text-primary" />
                <span>Chennai, Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <Mail size={18} className="text-primary" />
                <span>{portfolioData.email}</span>
              </div>
            </div>

            <div className="mt-8 flex gap-3 justify-center">
              <a href={portfolioData.socials.github} className="px-4 py-2 bg-white/5 rounded-lg hover:bg-primary/20 transition-colors">GitHub</a>
              <a href={portfolioData.socials.linkedin} className="px-4 py-2 bg-white/5 rounded-lg hover:bg-primary/20 transition-colors">LinkedIn</a>
            </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Bio & Timeline */}
        <div className="lg:col-span-8 space-y-16">
          <section>
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <div className="space-y-6">
              <p className="text-lg text-text-secondary leading-relaxed text-justify">
                I am an Automation Developer specializing in the intersection of Agentic AI, Generative AI, and intelligent automation. I have hands-on expertise in building scalable AI-driven solutions using LLMs, API integrations, and enterprise automation platforms such as UiPath.
              </p>
              <p className="text-lg text-text-secondary leading-relaxed text-justify">
                My professional experience includes developing agentic workflows, integrating large language models into business processes, prompt engineering, AI orchestration, and connecting enterprise systems through APIs and automation frameworks. I am focused on designing context-aware automation systems that move beyond traditional rule-based RPA into adaptive, decision-oriented AI solutions.
              </p>
              <p className="text-lg text-text-secondary leading-relaxed text-justify">
                My areas of expertise include Agentic AI systems, LLM-powered automation, API integration, AI workflow orchestration, intelligent document processing, and enterprise automation architecture. I have a strong interest in building autonomous AI agents that enhance operational efficiency, business decision-making, and digital transformation initiatives.
              </p>
            </div>
          </section>

          {/* Experience Timeline */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="text-primary" size={28} />
              <h2 className="text-3xl font-bold">Experience</h2>
            </div>
            <div className="space-y-8">
              {portfolioData.experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8 border-l border-white/10"
                >
                  <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 bg-primary rounded-full" />
                  <span className="text-sm text-primary font-bold mb-1 block">{exp.period}</span>
                  <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                  <h4 className="text-text-secondary font-medium mb-4">{exp.company}</h4>
                  <p className="text-text-secondary leading-relaxed text-justify">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Education & Certs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="text-primary" size={28} />
                <h2 className="text-2xl font-bold">Education</h2>
              </div>
              <div className="space-y-6">
                {portfolioData.education.map((edu, i) => (
                  <div key={i} className="bg-dark-surface p-6 rounded-2xl border border-white/5">
                    <span className="text-xs text-primary font-bold">{edu.period}</span>
                    <h3 className="font-bold mt-1">{edu.degree}</h3>
                    <p className="text-sm text-text-secondary mt-1">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <Award className="text-primary" size={28} />
                <h2 className="text-2xl font-bold">Certifications</h2>
              </div>
              <ul className="space-y-3">
                {portfolioData.certifications.map((cert, i) => (
                  <li key={i} className="flex gap-3 text-text-secondary">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Volunteering Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Users className="text-primary" size={28} />
              <h2 className="text-2xl font-bold">Volunteering Experience</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioData.volunteer.map((item, i) => (
                <div key={i} className="bg-dark-surface p-6 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <h3 className="font-bold text-lg">{item.role}</h3>
                    <span className="text-xs text-primary font-bold px-2 py-1 bg-primary/10 rounded-full whitespace-nowrap shrink-0">{item.period}</span>
                  </div>
                  <h4 className="text-text-secondary text-sm font-medium mb-3">{item.organization}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed text-justify">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
};

export default About;
