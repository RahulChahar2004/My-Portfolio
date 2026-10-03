'use client';

import { useState } from 'react';
import {
  Mail,
  ArrowUpRight,
  ArrowUp,
  Check,
  Copy,
  Terminal,
  Send,
  Phone,
  ArrowRight
} from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function FooterSection() {
  const [copied, setCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const email = 'rahul.s.chahr20004@gmail.com';
  const phone = '+91 8433492905';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setNewsletterEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative z-40 bg-[#050505] border-t border-white/15 px-6 py-16 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Main High-Contrast Editorial Contact Hero Block */}
        <div className="border border-white/20 bg-black/40 p-8 md:p-12 mb-16 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-[11px] font-mono-luxury font-bold tracking-[0.25em] text-white/50 uppercase block mb-3">
                DIRECT INQUIRY // CONTACT & CONNECT
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-editorial font-black tracking-tight uppercase leading-none">
                BUILD THE FUTURE WITH RAHUL CHAHAR.
              </h2>

              <p className="mt-4 text-sm md:text-base font-light text-white/70 max-w-xl leading-relaxed">
                Software Engineer & Full Stack Web Developer. Open for full-stack contracts, frontend architecture, and engineering roles.
              </p>

              {/* Direct Info Pill Row */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3 border border-white/20 bg-white/5 px-4 py-2.5 font-mono-luxury text-xs text-white">
                  <Mail className="h-4 w-4 text-white/70" />
                  <span className="select-all font-semibold">{email}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="ml-2 bg-white text-black px-2.5 py-0.5 text-[10px] font-mono-luxury font-bold uppercase hover:bg-neutral-200 transition-all"
                  >
                    {copied ? 'COPIED' : 'COPY'}
                  </button>
                </div>

                <div className="flex items-center gap-3 border border-white/20 bg-white/5 px-4 py-2.5 font-mono-luxury text-xs font-semibold text-white">
                  <Phone className="h-4 w-4 text-white/70" />
                  <span>{phone}</span>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form / Newsletter Input (Inspired by Mafia Game Newsletter Box) */}
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-10">
              <span className="text-xs font-mono-luxury font-extrabold tracking-widest text-white/50 uppercase block mb-3">
                QUICK DIRECT MESSAGE
              </span>

              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <div className="flex items-center border border-white/20 bg-black">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-transparent px-4 py-3 text-xs font-mono-luxury text-white placeholder-white/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-white text-black px-4 py-3 hover:bg-neutral-200 transition-all shrink-0"
                    title="Send Inquiry"
                  >
                    {submitted ? <Check className="h-4 w-4 text-black" /> : <ArrowRight className="h-4 w-4" />}
                  </button>
                </div>

                {submitted && (
                  <p className="text-[11px] font-mono-luxury text-emerald-400">
                    Message sent! Rahul will get back to you shortly.
                  </p>
                )}

                <div className="flex items-center gap-3 mt-4">
                  <a
                    href="https://github.com/RahulChahar2004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-between border border-white/20 bg-white/5 px-4 py-3 text-xs font-mono-luxury font-bold text-white hover:bg-white hover:text-black transition-all"
                  >
                    <span className="flex items-center gap-2"><GithubIcon className="h-4 w-4" /> GITHUB</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href="https://linkedin.com/in/rahul-chahar-b95a34321"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-between border border-white/20 bg-white/5 px-4 py-3 text-xs font-mono-luxury font-bold text-white hover:bg-white hover:text-black transition-all"
                  >
                    <span className="flex items-center gap-2"><LinkedinIcon className="h-4 w-4" /> LINKEDIN</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </form>
            </div>

          </div>
        </div>

        {/* Multi-Column Links Section (Inspired by MAFIA THE GAME footer columns in the reference image) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-white/10 pb-12 mb-8 text-xs font-mono-luxury">
          
          <div className="col-span-2">
            <h3 className="text-2xl font-editorial font-black text-white uppercase tracking-tight">
              RAHUL CHAHAR
            </h3>
            <p className="text-[11px] text-white/50 mt-2 max-w-xs font-light">
              Software Engineer specializing in Next.js 14, High-Performance Canvas Physics & Distributed Web Systems.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">SECTIONS</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#hero" className="hover:text-white transition-colors">Hero Overview</a></li>
              <li><a href="#skills" className="hover:text-white transition-colors">Skill Matrix</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Featured Projects</a></li>
              <li><a href="#education" className="hover:text-white transition-colors">Academic Story</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">PROJECTS</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="https://github.com/RahulChahar2004/ArthDrishtii" target="_blank" rel="noopener" className="hover:text-white transition-colors">ArthDrishti</a></li>
              <li><a href="https://viraasatclothing.store" target="_blank" rel="noopener" className="hover:text-white transition-colors">Viraasat Store</a></li>
              <li><a href="https://github.com/RahulChahar2004/TruthGuard" target="_blank" rel="noopener" className="hover:text-white transition-colors">TruthGuard AI</a></li>
              <li><a href="https://github.com/RahulChahar2004/VibeBite-Foodoscope" target="_blank" rel="noopener" className="hover:text-white transition-colors">VibeBite AI</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">CONNECT</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="https://github.com/RahulChahar2004" target="_blank" rel="noopener" className="hover:text-white transition-colors">GitHub (16+ Repos)</a></li>
              <li><a href="https://linkedin.com/in/rahul-chahar-b95a34321" target="_blank" rel="noopener" className="hover:text-white transition-colors">LinkedIn Profile</a></li>
              <li><a href={`mailto:${email}`} className="hover:text-white transition-colors">Email Direct</a></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Metadata Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono-luxury text-white/50">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-white" />
            <span>© {new Date().getFullYear()} Rahul Chahar. All Rights Reserved.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 border border-white/20 bg-black px-4 py-2 text-white hover:bg-white hover:text-black transition-all uppercase font-bold"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
