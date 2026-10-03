'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Terminal, Play, Code2, Cpu, Server, Sparkles } from 'lucide-react';

export default function HeroSection({ scrollProgress }) {
  const shouldReduceMotion = useReducedMotion();

  // Opacity & transform mapped smoothly to 0.0 - 0.18 scroll range
  const opacity = Math.max(0, 1 - scrollProgress * 6);
  const translateY = shouldReduceMotion ? 0 : scrollProgress * -90;

  if (opacity <= 0.01) return null;

  return (
    <div
      style={{ opacity, transform: `translateY(${translateY}px)` }}
      className="pointer-events-auto flex flex-col items-center justify-center max-w-6xl px-6 text-center transition-opacity duration-200"
    >
      {/* Top Editorial Overline Quote Line */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-1 mb-6"
      >
        <span className="text-[11px] font-mono-luxury font-bold tracking-[0.3em] text-white/50 uppercase">
          EFFICIENCY IS EARNED. CODE IS ARCHITECTURE. LEGENDS ARE BUILT.
        </span>
        <div className="h-[1px] w-24 bg-white/20 mt-1" />
      </motion.div>

      {/* Giant Mafia-Style Display Title */}
      <motion.h1
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-editorial font-black tracking-tighter text-white uppercase leading-none drop-shadow-2xl"
      >
        RAHUL CHAHAR
      </motion.h1>

      <motion.p
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 text-xs md:text-sm font-mono-luxury font-bold tracking-[0.25em] text-white/70 uppercase"
      >
        SOFTWARE ENGINEER // FULL STACK WEB DEVELOPER
      </motion.p>

      <motion.p
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 text-base md:text-lg font-light text-white/80 max-w-2xl leading-relaxed"
      >
        Building scalable, production-ready web platforms with Next.js, React, TypeScript, Node.js & AI Systems.
      </motion.p>

      {/* Sharp High-Contrast Luxury Action Buttons */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <Link href="/projects">
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="group relative inline-flex items-center gap-3 bg-white px-8 py-3.5 text-xs font-mono-luxury font-extrabold tracking-[0.15em] text-black uppercase hover:bg-neutral-200 transition-all duration-300 shadow-xl cursor-pointer"
          >
            <span>EXPLORE PROJECTS</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.div>
        </Link>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 border border-white/30 bg-black/60 px-8 py-3.5 text-xs font-mono-luxury font-extrabold tracking-[0.15em] text-white uppercase hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md"
        >
          <span>GET IN TOUCH</span>
          <Play className="h-3 w-3 fill-current" />
        </a>
      </motion.div>

      {/* 4-Column Feature Highlight Grid (Inspired by the inspiration image's feature bar) */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-b border-white/10 py-6 text-left"
      >
        <div className="flex items-start gap-3 border-r border-white/10 pr-4 last:border-r-0">
          <Code2 className="h-5 w-5 text-white/70 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-mono-luxury font-bold tracking-wider text-white uppercase">01 // NEXT.JS 14</h4>
            <p className="text-[11px] text-white/50 mt-1 font-light">Production SSR, App Router & Tailwind CSS.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 border-r border-white/10 pr-4 last:border-r-0">
          <Server className="h-5 w-5 text-white/70 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-mono-luxury font-bold tracking-wider text-white uppercase">02 // FULL STACK</h4>
            <p className="text-[11px] text-white/50 mt-1 font-light">Node.js, Express, MongoDB, REST APIs & Auth.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 border-r border-white/10 pr-4 last:border-r-0">
          <Sparkles className="h-5 w-5 text-white/70 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-mono-luxury font-bold tracking-wider text-white uppercase">03 // AI SYSTEMS</h4>
            <p className="text-[11px] text-white/50 mt-1 font-light">Explainable AI & RAG fact-checking pipelines.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Cpu className="h-5 w-5 text-white/70 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-mono-luxury font-bold tracking-wider text-white uppercase">04 // 60FPS MOTION</h4>
            <p className="text-[11px] text-white/50 mt-1 font-light">Antigravity scrollytelling & Canvas sequence.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
