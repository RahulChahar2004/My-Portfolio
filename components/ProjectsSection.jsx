'use client';

import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import { ExternalLink, Terminal, ShieldCheck, ShoppingBag, Landmark, Music } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PROJECTS = [
  {
    edition: '01 / EXPLAINABLE AI PLATFORM',
    tag: 'FEATURED HIGHLIGHT',
    title: 'ARTHDRISHTI',
    subtitle: 'Financial Intelligence Platform',
    icon: Landmark,
    description:
      'Developed complete frontend across 40+ responsive pages including Customer, Officer, and Admin portals with role-based auth, KPI dashboards, charts, and financial workflows.',
    techStack: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Clerk'],
    github: 'https://github.com/RahulChahar2004/ArthDrishtii',
    live: null,
  },
  {
    edition: '02 / LIVE E-COMMERCE',
    tag: 'PRODUCTION STORE',
    title: 'VIRAASAT',
    subtitle: 'Fashion E-Commerce Storefront',
    icon: ShoppingBag,
    description:
      'Full-stack live fashion e-commerce platform with product catalog, search, filters, wishlist, cart, checkout, reviews, Clerk auth, and Razorpay payment integration.',
    techStack: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Clerk', 'Razorpay'],
    github: 'https://github.com/RahulChahar2004/ECommerece-Frontend',
    live: 'https://viraasatclothing.store',
  },
  {
    edition: '03 / AI & RAG ENGINE',
    tag: 'SECURITY & DETECTION',
    title: 'TRUTHGUARD',
    subtitle: 'Fake News & Deepfake Detection',
    icon: ShieldCheck,
    description:
      'AI-powered fake news, spam, and deepfake detection platform with JWT & Google OAuth auth, consuming RAG-based fact-checking APIs.',
    techStack: ['Next.js', 'React.js', 'Tailwind CSS', 'Python', 'MongoDB', 'JWT', 'Google OAuth'],
    github: 'https://github.com/RahulChahar2004/TruthGuard',
    live: null,
  },
  {
    edition: '04 / AUDIO & FOODOSCOPE',
    tag: 'RECOMMENDER PLATFORM',
    title: 'VIBEBITE',
    subtitle: 'Music & Food Recommender',
    icon: Music,
    description:
      'Music band & foodoscope matching platform for matching user playlist vibes with comfort food recommendations built during InternPro internship.',
    techStack: ['Next.js', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com/RahulChahar2004/VibeBite-Foodoscope',
    live: null,
  },
];

export default function ProjectsSection({ scrollProgress }) {
  const shouldReduceMotion = useReducedMotion();

  // Active scroll range for Projects: 0.38 to 0.65
  const rangeStart = 0.38;
  const rangeEnd = 0.65;

  let sectionProgress = 0;
  if (scrollProgress > rangeStart && scrollProgress < rangeEnd) {
    sectionProgress = (scrollProgress - rangeStart) / (rangeEnd - rangeStart);
  } else if (scrollProgress >= rangeEnd) {
    sectionProgress = 1;
  }

  // Opacity windowing
  let opacity = 1;
  if (scrollProgress < 0.35) {
    opacity = Math.max(0, (scrollProgress - 0.30) / 0.05);
  } else if (scrollProgress > 0.63) {
    opacity = Math.max(0, 1 - (scrollProgress - 0.63) / 0.04);
  }

  if (opacity <= 0.01) return null;

  return (
    <div
      style={{ opacity }}
      className="pointer-events-auto relative w-full max-w-6xl px-6 py-6 transition-opacity duration-300"
    >
      {/* Editorial Header (Inspired by CHOOSE YOUR EDITION in the mafia image) */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-[11px] font-mono-luxury font-bold tracking-[0.25em] text-white/50 uppercase block mb-2">
          CHOOSE YOUR EDITION // FEATURED PROJECTS
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-editorial font-black tracking-tight text-white uppercase leading-none">
          PRODUCTION EDITIONS
        </h2>
        <div className="h-[1px] w-20 bg-white/20 mx-auto mt-3" />
      </div>

      {/* Grid of Projects Styled like the Edition Cards in the reference image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 perspective-1000">
        {PROJECTS.map((project, index) => {
          const staggerOffset = index * 0.15;
          const cardProgress = Math.max(0, Math.min(1, (sectionProgress - staggerOffset) * 1.8));

          const translateY = shouldReduceMotion ? 0 : (1 - cardProgress) * 110;
          const scale = shouldReduceMotion ? 1 : 0.94 + cardProgress * 0.06;

          return (
            <div
              key={project.title}
              style={{
                transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="group relative flex flex-col justify-between rounded-none border border-white/20 bg-black/35 p-6 backdrop-blur-md hover:border-white/50 hover:bg-black/55 transition-all duration-300 shadow-2xl"
            >
              <div>
                {/* Top Edition Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <span className="text-[10px] font-mono-luxury font-extrabold tracking-widest text-white/50 uppercase">
                    {project.edition}
                  </span>
                  <span className="text-[10px] font-mono-luxury font-bold text-white bg-white/10 px-2 py-0.5 uppercase border border-white/10">
                    {project.tag}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-editorial font-black text-white tracking-tight uppercase group-hover:text-neutral-200 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono-luxury font-bold text-white/60 uppercase mt-1">
                  {project.subtitle}
                </p>

                <p className="text-xs text-white/70 leading-relaxed font-light mt-3">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/5 pt-3">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono-luxury text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons (Sharp black/white buttons like PRE-ORDER in image) */}
              <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between gap-3 relative z-30 pointer-events-auto">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (project.github) window.open(project.github, '_blank', 'noopener,noreferrer');
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 border border-white/30 bg-black px-4 py-2.5 text-xs font-mono-luxury font-extrabold tracking-wider text-white uppercase hover:bg-white hover:text-black transition-all cursor-pointer pointer-events-auto relative z-30 shadow-md"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>EXPLORE REPO →</span>
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
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-white px-4 py-2.5 text-xs font-mono-luxury font-extrabold tracking-wider text-black uppercase hover:bg-neutral-200 transition-all shadow-md cursor-pointer pointer-events-auto relative z-30"
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

      {/* Bottom CTA to Full 3D Assembly Vortex Page */}
      <div className="mt-8 text-center relative z-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 border border-white/30 bg-white px-8 py-3 text-xs font-mono-luxury font-extrabold tracking-[0.15em] text-black uppercase hover:bg-neutral-200 transition-all shadow-xl"
        >
          <span>LAUNCH FULL 3D ASSEMBLY VORTEX PAGE →</span>
        </Link>
      </div>
    </div>
  );
}
