export const QRCODE_DEFAULTS = {
  SIZE: 128,
  LEVEL: 'M' as const,
  BG_COLOR: '#ffffff',
  FG_COLOR: '#000000',
  INCLUDE_MARGIN: true,
  IMAGE_SIZE: 0.2,
  RENDER_AS: 'svg' as const,
} as const;

// Simplified QR Code generation constants
export const QRCODE_ERROR_CORRECTION = {
  L: 0, // 7% recovery
  M: 1, // 15% recovery  
  Q: 2, // 25% recovery
  H: 3, // 30% recovery
} as const;

// Mode indicators
export const QRCODE_MODE = {
  NUMERIC: 0b0001,
  ALPHANUMERIC: 0b0010,
  BYTE: 0b0100,
} as const;

// Alphanumeric character set
export const ALPHANUMERIC_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';
