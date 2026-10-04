'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import ProjectShowcaseSlider from '@/components/ProjectShowcaseSlider';
import {
  ArrowLeft,
  RotateCcw,
  Box,
  LayoutGrid,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  ShoppingBag,
  Landmark,
  Film,
  Music,
  Terminal,
  ArrowUp
} from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PROJECT_CARDS = [
  {
    id: '01 / 06',
    tag: 'EXPLAINABLE AI',
    title: 'ARTHDRISHTI',
    subtitle: 'Financial Intelligence Platform',
    description: '40+ responsive pages for Customer, Officer, and Admin portals with role-based auth & AI credit scoring.',
    techStack: ['Next.js', 'MongoDB', 'Node.js', 'Clerk Auth'],
    image: '/projects/arthdrishti.png',
    github: 'https://github.com/RahulChahar2004/ArthDrishtii',
    live: null,
    icon: Landmark,
  },
  {
    id: '02 / 06',
    tag: 'AI & DEEPFAKE',
    title: 'TRUTHGUARD',
    subtitle: 'AI Fact-Checking Engine',
    description: 'RAG-based fact checking platform with Google OAuth, JWT security, and deepfake verification APIs.',
    techStack: ['Next.js', 'Python', 'RAG', 'JWT'],
    image: '/projects/truthguard.png',
    github: 'https://github.com/RahulChahar2004/TruthGuard',
    live: null,
    icon: ShieldCheck,
  },
  {
    id: '03 / 06',
    tag: 'E-COMMERCE',
    title: 'VIRAASAT',
    subtitle: 'Fashion E-Commerce Storefront',
    description: 'Full-stack live fashion e-commerce with wishlist, cart, Clerk auth, and Razorpay payment gateway.',
    techStack: ['Next.js 14', 'Tailwind', 'Razorpay', 'Clerk'],
    image: '/projects/viraasat.png',
    github: 'https://github.com/RahulChahar2004/ECommerece-Frontend',
    live: 'https://viraasatclothing.store',
    icon: ShoppingBag,
  },
  {
    id: '04 / 06',
    tag: 'FINTECH SYSTEM',
    title: 'BANKING SYSTEM',
    subtitle: 'Enterprise Banking Ledger',
    description: 'Full-stack banking application with PostgreSQL, Neon database, Prisma ORM, and encrypted fund transfers.',
    techStack: ['PostgreSQL', 'Prisma', 'Node.js', 'Express'],
    image: '/projects/banking.png',
    github: 'https://github.com/RahulChahar2004/Banking-System',
    live: null,
    icon: Landmark,
  },
  {
    id: '05 / 06',
    tag: 'STREAMING UI',
    title: 'NETFLIX CLONE',
    subtitle: 'Cinema Streaming Interface',
    description: 'High-performance video streaming web interface with real-time TMDB API integration and carousels.',
    techStack: ['React', 'TMDB API', 'Tailwind CSS'],
    image: '/projects/netflix.png',
    github: 'https://github.com/RahulChahar2004/Netflix-Clone',
    live: null,
    icon: Film,
  },
  {
    id: '06 / 06',
    tag: 'FOODOSCOPE & AI',
    title: 'VIBEBITE',
    subtitle: 'Music Taste & Food Recommender',
    description: 'Foodoscope platform matching user playlist vibes with comfort food recommendations.',
    techStack: ['Next.js', 'Audio AI', 'MongoDB', 'Express'],
    image: '/vibebite.jpg',
    github: 'https://github.com/RahulChahar2004/VibeBite-Foodoscope',
    live: null,
    icon: Music,
  },
];

