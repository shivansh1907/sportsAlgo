// Theme tokens matching your Figma design system
// Neon green + dark theme with light mode support

export const COLORS = {
  // Brand
  primary: '#CCF930',        // Your neon green
  primaryDark: '#A8CC26',    // Slightly muted for hover states
  secondary: '#212928',      // Dark card surfaces
  tertiary: '#90F10F',       // Bright accent green

  // Dark mode
  dark: {
    bg: '#0A0A0A',           // Page background
    surface: '#141414',      // Card backgrounds
    surfaceAlt: '#1A1F1E',   // Elevated cards
    border: '#2A2F2E',       // Subtle borders
    textPrimary: '#FFFFFF',
    textSecondary: '#9CA3AF',
    textTertiary: '#6B7280',
  },

  // Light mode
  light: {
    bg: '#F9FAFB',
    surface: '#FFFFFF',
    surfaceAlt: '#F3F4F6',
    border: '#E5E7EB',
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
  },

  // Pitch
  pitchGreen: '#2D6A4F',
  pitchGreenLight: '#3A8F5C',
  pitchLines: '#FFFFFF',

  // Heatmap ramp (cold → hot)
  heatCold: '#3B82F6',      // Blue
  heatMid: '#F59E0B',       // Amber
  heatHot: '#EF4444',       // Red

  // Shot map
  goalScored: '#CCF930',     // Your primary
  shotSaved: '#F59E0B',
  shotMissed: '#6B7280',

  // Leaderboard badges
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32',

  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
};

// FIFA-standard pitch dimensions (in meters)
// Use these to convert real coordinates to SVG
export const PITCH = {
  length: 105,      // x-axis
  width: 68,        // y-axis
  penaltyAreaLength: 16.5,
  penaltyAreaWidth: 40.3,
  goalAreaLength: 5.5,
  goalAreaWidth: 18.32,
  centerCircleRadius: 9.15,
  penaltySpotDistance: 11,
  cornerArcRadius: 1,
  goalWidth: 7.32,
};

// Radar chart attributes (FIFA standard)
export const RADAR_ATTRIBUTES = [
  { key: 'pace', label: 'PAC', fullLabel: 'Pace' },
  { key: 'shooting', label: 'SHO', fullLabel: 'Shooting' },
  { key: 'passing', label: 'PAS', fullLabel: 'Passing' },
  { key: 'dribbling', label: 'DRI', fullLabel: 'Dribbling' },
  { key: 'defending', label: 'DEF', fullLabel: 'Defending' },
  { key: 'workRate', label: 'PHY', fullLabel: 'Work Rate' },
];

// Typography scale
export const TYPOGRAPHY = {
  display: { size: '32px', weight: 700, family: "'Inter', 'Satoshi', sans-serif" },
  h1: { size: '24px', weight: 600, family: "'Inter', 'Satoshi', sans-serif" },
  h2: { size: '18px', weight: 600, family: "'Inter', sans-serif" },
  body: { size: '16px', weight: 400, family: "'Inter', sans-serif" },
  caption: { size: '13px', weight: 500, family: "'Inter', sans-serif" },
  stat: { size: '28px', weight: 700, family: "'JetBrains Mono', monospace" },
};

// Navigation tabs
export const NAV_TABS = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'matches', label: 'Matches', icon: 'football' },
  { key: 'clips', label: 'Clips', icon: 'video' },
  { key: 'progress', label: 'Progress', icon: 'chart' },
  { key: 'leaderboard', label: 'Leaderboard', icon: 'trophy' },
];

// Helper: convert pitch coordinates (meters) to SVG coordinates
export function pitchToSvg(x, y, svgWidth, svgHeight) {
  return {
    x: (x / PITCH.length) * svgWidth,
    y: (y / PITCH.width) * svgHeight,
  };
}

// Helper: get heatmap color from intensity (0-1)
export function getHeatColor(intensity) {
  if (intensity < 0.33) {
    return COLORS.heatCold;
  } else if (intensity < 0.66) {
    return COLORS.heatMid;
  }
  return COLORS.heatHot;
}
