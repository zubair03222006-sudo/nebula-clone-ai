/**
 * Cosmic Theme — Design system constants for Nebula.
 * Mirrors the cosmic-compass color palette, spacing, radii,
 * and typography for React Native.
 */

export const CosmicColors = {
  // Core palette (oklch-inspired, mapped to hex/rgba for RN)
  background: '#1a0f2e',       // oklch(0.13 0.04 285) deep cosmic purple
  foreground: '#f5f0ff',       // oklch(0.97 0.01 280) near-white lavender
  mutedForeground: '#b8a8d0',  // oklch(0.75 0.04 280) muted lavender

  // Accent colors
  violet: '#9333ea',           // oklch(0.65 0.22 300)
  gold: '#d4a844',             // oklch(0.82 0.14 80)
  neon: '#5b8def',             // oklch(0.75 0.18 240)
  nebula: '#7e22ce',           // oklch(0.45 0.18 310)

  // Functional
  primary: '#7c3aed',          // oklch(0.72 0.18 295) — primary violet
  card: 'rgba(40, 25, 80, 0.55)',
  cardForeground: '#f5f0ff',

  // Glass surfaces
  glass: 'rgba(255, 255, 255, 0.06)',
  glassStrong: 'rgba(255, 255, 255, 0.10)',
  border: 'rgba(255, 255, 255, 0.08)',
  borderStrong: 'rgba(255, 255, 255, 0.12)',

  // Shadows (used with shadowColor on iOS)
  shadowViolet: '#9333ea',
  shadowGold: '#d4a844',
} as const;

export const CosmicSpacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  section: 28,
} as const;

export const CosmicRadii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
} as const;

export const CosmicFonts = {
  display: 'serif',   // Fraunces-like serif
  sans: 'System',     // Inter-like system
} as const;
