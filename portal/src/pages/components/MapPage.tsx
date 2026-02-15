import { useState } from 'react';
import { Map, Typography, Card, CardBody, Button, Input } from '@forgedevstack/bear';
import type { MapMarker, MapViewport } from '@forgedevstack/bear';

const defaultMarkers: MapMarker[] = [
  { id: '1', lat: 40.7128, lng: -74.006, label: 'New York', color: '#ec4899', popup: <div><strong>New York City</strong><p className="text-sm">The Big Apple</p></div> },
  { id: '2', lat: 51.5074, lng: -0.1278, label: 'London', color: '#8b5cf6' },
  { id: '3', lat: 48.8566, lng: 2.3522, label: 'Paris', color: '#f59e0b' },
  { id: '4', lat: 35.6762, lng: 139.6503, label: 'Tokyo', color: '#10b981' },
];

export default function MapPage() {
  const [viewport, setViewport] = useState<MapViewport>({ lat: 40.7128, lng: -74.006, zoom: 3 });
  const [selectedProvider, setSelectedProvider] = useState<'openstreetmap' | 'cartodb-light' | 'cartodb-dark'>('openstreetmap');

  return (
    <div className="space-y-8 p-6">
      <div>
        <Typography variant="h2" className="mb-2">Map</Typography>
        <Typography variant="body1" className="text-gray-600 dark:text-gray-400">
          Interactive map component with markers, zoom controls, and multiple tile providers. Zero-dependency, built on OpenStreetMap.
        </Typography>
      </div>

      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Basic Map with Markers</Typography>
          <Map
            markers={defaultMarkers}
            viewport={viewport}
            onViewportChange={setViewport}
            onMarkerClick={(m) => alert(`Clicked: ${m.label}`)}
            tileProvider={selectedProvider}
            height={400}
          />
          <div className="flex gap-2 mt-4">
            <Button size="sm" variant={selectedProvider === 'openstreetmap' ? 'primary' : 'ghost'} onClick={() => setSelectedProvider('openstreetmap')}>OpenStreetMap</Button>
            <Button size="sm" variant={selectedProvider === 'cartodb-light' ? 'primary' : 'ghost'} onClick={() => setSelectedProvider('cartodb-light')}>CartoDB Light</Button>
            <Button size="sm" variant={selectedProvider === 'cartodb-dark' ? 'primary' : 'ghost'} onClick={() => setSelectedProvider('cartodb-dark')}>CartoDB Dark</Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Props</Typography>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-2 px-3 font-medium">Prop</th>
                  <th className="text-left py-2 px-3 font-medium">Type</th>
                  <th className="text-left py-2 px-3 font-medium">Default</th>
                  <th className="text-left py-2 px-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b dark:border-gray-700"><td className="py-2 px-3 font-mono text-xs">markers</td><td className="py-2 px-3">MapMarker[]</td><td className="py-2 px-3">[]</td><td className="py-2 px-3">Array of markers to display</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="py-2 px-3 font-mono text-xs">viewport</td><td className="py-2 px-3">MapViewport</td><td className="py-2 px-3">NYC</td><td className="py-2 px-3">Initial viewport (lat, lng, zoom)</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="py-2 px-3 font-mono text-xs">tileProvider</td><td className="py-2 px-3">string</td><td className="py-2 px-3">openstreetmap</td><td className="py-2 px-3">Tile provider</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="py-2 px-3 font-mono text-xs">height</td><td className="py-2 px-3">number</td><td className="py-2 px-3">400</td><td className="py-2 px-3">Map height in px</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="py-2 px-3 font-mono text-xs">showZoomControls</td><td className="py-2 px-3">boolean</td><td className="py-2 px-3">true</td><td className="py-2 px-3">Show +/- zoom buttons</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="py-2 px-3 font-mono text-xs">scrollWheelZoom</td><td className="py-2 px-3">boolean</td><td className="py-2 px-3">true</td><td className="py-2 px-3">Enable scroll wheel zoom</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="py-2 px-3 font-mono text-xs">onMarkerClick</td><td className="py-2 px-3">function</td><td className="py-2 px-3">-</td><td className="py-2 px-3">Called when a marker is clicked</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="py-2 px-3 font-mono text-xs">onMapClick</td><td className="py-2 px-3">function</td><td className="py-2 px-3">-</td><td className="py-2 px-3">Called when the map is clicked (lat, lng)</td></tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
