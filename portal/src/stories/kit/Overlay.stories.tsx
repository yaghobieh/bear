import type { Meta, StoryObj } from '@storybook/react';
import { Overlay, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Overlay> = {
  title: 'Components/Overlay',
  component: Overlay,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Overlay from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Overlay anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Overlay>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Overlay {...args}>
      <Typography>Overlay</Typography>
    </Overlay>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Overlay {...args}>
        <Typography>First</Typography>
      </Overlay>
      <Overlay>
        <Typography>Second</Typography>
      </Overlay>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Overlay anywhere below.</Typography>
        <Overlay {...args}>
          <Typography>First use</Typography>
        </Overlay>
        <Overlay>
          <Typography>Second use</Typography>
        </Overlay>
      </Flex>
    </BearProvider>
  ),
};