export default function ProjectsPage() {
  const [mode, setMode] = useState('vortex'); // 'vortex' | 'float' | 'grid'
  const [isAssembling, setIsAssembling] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  // Trigger dynamic 45° Camera Arc & Card Un-swirl Timeline over 3.5 seconds
  const triggerAssemblyVortex = () => {
    setMode('vortex');
    setIsAssembling(true);
    setTimeout(() => {
      setIsAssembling(false);
    }, 3500);
  };

  useEffect(() => {
    triggerAssemblyVortex();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Stage rotation calculations
  const stageRotateY = mode === 'vortex'
    ? (isAssembling ? -45 : 0) + mousePos.x * 10
    : mousePos.x * 15;

  const stageRotateX = mode === 'vortex'
    ? (isAssembling ? 18 : 0) - mousePos.y * 10
    : -mousePos.y * 15;

  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* Volumetric Background Glow & Interactive Mouse Ambient Orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Top Radial Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.22)_0%,rgba(168,85,247,0.12)_45%,transparent_70%)] blur-3xl animate-pulse" />
        
        {/* Dynamic Mouse-Following Glow Orb */}
        <div
          style={{
            transform: `translate(${mousePos.x * 120}px, ${mousePos.y * 120}px)`,
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(6,182,212,0.15)_0%,rgba(59,130,246,0.08)_40%,transparent_70%)] blur-3xl"
        />

        {/* Floating Cyber Beams */}
        <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,transparent_60%)] blur-3xl" />
        <div className="absolute bottom-10 -right-40 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(6,182,212,0.14)_0%,transparent_60%)] blur-3xl" />
      </div>

      {/* Pinned Bottom-Left Compact Mini RR Emblem Badge */}
      <div className="fixed bottom-6 left-6 z-50 opacity-100 translate-y-0 scale-100 pointer-events-auto">
        <button
          onClick={scrollToTop}
          className="group relative flex h-9 w-9 items-center justify-center border border-cyan-500/30 bg-black/60 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:border-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] hover:scale-110 transition-all duration-300 cursor-pointer"
          title="ROHNYROCKSTAR // Return to Top ↑"
        >
          <span className="font-editorial text-xs font-black text-white group-hover:text-black transition-colors tracking-tight">RR</span>
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
          </span>
        </button>
      </div>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-cyan-500/20 bg-[#050505]/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 font-mono-luxury text-xs font-extrabold tracking-[0.2em] text-white uppercase hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 text-cyan-400" />
          <span>RETURN TO PORTFOLIO ENGINE</span>
        </Link>

        <div className="flex items-center gap-3 border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.25)]">
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
          <span className="font-mono-luxury text-[11px] font-bold tracking-[0.2em] text-cyan-300 uppercase hidden sm:inline">
            CINEMATIC 3D SHOWCASE
          </span>
        </div>
      </header>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        
        {/* Stage Header & Control Bar */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-cyan-500/40 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono-luxury font-bold tracking-[0.2em] text-cyan-300 uppercase mb-4 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>RAHUL CHAHAR // FULL STACK ENGINEERING PORTFOLIO</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-editorial font-black tracking-tight uppercase text-white leading-none drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]"
          >
            FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">PROJECTS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-xs md:text-sm font-mono-luxury font-bold text-white/70 uppercase tracking-widest leading-relaxed max-w-2xl mx-auto"
          >
            Production-grade full stack applications, explainable AI platforms, live fashion e-commerce storefronts & system architectures built with Next.js, React, Node.js & Python.
          </motion.p>

          {/* Kinetic Mode Control Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={triggerAssemblyVortex}
              className={`inline-flex items-center gap-2 border px-6 py-3 text-xs font-mono-luxury font-extrabold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                mode === 'vortex'
                  ? 'bg-cyan-400 text-black border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.6)]'
                  : 'bg-black/60 text-white border-white/20 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]'
              }`}
            >
              <RotateCcw className={`h-3.5 w-3.5 ${isAssembling ? 'animate-spin text-black' : ''}`} />
              <span>RE-ASSEMBLE 3D SHOWCASE (45° ARC)</span>
            </button>

            <button
              onClick={() => { setMode('float'); setIsAssembling(false); }}
              className={`inline-flex items-center gap-2 border px-6 py-3 text-xs font-mono-luxury font-extrabold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                mode === 'float'
                  ? 'bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.5)]'
                  : 'bg-black/60 text-white border-white/20 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]'
              }`}
            >
              <Box className="h-3.5 w-3.5" />
              <span>3D FLOAT VIEW</span>
            </button>
          </motion.div>
        </div>

        {/* 3D VORTEX & CAMERA ARC STAGE */}
        <div
          style={{
            transform: shouldReduceMotion
              ? 'none'
              : `perspective(1200px) rotateY(${stageRotateY}deg) rotateX(${stageRotateX}deg)`,
            transition: isAssembling
              ? 'transform 3.5s cubic-bezier(0.16, 1, 0.3, 1)'
              : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transformStyle: 'preserve-3d',
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12"
        >
          {PROJECT_CARDS.map((project, i) => {
            // Calculate 3D vortex scatter vs float vs grid offset
            let cardTransform = 'translate3d(0,0,0) rotateX(0deg) rotateY(0deg) scale(1)';
            
            if (isAssembling) {
              const scatterPositions = [
                'translate3d(-180px, -120px, 240px) rotateY(-35deg) rotateX(25deg) scale(0.8)',
                'translate3d(200px, -140px, -160px) rotateY(40deg) rotateX(-20deg) scale(0.8)',
                'translate3d(-220px, 100px, -200px) rotateY(-30deg) rotateX(30deg) scale(0.8)',
                'translate3d(240px, 120px, 180px) rotateY(35deg) rotateX(-25deg) scale(0.8)',
                'translate3d(-120px, 160px, 100px) rotateY(-40deg) rotateX(20deg) scale(0.8)',
                'translate3d(140px, -80px, 220px) rotateY(30deg) rotateX(-30deg) scale(0.8)',
              ];
              cardTransform = scatterPositions[i % scatterPositions.length];
            } else if (mode === 'float') {
              const floatOffsets = [
                'translate3d(0, -20px, 60px) rotateY(-8deg)',
                'translate3d(0, 20px, -40px) rotateY(8deg)',
                'translate3d(0, -15px, 80px) rotateY(-6deg)',
                'translate3d(0, 25px, -60px) rotateY(10deg)',
                'translate3d(0, -25px, 40px) rotateY(-10deg)',
                'translate3d(0, 15px, 70px) rotateY(6deg)',
              ];
              cardTransform = floatOffsets[i % floatOffsets.length];
            }

            const CardIcon = project.icon;

            return (
              <div
                key={project.title}
                style={{
                  transform: shouldReduceMotion ? 'none' : cardTransform,
                  transition: isAssembling
                    ? `all 3.2s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`
                    : 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  transformStyle: 'preserve-3d',
                }}
                className="group relative flex flex-col justify-between border border-white/20 bg-black/70 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:border-cyan-400 hover:bg-black/90 hover:shadow-[0_30px_70px_-15px_rgba(6,182,212,0.55),0_0_35px_rgba(168,85,247,0.35),inset_0_0_20px_rgba(6,182,212,0.2)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 overflow-hidden"
              >
                {/* 3D Floor Shadow Glow Reflection beneath card */}
                <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-cyan-500/0 group-hover:bg-cyan-500/35 rounded-[100%] blur-xl transition-all duration-500" />

                {/* Glowing Corner Accents */}
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-transparent group-hover:border-cyan-400 transition-colors duration-300" />
                <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-transparent group-hover:border-cyan-400 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-transparent group-hover:border-cyan-400 transition-colors duration-300" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-transparent group-hover:border-cyan-400 transition-colors duration-300" />

                {/* Subtle Ambient Hover Glow Beam */}
                <div className="pointer-events-none absolute -top-24 -left-24 w-56 h-56 bg-cyan-500/0 group-hover:bg-cyan-500/20 rounded-full blur-2xl transition-all duration-500" />

                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 group-hover:border-cyan-500/30 transition-colors">
                    <span className="text-[10px] font-mono-luxury font-bold text-white/50 group-hover:text-cyan-400 transition-colors uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {project.id}
                    </span>
                    <span className="text-[10px] font-mono-luxury font-bold text-white bg-white/10 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 group-hover:border-cyan-500/40 px-2.5 py-0.5 uppercase border border-white/10 transition-all shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                      {project.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <CardIcon className="h-5 w-5 text-white/70 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_12px_#22d3ee] transition-all" />
                    <h3 className="text-xl font-editorial font-bold text-white tracking-tight uppercase group-hover:text-cyan-200 transition-colors drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs font-mono-luxury font-bold text-white/60 group-hover:text-white/80 transition-colors uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {project.subtitle}
                  </p>

                  <p className="text-xs text-white/75 group-hover:text-white/90 leading-relaxed font-light mt-3 transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/5 pt-3 group-hover:border-cyan-500/20 transition-colors">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-white/10 bg-white/5 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 group-hover:text-cyan-300 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.25)] px-2 py-0.5 text-[10px] font-mono-luxury text-white/70 transition-all shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Links */}
                <div
                  style={{ transform: 'translateZ(25px)' }}
                  className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between gap-3 relative z-50 pointer-events-auto group-hover:border-cyan-500/30 transition-colors"
                >
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (project.github) window.open(project.github, '_blank', 'noopener,noreferrer');
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 border border-white/40 bg-black/90 px-3.5 py-2 text-xs font-mono-luxury font-extrabold tracking-wider text-white uppercase hover:border-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all cursor-pointer pointer-events-auto relative z-50 shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      <span>REPO →</span>
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (project.live) window.open(project.live, '_blank', 'noopener,noreferrer');
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-cyan-400 px-3.5 py-2 text-xs font-mono-luxury font-extrabold tracking-wider text-black uppercase hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] transition-all cursor-pointer pointer-events-auto relative z-50 shadow-[0_8px_25px_rgba(6,182,212,0.45)]"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>LIVE STORE →</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cyber-Glow Auto-Sliding Repository Showcase Engine */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16"
        >
          <ProjectShowcaseSlider />
        </motion.div>

        {/* Footer Navigation Bar */}
        <div className="mt-20 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono-luxury text-white/50">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>RETURN TO MAIN PORTFOLIO ENGINE</span>
          </Link>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 border border-white/20 bg-black px-4 py-2 text-white hover:bg-white hover:text-black transition-all uppercase font-bold"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </main>
  );
}
