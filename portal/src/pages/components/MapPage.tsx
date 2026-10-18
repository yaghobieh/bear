import { FC, useState } from 'react';
import { Button, Map, Tabs, Tab, TabList, TabPanel, Typography } from '@forgedevstack/bear';
import type { MapTileProvider, MapViewport } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { MAP_PAGE_HEIGHT, MAP_PAGE_MARKERS, MAP_PAGE_PROPS } from './MapPage.const';

const MAP_PROVIDERS: MapTileProvider[] = ['openstreetmap', 'cartodb-light', 'cartodb-dark', 'stamen-terrain'];

const MapPage: FC = () => {
  const [viewport, setViewport] = useState<MapViewport>({ lat: 40.7128, lng: -74.006, zoom: 3 });
  const [selectedProvider, setSelectedProvider] = useState<MapTileProvider>('openstreetmap');

  return (
    <DocPage
      title="Map"
      description="Map from @forgedevstack/bear-map. Markers, zoom, drag, and street, light, dark, and terrain tiles. Core still exports Map."
      componentName="Map"
      badge="@forgedevstack/bear-map"
    >
      <Tabs defaultTab="demo">
        <TabList className="mb-6">
          <Tab id="demo">Demo</Tab>
          <Tab id="props">Props</Tab>
        </TabList>
        <TabPanel tabId="demo">
          <Map
            markers={MAP_PAGE_MARKERS}
            viewport={viewport}
            onViewportChange={setViewport}
            tileProvider={selectedProvider}
            height={MAP_PAGE_HEIGHT}
            showZoomControls
            scrollWheelZoom
            draggable
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {MAP_PROVIDERS.map((provider) => (
              <Button
                key={provider}
                size="sm"
                variant={selectedProvider === provider ? 'primary' : 'ghost'}
                onClick={() => setSelectedProvider(provider)}
              >
                {provider}
              </Button>
            ))}
          </div>
          <Typography variant="caption" className="mt-3 block text-gray-500">
            Storybook and Sandbox are in the page header.
          </Typography>
        </TabPanel>
        <TabPanel tabId="props">
          <PropsTable title="Map props" rows={MAP_PAGE_PROPS} />
        </TabPanel>
      </Tabs>
    </DocPage>
  );
};

export default MapPage;
