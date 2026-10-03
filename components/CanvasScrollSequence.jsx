'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 300;
const FRAME_PATH = (index) => `/frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

export default function CanvasScrollSequence({ onScrollProgress }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const imagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const currentFrameRef = useRef(1);
  const dimensionsRef = useRef({ width: 0, height: 0, dpr: 1 });

  // Preload 300 Frames into ref to avoid unnecessary re-renders
  useEffect(() => {
    let count = 0;
    const loadedImages = new Array(TOTAL_FRAMES);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        count++;
        setImagesLoaded(count);
      };
      img.onerror = () => {
        count++;
        setImagesLoaded(count);
      };
      loadedImages[i - 1] = img;
    }

    imagesRef.current = loadedImages;
  }, []);

  // Update canvas dimensions on resize with clamped DPR for 60fps performance
  const updateDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
    const height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;

    dimensionsRef.current = { width, height, dpr };

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    if (!ctxRef.current) {
      ctxRef.current = canvas.getContext('2d', { alpha: false, desynchronized: true });
    }
  }, []);

  // Ultra-Fast GPU Canvas Drawing
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx = ctxRef.current;
    if (!ctx) {
      ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
      ctxRef.current = ctx;
    }
    if (!ctx) return;

    const { width, height, dpr } = dimensionsRef.current;
    if (width === 0 || height === 0) return;

    const img = imagesRef.current[frameIndex - 1];
    const targetImg = (img && img.complete && img.naturalWidth > 0) ? img : imagesRef.current[0];
    if (!targetImg || !targetImg.complete) return;

    ctx.save();
    ctx.scale(dpr, dpr);

    // Subtle crop inset for crisp presentation
    const crop = 0.02;
    const sx = targetImg.naturalWidth * crop;
    const sy = targetImg.naturalHeight * crop;
    const sw = targetImg.naturalWidth * (1 - crop * 2);
    const sh = targetImg.naturalHeight * (1 - crop * 2);

    // Object-fit Cover calculation
    const scale = Math.max(width / sw, height / sh);
    const drawW = sw * scale;
    const drawH = sh * scale;
    const dx = (width - drawW) / 2;
    const dy = (height - drawH) / 2;

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(targetImg, sx, sy, sw, sh, dx, dy, drawW, drawH);
    ctx.restore();
  }, []);

  // Scroll Progress Listener Mapped to 800vh Sticky Scroll Container
  useEffect(() => {
    updateDimensions();

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const container = containerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            const totalScrollable = container.offsetHeight - window.innerHeight;
            const currentScroll = Math.max(0, -rect.top);

            let progress = totalScrollable > 0 ? currentScroll / totalScrollable : 0;
            progress = Math.max(0, Math.min(1, progress));

            if (onScrollProgress) {
              onScrollProgress(progress);
            }

            const frameIndex = Math.max(
              1,
              Math.min(TOTAL_FRAMES, Math.floor(progress * (TOTAL_FRAMES - 1)) + 1)
            );

            if (frameIndex !== currentFrameRef.current) {
              currentFrameRef.current = frameIndex;
              drawFrame(frameIndex);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      updateDimensions();
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [onScrollProgress, updateDimensions, drawFrame]);

  // Initial draw once first images load
  useEffect(() => {
    if (imagesLoaded > 0) {
      drawFrame(currentFrameRef.current);
    }
  }, [imagesLoaded, drawFrame]);

  return (
    <div ref={containerRef} className="relative h-[800vh] w-full bg-[#050505] will-change-scroll">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505] will-change-transform transform-gpu">
        {/* HTML5 Pinned Canvas */}
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover opacity-100 transition-opacity duration-300 transform-gpu"
        />

        {/* Soft Ambient Overlay to Ensure Canvas/Video Clarity */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505]/60" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.04)_0%,transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.06)_0%,transparent_60%)]" />

        {/* Preloader Badge during asset buffering */}
        {imagesLoaded < TOTAL_FRAMES && (
          <div className="absolute bottom-24 right-8 z-50 flex items-center gap-3 rounded-full border border-cyan-500/20 bg-[#050505]/80 px-4 py-2 text-xs font-mono font-medium text-cyan-300 backdrop-blur-md shadow-lg shadow-cyan-500/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>ANTIGRAVITY BUFFER: {Math.round((imagesLoaded / TOTAL_FRAMES) * 100)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}


