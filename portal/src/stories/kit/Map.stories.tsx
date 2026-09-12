import type { Meta, StoryObj } from '@storybook/react';
import { Map, Flex, Typography, BearProvider } from '@forgedevstack/bear';

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
        component: 'Media from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Map anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Map>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Map {...args}>
      <Typography>Map</Typography>
    </Map>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Map {...args}>
        <Typography>First</Typography>
      </Map>
      <Map>
        <Typography>Second</Typography>
      </Map>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Map anywhere below.</Typography>
        <Map {...args}>
          <Typography>First use</Typography>
        </Map>
        <Map>
          <Typography>Second use</Typography>
        </Map>
      </Flex>
    </BearProvider>
  ),
};
