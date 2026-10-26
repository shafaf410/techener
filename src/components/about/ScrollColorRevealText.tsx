import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollColorRevealTextProps {
  text: string;
  highlightWords?: string[]; // Words that should reveal as vibrant Red (#F01B25)
  className?: string;
  theme?: 'dark' | 'light';
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  startOffset?: string;
  endOffset?: string;
}

export const ScrollColorRevealText: React.FC<ScrollColorRevealTextProps> = ({
  text,
  highlightWords = ['power', 'progress', 'not', 'quality', 'uae', 'india', 'excellence'],
  className = '',
  theme = 'light',
  scrollContainerRef,
  startOffset = 'start 0.85',
  endOffset = 'start 0.25',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  // Set up scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // If containerRef is provided use it, otherwise window
    container: scrollContainerRef && scrollContainerRef.current ? (scrollContainerRef as React.RefObject<HTMLElement>) : undefined,
    offset: [startOffset as any, endOffset as any],
  });

  const words = text.split(' ');

  const normalizedHighlights = highlightWords.map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, ''));

  return (
    <p
      ref={containerRef}
      className={`flex flex-wrap items-baseline gap-x-[0.28em] gap-y-1 ${className}`}
    >
      {words.map((word, index) => {
        const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
        const isHighlight = normalizedHighlights.includes(cleanWord);

        // Progress threshold for this word
        const start = index / words.length;
        const end = Math.min(1, (index + 1) / words.length);

        return (
          <WordSpan
            key={`${word}-${index}`}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
            isHighlight={isHighlight}
            theme={theme}
          />
        );
      })}
    </p>
  );
};

interface WordSpanProps {
  word: string;
  progress: any;
  range: [number, number];
  isHighlight: boolean;
  theme: 'dark' | 'light';
}

const WordSpan: React.FC<WordSpanProps> = ({ word, progress, range, isHighlight, theme }) => {
  // Reveal progress for this individual word: 0 (dimmed) -> 1 (fully revealed)
  const wordProgress = useTransform(progress, range, [0, 1]);

  // Dimmed base color vs Revealed color
  const dimmedColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(160, 160, 160, 0.35)';
  const revealedColor = isHighlight
    ? '#F01B25' // Vibrant Signature Red
    : theme === 'dark'
    ? '#FFFFFF' // Bright Pure White
    : '#09090B'; // Crisp Rich Black

  const color = useTransform(wordProgress, [0, 1], [dimmedColor, revealedColor]);
  const opacity = useTransform(wordProgress, [0, 1], [0.35, 1]);
  const scale = useTransform(wordProgress, [0, 1], [0.98, 1]);
  const y = useTransform(wordProgress, [0, 1], [4, 0]);

  // Glow effect on red highlighted words as they reveal
  const textShadow = isHighlight
    ? useTransform(wordProgress, [0, 1], [
        '0 0 0px rgba(240, 27, 37, 0)',
        '0 0 20px rgba(240, 27, 37, 0.45)',
      ])
    : undefined;

  return (
    <motion.span
      style={{
        color,
        opacity,
        scale,
        y,
        textShadow,
      }}
      className={`inline-block font-grotesk tracking-tight transform-gpu will-change-transform ${
        isHighlight ? 'font-extrabold relative' : 'font-semibold'
      }`}
    >
      {word}
      {isHighlight && (
        <motion.span
          style={{ opacity: wordProgress }}
          className="absolute left-0 right-0 -bottom-1 h-[2px] bg-[#F01B25] rounded-full"
        />
      )}
    </motion.span>
  );
};
