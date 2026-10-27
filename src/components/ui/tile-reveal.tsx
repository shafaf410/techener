import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { cn } from '@/lib/utils';

export interface TileRevealProps {
  /** Array of image URLs laid out row by row into the grid */
  images: string[];
  /** Content that stays visible through the whole sequence, centered over the tiles */
  headline?: ReactNode;
  /** Content revealed once the tiles have cleared the stage */
  children?: ReactNode;
  /** Number of grid columns (default: 3) */
  columns?: number;
  /** Gap between tiles in pixels (default: 28) */
  gap?: number;
  /** Maximum grid width in pixels; shrinks with viewport (default: 720) */
  gridWidth?: number;
  /** Width to height ratio of each tile (default: 1) */
  tileAspect?: number;
  /** Corner radius of each tile in pixels (default: 0) */
  tileRadius?: number;
  /** Render the images in grayscale (default: false) */
  grayscale?: boolean;
  /** Which edge columns enter from: 'alternate' | 'top' | 'bottom' (default: 'alternate') */
  direction?: 'alternate' | 'top' | 'bottom';
  /** Delay between tiles in a column, relative to one tile flight time (default: 0.06) */
  stagger?: number;
  /** How far the zoom phase overlaps the fly-in, as a fraction of one flight (default: 0.6) */
  overlap?: number;
  /** Scale the grid reaches before the tiles leave the stage (default: 2.05) */
  zoom?: number;
  /** Minimum push fraction as columns spread apart (default: 0.4) */
  spread?: number;
  /** Extra viewport heights of scroll driving sequence (default: 3) */
  scrollLength?: number;
  /** Seconds the motion lags behind scroll position for smooth scrub (default: 0.08) */
  scrub?: number;
  /** Gap between the headline and revealed content in pixels (default: 28) */
  contentGap?: number;
  /** Stage background color (default: 'transparent') */
  backgroundColor?: string;
  /** Callback fired on scroll progress from 0 to 1 */
  onProgress?: (progress: number) => void;
  /** Optional extra classes for outer section */
  className?: string;
  /** Optional inline styles for outer section */
  style?: CSSProperties;
}

const clamp = (val: number, min: number, max: number): number =>
  val < min ? min : val > max ? max : val;

const easeInOutPower = (val: number, power: number): number =>
  val < 0.5
    ? Math.pow(2, power - 1) * Math.pow(val, power)
    : 1 - Math.pow(-2 * val + 2, power) / 2;

const usePrefersReducedMotion = (): boolean => {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reducedMotion;
};

