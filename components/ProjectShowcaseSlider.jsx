'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const SHOWCASE_PROJECTS = [
  {
    title: 'ARTHDRISHTI — EXPLAINABLE AI PLATFORM',
    subtitle: 'NEXT.JS · NODE.JS · EXPRESS · MONGODB · CLERK AUTH · AI/ML WORKFLOWS',
    github: 'https://github.com/RahulChahar2004/ArthDrishtii',
    live: null,
    badge: 'ZERO MOTION BLUR 60FPS',
    id: '01 / 06',
  },
  {
    title: 'VIRAASAT — FASHION E-COMMERCE STOREFRONT',
    subtitle: 'NEXT.JS 14 · TAILWIND CSS · CLERK AUTH · RAZORPAY · VERCEL LIVE',
    github: 'https://github.com/RahulChahar2004/ECommerece-Frontend',
    live: 'https://viraasatclothing.store',
    badge: 'LIVE STOREFRONT',
    id: '02 / 06',
  },
  {
    title: 'TRUTHGUARD — AI FAKE NEWS & SPAM DETECTION',
    subtitle: 'NEXT.JS · PYTHON · RAG ENGINE · JWT · GOOGLE OAUTH · DEEPFAKE VERIFICATION',
    github: 'https://github.com/RahulChahar2004/TruthGuard',
    live: null,
    badge: 'AI & RAG ENGINE',
    id: '03 / 06',
  },
  {
    title: 'BANKING SYSTEM — ENTERPRISE BANKING LEDGER',
    subtitle: 'POSTGRESQL · NEON DB · PRISMA ORM · NODE.JS · ENCRYPTED FUND TRANSFERS',
    github: 'https://github.com/RahulChahar2004',
    live: null,
    badge: 'FINTECH LEDGER',
    id: '04 / 06',
  },
  {
    title: 'NETFLIX CLONE — CINEMA STREAMING INTERFACE',
    subtitle: 'REACT.JS · TMDB REALTIME API · TAILWIND CSS · HIGH-FPS CAROUSEL UI',
    github: 'https://github.com/RahulChahar2004',
    live: null,
    badge: 'STREAMING PLATFORM',
    id: '05 / 06',
  },
  {
    title: 'VIBEBITE — MUSIC TASTE & FOOD RECOMMENDER',
    subtitle: 'NEXT.JS · AUDIO VIBE MATCHER · MONGODB · EXPRESS · INTERNPRO HACKATHON',
    github: 'https://github.com/RahulChahar2004/VibeBite-Foodoscope',
    live: null,
    badge: 'AUDIO & FOODOSCOPE',
    id: '06 / 06',
  },
];

export default function ProjectShowcaseSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 2 seconds (2000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SHOWCASE_PROJECTS.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const currentProject = SHOWCASE_PROJECTS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SHOWCASE_PROJECTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SHOWCASE_PROJECTS.length) % SHOWCASE_PROJECTS.length);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-none border border-white/10 bg-black/25 p-4 md:p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300">
      {/* Top Animated Cyber Progress Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10 overflow-hidden">
        <div
          key={currentIndex}
          className="h-full bg-gradient-to-r from-cyan-400/80 via-blue-500/80 to-purple-500/80"
          style={{
            animation: 'progressFill 2s linear infinite',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>

      {/* Top Header Badge Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-4">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono-luxury font-medium tracking-widest text-white/40 uppercase">
            SYSTEM DASHBOARD V2.1 // FEATURED HIGHLIGHT
          </span>
        </div>

        <span className="text-[9px] sm:text-[10px] font-mono-luxury font-normal text-white/60 bg-white/5 px-2 py-0.5 uppercase border border-white/10 tracking-wider">
          {currentProject.badge}
        </span>
      </div>

      {/* Animated Sliding Content Block */}
      <div className="min-h-[100px] flex flex-col justify-center items-center text-center px-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.title}
            initial={{ opacity: 0, y: 8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex flex-col items-center w-full"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-editorial font-black text-white/90 uppercase tracking-tight drop-shadow-md">
              {currentProject.title}
            </h3>

            <p className="text-[9.5px] sm:text-[10.5px] font-mono-luxury font-normal text-white/45 uppercase mt-1.5 tracking-wider max-w-xl">
              {currentProject.subtitle}
            </p>

            {/* Direct Action Buttons */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 relative z-30 pointer-events-auto">
              {currentProject.github && (
                <a
                  href={currentProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentProject.github) window.open(currentProject.github, '_blank', 'noopener,noreferrer');
                  }}
                  className="inline-flex items-center gap-1.5 bg-white/15 text-white border border-white/40 px-5 py-2 text-[10.5px] font-mono-luxury font-extrabold tracking-widest uppercase backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.95)] hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto relative z-30"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>EXPLORE {currentProject.title.split('—')[0].trim()} REPO →</span>
                </a>
              )}

              {currentProject.live && (
                <a
                  href={currentProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentProject.live) window.open(currentProject.live, '_blank', 'noopener,noreferrer');
                  }}
                  className="inline-flex items-center gap-1.5 border border-amber-400/60 bg-amber-500/10 text-amber-300 px-5 py-2 text-[10.5px] font-mono-luxury font-extrabold tracking-widest uppercase transition-all duration-300 hover:bg-amber-400 hover:text-black hover:border-amber-400 hover:shadow-[0_0_25px_rgba(251,191,36,0.9)] hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto relative z-30"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>LIVE STOREFRONT →</span>
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls & Selector Dots */}
      <div className="mt-4 border-t border-white/10 pt-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="flex h-5 w-5 items-center justify-center border border-white/15 bg-white/5 text-white/70 hover:bg-white hover:text-black transition-all"
            title="Previous Project"
          >
            <ChevronLeft className="h-3 w-3" />
          </button>
          <button
            onClick={handleNext}
            className="flex h-5 w-5 items-center justify-center border border-white/15 bg-white/5 text-white/70 hover:bg-white hover:text-black transition-all"
            title="Next Project"
          >
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        {/* Clickable Index Selector Dots */}
        <div className="flex items-center gap-1">
          {SHOWCASE_PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1 transition-all ${
                i === currentIndex
                  ? 'w-4 bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.7)]'
                  : 'w-1 bg-white/15 hover:bg-white/40'
              }`}
              title={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        <span className="text-[9px] font-mono-luxury text-white/30 uppercase tracking-widest">
          AUTO-SLIDE (2S)
        </span>
      </div>
    </div>
  );
}


