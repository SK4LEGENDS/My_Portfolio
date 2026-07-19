import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, MapPin } from 'lucide-react';
import { GitHub, LinkedIn, XIcon } from '../components/Icons';
import PageWrapper from '../components/PageWrapper';
import { portfolioData } from '../data/portfolio';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "853fcda3-ca2b-484e-8dba-11b13cd4a7c0", // GET YOUR KEY AT web3forms.com
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSent(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error("Error submitting form:", result);
        alert("Something went wrong! Please try again later.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to send message. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Side: Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-black mb-3">Let's <span className="text-gradient">Connect</span></h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and interesting ideas.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 glass rounded-2xl border border-white/5 group hover:border-primary/50 transition-colors">
              <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-0.5">Email Me</h4>
                <p className="text-lg font-bold">{portfolioData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 glass rounded-2xl border border-white/5 group hover:border-primary/50 transition-colors">
              <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-all">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-0.5">Location</h4>
                <p className="text-lg font-bold">Chennai, Tamil Nadu</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4">Social Profiles</h4>
            <div className="flex gap-3">
              <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-xl text-white hover:text-primary transition-all hover:-translate-y-1"><GitHub size={20} /></a>
              <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-xl text-white hover:text-primary transition-all hover:-translate-y-1"><LinkedIn size={20} /></a>
              <a href={portfolioData.socials.x} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-xl text-white hover:text-primary transition-all hover:-translate-y-1"><XIcon size={20} /></a>
              <a href={`mailto:${portfolioData.email}`} className="p-3 glass rounded-xl text-white hover:text-primary transition-all hover:-translate-y-1"><Mail size={20} /></a>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-surface p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-orange" />

            {isSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-3">Message Sent!</h2>
                <p className="text-text-secondary mb-6 text-sm">Thanks for reaching out. I'll get back to you as soon as possible.</p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-6 py-2.5 glass text-white rounded-xl font-bold hover:bg-white/10 transition-all text-sm"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary ml-1">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-dark px-4 py-3 rounded-xl border border-white/5 focus:border-primary outline-none transition-all text-white text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary ml-1">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-dark px-4 py-3 rounded-xl border border-white/5 focus:border-primary outline-none transition-all text-white text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-secondary ml-1">Subject</label>
                  <input
                    required
                    type="text"
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-dark px-4 py-3 rounded-xl border border-white/5 focus:border-primary outline-none transition-all text-white text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-secondary ml-1">Message</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-dark px-4 py-3 rounded-xl border border-white/5 focus:border-primary outline-none transition-all text-white resize-none text-sm"
                  />
                </div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-3.5 mt-2 bg-primary text-white rounded-xl font-bold bg-gradient-orange shadow-orange hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-sm"
                >
                  {isSubmitting ? "Sending..." : (
                    <>Send Message <Send size={20} /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Contact;
