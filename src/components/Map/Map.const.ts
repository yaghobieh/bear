import type { MapViewport, MapTileProvider } from './Map.types';

/** Default viewport - centered on the world */
export const DEFAULT_VIEWPORT: MapViewport = {
  lat: 40.7128,
  lng: -74.006,
  zoom: 10,
};

/** Default marker color */
export const DEFAULT_MARKER_COLOR = 'var(--bear-primary-500)';

/** Default marker size in px */
export const MARKER_SIZE = 32;

/** Marker pulse animation size in px */
export const MARKER_PULSE_SIZE = 48;

/** Min/Max zoom levels */
export const MIN_ZOOM = 1;
export const MAX_ZOOM = 19;

/** Tile size in px */
export const TILE_SIZE = 256;

/** Tile URL templates for providers */
export const TILE_URLS: Record<Exclude<MapTileProvider, 'custom'>, string> = {
  openstreetmap: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  'cartodb-light': 'https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
  'cartodb-dark': 'https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
  'stamen-terrain': 'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.png',
};

/** Attribution text for providers */
export const TILE_ATTRIBUTIONS: Record<Exclude<MapTileProvider, 'custom'>, string> = {
  openstreetmap: '© OpenStreetMap contributors',
  'cartodb-light': '© CartoDB © OpenStreetMap',
  'cartodb-dark': '© CartoDB © OpenStreetMap',
  'stamen-terrain': '© Stamen Design © OpenStreetMap',
};

/** Zoom button size */
export const ZOOM_BUTTON_SIZE = 36;
