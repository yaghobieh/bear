import { FC, useState } from 'react';
import { Flex, Typography } from '@forgedevstack/bear';
import { Map } from '@forgedevstack/bear-map';
import type { MapTileProvider } from '@forgedevstack/bear-map';
import { PropsTable } from '@/components/PropsTable';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { MAP_PAGE_PROPS } from '@/pages/components/MapPage.const';
import {
  MAP_PREVIEW_HEIGHT,
  MAP_TILE_OPTIONS,
  PRODUCT_MAP_MARKERS,
  PRODUCT_MAP_VIEWPORT,
} from '../ProductPage.const';

const optionClass = (active: boolean): string =>
  active
    ? 'rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200 bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400'
    : 'rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800';

export const MapPreview: FC = () => {
  const { language } = usePortalLanguage();
  const text = PORTAL_TEXT[language];
  const [tileProvider, setTileProvider] = useState<MapTileProvider>('openstreetmap');
  const [showZoomControls, setShowZoomControls] = useState(true);
  const [scrollWheelZoom, setScrollWheelZoom] = useState(true);
  const [draggable, setDraggable] = useState(true);
  const [showAttribution, setShowAttribution] = useState(true);
  const [doubleClickZoom, setDoubleClickZoom] = useState(true);
  const stateLabel = (enabled: boolean) => (enabled ? text.mapOptionOn : text.mapOptionOff);

  return (
      <Flex direction="column" gap={3}>
        <Flex wrap="wrap" gap={2}>
          {MAP_TILE_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={tileProvider === option.id}
              onClick={() => setTileProvider(option.id)}
              className={optionClass(tileProvider === option.id)}
            >
              {text[option.labelKey]}
            </button>
          ))}
        </Flex>
        <Flex wrap="wrap" gap={2}>
          <button type="button" aria-pressed={showZoomControls} onClick={() => setShowZoomControls((value) => !value)} className={optionClass(showZoomControls)}>
            {text.mapZoomControls} {stateLabel(showZoomControls)}
          </button>
          <button type="button" aria-pressed={scrollWheelZoom} onClick={() => setScrollWheelZoom((value) => !value)} className={optionClass(scrollWheelZoom)}>
            {text.mapScrollZoom} {stateLabel(scrollWheelZoom)}
          </button>
          <button type="button" aria-pressed={draggable} onClick={() => setDraggable((value) => !value)} className={optionClass(draggable)}>
            {text.mapDrag} {stateLabel(draggable)}
          </button>
          <button type="button" aria-pressed={showAttribution} onClick={() => setShowAttribution((value) => !value)} className={optionClass(showAttribution)}>
            Attribution {stateLabel(showAttribution)}
          </button>
          <button type="button" aria-pressed={doubleClickZoom} onClick={() => setDoubleClickZoom((value) => !value)} className={optionClass(doubleClickZoom)}>
            Double-click zoom {stateLabel(doubleClickZoom)}
          </button>
        </Flex>
        <Typography variant="body2">
          Street, light, dark, and terrain are the same Map. Markers for New York and London are draggable targets. Zoom is clamped between 2 and 12. Install @forgedevstack/bear-map and keep styles on @forgedevstack/bear/styles.css.
        </Typography>
        <Map
          markers={PRODUCT_MAP_MARKERS}
          viewport={PRODUCT_MAP_VIEWPORT}
          tileProvider={tileProvider}
          height={MAP_PREVIEW_HEIGHT}
          showZoomControls={showZoomControls}
          scrollWheelZoom={scrollWheelZoom}
          doubleClickZoom={doubleClickZoom}
          showAttribution={showAttribution}
          draggable={draggable}
          minZoom={2}
          maxZoom={12}
        />
        <PropsTable title="Map props" rows={MAP_PAGE_PROPS} />
      </Flex>
  );
};
