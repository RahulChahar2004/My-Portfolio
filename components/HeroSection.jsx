'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Terminal,
  Play,
  Code2,
  Server,
  Database,
  Layers,
  Copy,
  Check,
  Zap,
  Globe,
  RotateCcw
} from 'lucide-react';

export default function HeroSection({ scrollProgress, forceVisible = false }) {
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');
  const [activeChip, setActiveChip] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Live India Time Clock (IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTime(timeString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rahulchahar.dev@gmail.com');
    setCopied(true);
    showToast('EMAIL COPIED TO CLIPBOARD');
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToProjects = () => {
    if (typeof window !== 'undefined' && window.lenis) {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      window.lenis.scrollTo(totalHeight * 0.52, { duration: 1.4 });
    } else if (typeof window !== 'undefined') {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: totalHeight * 0.52, behavior: 'smooth' });
    }
    showToast('NAVIGATING TO FEATURED PROJECTS');
  };

  const triggerReplay = () => {
    setAnimationKey((prev) => prev + 1);
    showToast('REPLAYING KINETIC LETTER INTRO');
  };

  // Opacity & transform mapped smoothly to 0.0 - 0.18 scroll range
  const opacity = forceVisible ? 1 : Math.max(0, 1 - scrollProgress * 6);
  const translateY = (forceVisible || shouldReduceMotion) ? 0 : scrollProgress * -90;

  if (!forceVisible && opacity <= 0.01) return null;

  const techBadges = [
    { id: 'next', label: 'NEXT.JS 15 & REACT', icon: Code2, highlight: 'App Router & Production SSR' },
    { id: 'stack', label: 'FULL STACK DEV', icon: Server, highlight: 'Node.js, Express & REST APIs' },
    { id: 'db', label: 'MONGODB & AUTH', icon: Database, highlight: 'NoSQL Schemas & Clerk' },
    { id: 'dsa', label: 'DSA & ALGORITHMS', icon: Terminal, highlight: 'C++ & Problem Solving' },
  ];

  // Letters animation variants (staggered over ~2.8 - 3s)
  const firstName = 'RAHUL'.split('');
  const lastName = 'CHAHAR'.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 90,
      rotateX: -90,
      scale: 0.4,
      filter: 'blur(14px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div
      key={animationKey}
      style={{ opacity, transform: `translateY(${translateY}px)` }}
      className="pointer-events-auto relative flex flex-col items-center justify-center max-w-5xl px-4 text-center transition-opacity duration-200"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-cyan-500/40 bg-black/90 px-5 py-2 text-xs font-mono-luxury font-bold tracking-widest text-cyan-300 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.3)]"
          >
            <Zap className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Glow Aura Behind Hero Name */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Top Live Status & IST Clock Pill */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center justify-center gap-3 mb-6 text-xs font-mono-luxury"
      >
        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-[11px] font-bold tracking-wider text-emerald-400 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="uppercase">AVAILABLE FOR SELECT PROJECTS & ROLES</span>
        </div>

        {time && (
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3.5 py-1.5 text-[11px] font-medium tracking-wider text-white/70 backdrop-blur-md">
            <Globe className="h-3 w-3 text-cyan-400" />
            <span>IST {time}</span>
          </div>
        )}
      </motion.div>

      {/* Main High-Impact Letter-by-Letter Display Title (3sec Stagger Animation) */}
      <motion.h1
        variants={containerVariants}
        initial={shouldReduceMotion ? "visible" : "hidden"}
        animate="visible"
        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-editorial font-black tracking-tighter text-white uppercase leading-none drop-shadow-2xl select-none flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 md:gap-x-8 my-2 perspective-1000"
      >
        {/* Word 1: RAHUL */}
        <span className="inline-flex overflow-hidden py-2">
          {firstName.map((char, index) => (
            <motion.span
              key={`rahul-${index}`}
              variants={letterVariants}
              whileHover={{
                scale: 1.18,
                y: -6,
                color: '#22d3ee',
                textShadow: '0 0 25px rgba(34, 211, 238, 0.9)',
                transition: { duration: 0.15 }
              }}
              className="inline-block bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent transform-gpu cursor-pointer transition-colors"
            >
              {char}
            </motion.span>
          ))}
        </span>

        {/* Word 2: CHAHAR */}
        <span className="inline-flex overflow-hidden py-2">
          {lastName.map((char, index) => (
            <motion.span
              key={`chahar-${index}`}
              variants={letterVariants}
              whileHover={{
                scale: 1.18,
                y: -6,
                color: '#22d3ee',
                textShadow: '0 0 25px rgba(34, 211, 238, 0.9)',
                transition: { duration: 0.15 }
              }}
              className="inline-block bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent transform-gpu cursor-pointer transition-colors"
            >
              {char}
            </motion.span>
          ))}
        </span>
      </motion.h1>

      {/* Clean Single-Line Subtitle (Fades in after name reveal completes at ~1.8s) */}
      <motion.p
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 text-xs md:text-sm font-mono-luxury font-extrabold tracking-[0.3em] text-cyan-400/90 uppercase"
      >
        SOFTWARE ENGINEER // FULL STACK WEB DEVELOPER
      </motion.p>

      {/* Sharp High-Contrast Luxury Action Buttons (Fades in at ~2.0s) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="/projects"
          className="group relative inline-flex items-center gap-3 bg-white px-8 py-3.5 text-xs font-mono-luxury font-extrabold tracking-[0.15em] text-black uppercase hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] cursor-pointer"
        >
          <span>EXPLORE PROJECTS</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
        </Link>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 border border-white/30 bg-black/60 px-8 py-3.5 text-xs font-mono-luxury font-extrabold tracking-[0.15em] text-white uppercase hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md"
        >
          <span>GET IN TOUCH</span>
          <Play className="h-3 w-3 fill-current" />
        </a>
      </motion.div>

      {/* Interactive Cyber HUD Command Bar (Fades in at ~2.2s) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 flex items-center gap-2 rounded-xl border border-white/10 bg-black/50 px-4 py-2 text-[11px] font-mono-luxury text-white/60 backdrop-blur-md"
      >
        <Terminal className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
        <span className="text-white/40">$</span>
        <button
          onClick={handleCopyEmail}
          className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors cursor-pointer"
          title="Click to copy email address"
        >
          <span>copy_contact()</span>
          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3 text-white/40 hover:text-white" />}
        </button>
        <span className="text-white/20">|</span>
        <Link
          href="/projects"
          className="hover:text-cyan-300 transition-colors cursor-pointer"
        >
          exec_projects()
        </Link>
        <span className="text-white/20">|</span>
        <button
          onClick={triggerReplay}
          className="flex items-center gap-1 text-white/40 hover:text-cyan-300 transition-colors cursor-pointer"
          title="Replay letter animation"
        >
          <RotateCcw className="h-3 w-3" />
          <span>replay()</span>
        </button>
      </motion.div>
    </div>
  );
}


