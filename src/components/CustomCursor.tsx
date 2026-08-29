import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('.group') ||
        target.closest('[role="button"]') ||
        target.getAttribute('data-cursor-hover') === 'true';

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Unified Perfect Precision Cursor Container centered on Pointer */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 400,
          mass: 0.1,
        }}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Outer Glowing Ring */}
        <motion.div
          animate={{
            scale: isClicked ? 0.7 : isHovered ? 1.6 : 1,
            borderColor: isHovered ? '#F01B25' : 'rgba(255, 255, 255, 0.4)',
            backgroundColor: isHovered ? 'rgba(240, 27, 37, 0.12)' : 'transparent',
            boxShadow: isHovered
              ? '0 0 25px rgba(240, 27, 37, 0.7)'
              : '0 0 10px rgba(0, 0, 0, 0.5)',
          }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center"
        >
          {/* Inner Precision Red Laser Center Dot */}
          <motion.div
            animate={{
              scale: isHovered ? 1.4 : 1,
            }}
            transition={{ duration: 0.15 }}
            className="w-2.5 h-2.5 rounded-full bg-[#F01B25] shadow-[0_0_12px_#F01B25]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
