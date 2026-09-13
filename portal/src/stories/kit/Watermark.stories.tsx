import type { Meta, StoryObj } from '@storybook/react';
import { Watermark, BearProvider, Flex, Typography, Paper } from '@forgedevstack/bear';

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
        component: 'Watermark from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Watermark anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    children: 'Draft',
    text: 'Hello Bear',
    fontSize: 0,
    color: '#EA0A8E',
    rotate: 0,
    opacity: 0,
    patternRepeat: 0,
    zIndex: 0,
    fontWeight: 0,
    visible: false,
  },
  argTypes: {
    color: { control: 'color' },
    visible: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Watermark>;

export const Basic: Story = {
  render: (args) => <Watermark {...args} />,
};

export const MultiLine: Story = {
  render: () => (
    <Watermark text={['Bear UI', 'Draft']} opacity={0.2}>
      <Paper padding="lg" elevation={1}>
        <Typography>Multi-line watermark over a draft note.</Typography>
      </Paper>
    </Watermark>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Watermark text="FIRST">
          <Paper padding="md">
            <Typography>First use</Typography>
          </Paper>
        </Watermark>
        <Watermark text="REUSE">
          <Paper padding="md">
            <Typography>Same provider</Typography>
          </Paper>
        </Watermark>
      </Flex>
    </BearProvider>
  ),
};
