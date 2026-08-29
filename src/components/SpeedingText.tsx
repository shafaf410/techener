import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SpeedingTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'left' | 'right';
}

export const SpeedingText: React.FC<SpeedingTextProps> = ({
  children,
  className = '',
  speed = 1.4,
  direction = 'left',
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const initialX = direction === 'left' ? -140 * speed : 140 * speed;
    const initialSkew = direction === 'left' ? -28 * speed : 28 * speed;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          x: initialX,
          skewX: initialSkew,
          scaleX: 1.5,
          filter: 'blur(12px)',
          opacity: 0,
        },
        {
          x: 0,
          skewX: 0,
          scaleX: 1,
          filter: 'blur(0px)',
          opacity: 1,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [speed, direction]);

  return (
    <div
      ref={textRef}
      className={`inline-block transform-gpu will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};
