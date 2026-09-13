import type { Meta, StoryObj } from '@storybook/react';
import { Map, BearProvider, Flex } from '@forgedevstack/bear';
import type { MapMarker, MapViewport } from '@forgedevstack/bear';

const meta: Meta<typeof Map> = {
  title: 'Components/Map',
  component: Map,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Map from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Map anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    showZoomControls: true,
    showAttribution: true,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    draggable: false,
    minZoom: 0,
    maxZoom: 100,
  },
  argTypes: {
    onViewportChange: { action: 'onViewportChange' },
    onMarkerClick: { action: 'onMarkerClick' },
    onMapClick: { action: 'onMapClick' },
    onMarkerDrag: { action: 'onMarkerDrag' },
    showZoomControls: { control: 'boolean' },
    showAttribution: { control: 'boolean' },
    scrollWheelZoom: { control: 'boolean' },
    doubleClickZoom: { control: 'boolean' },
    draggable: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Map>;

const MARKERS: MapMarker[] = [
  { id: '1', lat: 40.7128, lng: -74.006, label: 'New York', color: '#ec4899' },
  { id: '2', lat: 51.5074, lng: -0.1278, label: 'London', color: '#8b5cf6' },
  { id: '3', lat: 48.8566, lng: 2.3522, label: 'Paris', color: '#f59e0b' },
];

const VIEWPORT: MapViewport = { lat: 40.7128, lng: -74.006, zoom: 3 };

export const Basic: Story = {
  render: (args) => <Map {...args} />,
};

export const DarkTiles: Story = {
  render: () => (
    <Map
      markers={MARKERS}
      viewport={VIEWPORT}
      tileProvider="cartodb-dark"
      height={320}
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Map markers={MARKERS} viewport={VIEWPORT} height={240} />
        <Map markers={MARKERS} viewport={VIEWPORT} tileProvider="cartodb-light" height={240} />
      </Flex>
    </BearProvider>
  ),
};
