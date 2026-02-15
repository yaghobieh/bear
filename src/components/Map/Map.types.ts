import type { CSSProperties, ReactNode } from 'react';

/**
 * Marker to display on the map
 */
export interface MapMarker {
  /** Unique identifier */
  id: string;
  /** Latitude coordinate */
  lat: number;
  /** Longitude coordinate */
  lng: number;
  /** Marker label */
  label?: string;
  /** Marker color */
  color?: string;
  /** Custom icon (emoji or ReactNode) */
  icon?: ReactNode;
  /** Popup content on click */
  popup?: ReactNode;
  /** Whether this marker is draggable */
  draggable?: boolean;
}

/**
 * Map viewport configuration
 */
export interface MapViewport {
  /** Center latitude */
  lat: number;
  /** Center longitude */
  lng: number;
  /** Zoom level (1-20) */
  zoom: number;
}

/**
 * Map tile provider
 */
export type MapTileProvider = 'openstreetmap' | 'cartodb-light' | 'cartodb-dark' | 'stamen-terrain' | 'custom';

export interface MapProps {
  /** Map markers */
  markers?: MapMarker[];
  /** Initial viewport */
  viewport?: MapViewport;
  /** Current viewport (controlled) */
  controlledViewport?: MapViewport;
  /** Called when viewport changes */
  onViewportChange?: (viewport: MapViewport) => void;
  /** Called when a marker is clicked */
  onMarkerClick?: (marker: MapMarker) => void;
  /** Called when the map is clicked */
  onMapClick?: (lat: number, lng: number) => void;
  /** Called when a marker is dragged */
  onMarkerDrag?: (marker: MapMarker, lat: number, lng: number) => void;
  /** Map tile provider */
  tileProvider?: MapTileProvider;
  /** Custom tile URL template (for 'custom' provider) */
  customTileUrl?: string;
  /** Map width */
  width?: string | number;
  /** Map height */
  height?: string | number;
  /** Show zoom controls */
  showZoomControls?: boolean;
  /** Show attribution */
  showAttribution?: boolean;
  /** Enable scroll wheel zoom */
  scrollWheelZoom?: boolean;
  /** Enable double-click zoom */
  doubleClickZoom?: boolean;
  /** Enable dragging */
  draggable?: boolean;
  /** Min zoom level */
  minZoom?: number;
  /** Max zoom level */
  maxZoom?: number;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
  /** Test ID */
  testId?: string;
}