export const TileReveal: React.FC<TileRevealProps> = ({
  images,
  headline,
  children,
  columns = 3,
  gap = 28,
  gridWidth = 720,
  tileAspect = 1,
  tileRadius = 12,
  grayscale = false,
  direction = 'alternate',
  stagger = 0.06,
  overlap = 0.6,
  zoom = 2.05,
  spread = 0.4,
  scrollLength = 3,
  scrub = 0.08,
  contentGap = 28,
  backgroundColor = 'transparent',
  onProgress,
  className,
  style,
}) => {
  const prefersReduced = usePrefersReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const headlineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const currProgressRef = useRef(0);
  const rafIdRef = useRef(0);
  const lastTimeRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const stickyWidthRef = useRef(0);
  const stickyHeightRef = useRef(0);
  const gridOffsetWidthRef = useRef(0);
  const gridOffsetHeightRef = useRef(0);
  const contentHeightRef = useRef(0);

  const colCount = Math.max(1, Math.round(columns));
  const imageCount = images.length;

  const layoutData = useMemo(() => {
    const midCol = (colCount - 1) / 2;
    const colHeights = Array.from({ length: colCount }, (_, colIdx) =>
      Math.floor((imageCount - colIdx + colCount - 1) / colCount)
    );
    const maxColHeight = Math.max(0, ...colHeights);
    const zoomStart = Math.max(0, (maxColHeight > 0 ? 1 + (maxColHeight - 1) * stagger : 0) - overlap);
    const contentStart = zoomStart + 1 - 0.32;
    const total = Math.max(zoomStart + 1, contentStart + 0.32, 0.001);

    const tiles = Array.from({ length: imageCount }, (_, idx) => {
      const col = idx % colCount;
      const row = Math.floor(idx / colCount);
      const colLen = colHeights[col];
      const fromTop = direction === 'top' || (direction !== 'bottom' && col % 2 === 0);
      const isMid = Math.abs(col - midCol) < 0.001;
      const lateralDir = isMid ? 0 : Math.sign(col - midCol);
      const verticalDir = isMid ? (row < Math.floor(colLen / 2) ? -1 : 1) : 0;

      return {
        start: (fromTop ? colLen - 1 - row : row) * stagger,
        dir: fromTop ? -1 : 1,
        col,
        row,
        lateral: lateralDir,
        vertical: verticalDir,
      };
    });

    return {
      tiles,
      rows: Math.ceil(imageCount / colCount),
      mid: midCol,
      zoomStart,
      splitStart: zoomStart + 0.5,
      contentStart,
      total,
    };
  }, [colCount, imageCount, direction, overlap, stagger]);

  const updateProgress = useCallback(
    (progress: number) => {
      const gridEl = gridRef.current;
      if (!gridEl) return;

      const normalized = progress * layoutData.total;
      const flyDistance = (stickyHeightRef.current + gridOffsetHeightRef.current) / 2;
      const zoomProgress = easeInOutPower(clamp(normalized - layoutData.zoomStart, 0, 1), 3);
      const splitProgress = easeInOutPower(
        clamp((normalized - layoutData.splitStart) / 0.5, 0, 1),
        1
      );
      const contentProgress = easeInOutPower(
        clamp((normalized - layoutData.contentStart) / 0.32, 0, 1),
        2
      );
      const currentScale = Math.max(zoom, 1);

      gridEl.style.transform = `scale(${1 + (currentScale - 1) * zoomProgress})`;

      const tileWidth = Math.max(
        1,
        (gridOffsetWidthRef.current - gap * (colCount - 1)) / colCount
      );
      const tileHeight = tileWidth / Math.max(tileAspect, 0.01);
      const colStep = tileWidth + gap;
      const rowStep = tileHeight + gap;
      const midRow = (layoutData.rows - 1) / 2;

      const spreadX = (offset: number) =>
        Math.max(
          spread * tileWidth,
          stickyWidthRef.current / (2 * currentScale) + tileWidth / 2 - Math.abs(offset) + gap
        );
      const spreadY = (offset: number) =>
        Math.max(
          spread * tileHeight,
          stickyHeightRef.current / (2 * currentScale) + tileHeight / 2 - Math.abs(offset) + gap
        );

      for (let i = 0; i < layoutData.tiles.length; i++) {
        const tileEl = tilesRef.current[i];
        if (!tileEl) continue;
        const t = layoutData.tiles[i];
        const flyProgress = easeInOutPower(clamp(normalized - t.start, 0, 1), 1);
        const yFly = t.dir * flyDistance * (1 - flyProgress);
        const xSpread = t.lateral * spreadX((t.col - layoutData.mid) * colStep) * zoomProgress;
        const ySpread = t.vertical * spreadY((t.row - midRow) * rowStep) * splitProgress;

        tileEl.style.transform = `translate3d(${xSpread.toFixed(2)}px, ${(yFly + ySpread).toFixed(2)}px, 0)`;
        tileEl.style.visibility = flyProgress <= 0 ? 'hidden' : 'visible';
      }

      const headlineEl = headlineRef.current;
      if (headlineEl) {
        const yShift = ((contentHeightRef.current + contentGap) / 2) * (1 - contentProgress);
        headlineEl.style.transform = `translate3d(0, ${yShift.toFixed(2)}px, 0)`;
      }

      const contentEl = contentRef.current;
      if (contentEl) {
        contentEl.style.opacity = contentProgress.toFixed(3);
        contentEl.style.transform = `translate3d(0, ${((1 - contentProgress) * 12).toFixed(2)}px, 0)`;
        contentEl.style.pointerEvents = contentProgress > 0.5 ? 'auto' : 'none';
      }

      onProgress?.(progress);
    },
    [colCount, contentGap, gap, onProgress, layoutData, spread, tileAspect, zoom]
  );

  const getScrollProgress = useCallback(() => {
    const sectionEl = sectionRef.current;
    const stickyEl = stickyRef.current;
    if (!sectionEl || !stickyEl) return 0;
    const sectionRect = sectionEl.getBoundingClientRect();
    const scrollableDist = sectionRect.height - stickyEl.getBoundingClientRect().height;
    return scrollableDist <= 0 ? 0 : clamp(-sectionRect.top / scrollableDist, 0, 1);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    const sectionEl = sectionRef.current;
    const stickyEl = stickyRef.current;
    const gridEl = gridRef.current;
    if (!sectionEl || !stickyEl || !gridEl) return;

    const doc = sectionEl.ownerDocument;
    const win = doc.defaultView;
    if (!win) return;

    const scrubSeconds = Math.max(scrub, 0);

    const loop = (timestamp: number) => {
      const prevTimestamp = lastTimeRef.current || timestamp;
      const deltaSec = Math.min(0.05, Math.max(0, (timestamp - prevTimestamp) / 1000));
      lastTimeRef.current = timestamp;

      const targetProgress = getScrollProgress();
      const factor = scrubSeconds > 0 ? 1 - Math.exp(-deltaSec / scrubSeconds) : 1;
      const nextProgress =
        currProgressRef.current + (targetProgress - currProgressRef.current) * factor;

      currProgressRef.current = nextProgress;
      updateProgress(nextProgress);

      if (Math.abs(targetProgress - nextProgress) > 0.0004) {
        rafIdRef.current = win.requestAnimationFrame(loop);
      } else {
        currProgressRef.current = targetProgress;
        updateProgress(targetProgress);
        isAnimatingRef.current = false;
      }
    };

    const onScroll = () => {
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        lastTimeRef.current = 0;
        rafIdRef.current = win.requestAnimationFrame(loop);
      }
    };

    const onResize = () => {
      const stickyRect = stickyEl.getBoundingClientRect();
      stickyWidthRef.current = stickyRect.width;
      stickyHeightRef.current = stickyRect.height;
      gridOffsetWidthRef.current = gridEl.offsetWidth;
      gridOffsetHeightRef.current = gridEl.offsetHeight;
      contentHeightRef.current = contentRef.current?.offsetHeight ?? 0;
      currProgressRef.current = getScrollProgress();
      updateProgress(currProgressRef.current);
    };

    onResize();
    win.addEventListener('scroll', onScroll, { passive: true });
    doc.addEventListener('scroll', onScroll, { passive: true, capture: true });
    win.addEventListener('resize', onResize);
    win.addEventListener('pageshow', onResize);

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(sectionEl);
    resizeObserver.observe(stickyEl);
    resizeObserver.observe(gridEl);
    if (contentRef.current) resizeObserver.observe(contentRef.current);

    return () => {
      win.cancelAnimationFrame(rafIdRef.current);
      isAnimatingRef.current = false;
      win.removeEventListener('scroll', onScroll);
      doc.removeEventListener('scroll', onScroll, { capture: true });
      win.removeEventListener('resize', onResize);
      win.removeEventListener('pageshow', onResize);
      resizeObserver.disconnect();
    };
  }, [getScrollProgress, updateProgress, prefersReduced, scrub]);

  const sectionStyle: CSSProperties = useMemo(
    () => ({
      height: prefersReduced
        ? undefined
        : `${((1 + Math.max(scrollLength, 0)) * 100).toFixed(2)}svh`,
      ...style,
    }),
    [prefersReduced, scrollLength, style]
  );

  const tileStyle: CSSProperties = useMemo(
    () => ({
      aspectRatio: `${tileAspect}`,
      borderRadius: `${tileRadius}px`,
    }),
    [tileAspect, tileRadius]
  );

  const centerContent = (
    <div
      className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center px-4 select-none"
      style={{ gap: `${contentGap}px` }}
    >
      {headline !== undefined && (
        <div ref={headlineRef} className="will-change-transform [backface-visibility:hidden]">
          {headline}
        </div>
      )}
      {children !== undefined && (
        <div
          ref={contentRef}
          className="will-change-transform [backface-visibility:hidden]"
          style={prefersReduced ? undefined : { opacity: 0 }}
        >
          {children}
        </div>
      )}
    </div>
  );

  if (prefersReduced) {
    return (
      <section
        ref={sectionRef}
        className={cn('relative w-full overflow-hidden', className)}
        style={{ ...sectionStyle, height: '100svh', background: backgroundColor }}
      >
        {centerContent}
      </section>
    );
  }

  return (
    <section ref={sectionRef} className={cn('relative w-full', className)} style={sectionStyle}>
      <div
        ref={stickyRef}
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100svh', background: backgroundColor }}
      >
        {centerContent}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: `min(${gridWidth}px, calc(100% - ${2 * gap}px))` }}
        >
          <div
            ref={gridRef}
            className="grid will-change-transform"
            style={{
              gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
              gap: `${gap}px`,
            }}
          >
            {images.map((src, idx) => (
              <div
                key={`${src}-${idx}`}
                ref={(el) => {
                  tilesRef.current[idx] = el;
                }}
                className="w-full overflow-hidden will-change-transform [backface-visibility:hidden] shadow-2xl border border-white/10"
                style={{ ...tileStyle, visibility: 'hidden' }}
              >
                <img
                  src={src}
                  alt=""
                  draggable={false}
                  loading="lazy"
                  className={cn(
                    'h-full w-full select-none object-cover transition-transform duration-700',
                    grayscale && 'grayscale'
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TileReveal;
