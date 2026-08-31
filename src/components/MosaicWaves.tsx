import { useEffect, useRef } from 'react';

interface MosaicWavesProps {
  tileSize?: number;
  speed?: number;
  amplitude?: number;
  waveFreqX?: number;
  waveFreqY?: number;
  colors?: string[];
  className?: string;
}

/**
 * MosaicWaves — A canvas-based animated mosaic grid where sine waves roll
 * through tiles shifting their colors. Custom-built for Tech Ener-G.
 */
export const MosaicWaves: React.FC<MosaicWavesProps> = ({
  tileSize = 48,
  speed = 0.55,
  amplitude = 0.78,
  waveFreqX = 0.07,
  waveFreqY = 0.055,
  colors = [
    '#050505',
    '#0d0305',
    '#120508',
    '#1a0808',
    '#240c0c',
    '#2e0e0e',
    '#380f0f',
    '#200505',
    '#160303',
    '#0a0202',
    '#070101',
  ],
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;

    // Pre-parse hex to RGB arrays
    function hexToRgb(hex: string): [number, number, number] {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    }

    const parsedColors = colors.map(hexToRgb);

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width || canvas.offsetWidth;
      height = rect.height || canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      cols = Math.ceil(width / tileSize) + 1;
      rows = Math.ceil(height / tileSize) + 1;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let t = 0;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      const n = parsedColors.length - 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * tileSize;
          const y = row * tileSize;

          // Multi-layered sine waves for organic mosaic feel
          const w1 = Math.sin(col * waveFreqX + row * waveFreqY * 0.6 + t);
          const w2 = Math.sin(col * waveFreqX * 1.6 - row * waveFreqY + t * 1.4);
          const w3 = Math.cos(col * waveFreqX * 0.5 + row * waveFreqY * 1.5 + t * 0.8);
          const combined = (w1 * 0.5 + w2 * 0.3 + w3 * 0.2) * amplitude;

          // Normalize -amplitude..amplitude → 0..1
          const normalized = Math.max(0, Math.min(1, (combined + amplitude) / (2 * amplitude)));

          // Interpolate between palette colors
          const idx = normalized * n;
          const lower = Math.floor(idx);
          const upper = Math.min(lower + 1, n);
          const frac = idx - lower;

          const [r1, g1, b1] = parsedColors[lower];
          const [r2, g2, b2] = parsedColors[upper];
          const r = Math.round(r1 + (r2 - r1) * frac);
          const g = Math.round(g1 + (g2 - g1) * frac);
          const b = Math.round(b1 + (b2 - b1) * frac);

          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(x, y, tileSize, tileSize);
        }
      }

      // Radial vignette for depth & polish
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, Math.min(width, height) * 0.05,
        width / 2, height / 2, Math.max(width, height) * 0.9
      );
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.7)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      t += speed * 0.016;
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [tileSize, speed, amplitude, waveFreqX, waveFreqY, colors]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  );
};

export default MosaicWaves;
