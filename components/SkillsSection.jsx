'use client';

import { useReducedMotion } from 'framer-motion';
import {
  Code,
  Server,
  BookOpen,
  Terminal,
  Layers,
  Sparkles,
  ShieldCheck,
  Database,
  Box,
  Wrench,
  Workflow,
  Globe,
  Cpu
} from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    id: '01 / FRONTEND & CORE',
    title: 'LANGUAGES & FRONTEND',
    subtitle: 'Next.js 14, React, TypeScript, Tailwind & UI',
    icon: Code,
    skills: [
      { name: 'JavaScript & TypeScript', level: '96%', status: 'Core Stack', icon: Code },
      { name: 'Next.js & React.js', level: '98%', status: 'Production Core', icon: Sparkles },
      { name: 'Tailwind CSS & Shadcn UI', level: '98%', status: 'Pixel Perfect', icon: Layers },
      { name: 'Framer Motion & HTML5/CSS3', level: '94%', status: 'Kinetic Motion', icon: Sparkles },
      { name: 'Java & C++', level: '88%', status: 'Algorithms', icon: Terminal },
      { name: 'Bootstrap & Responsive UI', level: '92%', status: 'Cross Device', icon: Globe },
    ],
  },
  {
    id: '02 / BACKEND & INFRA',
    title: 'BACKEND & DATABASE',
    subtitle: 'Node.js, Express, REST APIs, Auth & Databases',
    icon: Server,
    skills: [
      { name: 'Node.js & Express.js', level: '95%', status: 'High Throughput', icon: Server },
      { name: 'RESTful APIs Architecture', level: '96%', status: 'Clean Schemas', icon: Globe },
      { name: 'Clerk & JWT Authentication', level: '92%', status: 'Role-Based Auth', icon: ShieldCheck },
      { name: 'MongoDB & Mongoose ODM', level: '92%', status: 'NoSQL Database', icon: Database },
      { name: 'Vercel & Netlify Deployment', level: '95%', status: 'CI/CD Edge', icon: Box },
      { name: 'Git, GitHub & Postman', level: '96%', status: 'Version Control', icon: Wrench },
    ],
  },
  {
    id: '03 / CS FUNDAMENTALS',
    title: 'COMPUTER SCIENCE',
    subtitle: 'Data Structures, Algorithms, DBMS & OS',
    icon: BookOpen,
    skills: [
      { name: 'Data Structures & Algorithms', level: '90%', status: 'Problem Solving', icon: Workflow },
      { name: 'Object-Oriented Programming (OOP)', level: '94%', status: 'Design Patterns', icon: Cpu },
      { name: 'Database Management Systems (DBMS)', level: '92%', status: 'ACID Transactions', icon: Database },
      { name: 'Operating Systems & Networks', level: '88%', status: 'Systems Logic', icon: Terminal },
      { name: 'Software Engineering Principles', level: '94%', status: 'Clean Architecture', icon: ShieldCheck },
      { name: 'Linux, VS Code & Figma', level: '92%', status: 'Dev Environment', icon: Wrench },
    ],
  },
];

export default function SkillsSection({ scrollProgress, forceVisible = false }) {
  const shouldReduceMotion = useReducedMotion();

  // Active range for Skills: 0.18 to 0.40
  const rangeStart = 0.18;
  const rangeEnd = 0.40;

  let sectionProgress = forceVisible ? 1 : 0;
  if (!forceVisible) {
    if (scrollProgress > rangeStart && scrollProgress < rangeEnd) {
      sectionProgress = (scrollProgress - rangeStart) / (rangeEnd - rangeStart);
    } else if (scrollProgress >= rangeEnd) {
      sectionProgress = 1;
    }
  }

  // Fade out window
  let opacity = 1;
  if (!forceVisible) {
    if (scrollProgress < 0.15) {
      opacity = Math.max(0, (scrollProgress - 0.10) / 0.05);
    } else if (scrollProgress > 0.38) {
      opacity = Math.max(0, 1 - (scrollProgress - 0.38) / 0.04);
    }
  }

  if (!forceVisible && opacity <= 0.01) return null;

  return (
    <div
      style={{ opacity }}
      className="pointer-events-auto relative w-full max-w-6xl px-6 py-6 transition-opacity duration-300"
    >
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-[11px] font-mono-luxury font-bold tracking-[0.25em] text-white/50 uppercase block mb-2">
          THE SKILL MATRIX
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-editorial font-black tracking-tight text-white uppercase leading-none">
          PRECISION. PERFORMANCE. MASTERY.
        </h2>
        <div className="h-[1px] w-20 bg-white/20 mx-auto mt-3" />
      </div>

      {/* Grid Clusters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 perspective-1000">
        {SKILL_CATEGORIES.map((cluster, clusterIndex) => {
          const staggerOffset = clusterIndex * 0.1;
          const clusterFactor = Math.max(0, Math.min(1, (sectionProgress - staggerOffset) * 1.5));

          const translateY = shouldReduceMotion ? 0 : (1 - clusterFactor) * 120;
          const rotateY = shouldReduceMotion ? 0 : (1 - clusterFactor) * (clusterIndex % 2 === 0 ? -10 : 10);
          const scale = shouldReduceMotion ? 1 : 0.92 + clusterFactor * 0.08;

          return (
            <div
              key={cluster.title}
              style={{
                transform: `translate3d(0, ${translateY}px, 0) rotateY(${rotateY}deg) scale(${scale})`,
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                transformStyle: 'preserve-3d',
              }}
              className="group relative flex flex-col rounded-none border border-white/20 bg-black/35 p-6 backdrop-blur-md hover:border-white/50 hover:bg-black/55 transition-all duration-300 shadow-2xl"
            >
              {/* Card Top Bar (Inspired by the inspiration image's dark luxury cards) */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <span className="text-[10px] font-mono-luxury font-extrabold tracking-widest text-white/50 uppercase">
                  {cluster.id}
                </span>
                <span className="text-[10px] font-mono-luxury font-bold text-white/80 uppercase">
                  MASTERY READY
                </span>
              </div>

              <h3 className="text-lg font-editorial font-bold text-white tracking-wide uppercase">
                {cluster.title}
              </h3>
              <p className="text-[11px] font-mono-luxury text-white/50 mb-4">{cluster.subtitle}</p>

              {/* Skills Items */}
              <div className="flex flex-col gap-2.5">
                {cluster.skills.map((skill) => {
                  const SkillIcon = skill.icon;
                  return (
                    <div
                      key={skill.name}
                      className="flex flex-col border-b border-white/5 pb-2 last:border-b-0"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <SkillIcon className="h-3.5 w-3.5 text-white/60" />
                          <span className="text-xs font-mono-luxury font-semibold text-white/90">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono-luxury font-bold text-white/50">
                          {skill.level}
                        </span>
                      </div>

                      <div className="mt-1.5 h-[2px] w-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-white transition-all duration-500"
                          style={{ width: `${parseFloat(skill.level)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
