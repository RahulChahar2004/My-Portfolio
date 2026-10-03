'use client';

import { useState } from 'react';
import CanvasScrollSequence from '@/components/CanvasScrollSequence';
import ScrollTextOverlays from '@/components/ScrollTextOverlays';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import EducationSection from '@/components/EducationSection';
import ExperienceSection from '@/components/ExperienceSection';
import FooterSection from '@/components/FooterSection';
import { Terminal } from 'lucide-react';

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

export default function PortfolioLandingPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollToPercentage = (percentage) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = totalHeight * percentage;
    if (typeof window !== 'undefined' && window.lenis) {
      window.lenis.scrollTo(targetY, {
        duration: 1.4,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    } else if (typeof window !== 'undefined') {
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    }
  };

  // Header opacity fades out smoothly as user scrolls away from top hero section
  const headerOpacity = Math.max(0, 1 - scrollProgress * 18);
  const headerVisible = headerOpacity > 0.05;

  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-cyan-500 selection:text-black">
      {/* Top Non-Sticky Floating Header (Fades Out On Scroll) */}
      <header
        style={{
          opacity: headerOpacity,
          pointerEvents: headerVisible ? 'auto' : 'none',
          transform: headerVisible ? 'translateY(0)' : 'translateY(-15px)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 md:py-5 border-b border-white/10 bg-[#050505]/70 backdrop-blur-xl"
      >
        <button
          onClick={() => scrollToPercentage(0)}
          className="group flex items-center gap-2.5 transition-all duration-300 text-left cursor-pointer"
        >
          {/* Cyber Emblem Monogram */}
          <div className="relative flex h-8 w-8 items-center justify-center border border-white/20 bg-black/30 backdrop-blur-sm group-hover:border-white group-hover:bg-white transition-all duration-300">
            <span className="font-editorial text-xs font-black text-white group-hover:text-black transition-colors tracking-tight">RR</span>
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
          </div>

          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-editorial font-black tracking-wider text-white group-hover:text-neutral-200 transition-colors uppercase">
                ROHNYROCKSTAR
              </span>
              <span className="text-[9px] font-mono-luxury font-bold text-white/40 uppercase tracking-widest">
                v2.5
              </span>
            </div>
            <span className="text-[9px] font-mono-luxury font-bold text-white/50 tracking-[0.2em] uppercase mt-0.5">
              SOFTWARE ARCHITECT
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-mono-luxury font-bold tracking-[0.15em] text-white/70">
          <button
            onClick={() => scrollToPercentage(0)}
            className={`transition-colors hover:text-white ${scrollProgress < 0.18 ? 'text-white font-extrabold underline underline-offset-8 decoration-2' : ''}`}
          >
            HERO
          </button>
          <button
            onClick={() => scrollToPercentage(0.28)}
            className={`transition-colors hover:text-white ${scrollProgress >= 0.18 && scrollProgress < 0.38 ? 'text-white font-extrabold underline underline-offset-8 decoration-2' : ''}`}
          >
            SKILLS
          </button>
          <button
            onClick={() => scrollToPercentage(0.52)}
            className={`transition-colors hover:text-white ${scrollProgress >= 0.38 && scrollProgress < 0.65 ? 'text-white font-extrabold underline underline-offset-8 decoration-2' : ''}`}
          >
            PROJECTS
          </button>
          <button
            onClick={() => scrollToPercentage(0.75)}
            className={`transition-colors hover:text-white ${scrollProgress >= 0.65 && scrollProgress < 0.84 ? 'text-white font-extrabold underline underline-offset-8 decoration-2' : ''}`}
          >
            EDUCATION
          </button>
          <button
            onClick={() => scrollToPercentage(0.89)}
            className={`transition-colors hover:text-white ${scrollProgress >= 0.84 && scrollProgress < 0.94 ? 'text-white font-extrabold underline underline-offset-8 decoration-2' : ''}`}
          >
            EXPERIENCE
          </button>
          <button
            onClick={() => scrollToPercentage(0.96)}
            className={`transition-colors hover:text-white ${scrollProgress >= 0.94 ? 'text-white font-extrabold underline underline-offset-8 decoration-2' : ''}`}
          >
            CONTACT
          </button>
        </nav>

        {/* Social & Direct Contact CTA */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/RahulChahar2004"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="hidden sm:flex h-9 w-9 items-center justify-center border border-white/20 bg-white/5 text-white hover:bg-white hover:text-black transition-all"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/in/rahul-chahar-b95a34321"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="hidden sm:flex h-9 w-9 items-center justify-center border border-white/20 bg-white/5 text-white hover:bg-white hover:text-black transition-all"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <button
            onClick={() => scrollToPercentage(0.96)}
            className="bg-white px-6 py-2.5 text-xs font-mono-luxury font-extrabold tracking-widest text-black uppercase hover:bg-neutral-200 transition-all shadow-md"
          >
            GET IN TOUCH
          </button>
        </div>
      </header>

      {/* Pinned Bottom-Left Compact Mini RR Emblem Badge (Active On Scroll) */}
      <div
        className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${
          scrollProgress > 0.05 ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        }`}
      >
        <button
          onClick={() => scrollToPercentage(0)}
          className="group relative flex h-9 w-9 items-center justify-center border border-white/20 bg-black/35 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:border-white hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:scale-110 transition-all duration-300 cursor-pointer"
          title="ROHNYROCKSTAR // Return to Top ↑"
        >
          <span className="font-editorial text-xs font-black text-white group-hover:text-black transition-colors tracking-tight">RR</span>
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
        </button>
      </div>

      {/* DESKTOP / MAC / LAPTOP VIEW (>= 768px): 800vh Pinned Canvas Sticky Scroll Sequence */}
      <section className="hidden md:block relative w-full">
        <CanvasScrollSequence onScrollProgress={setScrollProgress} />
        <ScrollTextOverlays scrollProgress={scrollProgress} />
      </section>

      {/* MOBILE VIEW (< 768px): Video Canvas Frames Removed After Hero Section */}
      <div className="block md:hidden relative w-full pt-28 pb-16 px-4">
        {/* Mobile Hero Section */}
        <section id="hero-mobile" className="min-h-[85vh] flex items-center justify-center py-8">
          <HeroSection scrollProgress={0} forceVisible />
        </section>

        {/* Mobile Skills Section */}
        <section id="skills-mobile" className="py-10 border-t border-white/10">
          <SkillsSection scrollProgress={0.28} forceVisible />
        </section>

        {/* Mobile Projects Section */}
        <section id="projects-mobile" className="py-10 border-t border-white/10">
          <ProjectsSection scrollProgress={0.52} forceVisible />
        </section>

        {/* Mobile Education Section */}
        <section id="education-mobile" className="py-10 border-t border-white/10">
          <EducationSection scrollProgress={0.75} forceVisible />
        </section>

        {/* Mobile Experience Section */}
        <section id="experience-mobile" className="py-10 border-t border-white/10">
          <ExperienceSection scrollProgress={0.89} forceVisible />
        </section>
      </div>

      {/* Unpinned Footer Section */}
      <FooterSection />
    </main>
  );
}

