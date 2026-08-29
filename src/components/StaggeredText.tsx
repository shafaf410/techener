import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StaggeredTextProps {
  text: string;
  className?: string;
  mode?: 'words' | 'chars';
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
}

export const StaggeredText: React.FC<StaggeredTextProps> = ({
  text,
  className = '',
  mode = 'words',
  staggerDelay = 0.08,
  duration = 0.6,
  once = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const items = mode === 'words' ? text.split(' ') : text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {items.map((item, index) => (
        <motion.span
          key={`${item}-${index}`}
          variants={itemVariants}
          className="inline-block mr-[0.28em] last:mr-0"
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
};
