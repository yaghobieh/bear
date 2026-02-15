import { FC, useRef, useState, useCallback, useMemo } from 'react';
import { cn } from '@utils';
import type { MapProps, MapViewport } from './Map.types';
import {
  DEFAULT_VIEWPORT,
  DEFAULT_MARKER_COLOR,
  MARKER_SIZE,
  MIN_ZOOM,
  MAX_ZOOM,
  TILE_SIZE,
  TILE_URLS,
  TILE_ATTRIBUTIONS,
  ZOOM_BUTTON_SIZE,
} from './Map.const';

/**
 * Map - Interactive map component with markers, zoom, and tile providers
 *
 * @description
 * Zero-dependency interactive map built on OpenStreetMap tiles.
 * Supports markers, drag, zoom, and multiple tile providers.
 *
 * @example
 * ```tsx
 * <Map
 *   markers={[{ id: '1', lat: 40.71, lng: -74.00, label: 'NYC' }]}
 *   viewport={{ lat: 40.71, lng: -74.00, zoom: 12 }}
 *   onMarkerClick={(m) => console.log(m.label)}
 *   height={400}
 * />
 * ```
 */
export const Map: FC<MapProps> = ({
  markers = [],
  viewport: initialViewport,
  controlledViewport,
  onViewportChange,
  onMarkerClick,
  onMapClick,
  onMarkerDrag: _onMarkerDrag,
  tileProvider = 'openstreetmap',
  customTileUrl,
  width = '100%',
  height = 400,
  showZoomControls = true,
  showAttribution = true,
  scrollWheelZoom = true,
  doubleClickZoom = true,
  draggable = true,
  minZoom = MIN_ZOOM,
  maxZoom = MAX_ZOOM,
  className,
  style,
  testId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalViewport, setInternalViewport] = useState<MapViewport>(
    initialViewport ?? DEFAULT_VIEWPORT
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragViewportStart, setDragViewportStart] = useState<MapViewport | null>(null);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const vp = controlledViewport ?? internalViewport;

  const updateViewport = useCallback(
    (newVp: MapViewport) => {
      const clamped = {
        ...newVp,
        zoom: Math.max(minZoom, Math.min(maxZoom, newVp.zoom)),
        lat: Math.max(-85, Math.min(85, newVp.lat)),
        lng: ((newVp.lng + 180) % 360 + 360) % 360 - 180,
      };
      if (!controlledViewport) setInternalViewport(clamped);
      onViewportChange?.(clamped);
    },
    [controlledViewport, onViewportChange, minZoom, maxZoom]
  );

  // --- Tile math ---
  const lngToTileX = (lng: number, z: number) => ((lng + 180) / 360) * Math.pow(2, z);
  const latToTileY = (lat: number, z: number) => {
    const latRad = (lat * Math.PI) / 180;
    return ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * Math.pow(2, z);
  };
  const tileXToLng = (x: number, z: number) => (x / Math.pow(2, z)) * 360 - 180;
  const tileYToLat = (y: number, z: number) => {
    const n = Math.PI - (2 * Math.PI * y) / Math.pow(2, z);
    return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  };

  const getTileUrl = (x: number, y: number, z: number) => {
    const template =
      tileProvider === 'custom'
        ? customTileUrl ?? TILE_URLS.openstreetmap
        : TILE_URLS[tileProvider];
    return template.replace('{x}', String(x)).replace('{y}', String(y)).replace('{z}', String(z));
  };

  // --- Compute visible tiles ---
  const tiles = useMemo(() => {
    const el = containerRef.current;
    const w = el?.clientWidth ?? (typeof width === 'number' ? width : 800);
    const h = typeof height === 'number' ? height : 400;
    const z = Math.round(vp.zoom);
    const centerX = lngToTileX(vp.lng, z);
    const centerY = latToTileY(vp.lat, z);
    const tilesW = Math.ceil(w / TILE_SIZE) + 2;
    const tilesH = Math.ceil(h / TILE_SIZE) + 2;
    const maxTile = Math.pow(2, z);

    const result: { x: number; y: number; z: number; px: number; py: number }[] = [];
    for (let dx = -Math.floor(tilesW / 2); dx <= Math.ceil(tilesW / 2); dx++) {
      for (let dy = -Math.floor(tilesH / 2); dy <= Math.ceil(tilesH / 2); dy++) {
        const tileX = Math.floor(centerX) + dx;
        const tileY = Math.floor(centerY) + dy;
        if (tileY < 0 || tileY >= maxTile) continue;
        const wrappedX = ((tileX % maxTile) + maxTile) % maxTile;
        const px = w / 2 + (tileX - centerX) * TILE_SIZE;
        const py = h / 2 + (tileY - centerY) * TILE_SIZE;
        result.push({ x: wrappedX, y: tileY, z, px, py });
      }
    }
    return result;
  }, [vp.lat, vp.lng, vp.zoom, width, height]);

  // --- Marker positions ---
  const markerPositions = useMemo(() => {
    const el = containerRef.current;
    const w = el?.clientWidth ?? (typeof width === 'number' ? width : 800);
    const h = typeof height === 'number' ? height : 400;
    const z = vp.zoom;
    const centerX = lngToTileX(vp.lng, z);
    const centerY = latToTileY(vp.lat, z);

    return markers.map((m) => {
      const mx = lngToTileX(m.lng, z);
      const my = latToTileY(m.lat, z);
      return {
        marker: m,
        px: w / 2 + (mx - centerX) * TILE_SIZE,
        py: h / 2 + (my - centerY) * TILE_SIZE,
      };
    });
  }, [markers, vp, width, height]);

  // --- Mouse drag ---
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!draggable) return;
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setDragViewportStart({ ...vp });
    },
    [draggable, vp]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !dragStart || !dragViewportStart) return;
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      const z = dragViewportStart.zoom;
      const newCenterX = lngToTileX(dragViewportStart.lng, z) - dx / TILE_SIZE;
      const newCenterY = latToTileY(dragViewportStart.lat, z) - dy / TILE_SIZE;
      updateViewport({
        lat: tileYToLat(newCenterY, z),
        lng: tileXToLng(newCenterX, z),
        zoom: z,
      });
    },
    [isDragging, dragStart, dragViewportStart, updateViewport]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragStart(null);
    setDragViewportStart(null);
  }, []);

  // --- Scroll zoom ---
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!scrollWheelZoom) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.5 : 0.5;
      updateViewport({ ...vp, zoom: vp.zoom + delta });
    },
    [scrollWheelZoom, vp, updateViewport]
  );

  // --- Double-click zoom ---
  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!doubleClickZoom) return;
      e.preventDefault();
      updateViewport({ ...vp, zoom: vp.zoom + 1 });
    },
    [doubleClickZoom, vp, updateViewport]
  );

  // --- Map click ---
  const handleMapClick = useCallback(
    (e: React.MouseEvent) => {
      if (!onMapClick) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const z = vp.zoom;
      const centerX = lngToTileX(vp.lng, z);
      const centerY = latToTileY(vp.lat, z);
      const tileX = centerX + (x - el.clientWidth / 2) / TILE_SIZE;
      const tileY = centerY + (y - el.clientHeight / 2) / TILE_SIZE;
      onMapClick(tileYToLat(tileY, z), tileXToLng(tileX, z));
    },
    [onMapClick, vp]
  );

  const attribution =
    tileProvider !== 'custom' ? TILE_ATTRIBUTIONS[tileProvider] : '';

  return (
    <div
      ref={containerRef}
      className={cn(
        'bear-relative bear-overflow-hidden bear-rounded-lg bear-select-none',
        'bear-border bear-border-gray-200 dark:bear-border-gray-700',
        isDragging ? 'bear-cursor-grabbing' : 'bear-cursor-grab',
        className
      )}
      style={{ width, height, ...style }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onDoubleClick={handleDoubleClick}
      onClick={handleMapClick}
      data-testid={testId}
      role="application"
      aria-label="Interactive map"
    >
      {/* Tile layer */}
      <div className="bear-absolute bear-inset-0 bear-overflow-hidden">
        {tiles.map((tile) => (
          <img
            key={`${tile.z}-${tile.x}-${tile.y}`}
            src={getTileUrl(tile.x, tile.y, tile.z)}
            alt=""
            className="bear-absolute bear-pointer-events-none"
            style={{
              left: tile.px,
              top: tile.py,
              width: TILE_SIZE,
              height: TILE_SIZE,
            }}
            loading="lazy"
            draggable={false}
          />
        ))}
      </div>

      {/* Markers */}
      {markerPositions.map(({ marker, px, py }) => (
        <div
          key={marker.id}
          className="bear-absolute bear-z-10 bear-pointer-events-auto"
          style={{
            left: px - MARKER_SIZE / 2,
            top: py - MARKER_SIZE,
            width: MARKER_SIZE,
            height: MARKER_SIZE,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedMarker(selectedMarker === marker.id ? null : marker.id);
            onMarkerClick?.(marker);
          }}
          onMouseEnter={() => setHoveredMarker(marker.id)}
          onMouseLeave={() => setHoveredMarker(null)}
        >
          {marker.icon ? (
            <div className="bear-text-2xl bear-flex bear-items-center bear-justify-center bear-w-full bear-h-full">
              {marker.icon}
            </div>
          ) : (
            <svg width={MARKER_SIZE} height={MARKER_SIZE} viewBox="0 0 32 42" fill="none">
              <path
                d="M16 0C7.16 0 0 7.16 0 16c0 12 16 26 16 26s16-14 16-26C32 7.16 24.84 0 16 0z"
                fill={marker.color ?? DEFAULT_MARKER_COLOR}
                className={cn(
                  'bear-transition-all bear-duration-200',
                  hoveredMarker === marker.id && 'bear-drop-shadow-lg'
                )}
              />
              <circle cx="16" cy="15" r="6" fill="white" />
            </svg>
          )}
          {/* Label */}
          {marker.label && (
            <div
              className={cn(
                'bear-absolute bear-left-1/2 bear--translate-x-1/2 bear-top-full bear-mt-1',
                'bear-bg-white dark:bear-bg-gray-800 bear-text-xs bear-font-medium',
                'bear-px-2 bear-py-0.5 bear-rounded bear-shadow-md bear-whitespace-nowrap',
                'bear-text-gray-800 dark:bear-text-gray-200',
                'bear-border bear-border-gray-200 dark:bear-border-gray-600'
              )}
            >
              {marker.label}
            </div>
          )}
          {/* Popup */}
          {selectedMarker === marker.id && marker.popup && (
            <div
              className={cn(
                'bear-absolute bear-left-1/2 bear--translate-x-1/2 bear-bottom-full bear-mb-2',
                'bear-bg-white dark:bear-bg-gray-800 bear-rounded-lg bear-shadow-xl',
                'bear-p-3 bear-min-w-[150px] bear-max-w-[250px]',
                'bear-border bear-border-gray-200 dark:bear-border-gray-600',
                'bear-z-20'
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {marker.popup}
            </div>
          )}
        </div>
      ))}

      {/* Zoom controls */}
      {showZoomControls && (
        <div className="bear-absolute bear-top-3 bear-right-3 bear-z-20 bear-flex bear-flex-col bear-gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              updateViewport({ ...vp, zoom: vp.zoom + 1 });
            }}
            disabled={vp.zoom >= maxZoom}
            className={cn(
              'bear-flex bear-items-center bear-justify-center bear-rounded-md',
              'bear-bg-white dark:bear-bg-gray-800 bear-shadow-md',
              'bear-text-gray-700 dark:bear-text-gray-200',
              'hover:bear-bg-gray-50 dark:hover:bear-bg-gray-700',
              'bear-border bear-border-gray-200 dark:bear-border-gray-600',
              'bear-transition-colors bear-duration-150',
              'disabled:bear-opacity-50 disabled:bear-cursor-not-allowed'
            )}
            style={{ width: ZOOM_BUTTON_SIZE, height: ZOOM_BUTTON_SIZE }}
            aria-label="Zoom in"
          >
            <svg className="bear-w-4 bear-h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              updateViewport({ ...vp, zoom: vp.zoom - 1 });
            }}
            disabled={vp.zoom <= minZoom}
            className={cn(
              'bear-flex bear-items-center bear-justify-center bear-rounded-md',
              'bear-bg-white dark:bear-bg-gray-800 bear-shadow-md',
              'bear-text-gray-700 dark:bear-text-gray-200',
              'hover:bear-bg-gray-50 dark:hover:bear-bg-gray-700',
              'bear-border bear-border-gray-200 dark:bear-border-gray-600',
              'bear-transition-colors bear-duration-150',
              'disabled:bear-opacity-50 disabled:bear-cursor-not-allowed'
            )}
            style={{ width: ZOOM_BUTTON_SIZE, height: ZOOM_BUTTON_SIZE }}
            aria-label="Zoom out"
          >
            <svg className="bear-w-4 bear-h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
        </div>
      )}

      {/* Attribution */}
      {showAttribution && attribution && (
        <div className="bear-absolute bear-bottom-1 bear-right-1 bear-z-20 bear-text-[10px] bear-text-gray-500 bear-bg-white/80 dark:bear-bg-gray-900/80 bear-px-1.5 bear-py-0.5 bear-rounded">
          {attribution}
        </div>
      )}
    </div>
  );
};
