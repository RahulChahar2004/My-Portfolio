// Cinematic Assembly Vortex & 3D Glass Dashboard Physics
import { gsap } from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
  const cameraWrapper = document.querySelector('#vortex-camera-wrapper');
  const stage = document.querySelector('#vortex-stage');
  const cards = document.querySelectorAll('.vortex-card');
  const btnVortex = document.querySelector('#btn-trigger-vortex');
  const btnFloat = document.querySelector('#btn-toggle-float');
  const btnGrid = document.querySelector('#btn-toggle-grid');

  let currentMode = 'vortex'; // 'vortex' | 'float' | 'grid'

  // 3D Vortex Initial Positions & Rotations
  const vortexScatterData = [
    { x: -380, y: -240, z: 280, rx: 35, ry: -45, rz: -20 },
    { x: 420, y: -280, z: -160, rx: -40, ry: 50, rz: 25 },
    { x: -440, y: 160, z: -280, rx: 45, ry: -35, rz: -35 },
    { x: 460, y: 200, z: 240, rx: -35, ry: 45, rz: 22 },
    { x: -200, y: 340, z: 120, rx: 30, ry: -55, rz: 30 },
    { x: 240, y: -140, z: 380, rx: -45, ry: 35, rz: -25 }
  ];

  // =========================================================================
  // CINEMATIC ASSEMBLY VORTEX (45° CAMERA ARC & GRID REALIGNMENT)
  // =========================================================================
  function runCinematicVortexAssembly() {
    if (!cameraWrapper || !cards.length) return;

    currentMode = 'vortex';
    updateActiveButton(btnVortex);

    // Stop ongoing tweens
    gsap.killTweensOf([cameraWrapper, ...cards]);

    // Step 1: Position Camera at 45° Arc & Scatter Cards into 3D Vortex Space
    gsap.set(cameraWrapper, {
      rotateY: -45,
      rotateX: 18,
      scale: 0.88,
      transformOrigin: '50% 50% -250px'
    });

    cards.forEach((card, i) => {
      const data = vortexScatterData[i % vortexScatterData.length];
      gsap.set(card, {
        x: data.x,
        y: data.y,
        z: data.z,
        rotateX: data.rx,
        rotateY: data.ry,
        rotateZ: data.rz,
        scale: 0.72,
        opacity: 0
      });
    });

    // Step 2: Cinematic 60fps Arc & Grid Assembly Timeline
    const tl = gsap.timeline({
      defaults: { ease: 'cubic-bezier(0.16, 1, 0.3, 1)' }
    });

    // Camera 45° Arc Rotation to 0°
    tl.to(cameraWrapper, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 1.8,
      ease: 'power3.out'
    }, 0);

    // Cards gentle un-swirl, rotate and realign into perfect grid
    cards.forEach((card, i) => {
      tl.to(card, {
        x: 0,
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        opacity: 1,
        duration: 1.5,
      }, 0.12 + i * 0.14);
    });
  }

  // =========================================================================
  // 3D FLOAT MODE
  // =========================================================================
  function runFloatMode() {
    currentMode = 'float';
    updateActiveButton(btnFloat);
    gsap.killTweensOf([cameraWrapper, ...cards]);

    gsap.to(cameraWrapper, {
      rotateY: -8,
      rotateX: 10,
      scale: 0.95,
      duration: 1.2,
      ease: 'power2.out'
    });

    cards.forEach((card, i) => {
      const floatOffsetZ = (i % 2 === 0 ? 50 : -50);
      const floatOffsetY = (i % 3 === 0 ? -15 : 15);
      gsap.to(card, {
        x: 0,
        y: floatOffsetY,
        z: floatOffsetZ,
        rotateX: (i % 2 === 0 ? 6 : -6),
        rotateY: (i % 3 === 0 ? -8 : 8),
        rotateZ: 0,
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out'
      });
    });
  }

  // =========================================================================
  // PRISTINE GRID MODE
  // =========================================================================
  function runGridMode() {
    currentMode = 'grid';
    updateActiveButton(btnGrid);
    gsap.killTweensOf([cameraWrapper, ...cards]);

    gsap.to(cameraWrapper, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 1,
      ease: 'power2.out'
    });

    cards.forEach((card) => {
      gsap.to(card, {
        x: 0,
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  }

  function updateActiveButton(activeBtn) {
    [btnVortex, btnFloat, btnGrid].forEach((btn) => {
      if (btn) btn.classList.remove('active');
    });
    if (activeBtn) activeBtn.classList.add('active');
  }

  // Event Listeners for Control Buttons
  if (btnVortex) btnVortex.addEventListener('click', runCinematicVortexAssembly);
  if (btnFloat) btnFloat.addEventListener('click', runFloatMode);
  if (btnGrid) btnGrid.addEventListener('click', runGridMode);

  // Mouse Parallax Physics on Stage
  if (cameraWrapper && stage) {
    stage.addEventListener('mousemove', (e) => {
      if (currentMode !== 'vortex' && currentMode !== 'grid') return;
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(cameraWrapper, {
        rotateY: x * 10,
        rotateX: -y * 10,
        duration: 0.4,
        ease: 'power1.out'
      });
    });

    stage.addEventListener('mouseleave', () => {
      if (currentMode === 'grid') {
        gsap.to(cameraWrapper, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power2.out' });
      }
    });
  }

  // Tilt Physics for Individual Cards
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card.querySelector('.v-card-inner') || card, {
        rotateY: x * 14,
        rotateX: -y * 14,
        duration: 0.3,
        ease: 'power1.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card.querySelector('.v-card-inner') || card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });

  // Primary Mid-Air Glass Card Tilt
  const primaryCard = document.querySelector('#primary-glass-card');
  const midairStage = document.querySelector('#midair-stage');

  if (primaryCard && midairStage) {
    midairStage.addEventListener('mousemove', (e) => {
      const rect = midairStage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(primaryCard, {
        rotateY: x * 16,
        rotateX: -y * 16,
        x: x * 20,
        y: y * 20,
        duration: 0.4,
        ease: 'power2.out'
      });
    });

    midairStage.addEventListener('mouseleave', () => {
      gsap.to(primaryCard, {
        rotateY: -1,
        rotateX: 2,
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  }

  // Run Assembly Vortex on Load
  setTimeout(() => {
    runCinematicVortexAssembly();
  }, 300);
});
