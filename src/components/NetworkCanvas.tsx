import React, { useEffect, useRef } from 'react';

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  type: 'white' | 'red';
  isPulsing: boolean;
  pulsePhase: number;
  pulseSpeed: number;
  zDepth: number; // 0.75 (background) to 1.35 (foreground)
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
      radius: 190, // Interactive reach in pixels
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

    // Calculate particle count: clean, spacious density so lines never crowd the screen
    const createParticles = (w: number, h: number) => {
      const area = w * h;
      const isMobile = w < 768;

      const divisor = isMobile ? 12000 : 14500;
      let count = Math.floor(area / divisor);

      // Clamp counts: mobile 45-65, desktop 90-135
      if (isMobile) {
        count = Math.max(45, Math.min(65, count));
      } else {
        count = Math.max(90, Math.min(135, count));
      }

      const newParticles: NodeParticle[] = [];
      for (let i = 0; i < count; i++) {
        // Predominantly luminous White (#FFFFFF) with subtle red accents
        const isRed = Math.random() < 0.12;
        const zDepth = 0.75 + Math.random() * 0.55;
        const isPulsing = Math.random() < 0.35;

        // Slow, elegant continuous float
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.09 + Math.random() * 0.16) * speedMultiplier * zDepth;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        // Large, clearly visible nodes
        const baseRadius = isRed
          ? (2.2 + Math.random() * 1.4)
          : (2.4 + Math.random() * 1.8);

        newParticles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx,
          vy,
          baseRadius,
          type: isRed ? 'red' : 'white',
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
      // Controlled, shorter connection distance to eliminate dense line clutter
      const baseMaxDist = isMobile ? 85 : 115;
      const margin = 35;
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
            p.x += (mdx / mDist) * force * 1.2;
            p.y += (mdy / mDist) * force * 1.2;
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

      // 2. Draw Clean, Selective Node Lines (Capped at 2 connections per node)
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

            // Restrained, clean line opacity
            const lineAlpha = normDist * 0.40 * avgDepth;

            if (lineAlpha > 0.03) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);

              // Pure crisp white connection line
              ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha.toFixed(3)})`;
              ctx.lineWidth = 0.75 * avgDepth;
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
        const mReach = 170;

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
          const mAlpha = mNorm * 0.65 * p.zDepth;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${mAlpha.toFixed(3)})`;
          ctx.lineWidth = 0.9 * p.zDepth;
          ctx.stroke();
        }

        // Active glowing cursor dot
        const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 22);
        cursorGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        cursorGlow.addColorStop(0.4, 'rgba(255, 255, 255, 0.35)');
        cursorGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 22, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }

      // 4. Draw Distinct, Visible Glowing Nodes
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        let hoverBoost = 1.0;
        if (mouse.isActive) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < mouse.radius * mouse.radius) {
            const mDist = Math.sqrt(mDistSq);
            hoverBoost = 1.0 + (1 - mDist / mouse.radius) * 0.6;
          }
        }

        const pulse = p.isPulsing ? Math.sin(p.pulsePhase) * 0.35 + 1 : 1;
        const currentRadius = p.baseRadius * p.zDepth * (p.isPulsing ? (0.85 + pulse * 0.25) : 1) * hoverBoost;

        // Radiant Outer Glow Halo
        const haloRadius = currentRadius * (p.isPulsing ? 3.8 * pulse : 3.0);
        const haloGradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          haloRadius
        );

        if (p.type === 'red') {
          haloGradient.addColorStop(0, `rgba(237, 28, 36, ${(0.80 * p.zDepth * hoverBoost).toFixed(3)})`);
          haloGradient.addColorStop(0.5, `rgba(237, 28, 36, ${(0.25 * p.zDepth).toFixed(3)})`);
          haloGradient.addColorStop(1, 'rgba(237, 28, 36, 0)');
        } else {
          haloGradient.addColorStop(0, `rgba(255, 255, 255, ${(0.90 * p.zDepth * hoverBoost).toFixed(3)})`);
          haloGradient.addColorStop(0.4, `rgba(255, 255, 255, ${(0.35 * p.zDepth).toFixed(3)})`);
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

        // High-contrast bright center dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1.2, currentRadius * 0.52), 0, Math.PI * 2);
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
