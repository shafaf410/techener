import React, { useEffect, useRef } from 'react';

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originVx: number;
  originVy: number;
  baseRadius: number;
  type: 'white' | 'red';
  isPulsing: boolean;
  pulsePhase: number;
  pulseSpeed: number;
  longReach: boolean;
  zDepth: number; // 0.75 (subtle background) to 1.35 (bright crisp foreground)
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
    const speedMultiplier = prefersReducedMotion ? 0.2 : 1.0;

    // Interactive mouse state with smooth coordinates
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      isActive: false,
      radius: 230, // Interactive hover reach in pixels
    };

    const updateMousePos = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = clientX - rect.left;
      mouse.targetY = clientY - rect.top;
      mouse.isActive = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateMousePos(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    const handleTouchEnd = () => {
      mouse.isActive = false;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    // Calculate particle count: higher density for rich, visible constellation
    const createParticles = (w: number, h: number) => {
      const area = w * h;
      const isMobile = w < 768;

      // Higher density: ~1 node per 8,500 px² on desktop, ~1 node per 7,500 px² on mobile
      const divisor = isMobile ? 7500 : 9000;
      let count = Math.floor(area / divisor);

      // Clamp counts: mobile 70-110, desktop 160-250
      if (isMobile) {
        count = Math.max(70, Math.min(110, count));
      } else {
        count = Math.max(160, Math.min(250, count));
      }

      const newParticles: NodeParticle[] = [];
      for (let i = 0; i < count; i++) {
        // "Make it white": 86% luminous White (#FFFFFF), 14% subtle Red accent (#ED1C24)
        const isRed = Math.random() < 0.14;
        const zDepth = 0.75 + Math.random() * 0.6; // 0.75 to 1.35
        const isPulsing = Math.random() < 0.35; // 35% pulse rhythmically
        const longReach = Math.random() < 0.22; // 22% form extended geometric lines

        // Slow, elegant continuous float
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.10 + Math.random() * 0.18) * speedMultiplier * zDepth;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        // Larger, more visible base radius (2.4px to 4.5px)
        const baseRadius = isRed
          ? (2.2 + Math.random() * 1.5)
          : (2.4 + Math.random() * 2.1);

        newParticles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx,
          vy,
          originVx: vx,
          originVy: vy,
          baseRadius,
          type: isRed ? 'red' : 'white',
          isPulsing,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
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
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Main animation loop
    const render = () => {
      if (!isVisible || width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinate easing
      if (mouse.isActive) {
        mouse.x += (mouse.targetX - mouse.x) * 0.25;
        mouse.y += (mouse.targetY - mouse.y) * 0.25;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }

      // Connection thresholds
      const isMobile = width < 768;
      const baseMaxDist = isMobile ? 125 : 175;
      const margin = 40;
      const pLen = particles.length;

      // 1. Update Positions & Hover Interactivity Physics
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        // Hover Interactive Reaction:
        // When mouse is within radius, gently pull node towards cursor and light it up
        if (mouse.isActive) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          const mReach = mouse.radius;

          if (mDistSq < mReach * mReach && mDistSq > 1) {
            const mDist = Math.sqrt(mDistSq);
            // Smooth magnetic attraction force that peaks at mid-distance
            const force = (1 - mDist / mReach) * 1.4;
            p.x += (mdx / mDist) * force * 1.5;
            p.y += (mdy / mDist) * force * 1.5;
          }
        }

        // Autonomous floating drift
        p.x += p.vx;
        p.y += p.vy;

        // Seamless wrap around edges
        if (p.x < -margin) p.x = width + margin;
        if (p.x > width + margin) p.x = -margin;
        if (p.y < -margin) p.y = height + margin;
        if (p.y > height + margin) p.y = -margin;

        if (p.isPulsing) {
          p.pulsePhase += p.pulseSpeed;
        }
      }

      // 2. Draw Connecting Geometric Lines and Translucent Triangle Facets (Crisp White Mesh)
      for (let i = 0; i < pLen; i++) {
        const p1 = particles[i];
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
            const normDist = 1 - dist / reach;
            const avgDepth = (p1.zDepth + p2.zDepth) * 0.5;

            // Significantly more visible line opacity (base alpha up to 0.65)
            const lineAlpha = (normDist * 0.58 + (normDist * normDist) * 0.25) * avgDepth;

            if (lineAlpha > 0.02) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);

              // "Make it white": Pure, brilliant white geometric lines
              if (p1.type === 'red' && p2.type === 'red') {
                ctx.strokeStyle = `rgba(237, 28, 36, ${lineAlpha.toFixed(3)})`;
              } else if (p1.type === 'red' || p2.type === 'red') {
                ctx.strokeStyle = `rgba(255, 230, 235, ${(lineAlpha * 0.9).toFixed(3)})`;
              } else {
                ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha.toFixed(3)})`;
              }

              ctx.lineWidth = (0.85 + normDist * 0.45) * avgDepth;
              ctx.stroke();

              // Irregular Polygon / Triangle Fills for architectural mesh depth
              if (!isMobile && i % 2 === 0 && j % 2 === 0) {
                for (let k = j + 1; k < Math.min(pLen, j + 7); k++) {
                  const p3 = particles[k];
                  const d13Sq = (p3.x - p1.x) ** 2 + (p3.y - p1.y) ** 2;
                  const d23Sq = (p3.x - p2.x) ** 2 + (p3.y - p2.y) ** 2;
                  const triLimitSq = (baseMaxDist * 1.05) ** 2;

                  if (d13Sq < triLimitSq && d23Sq < triLimitSq) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.lineTo(p3.x, p3.y);
                    ctx.closePath();

                    // Subtle white geometric facet fill
                    ctx.fillStyle = `rgba(255, 255, 255, ${(lineAlpha * 0.09).toFixed(4)})`;
                    ctx.fill();
                    break;
                  }
                }
              }
            }
          }
        }

        // Hover Interactivity: Connect Cursor directly to nearby particles with bright white laser lines
        if (mouse.isActive) {
          const mdx = mouse.x - p1.x;
          const mdy = mouse.y - p1.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          const mReach = mouse.radius;

          if (mDistSq < mReach * mReach) {
            const mDist = Math.sqrt(mDistSq);
            const mNorm = 1 - mDist / mReach;
            const mAlpha = (mNorm * 0.75 + (mNorm * mNorm) * 0.25) * p1.zDepth;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            // Glowing energetic connection to cursor
            ctx.strokeStyle = `rgba(255, 255, 255, ${mAlpha.toFixed(3)})`;
            ctx.lineWidth = (1.1 + mNorm * 0.8) * p1.zDepth;
            ctx.stroke();
          }
        }
      }

      // 3. Draw Nodes with Bright Luminous Centres and Halos ("more and visible")
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        // Check if node is near mouse to boost visibility on hover
        let hoverBoost = 1.0;
        if (mouse.isActive) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < mouse.radius * mouse.radius) {
            const mDist = Math.sqrt(mDistSq);
            hoverBoost = 1.0 + (1 - mDist / mouse.radius) * 0.8; // up to 1.8x glow when hovered!
          }
        }

        const pulse = p.isPulsing ? Math.sin(p.pulsePhase) * 0.35 + 1 : 1;
        const currentRadius = p.baseRadius * p.zDepth * (p.isPulsing ? (0.85 + pulse * 0.25) : 1) * hoverBoost;

        // Large Luminous Outer Glow Halo
        const haloRadius = currentRadius * (p.isPulsing ? 4.2 * pulse : 3.4);
        const haloGradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          haloRadius
        );

        if (p.type === 'red') {
          haloGradient.addColorStop(0, `rgba(237, 28, 36, ${(0.85 * p.zDepth * hoverBoost).toFixed(3)})`);
          haloGradient.addColorStop(0.4, `rgba(237, 28, 36, ${(0.35 * p.zDepth).toFixed(3)})`);
          haloGradient.addColorStop(1, 'rgba(237, 28, 36, 0)');
        } else {
          // "Make it white": Brilliant celestial white glow halo
          haloGradient.addColorStop(0, `rgba(255, 255, 255, ${(0.95 * p.zDepth * hoverBoost).toFixed(3)})`);
          haloGradient.addColorStop(0.35, `rgba(255, 255, 255, ${(0.45 * p.zDepth).toFixed(3)})`);
          haloGradient.addColorStop(0.7, `rgba(255, 255, 255, ${(0.15 * p.zDepth).toFixed(3)})`);
          haloGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        ctx.fillStyle = haloGradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // Solid Node Core Body
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.type === 'red' ? '#ED1C24' : '#FFFFFF';
        ctx.fill();

        // Intense Bright White Center Dot for razor-sharp crisp visibility
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1.2, currentRadius * 0.52), 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }

      // 4. Interactive Cursor Glow Node (renders when hovering)
      if (mouse.isActive && mouse.x > 0 && mouse.y > 0) {
        const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 28);
        cursorGlow.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        cursorGlow.addColorStop(0.35, 'rgba(237, 28, 36, 0.5)');
        cursorGlow.addColorStop(1, 'rgba(237, 28, 36, 0)');
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 28, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
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
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
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
