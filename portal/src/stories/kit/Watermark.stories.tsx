import type { Meta, StoryObj } from '@storybook/react';
import { Watermark, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Watermark> = {
  title: 'Components/Watermark',
  component: Watermark,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Utility from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Watermark anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Watermark>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Watermark {...args}>
      <Typography>Watermark</Typography>
    </Watermark>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Watermark {...args}>
        <Typography>First</Typography>
      </Watermark>
      <Watermark>
        <Typography>Second</Typography>
      </Watermark>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Watermark anywhere below.</Typography>
        <Watermark {...args}>
          <Typography>First use</Typography>
        </Watermark>
        <Watermark>
          <Typography>Second use</Typography>
        </Watermark>
      </Flex>
    </BearProvider>
  ),
};
