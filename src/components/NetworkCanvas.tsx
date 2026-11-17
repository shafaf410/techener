import React, { useEffect, useRef } from 'react';

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  type: 'dark' | 'red';
  isPulsing: boolean;
  pulsePhase: number;
  pulseSpeed: number;
  zDepth: number; // 0.75 to 1.35
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

    // Interactive mouse state
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      isActive: false,
      radius: 180, // Interactive reach in pixels
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

    // Calculate particle count: clean, spacious density on white background
    const createParticles = (w: number, h: number) => {
      const area = w * h;
      const isMobile = w < 768;

      const divisor = isMobile ? 12000 : 15000;
      let count = Math.floor(area / divisor);

      // Clamp counts: mobile 40-60, desktop 85-130
      if (isMobile) {
        count = Math.max(40, Math.min(60, count));
      } else {
        count = Math.max(85, Math.min(130, count));
      }

      const newParticles: NodeParticle[] = [];
      for (let i = 0; i < count; i++) {
        // On white background: 85% Deep Graphite (#101C2C) + 15% Tech Ener-G Red (#ED1C24)
        const isRed = Math.random() < 0.15;
        const zDepth = 0.75 + Math.random() * 0.55;
        const isPulsing = Math.random() < 0.3;

        // Slow, elegant continuous float
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.09 + Math.random() * 0.15) * speedMultiplier * zDepth;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        // Crisp solid dots without glow (radius 2.0px to 3.5px)
        const baseRadius = isRed
          ? (2.2 + Math.random() * 1.2)
          : (2.0 + Math.random() * 1.4);

        newParticles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx,
          vy,
          baseRadius,
          type: isRed ? 'red' : 'dark',
          isPulsing,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
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

      const isMobile = width < 768;
      const baseMaxDist = isMobile ? 85 : 115;
      const margin = 30;
      const pLen = particles.length;

      // Track connection counts per node: strictly cap at 2 lines per node!
      const MAX_CONNECTIONS = 2;
      const connectionCounts = new Uint8Array(pLen);

      // 1. Update Positions & Hover Interactivity Physics
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        // Hover Reaction: gently sway towards cursor
        if (mouse.isActive) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          const mReach = mouse.radius;

          if (mDistSq < mReach * mReach && mDistSq > 1) {
            const mDist = Math.sqrt(mDistSq);
            const force = (1 - mDist / mReach) * 1.2;
            p.x += (mdx / mDist) * force * 1.1;
            p.y += (mdy / mDist) * force * 1.1;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges seamlessly
        if (p.x < -margin) p.x = width + margin;
        if (p.x > width + margin) p.x = -margin;
        if (p.y < -margin) p.y = height + margin;
        if (p.y > height + margin) p.y = -margin;

        if (p.isPulsing) {
          p.pulsePhase += p.pulseSpeed;
        }
      }

      // 2. Draw Clean, Delicate Geometric Lines (No clutter, capped at 2 connections per node)
      for (let i = 0; i < pLen; i++) {
        if (connectionCounts[i] >= MAX_CONNECTIONS) continue;
        const p1 = particles[i];

        for (let j = i + 1; j < pLen; j++) {
          if (connectionCounts[i] >= MAX_CONNECTIONS) break;
          if (connectionCounts[j] >= MAX_CONNECTIONS) continue;

          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < baseMaxDist * baseMaxDist) {
            const dist = Math.sqrt(distSq);
            const normDist = 1 - dist / baseMaxDist;
            const avgDepth = (p1.zDepth + p2.zDepth) * 0.5;

            // Subtle, elegant line opacity on white background
            const lineAlpha = normDist * 0.32 * avgDepth;

            if (lineAlpha > 0.03) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);

              // Subtle slate or delicate red lines on white
              if (p1.type === 'red' && p2.type === 'red') {
                ctx.strokeStyle = `rgba(237, 28, 36, ${(lineAlpha * 0.9).toFixed(3)})`;
              } else if (p1.type === 'red' || p2.type === 'red') {
                ctx.strokeStyle = `rgba(200, 50, 60, ${(lineAlpha * 0.8).toFixed(3)})`;
              } else {
                ctx.strokeStyle = `rgba(16, 28, 44, ${lineAlpha.toFixed(3)})`;
              }

              ctx.lineWidth = 0.7 * avgDepth;
              ctx.stroke();

              connectionCounts[i]++;
              connectionCounts[j]++;
            }
          }
        }
      }

      // 3. Hover Interactivity: Connect cursor to ONLY the top 3 nearest nodes
      if (mouse.isActive && mouse.x > 0 && mouse.y > 0) {
        const candidates: { idx: number; dist: number }[] = [];
        const mReach = 165;

        for (let i = 0; i < pLen; i++) {
          const p = particles[i];
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (dist < mReach) {
            candidates.push({ idx: i, dist });
          }
        }

        candidates.sort((a, b) => a.dist - b.dist);
        const nearest = candidates.slice(0, 3);

        for (const item of nearest) {
          const p = particles[item.idx];
          const mNorm = 1 - item.dist / mReach;
          const mAlpha = mNorm * 0.55 * p.zDepth;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(237, 28, 36, ${mAlpha.toFixed(3)})`;
          ctx.lineWidth = 0.85 * p.zDepth;
          ctx.stroke();
        }

        // Crisp cursor hub (solid red center + delicate crisp ring, NO blurry glow)
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(237, 28, 36, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ED1C24';
        ctx.fill();
      }

      // 4. Draw Crisp, Solid Nodes (NO blurry white glow halos!)
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        let hoverScale = 1.0;
        if (mouse.isActive) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < mouse.radius * mouse.radius) {
            const mDist = Math.sqrt(mDistSq);
            hoverScale = 1.0 + (1 - mDist / mouse.radius) * 0.35; // gently enlarge on hover
          }
        }

        const pulse = p.isPulsing ? Math.sin(p.pulsePhase) * 0.18 + 1 : 1;
        const currentRadius = p.baseRadius * p.zDepth * pulse * hoverScale;

        // Solid crisp dot: Pure sharp edge, zero blur/fuzzy halo!
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.type === 'red' ? '#ED1C24' : '#101C2C';
        ctx.fill();

        // Optional tiny inner pinprick highlight for depth
        if (currentRadius > 2.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = p.type === 'red' ? '#FFD0D4' : '#64748B';
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
