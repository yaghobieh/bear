export const CHART = {
  DEFAULT_HEIGHT: 200,
  DEFAULT_BAR_RADIUS: 4,
  DEFAULT_BAR_GAP: 0.2,
  DEFAULT_STROKE_WIDTH: 2,
  DEFAULT_INNER_RADIUS: 0.6,
  DEFAULT_START_ANGLE: -90,
  DEFAULT_PAD_ANGLE: 2,
  OUTER_RADIUS: 45,
  CENTER: 50,
  HALF_SWEEP: 180,
  FULL_SWEEP: 360,
  EXPLODE_OFFSET: 4,
  ROSE_MIN_RADIUS: 14,
  RADAR_RINGS: 4,
  RADAR_LABEL_OFFSET: 8,
  FUNNEL_MIN_WIDTH: 18,
  SLICE_DELAY_MS: 100,
  DOT_RADIUS: 1.5,
  VIEWBOX: 100,
  LINE_Y_RANGE: 80,
  LINE_Y_PAD: 10,
  BEZIER_DIVISOR: 3,
  LARGE_ARC_THRESHOLD: 180,
  HALF_PIE_START: -180,
} as const;

export const CHART_TYPES = {
  BAR: 'bar',
  LINE: 'line',
  AREA: 'area',
  PIE: 'pie',
  DONUT: 'donut',
  RADAR: 'radar',
  FUNNEL: 'funnel',
  STACKED: 'stacked',
} as const;

export const PIE_VIEW_FULL = 'full';
export const PIE_VIEW_HALF = 'half';
export const PIE_VIEW_ROSE = 'rose';

export const CHART_LEGEND_RIGHT = 'right';
export const CHART_LEGEND_BOTTOM = 'bottom';
export const CHART_LEGEND_NONE = 'none';

export const DEFAULT_COLORS = [
  '#ec4899',
  '#8b5cf6',
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#06b6d4',
  '#84cc16',
] as const;
