import type { PropRow } from '@/components/PropsTable';
import type { MapMarker } from '@forgedevstack/bear';

export const MAP_PAGE_MARKERS: MapMarker[] = [
  { id: '1', lat: 40.7128, lng: -74.006, label: 'New York', color: '#ec4899' },
  { id: '2', lat: 51.5074, lng: -0.1278, label: 'London', color: '#8b5cf6' },
  { id: '3', lat: 48.8566, lng: 2.3522, label: 'Paris', color: '#f59e0b' },
  { id: '4', lat: 35.6762, lng: 139.6503, label: 'Tokyo', color: '#10b981' },
];

export const MAP_PAGE_HEIGHT = 400;

export const MAP_PAGE_PROPS: PropRow[] = [
  { name: 'markers', type: 'MapMarker[]', default: '[]', description: 'Markers with lat, lng, label, color, popup, and draggable' },
  { name: 'viewport', type: 'MapViewport', default: 'New York, zoom 3', description: 'Center latitude, longitude, and zoom' },
  { name: 'tileProvider', type: "'openstreetmap' | 'cartodb-light' | 'cartodb-dark' | 'stamen-terrain' | 'custom'", default: 'openstreetmap', description: 'Tile set' },
  { name: 'customTileUrl', type: 'string', description: 'URL template when tileProvider is custom' },
  { name: 'height', type: 'number | string', default: '400', description: 'Map height' },
  { name: 'showZoomControls', type: 'boolean', default: 'true', description: 'Show plus and minus zoom buttons' },
  { name: 'showAttribution', type: 'boolean', default: 'true', description: 'Show the tile attribution' },
  { name: 'scrollWheelZoom', type: 'boolean', default: 'true', description: 'Zoom with the scroll wheel' },
  { name: 'doubleClickZoom', type: 'boolean', default: 'true', description: 'Zoom on double click' },
  { name: 'draggable', type: 'boolean', default: 'true', description: 'Drag the map' },
  { name: 'minZoom', type: 'number', description: 'Minimum zoom' },
  { name: 'maxZoom', type: 'number', description: 'Maximum zoom' },
  { name: 'onViewportChange', type: '(viewport: MapViewport) => void', description: 'Fires when the view moves' },
  { name: 'onMarkerClick', type: '(marker: MapMarker) => void', description: 'Fires when a marker is clicked' },
  { name: 'onMapClick', type: '(lat: number, lng: number) => void', description: 'Fires when the map is clicked' },
  { name: 'onMarkerDrag', type: '(marker: MapMarker, lat: number, lng: number) => void', description: 'Fires while a marker is dragged' },
];
