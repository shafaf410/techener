import React, { useEffect, useRef } from 'react';

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  type: 'white' | 'red';
  isStarburst: boolean; // Has 4-point laser star flare
  starRayLength: number;
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
      radius: 200, // Interactive hover radius
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

    // Calculate particle count: balanced density matching user's exact mockup
    const createParticles = (w: number, h: number) => {
      const area = w * h;
      const isMobile = w < 768;

      const divisor = isMobile ? 13000 : 16000;
      let count = Math.floor(area / divisor);

      // Mobile: 45-65 nodes; Desktop: 85-130 nodes
      if (isMobile) {
        count = Math.max(45, Math.min(65, count));
      } else {
        count = Math.max(85, Math.min(130, count));
      }

      const newParticles: NodeParticle[] = [];
      for (let i = 0; i < count; i++) {
        // ~22% Red nodes with luminous starburst flares, ~78% White nodes
        const isRed = Math.random() < 0.22;
        const isStarburst = isRed || Math.random() < 0.08;
        const zDepth = 0.75 + Math.random() * 0.55;

        // Slow, elegant continuous float
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.08 + Math.random() * 0.16) * speedMultiplier * zDepth;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        const baseRadius = isRed
          ? (2.4 + Math.random() * 1.4)
          : (1.8 + Math.random() * 1.8);

        const starRayLength = isRed
          ? (24 + Math.random() * 26) // 24px to 50px starburst flare rays
          : (16 + Math.random() * 18);

        newParticles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx,
          vy,
          baseRadius,
          type: isRed ? 'red' : 'white',
          isStarburst,
          starRayLength,
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

    // Draw 4-point laser starburst flare matching reference image
    const drawStarburstFlare = (
      pX: number,
      pY: number,
      rayLen: number,
      isRedNode: boolean,
      opacity: number
    ) => {
      const len = rayLen;

      // Horizontal ray
      const gradH = ctx.createLinearGradient(pX - len, pY, pX + len, pY);
      if (isRedNode) {
        gradH.addColorStop(0, 'rgba(237, 28, 36, 0)');
        gradH.addColorStop(0.35, `rgba(255, 60, 60, ${(0.35 * opacity).toFixed(3)})`);
        gradH.addColorStop(0.5, `rgba(255, 120, 120, ${(0.95 * opacity).toFixed(3)})`);
        gradH.addColorStop(0.65, `rgba(255, 60, 60, ${(0.35 * opacity).toFixed(3)})`);
        gradH.addColorStop(1, 'rgba(237, 28, 36, 0)');
      } else {
        gradH.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradH.addColorStop(0.5, `rgba(255, 255, 255, ${(0.85 * opacity).toFixed(3)})`);
        gradH.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      ctx.fillStyle = gradH;
      ctx.fillRect(pX - len, pY - 0.75, len * 2, 1.5);

      // Vertical ray
      const gradV = ctx.createLinearGradient(pX, pY - len, pX, pY + len);
      if (isRedNode) {
        gradV.addColorStop(0, 'rgba(237, 28, 36, 0)');
        gradV.addColorStop(0.35, `rgba(255, 60, 60, ${(0.35 * opacity).toFixed(3)})`);
        gradV.addColorStop(0.5, `rgba(255, 120, 120, ${(0.95 * opacity).toFixed(3)})`);
        gradV.addColorStop(0.65, `rgba(255, 60, 60, ${(0.35 * opacity).toFixed(3)})`);
        gradV.addColorStop(1, 'rgba(237, 28, 36, 0)');
      } else {
        gradV.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradV.addColorStop(0.5, `rgba(255, 255, 255, ${(0.85 * opacity).toFixed(3)})`);
        gradV.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      ctx.fillStyle = gradV;
      ctx.fillRect(pX - 0.75, pY - len, 1.5, len * 2);

      // Subtle diagonal 45-degree ray
      const diagLen = len * 0.45;
      ctx.save();
      ctx.translate(pX, pY);
      ctx.rotate(Math.PI / 4);
      const gradD = ctx.createLinearGradient(-diagLen, 0, diagLen, 0);
      if (isRedNode) {
        gradD.addColorStop(0, 'rgba(237, 28, 36, 0)');
        gradD.addColorStop(0.5, `rgba(255, 140, 140, ${(0.7 * opacity).toFixed(3)})`);
        gradD.addColorStop(1, 'rgba(237, 28, 36, 0)');
      } else {
        gradD.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradD.addColorStop(0.5, `rgba(255, 255, 255, ${(0.6 * opacity).toFixed(3)})`);
        gradD.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      ctx.fillStyle = gradD;
      ctx.fillRect(-diagLen, -0.5, diagLen * 2, 1.0);
      ctx.restore();
    };

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
      const baseMaxDist = isMobile ? 95 : 135;
      const margin = 35;
      const pLen = particles.length;

      // Track connection counts per node: strictly cap at 2-3 lines per node
      const MAX_CONNECTIONS = 3;
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

        p.pulsePhase += p.pulseSpeed;
      }

      // 2. Draw Geometric Connection Lines (Matching Reference Image)
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

            // Opacity: high-contrast on deep black background
            const lineAlpha = (normDist * 0.55 + (normDist * normDist) * 0.25) * avgDepth;

            if (lineAlpha > 0.03) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);

              // Red lines if connected to red nodes, white/grey lines for white nodes
              if (p1.type === 'red' || p2.type === 'red') {
                ctx.strokeStyle = `rgba(237, 28, 36, ${lineAlpha.toFixed(3)})`;
              } else {
                ctx.strokeStyle = `rgba(220, 225, 235, ${(lineAlpha * 0.75).toFixed(3)})`;
              }

              ctx.lineWidth = 0.8 * avgDepth;
              ctx.stroke();

              connectionCounts[i]++;
              connectionCounts[j]++;
            }
          }
        }
      }

      // 3. Hover Interactivity: Connect cursor to top 3 nearest nodes with laser lines
      if (mouse.isActive && mouse.x > 0 && mouse.y > 0) {
        const candidates: { idx: number; dist: number }[] = [];
        const mReach = 185;

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
          const mAlpha = (mNorm * 0.75) * p.zDepth;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(237, 28, 36, ${mAlpha.toFixed(3)})`;
          ctx.lineWidth = 1.0 * p.zDepth;
          ctx.stroke();
        }

        // Draw interactive cursor starburst hub
        drawStarburstFlare(mouse.x, mouse.y, 35, true, 1.0);
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }

      // 4. Draw Nodes with Crisp 4-Point Starburst Flares (Matching reference exactly!)
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        let hoverBoost = 1.0;
        if (mouse.isActive) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < mouse.radius * mouse.radius) {
            const mDist = Math.sqrt(mDistSq);
            hoverBoost = 1.0 + (1 - mDist / mouse.radius) * 0.45;
          }
        }

        const pulse = Math.sin(p.pulsePhase) * 0.15 + 1;
        const currentRadius = p.baseRadius * p.zDepth * pulse * hoverBoost;

        // If Red Node or Key Starburst Node: Render Optic 4-Point Star Ray Flare!
        if (p.isStarburst) {
          const flareLen = p.starRayLength * p.zDepth * pulse * hoverBoost;
          drawStarburstFlare(p.x, p.y, flareLen, p.type === 'red', 0.95);
        }

        // Solid Node Core Dot (Zero blurry halo, pure sharp clean dot!)
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.type === 'red' ? '#ED1C24' : '#FFFFFF';
        ctx.fill();

        // White luminous center pinprick on red nodes
        if (p.type === 'red') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1.0, currentRadius * 0.45), 0, Math.PI * 2);
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
