import React, { useEffect, useRef } from 'react';

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  type: 'dark' | 'red';
  isMajorHub: boolean;
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

    // Interactive mouse state (physics displacement only, no rings/glows)
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      isActive: false,
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

    // Generate connected nodes clustered on the right side in an attractive formation
    const createParticles = (w: number, h: number) => {
      const isMobile = w < 768;
      const count = isMobile ? 36 : 64;

      const newParticles: NodeParticle[] = [];

      // Right side focal area (keeps left side clean for text & CTAs)
      const minX = isMobile ? w * 0.25 : w * 0.46;
      const maxX = w * 0.95;
      const minY = isMobile ? h * 0.08 : h * 0.12;
      const maxY = isMobile ? h * 0.52 : h * 0.88;

      const centerX = isMobile ? w * 0.60 : w * 0.72;
      const centerY = isMobile ? h * 0.30 : h * 0.50;

      for (let i = 0; i < count; i++) {
        let px: number;
        let py: number;

        if (Math.random() < 0.65) {
          // Organic constellation cluster with radial spread
          const angle = Math.random() * Math.PI * 2;
          const spreadX = (maxX - minX) * 0.38;
          const spreadY = (maxY - minY) * 0.42;
          const radius = Math.sqrt(Math.random());
          px = centerX + Math.cos(angle) * spreadX * radius;
          py = centerY + Math.sin(angle) * spreadY * radius;
        } else {
          // Distributed fill throughout the right side
          px = minX + Math.random() * (maxX - minX);
          py = minY + Math.random() * (maxY - minY);
        }

        px = Math.max(minX, Math.min(maxX, px));
        py = Math.max(minY, Math.min(maxY, py));

        // ~18% TechEner-G Red accent nodes, ~82% Deep Graphite nodes
        const isRed = Math.random() < 0.18;
        const isMajorHub = Math.random() < 0.24;

        // Slow, elegant continuous float
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.07 + Math.random() * 0.12) * speedMultiplier;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        // Clean solid dot radius (major hub nodes are slightly larger)
        const baseRadius = isMajorHub
          ? (isRed ? 4.2 : 3.8)
          : (isRed ? 2.8 : 2.4);

        newParticles.push({
          x: px,
          y: py,
          vx,
          vy,
          baseRadius,
          type: isRed ? 'red' : 'dark',
          isMajorHub,
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

      // Smooth mouse easing
      if (mouse.isActive) {
        mouse.x += (mouse.targetX - mouse.x) * 0.2;
        mouse.y += (mouse.targetY - mouse.y) * 0.2;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }

      const isMobile = width < 768;
      const baseMaxDist = isMobile ? 125 : 165;
      const pLen = particles.length;

      const minX = isMobile ? width * 0.20 : width * 0.44;
      const maxX = width * 0.96;
      const minY = isMobile ? height * 0.06 : height * 0.10;
      const maxY = isMobile ? height * 0.54 : height * 0.90;

      // 1. Update Positions & Gentle Hover Physics
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        // Hover Reaction: gently nudge nearby nodes away
        if (mouse.isActive) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          const mReach = 140;

          if (mDistSq < mReach * mReach && mDistSq > 1) {
            const mDist = Math.sqrt(mDistSq);
            const force = (1 - mDist / mReach) * 0.8;
            p.x += (mdx / mDist) * force * 1.5;
            p.y += (mdy / mDist) * force * 1.5;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Smooth boundary containment to keep the pattern on the right side
        if (p.x < minX) {
          p.x = minX;
          p.vx = Math.abs(p.vx);
        } else if (p.x > maxX) {
          p.x = maxX;
          p.vx = -Math.abs(p.vx);
        }

        if (p.y < minY) {
          p.y = minY;
          p.vy = Math.abs(p.vy);
        } else if (p.y > maxY) {
          p.y = maxY;
          p.vy = -Math.abs(p.vy);
        }
      }

      // 2. Draw Clean, Interconnected Geometric Network Lines
      const MAX_CONNECTIONS = 4;
      const connectionCounts = new Uint8Array(pLen);

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

            // Clear, attractive line visibility
            const lineAlpha = normDist * 0.42 + 0.06;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            if (p1.type === 'red' || p2.type === 'red') {
              ctx.strokeStyle = `rgba(240, 27, 37, ${(lineAlpha * 0.85).toFixed(3)})`;
              ctx.lineWidth = 1.1;
            } else {
              ctx.strokeStyle = `rgba(16, 28, 44, ${lineAlpha.toFixed(3)})`;
              ctx.lineWidth = 0.95;
            }

            ctx.stroke();

            connectionCounts[i]++;
            connectionCounts[j]++;
          }
        }
      }

      // 3. Draw Solid, Sharp Nodes (Zero glowing rings, zero blurry halos, zero cursor target circles)
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.type === 'red' ? '#F01B25' : '#101C2C';
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
