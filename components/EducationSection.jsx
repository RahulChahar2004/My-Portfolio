'use client';

import { useReducedMotion } from 'framer-motion';
import { GraduationCap, Award, Calendar, BookOpen, CheckCircle2, Terminal } from 'lucide-react';

const EDUCATION_RESUME = [
  {
    id: '01 / UNDERGRADUATE DEGREE',
    period: 'AUG 2023 – JUN 2027',
    degree: 'Bachelor of Technology (B.Tech.) in Computer Science & Engineering',
    institution: 'Delhi Skills and Entrepreneurship University (DSEU)',
    status: 'CGPA: 7.20 / 10',
    badge: 'UNDERGRADUATE',
    highlights: [
      'Data Structures & Algorithms, Software Engineering',
      'Object-Oriented Programming (OOP) & Design Patterns',
      'Database Management Systems (DBMS) & Operating Systems',
      'Computer Networks & Distributed Web Applications',
    ],
  },
  {
    id: '02 / SENIOR HIGH SCHOOL',
    period: 'COMPLETED 2022',
    degree: 'Class XII (CBSE Senior Secondary)',
    institution: 'St. Queen Mary Public School, Agra',
    status: 'SCORE: 76.4%',
    badge: 'SENIOR SECONDARY',
    highlights: [
      'Physics, Chemistry & Higher Mathematics Track',
      'Computer Science Foundations (Python & C++)',
      'Logic Building & Problem Solving Excellence',
    ],
  },
  {
    id: '03 / SECONDARY EDUCATION',
    period: 'COMPLETED 2020',
    degree: 'Class X (ICSE Secondary Education)',
    institution: "St. George's College, Agra",
    status: 'SCORE: 87.6%',
    badge: 'HIGH DISTINCTION',
    highlights: [
      'ICSE Board Curriculum with Honors Distinction',
      'Top Tier Academic Performance in Science & Mathematics',
      'Extracurricular Leadership & Technical Events',
    ],
  },
];

export default function EducationSection({ scrollProgress }) {
  const shouldReduceMotion = useReducedMotion();

  // Active spacious range for Education: 0.65 to 0.85
  const rangeStart = 0.65;
  const rangeEnd = 0.85;

  let sectionProgress = 0;
  if (scrollProgress > rangeStart && scrollProgress < rangeEnd) {
    sectionProgress = (scrollProgress - rangeStart) / (rangeEnd - rangeStart);
  } else if (scrollProgress >= rangeEnd) {
    sectionProgress = 1;
  }

  // Gentle opacity windowing
  let opacity = 1;
  if (scrollProgress < 0.62) {
    opacity = Math.max(0, (scrollProgress - 0.58) / 0.04);
  } else if (scrollProgress > 0.83) {
    opacity = Math.max(0, 1 - (scrollProgress - 0.83) / 0.03);
  }

  if (opacity <= 0.01) return null;

  return (
    <div
      style={{ opacity }}
      className="pointer-events-auto relative w-full max-w-5xl px-6 py-6 transition-opacity duration-300"
    >
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-[11px] font-mono-luxury font-bold tracking-[0.25em] text-white/50 uppercase block mb-2">
          THE ACADEMIC STORY
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-editorial font-black tracking-tight text-white uppercase leading-none">
          FOUNDATIONS. EXCELLENCE. DEGREES.
        </h2>
        <div className="h-[1px] w-20 bg-white/20 mx-auto mt-3" />
      </div>

      {/* Vertical Interactive Timeline */}
      <div className="relative border-l-2 border-white/15 ml-4 md:ml-36 pl-6 md:pl-10 space-y-8">
        {/* Animated Glowing Path Line */}
        <div
          className="absolute left-[-2px] top-0 w-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-300"
          style={{ height: `${Math.min(100, Math.max(0, sectionProgress * 100))}%` }}
        />

        {EDUCATION_RESUME.map((item, index) => {
          const itemThreshold = index * 0.26;
          const itemProgress = Math.max(0, Math.min(1, (sectionProgress - itemThreshold) * 2.2));

          const translateY = shouldReduceMotion ? 0 : (1 - itemProgress) * 90;
          const itemOpacity = shouldReduceMotion ? 1 : itemProgress;
          const scale = shouldReduceMotion ? 1 : 0.93 + itemProgress * 0.07;

          const isActivated = sectionProgress >= itemThreshold + 0.05;

          return (
            <div
              key={item.degree}
              style={{
                transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                opacity: itemOpacity,
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease-out',
              }}
              className="relative group"
            >
              {/* Timeline Connector Node */}
              <div
                className={`absolute -left-[31px] md:-left-[47px] top-2 flex h-8 w-8 items-center justify-center rounded-none border ${
                  isActivated
                    ? 'border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.9)]'
                    : 'border-white/20 bg-black text-white/40'
                } transition-all duration-300`}
              >
                <GraduationCap className="h-4 w-4" />
              </div>

              {/* Date Tag for Desktop */}
              <div className="hidden md:block absolute -left-52 top-2.5 text-right w-40 font-mono-luxury text-xs font-bold text-white/70 uppercase">
                <span className="inline-block border border-white/10 bg-white/5 px-3 py-1 text-white/80">
                  {item.period}
                </span>
              </div>

              {/* Luxury Mafia-style Translucent Card */}
              <div className="rounded-none border border-white/20 bg-black/35 p-6 backdrop-blur-md hover:border-white/50 hover:bg-black/55 transition-all duration-300 shadow-2xl">
                {/* Mobile Date Tag */}
                <div className="md:hidden flex items-center gap-1.5 font-mono-luxury text-xs text-white/70 uppercase mb-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{item.period}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-2 mb-3">
                  <span className="text-[10px] font-mono-luxury font-extrabold tracking-widest text-white/50 uppercase">
                    {item.id}
                  </span>
                  <span className="text-xs font-mono-luxury font-extrabold text-black bg-white px-3 py-0.5 uppercase">
                    {item.status}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-editorial font-bold text-white tracking-tight uppercase">
                  {item.degree}
                </h3>

                <p className="text-xs md:text-sm font-mono-luxury text-white/70 mt-1 flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-white/60" />
                  {item.institution}
                </p>

                {/* Coursework & Highlights */}
                <div className="mt-4 border-t border-white/10 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {item.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-2 text-xs text-white/80 font-mono-luxury">
                      <CheckCircle2 className="h-3.5 w-3.5 text-white/60 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
