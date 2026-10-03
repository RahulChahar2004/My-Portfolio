'use client';

import HeroSection from './HeroSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';

export default function ScrollTextOverlays({ scrollProgress }) {
  // Determine active section name for bottom indicator telemetry badge
  let activeSectionLabel = 'HERO // 0%';
  if (scrollProgress >= 0.94) {
    activeSectionLabel = 'CONTACT & NETWORK // 94%-100%';
  } else if (scrollProgress >= 0.84) {
    activeSectionLabel = 'EXPERIENCE & LEADERSHIP // 85%-94%';
  } else if (scrollProgress >= 0.65) {
    activeSectionLabel = 'EDUCATION & ACADEMICS // 65%-85%';
  } else if (scrollProgress >= 0.38) {
    activeSectionLabel = 'FEATURED PROJECTS // 40%-65%';
  } else if (scrollProgress >= 0.18) {
    activeSectionLabel = 'TECHNICAL SKILLS // 18%-38%';
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center p-4 md:p-8">
      {/* 0% - 18% Scroll: HERO SECTION */}
      <HeroSection scrollProgress={scrollProgress} />

      {/* 18% - 40% Scroll: SKILLS SECTION */}
      <SkillsSection scrollProgress={scrollProgress} />

      {/* 38% - 65% Scroll: FEATURED PROJECTS SECTION */}
      <ProjectsSection scrollProgress={scrollProgress} />

      {/* 65% - 85% Scroll: EDUCATION SECTION (Spacious dwelling for crystal clarity) */}
      <EducationSection scrollProgress={scrollProgress} />

      {/* 84% - 94% Scroll: EXPERIENCE & ACHIEVEMENTS SECTION */}
      <ExperienceSection scrollProgress={scrollProgress} />

      {/* Bottom Sticky Antigravity Scroll Telemetry Bar */}
      <div className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 rounded-full border border-cyan-500/20 bg-[#050505]/85 px-6 py-2.5 backdrop-blur-xl shadow-[0_0_25px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-300 uppercase">
            {activeSectionLabel}
          </span>
        </div>

        <div className="h-3 w-[1px] bg-white/20" />

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-extrabold text-white/90">
            {Math.round(scrollProgress * 100)}%
          </span>
          <div className="h-1.5 w-24 md:w-36 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transition-all duration-150"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
