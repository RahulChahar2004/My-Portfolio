// Dark Luxury CS Portfolio Frame Animation Engine
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 300;
const FRAME_PATH = (index) => `/frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

// State Variables
const images = [];
let loadedCount = 0;
let currentFrame = 1;
let targetFrame = 1;
let fitMode = 'contain';
let scrollMode = 'full';
let opacityLevel = 'ultra';
let isAutoPlaying = false;
let autoPlaySpeed = 0.5;

// DOM Elements
const canvas = document.getElementById('frame-canvas');
const ctx = canvas.getContext('2d');
const darkOverlay = document.getElementById('dark-overlay');
const pageContent = document.getElementById('page-content');

const pipCanvas = document.getElementById('pip-canvas');
const pipCtx = pipCanvas ? pipCanvas.getContext('2d') : null;
const pipFrameText = document.getElementById('pip-frame-text');
const pipBadge = document.getElementById('pip-badge');

const preloader = document.getElementById('preloader');
const progressBar = document.getElementById('progress-bar');
const loadCountEl = document.getElementById('load-count');
const preloaderHint = document.getElementById('preloader-hint');

const hudControls = document.getElementById('hud-controls');
const frameIndicator = document.getElementById('frame-indicator');
const percentIndicator = document.getElementById('percent-indicator');

const btnAutoplay = document.getElementById('btn-autoplay');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
const autoplayText = document.getElementById('autoplay-text');

const btnOpacity = document.getElementById('btn-opacity');
const opacityText = document.getElementById('opacity-text');

const btnFit = document.getElementById('btn-fit');
const fitText = document.getElementById('fit-text');
const btnMode = document.getElementById('btn-mode');
const modeText = document.getElementById('mode-text');
const btnReset = document.getElementById('btn-reset');

const scrubberTrack = document.getElementById('scrubber-track');
const scrubberThumb = document.getElementById('scrubber-thumb');

// Resize Canvas
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  if (pipCanvas) {
    pipCanvas.width = 140 * dpr;
    pipCanvas.height = 70 * dpr;
    if (pipCtx) pipCtx.scale(dpr, dpr);
  }

  renderFrame(Math.round(currentFrame));
}

// Draw Frame on Canvas with Source Cropping to Remove Edge Watermarks / Gemini Signs
function renderFrame(index) {
  const frameIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(index)));
  const img = images[frameIndex - 1];

  if (!img || !img.complete || img.naturalWidth === 0) return;

  const rect = canvas.getBoundingClientRect();
  const canvasW = rect.width;
  const canvasH = rect.height;

  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;

  // Source Crop 4% inset to cleanly strip off any corner/edge watermark or Gemini sign
  const cropMargin = 0.04;
  const sx = imgW * cropMargin;
  const sy = imgH * cropMargin;
  const sW = imgW * (1 - cropMargin * 2);
  const sH = imgH * (1 - cropMargin * 2);

  let scale = 1;
  if (fitMode === 'cover') {
    scale = Math.max(canvasW / sW, canvasH / sH);
  } else {
    scale = Math.min(canvasW / sW, canvasH / sH);
  }

  const drawW = sW * scale;
  const drawH = sH * scale;
  const x = (canvasW - drawW) / 2;
  const y = (canvasH - drawH) / 2;

  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(img, sx, sy, sW, sH, x, y, drawW, drawH);

  // Draw PiP Canvas
  if (pipCanvas && pipCtx) {
    pipCtx.clearRect(0, 0, 140, 70);
    const pipScale = Math.min(140 / sW, 70 / sH);
    const px = (140 - sW * pipScale) / 2;
    const py = (70 - sH * pipScale) / 2;
    pipCtx.drawImage(img, sx, sy, sW, sH, px, py, sW * pipScale, sH * pipScale);
  }

  if (pipFrameText) {
    pipFrameText.textContent = `FRAME ${String(frameIndex).padStart(3, '0')}`;
  }

  if (frameIndicator) {
    frameIndicator.textContent = `FRAME ${String(frameIndex).padStart(3, '0')} / ${TOTAL_FRAMES}`;
  }
  const percent = Math.round(((frameIndex - 1) / (TOTAL_FRAMES - 1)) * 100);
  if (percentIndicator) {
    percentIndicator.textContent = `${percent}%`;
  }
  
  if (scrubberThumb) {
    const thumbPercent = ((frameIndex - 1) / (TOTAL_FRAMES - 1)) * 100;
    scrubberThumb.style.top = `calc(${thumbPercent}% - 12px)`;
  }
}

// Preload Images Queue
function preloadImages() {
  return new Promise((resolve) => {
    let completed = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);

      img.onload = () => {
        completed++;
        loadedCount = completed;
        updatePreloader(completed);
        if (completed === 1) {
          renderFrame(1);
        }
        if (completed === TOTAL_FRAMES) {
          resolve();
        }
      };

      img.onerror = () => {
        completed++;
        loadedCount = completed;
        updatePreloader(completed);
        if (completed === TOTAL_FRAMES) {
          resolve();
        }
      };

      images.push(img);
    }
  });
}

function updatePreloader(count) {
  const percentage = Math.round((count / TOTAL_FRAMES) * 100);
  if (progressBar) progressBar.style.width = `${percentage}%`;
  if (loadCountEl) loadCountEl.textContent = `${count} / ${TOTAL_FRAMES}`;
  
  if (preloaderHint) {
    if (percentage < 30) {
      preloaderHint.textContent = 'Loading high-resolution frame assets...';
    } else if (percentage < 70) {
      preloaderHint.textContent = 'Caching 300 frame sequence buffer...';
    } else if (percentage < 100) {
      preloaderHint.textContent = 'Finalizing smooth scroll engine...';
    } else {
      preloaderHint.textContent = 'Welcome to Rahul Chahar Portfolio';
    }
  }
}

// Calculate target frame from scroll position based on scrollMode
function updateTargetFrameFromScroll() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return;

  const scrollFraction = Math.max(0, Math.min(1, window.scrollY / maxScroll));

  if (scrollMode === 'pingpong') {
    if (scrollFraction <= 0.5) {
      const frac = scrollFraction * 2;
      targetFrame = 1 + frac * (TOTAL_FRAMES - 1);
    } else {
      const frac = (scrollFraction - 0.5) * 2;
      targetFrame = TOTAL_FRAMES - frac * (TOTAL_FRAMES - 1);
    }
  } else {
    targetFrame = 1 + scrollFraction * (TOTAL_FRAMES - 1);
  }
}

// Setup IntersectionObserver for 1-by-1 Scroll Reveals
function setupScrollReveals() {
  const options = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, options);

  const targets = document.querySelectorAll('.project-card, .feature-item, .skill-category, .metric-card');
  targets.forEach((target) => observer.observe(target));
}

// Update Opacity Mode
function applyOpacityMode() {
  if (opacityLevel === 'ultra') {
    if (darkOverlay) darkOverlay.style.background = 'rgba(7, 8, 10, 0.05)';
    if (pageContent) pageContent.style.opacity = '1';
    if (opacityText) opacityText.textContent = 'Canvas: Ultra Clear';
  } else if (opacityLevel === 'focus') {
    if (darkOverlay) darkOverlay.style.background = 'rgba(7, 8, 10, 0.0)';
    if (pageContent) pageContent.style.opacity = '0.25';
    if (opacityText) opacityText.textContent = 'Canvas: Focus View';
  } else {
    if (darkOverlay) darkOverlay.style.background = 'rgba(7, 8, 10, 0.25)';
    if (pageContent) pageContent.style.opacity = '1';
    if (opacityText) opacityText.textContent = 'Canvas: Balanced';
  }
}

// RAF Animation Loop
function loop() {
  if (isAutoPlaying) {
    currentFrame += autoPlaySpeed;
    if (currentFrame > TOTAL_FRAMES) {
      currentFrame = 1;
    }
    targetFrame = currentFrame;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = (currentFrame - 1) / (TOTAL_FRAMES - 1);
    window.scrollTo({ top: fraction * maxScroll, behavior: 'instant' });
  } else {
    const diff = targetFrame - currentFrame;
    if (Math.abs(diff) > 0.01) {
      currentFrame += diff * 0.15;
    } else {
      currentFrame = targetFrame;
    }
  }

  renderFrame(currentFrame);
  requestAnimationFrame(loop);
}

// Event Listeners
function setupEventListeners() {
  window.addEventListener('resize', resizeCanvas);
  
  window.addEventListener('scroll', () => {
    if (!isAutoPlaying) {
      updateTargetFrameFromScroll();
    }
  }, { passive: true });

  // Autoplay button
  if (btnAutoplay) {
    btnAutoplay.addEventListener('click', () => {
      isAutoPlaying = !isAutoPlaying;
      if (isAutoPlaying) {
        iconPlay.classList.add('hidden');
        iconPause.classList.remove('hidden');
        autoplayText.textContent = 'Pause';
      } else {
        iconPlay.classList.remove('hidden');
        iconPause.classList.add('hidden');
        autoplayText.textContent = 'Auto Play';
      }
    });
  }

  // Opacity button
  if (btnOpacity) {
    btnOpacity.addEventListener('click', () => {
      if (opacityLevel === 'ultra') {
        opacityLevel = 'focus';
      } else if (opacityLevel === 'focus') {
        opacityLevel = 'balanced';
      } else {
        opacityLevel = 'ultra';
      }
      applyOpacityMode();
    });
  }

  // Fit Mode button
  if (btnFit) {
    btnFit.addEventListener('click', () => {
      fitMode = fitMode === 'contain' ? 'cover' : 'contain';
      fitText.textContent = fitMode === 'contain' ? 'Contain' : 'Cover';
      renderFrame(currentFrame);
    });
  }

  // Scroll Sync Mode Toggle
  if (btnMode) {
    btnMode.addEventListener('click', () => {
      if (scrollMode === 'full') {
        scrollMode = 'pingpong';
        modeText.textContent = 'Ping-Pong Loop';
      } else {
        scrollMode = 'full';
        modeText.textContent = '100% Sync';
      }
      updateTargetFrameFromScroll();
    });
  }

  // Reset button
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      isAutoPlaying = false;
      if (iconPlay) iconPlay.classList.remove('hidden');
      if (iconPause) iconPause.classList.add('hidden');
      if (autoplayText) autoplayText.textContent = 'Auto Play';

      window.scrollTo({ top: 0, behavior: 'smooth' });
      targetFrame = 1;
    });
  }

  // PiP Badge Click
  if (pipBadge) {
    pipBadge.addEventListener('click', () => {
      if (btnOpacity) btnOpacity.click();
    });
  }

  // Scrubber track click & drag
  if (scrubberTrack) {
    let isDraggingScrubber = false;

    const handleScrubberMove = (e) => {
      const rect = scrubberTrack.getBoundingClientRect();
      const offsetY = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
      const fraction = offsetY / rect.height;
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: fraction * maxScroll, behavior: 'instant' });
      targetFrame = 1 + fraction * (TOTAL_FRAMES - 1);
    };

    scrubberTrack.addEventListener('mousedown', (e) => {
      isDraggingScrubber = true;
      handleScrubberMove(e);
    });

    window.addEventListener('mousemove', (e) => {
      if (isDraggingScrubber) {
        handleScrubberMove(e);
      }
    });

    window.addEventListener('mouseup', () => {
      isDraggingScrubber = false;
    });
  }

  // Keyboard controls
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (btnAutoplay) btnAutoplay.click();
    }
  });
}

// App Initialization
async function init() {
  resizeCanvas();
  setupEventListeners();
  applyOpacityMode();
  setupScrollReveals();

  await preloadImages();

  setTimeout(() => {
    if (preloader) preloader.classList.add('fade-out');
    if (hudControls) hudControls.classList.remove('hidden');
    
    updateTargetFrameFromScroll();
    loop();
  }, 400);
}

init();
