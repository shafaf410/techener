import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CountUpNumberProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({
  end = 20000,
  suffix = '+',
  duration = 2.2,
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const animatedObj = useRef({ value: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(animatedObj.current, {
        value: end,
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        onUpdate: () => {
          setCount(Math.floor(animatedObj.current.value));
        },
      });
    }, el);

    return () => ctx.revert();
  }, [end, duration]);

  // Format with commas e.g. 20,000
  const formatted = count.toLocaleString('en-US');

  return (
    <span ref={containerRef} className={`inline-block font-mono-tech ${className}`}>
      {formatted}
      <span className="text-[#ED1C24]">{suffix}</span>
    </span>
  );
};
