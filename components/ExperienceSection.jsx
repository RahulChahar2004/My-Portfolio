'use client';

import { useReducedMotion } from 'framer-motion';
import { Briefcase, Trophy, CheckCircle2, Users, Code, Calendar } from 'lucide-react';

export default function ExperienceSection({ scrollProgress }) {
  const shouldReduceMotion = useReducedMotion();

  // Active range for Experience & Achievements: 0.84 to 0.94
  const rangeStart = 0.84;
  const rangeEnd = 0.94;

  let sectionProgress = 0;
  if (scrollProgress > rangeStart && scrollProgress < rangeEnd) {
    sectionProgress = (scrollProgress - rangeStart) / (rangeEnd - rangeStart);
  } else if (scrollProgress >= rangeEnd) {
    sectionProgress = 1;
  }

  // Gentle opacity windowing
  let opacity = 1;
  if (scrollProgress < 0.82) {
    opacity = Math.max(0, (scrollProgress - 0.79) / 0.03);
  } else if (scrollProgress > 0.93) {
    opacity = Math.max(0, 1 - (scrollProgress - 0.93) / 0.02);
  }

  if (opacity <= 0.01) return null;

  return (
    <div
      style={{ opacity }}
      className="pointer-events-auto relative w-full max-w-6xl px-6 py-6 transition-opacity duration-300"
    >
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-[11px] font-mono-luxury font-bold tracking-[0.25em] text-white/50 uppercase block mb-2">
          THE FIELD EXPERIENCE
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-editorial font-black tracking-tight text-white uppercase leading-none">
          LEADERSHIP. INTERNSHIP. ACHIEVEMENTS.
        </h2>
        <div className="h-[1px] w-20 bg-white/20 mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Left Card: InternPro Internship */}
        <div className="lg:col-span-6 rounded-none border border-white/20 bg-black/35 p-6 backdrop-blur-md hover:border-white/50 hover:bg-black/55 transition-all duration-300 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="text-[10px] font-mono-luxury font-extrabold tracking-widest text-white/50 uppercase">
                01 / INTERNSHIP STORY
              </span>
              <span className="text-[10px] font-mono-luxury font-bold text-black bg-white px-2 py-0.5 uppercase">
                JUNE 2025 – JULY 2025
              </span>
            </div>

            <h3 className="text-xl font-editorial font-bold text-white tracking-wide uppercase">
              WEB DEVELOPMENT INTERN
            </h3>
            <p className="text-xs font-mono-luxury text-white/60 mb-4 uppercase">INTERNPRO // 6-WEEK INTENSIVE</p>

            <div className="space-y-2.5 text-xs text-white/80 font-mono-luxury">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-white/60 shrink-0 mt-0.5" />
                <span>Contributed to frontend development and UI enhancement of web applications during a six-week internship.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-white/60 shrink-0 mt-0.5" />
                <span>Developed frontend modules for VibeBite, a music band website, collaborating with a multi-member development team.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-white/60 shrink-0 mt-0.5" />
                <span>Assisted with UI implementation, technical troubleshooting, and digital workflow improvements while meeting deadlines.</span>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-3 flex items-center justify-between text-[11px] font-mono-luxury text-white/60 uppercase">
            <span>Certification: Web Dev Internship (InternPro)</span>
            <span className="text-white font-bold">VERIFIED</span>
          </div>
        </div>

        {/* Right Card: Leadership, Hackathons & Certifications */}
        <div className="lg:col-span-6 rounded-none border border-white/20 bg-black/35 p-6 backdrop-blur-md hover:border-white/50 hover:bg-black/55 transition-all duration-300 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="text-[10px] font-mono-luxury font-extrabold tracking-widest text-white/50 uppercase">
                02 / LEADERSHIP & HACKATHONS
              </span>
              <span className="text-[10px] font-mono-luxury font-bold text-white bg-white/10 px-2 py-0.5 uppercase border border-white/10">
                16+ GITHUB REPOS
              </span>
            </div>

            <h3 className="text-xl font-editorial font-bold text-white tracking-wide uppercase">
              LEADERSHIP & ACHIEVEMENTS
            </h3>
            <p className="text-xs font-mono-luxury text-white/60 mb-4 uppercase">CLASS REPRESENTATIVE & HACKATHON LEADER</p>

            <div className="space-y-2.5 text-xs text-white/80 font-mono-luxury">
              <div className="flex items-start gap-2">
                <Users className="h-4 w-4 text-white/60 shrink-0 mt-0.5" />
                <span>Class Representative (CR) — Coordinating communication between students and faculty.</span>
              </div>
              <div className="flex items-start gap-2">
                <Trophy className="h-4 w-4 text-white/60 shrink-0 mt-0.5" />
                <span>Hackathon Leader — Smart India Hackathon (2024 & 2025), Adobe India Hackathon, IIIT Delhi Foodoscope, NSUT BuildX & IGDTUW Hackathon.</span>
              </div>
              <div className="flex items-start gap-2">
                <Code className="h-4 w-4 text-white/60 shrink-0 mt-0.5" />
                <span>Maintains 16+ GitHub repositories focused on web development, frontend engineering, and full-stack applications.</span>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-3 flex flex-wrap items-center gap-2 text-[10px] font-mono-luxury text-white/70 uppercase">
            <span className="border border-white/10 bg-white/5 px-2.5 py-0.5 text-white/90">GeeksforGeeks Workshop</span>
            <span className="border border-white/10 bg-white/5 px-2.5 py-0.5 text-white/90">SIH 2024 / 2025</span>
            <span className="border border-white/10 bg-white/5 px-2.5 py-0.5 text-white/90">Adobe Hackathon</span>
          </div>
        </div>

      </div>
    </div>
  );
}
