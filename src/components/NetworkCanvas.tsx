import React, { useEffect, useRef } from 'react';

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  type: 'red' | 'white';
  isPulsing: boolean;
  pulsePhase: number;
  pulseSpeed: number;
  longReach: boolean;
  zDepth: number; // 0.6 (background/faint) to 1.2 (foreground/crisp)
}

interface NetworkCanvasProps {
  className?: string;
}

export const NetworkCanvas: React.FC<NetworkCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: NodeParticle[] = [];

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speedMultiplier = prefersReducedMotion ? 0.15 : 1.0;

    // Mouse tracking for subtle desktop connection
    const mouse = {
      x: -9999,
      y: -9999,
      isActive: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // Calculate particle count based on screen area to ensure uniform density
    const createParticles = (w: number, h: number) => {
      const area = w * h;
      // Density: ~1 node per 15,000 px² on desktop, ~1 node per 13,000 px² on mobile
      const isMobile = w < 768;
      const divisor = isMobile ? 13000 : 15500;
      let count = Math.floor(area / divisor);

      // Clamp counts: mobile 38-55, desktop 75-140
      if (isMobile) {
        count = Math.max(38, Math.min(55, count));
      } else {
        count = Math.max(75, Math.min(140, count));
      }

      const newParticles: NodeParticle[] = [];
      for (let i = 0; i < count; i++) {
        // 68% Red nodes (#ED1C24), 32% Secondary White nodes (#FFFFFF)
        const isRed = Math.random() < 0.68;
        const zDepth = 0.65 + Math.random() * 0.55; // 0.65 to 1.2
        const isPulsing = Math.random() < 0.22; // ~22% pulse
        const longReach = Math.random() < 0.18; // ~18% have extended geometric bridge lines

        // Slow, elegant continuous float
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.08 + Math.random() * 0.16) * speedMultiplier * zDepth;

        newParticles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseRadius: isRed ? 1.8 + Math.random() * 1.4 : 1.4 + Math.random() * 1.0,
          type: isRed ? 'red' : 'white',
          isPulsing,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.018 + Math.random() * 0.025,
          longReach,
          zDepth,
        });
      }

      return newParticles;
    };

    // Resize handler with Device Pixel Ratio support
    const handleResize = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      // Handle 0 dimensions if hidden
      if (width === 0 || height === 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      particles = createParticles(width, height);
    };

    // IntersectionObserver to pause loop when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Initial sizing
    handleResize();
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Main animation loop
    const render = () => {
      if (!isVisible || width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Base connection distance based on viewport
      const isMobile = width < 768;
      const baseMaxDist = isMobile ? 120 : 165;
      const margin = 35; // margin before wrapping/bouncing

      // Update positions & phases
      const pLen = particles.length;
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges with margin for continuous seamless flow
        if (p.x < -margin) p.x = width + margin;
        if (p.x > width + margin) p.x = -margin;
        if (p.y < -margin) p.y = height + margin;
        if (p.y > height + margin) p.y = -margin;

        // Update pulse phase
        if (p.isPulsing) {
          p.pulsePhase += p.pulseSpeed;
        }
      }

      // 1. Draw Connecting Geometric Lines and Translucent Triangle Facets
      // We check pairwise distances
      for (let i = 0; i < pLen; i++) {
        const p1 = particles[i];
        // Allow extended distance if node has longReach
        const reach1 = p1.longReach ? baseMaxDist * 1.45 : baseMaxDist;

        for (let j = i + 1; j < pLen; j++) {
          const p2 = particles[j];
          const reach = Math.max(reach1, p2.longReach ? baseMaxDist * 1.45 : baseMaxDist);

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;
          const reachSq = reach * reach;

          if (distSq < reachSq) {
            const dist = Math.sqrt(distSq);
            // Opacity falls off smoothly with distance and depth
            const normDist = 1 - dist / reach;
            const avgDepth = (p1.zDepth + p2.zDepth) * 0.5;
            const baseAlpha = (normDist * normDist) * 0.38 * avgDepth;

            if (baseAlpha > 0.015) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);

              // Line color adaptation:
              // Red-Red: deep crisp red
              // White-White: transparent white
              // Red-White: subtle muted red/white gradient
              if (p1.type === 'red' && p2.type === 'red') {
                ctx.strokeStyle = `rgba(237, 28, 36, ${baseAlpha.toFixed(3)})`;
              } else if (p1.type === 'white' && p2.type === 'white') {
                ctx.strokeStyle = `rgba(255, 255, 255, ${(baseAlpha * 0.75).toFixed(3)})`;
              } else {
                // Mixed connection: muted dark-red / translucent white
                ctx.strokeStyle = `rgba(237, 100, 105, ${(baseAlpha * 0.85).toFixed(3)})`;
              }

              ctx.lineWidth = 0.75 * avgDepth;
              ctx.stroke();

              // Irregular Polygon / Triangle Fills:
              // Check for a third connected neighbor to form delicate translucent architectural facet
              // Only check on desktop or moderate particle count for 60fps performance
              if (!isMobile && i % 3 === 0 && j % 2 === 0) {
                for (let k = j + 1; k < Math.min(pLen, j + 8); k++) {
                  const p3 = particles[k];
                  const d13Sq = (p3.x - p1.x) ** 2 + (p3.y - p1.y) ** 2;
                  const d23Sq = (p3.x - p2.x) ** 2 + (p3.y - p2.y) ** 2;
                  const triLimitSq = (baseMaxDist * 1.1) ** 2;

                  if (d13Sq < triLimitSq && d23Sq < triLimitSq) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.lineTo(p3.x, p3.y);
                    ctx.closePath();
                    // Subtle geometric facet tint: delicate red or faint warm-white
                    const isRedFacet = p1.type === 'red' || p2.type === 'red';
                    ctx.fillStyle = isRedFacet
                      ? `rgba(237, 28, 36, ${(baseAlpha * 0.08).toFixed(4)})`
                      : `rgba(255, 255, 255, ${(baseAlpha * 0.05).toFixed(4)})`;
                    ctx.fill();
                    break; // one triangle per pair is enough for tasteful geometry
                  }
                }
              }
            }
          }
        }

        // Subtle desktop cursor interaction: faint connection to mouse
        if (mouse.isActive && !isMobile) {
          const mdx = mouse.x - p1.x;
          const mdy = mouse.y - p1.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          const mouseReach = 140;
          if (mDistSq < mouseReach * mouseReach) {
            const mDist = Math.sqrt(mDistSq);
            const mAlpha = (1 - mDist / mouseReach) * 0.22 * p1.zDepth;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(237, 28, 36, ${mAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 2. Draw Nodes with Glowing Centres
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];
        const pulse = p.isPulsing ? Math.sin(p.pulsePhase) * 0.35 + 1 : 1;
        const currentRadius = p.baseRadius * p.zDepth * (p.isPulsing ? (0.9 + pulse * 0.15) : 1);

        // Soft outer glowing halo
        const haloRadius = currentRadius * (p.isPulsing ? 3.8 * pulse : 2.8);
        const haloGradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          haloRadius
        );

        if (p.type === 'red') {
          haloGradient.addColorStop(0, `rgba(237, 28, 36, ${(0.45 * p.zDepth).toFixed(3)})`);
          haloGradient.addColorStop(0.5, `rgba(237, 28, 36, ${(0.15 * p.zDepth).toFixed(3)})`);
          haloGradient.addColorStop(1, 'rgba(237, 28, 36, 0)');
        } else {
          haloGradient.addColorStop(0, `rgba(255, 255, 255, ${(0.35 * p.zDepth).toFixed(3)})`);
          haloGradient.addColorStop(0.6, `rgba(255, 255, 255, ${(0.10 * p.zDepth).toFixed(3)})`);
          haloGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        ctx.fillStyle = haloGradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node Body
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.type === 'red' ? '#ED1C24' : '#FFFFFF';
        ctx.fill();

        // Crisp White Glowing Center Dot for luminous contrast
        if (currentRadius > 1.4) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-none"
      />
    </div>
  );
};
