import type { Meta, StoryObj } from '@storybook/react';
import { Map } from '@forgedevstack/bear-map';
import type { MapMarker, MapViewport } from '@forgedevstack/bear-map';
import { BearProvider, Flex, Typography } from '@forgedevstack/bear';

const MARKERS: MapMarker[] = [
  { id: '1', lat: 40.7128, lng: -74.006, label: 'New York' },
  { id: '2', lat: 51.5074, lng: -0.1278, label: 'London' },
];

const VIEWPORT: MapViewport = { lat: 40.7128, lng: -74.006, zoom: 3 };

const meta: Meta<typeof Map> = {
  title: 'Packages/Bear Map/Map',
  component: Map,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Map from @forgedevstack/bear-map. Styles come from @forgedevstack/bear/styles.css.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Map>;

export const FromPackage: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Typography variant="h5">@forgedevstack/bear-map</Typography>
        <Map markers={MARKERS} viewport={VIEWPORT} height={240} />
      </Flex>
    </BearProvider>
  ),
};
