import React from 'react';
import { ArrowUp, Code2 } from 'lucide-react';
import { Mail } from 'lucide-react';
import { GitHub, LinkedIn, XIcon } from './Icons';
import { portfolioData } from '../data/portfolio';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-dark-surface border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <Code2 className="text-white" size={18} />
              </div>
              <span className="text-xl font-display font-bold">
                {portfolioData.name.split(' ')[0]}<span className="text-primary">.</span>
              </span>
            </a>
            <p className="text-text-secondary max-w-sm mb-6 leading-relaxed">
              {portfolioData.summary}
            </p>
            <div className="flex gap-4">
              <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-dark-muted rounded-full hover:bg-primary transition-colors group">
                <GitHub size={20} className="group-hover:text-white" />
              </a>
              <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-dark-muted rounded-full hover:bg-primary transition-colors group">
                <LinkedIn size={20} className="group-hover:text-white" />
              </a>
              <a href={portfolioData.socials.x} target="_blank" rel="noopener noreferrer" className="p-2 bg-dark-muted rounded-full hover:bg-primary transition-colors group">
                <XIcon size={20} className="group-hover:text-white" />
              </a>
              <a href={`mailto:${portfolioData.email}`} className="p-2 bg-dark-muted rounded-full hover:bg-primary transition-colors group">
                <Mail size={20} className="group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Navigation</h4>
            <ul className="flex flex-col gap-4">
              {portfolioData.navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.path} className="text-text-secondary hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="mt-4 pt-4 border-t border-white/5">
                <Link to="/docs" className="text-primary font-bold hover:text-white transition-colors flex items-center gap-2 group">
                  <Code2 size={16} className="group-hover:rotate-12 transition-transform" /> 
                  Technical Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Get in Touch</h4>
            <p className="text-text-secondary mb-4">
              Interested in working together? Drop me an email.
            </p>
            <a href={`mailto:${portfolioData.email}`} className="text-primary font-bold hover:underline">
              {portfolioData.email}
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-sm">
            © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm group"
          >
            Back to Top <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
