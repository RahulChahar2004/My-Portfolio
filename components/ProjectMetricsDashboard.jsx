'use client';

import { motion } from 'framer-motion';

export default function ProjectMetricsDashboard() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-white/15 bg-black/60 p-8 backdrop-blur-2xl shadow-2xl shadow-black/80">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-orange-400 uppercase">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500" />
            <span>SYSTEM DASHBOARD v4.2</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white mt-1">SaaS Architecture Performance</h3>
        </div>
        <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-400">
          ● REAL-TIME TELEMETRY
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left">
          <span className="text-[10px] font-mono tracking-wider text-white/50 uppercase block mb-1">UPTIME RECORD</span>
          <span className="text-2xl font-black text-white font-mono">99.99%</span>
          <span className="text-xs text-emerald-400 block mt-1">↑ Zero Downtime</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left">
          <span className="text-[10px] font-mono tracking-wider text-white/50 uppercase block mb-1">EDGE LATENCY</span>
          <span className="text-2xl font-black text-white font-mono">0.02ms</span>
          <span className="text-xs text-emerald-400 block mt-1">Sub-Millisecond</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left">
          <span className="text-[10px] font-mono tracking-wider text-white/50 uppercase block mb-1">FRAME RATE</span>
          <span className="text-2xl font-black text-orange-400 font-mono">120 FPS</span>
          <span className="text-xs text-white/60 block mt-1">Hardware Synced</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left">
          <span className="text-[10px] font-mono tracking-wider text-white/50 uppercase block mb-1">THROUGHPUT</span>
          <span className="text-2xl font-black text-white font-mono">10M+</span>
          <span className="text-xs text-white/60 block mt-1">Events / Sec</span>
        </div>
      </div>

      {/* CTA Action Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <p className="text-sm text-white/70">Ready to experience next-generation SaaS performance?</p>
        <motion.a
          href="https://github.com/RahulChahar2004"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 px-8 py-4 text-sm font-extrabold tracking-wide text-white shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
        >
          <span>VIEW LIVE PROJECT</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </motion.a>
      </div>
    </div>
  );
}
