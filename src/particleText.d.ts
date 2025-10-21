/**
 * ParticleText.js TypeScript Definitions
 */

export interface BreakpointConfig {
  base: number;
  rand: number;
}

export interface ParticleRadiusConfig {
  xxxs?: BreakpointConfig;
  xxs?: BreakpointConfig;
  xs?: BreakpointConfig;
  sm?: BreakpointConfig;
  md?: BreakpointConfig;
  lg?: BreakpointConfig;
  xl?: BreakpointConfig;
  xxl?: BreakpointConfig;
  xxxl?: BreakpointConfig;
}

export interface ExplosionRadiusConfig {
  xxxs?: number;
  xxs?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  xxxl?: number;
}

export interface FrictionConfig {
  base: number;
  rand: number;
}

export interface ParticleTextConfig {
  /** Text to render as particles */
  text?: string;

  /** Array of hex color strings (e.g., ['#FF0000', '#00FF00']) */
  colors?: string | string[];

  /** Font weight for text rendering */
  fontWeight?: string;

  /** Font size in pixels */
  fontSize?: number;

  /** Text alignment */
  textAlign?: 'left' | 'center' | 'right';

  /** Particle radius configuration (breakpoint-based or function) */
  particleRadius?: ParticleRadiusConfig | (() => number);

  /** Explosion radius configuration (breakpoint-based) */
  explosionRadius?: ExplosionRadiusConfig;

  /** Whether to auto-start animation */
  autoAnimate?: boolean;

  /** Friction configuration */
  friction?: FrictionConfig | (() => number);

  /** Enable slow browser optimization */
  supportSlowBrowsers?: boolean;

  /** Callback when slow browser is detected */
  slowBrowserDetected?: () => void;

  /** Render time threshold in milliseconds for slow browser detection */
  renderTimeThreshold?: number;

  /** Maximum number of particles */
  maxParticles?: number;

  /** Error callback */
  onError?: (error: Error) => void;
}

export interface ParticleTextInstance {
  /** Whether animation is currently running */
  isAnimating: boolean;

  /** Array of particles (internal use) */
  particleList: any[];

  /** Get current responsive breakpoint */
  getCurrentBreakpoint(): string;

  /** Start animation */
  startAnimation(): void;

  /** Force a single animation frame */
  forceRequestAnimationFrame(): void;

  /** Destroy instance and cleanup */
  destroy(): void;
}

/**
 * Initialize ParticleText animation on a canvas element
 * @param elementSelector - CSS selector for the canvas element
 * @param config - Configuration options
 * @returns ParticleText instance
 */
export function initParticleJS(
  elementSelector: string,
  config?: ParticleTextConfig,
): ParticleTextInstance;

export as namespace ParticleText;

declare global {
  interface Window {
    ParticleText: {
      init: typeof initParticleJS;
    };
    initParticleJS: typeof initParticleJS;
  }
}
