import type { Meta, StoryObj } from '@storybook/react';
import { Cropper, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Cropper> = {
  title: 'Components/Cropper',
  component: Cropper,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Cropper from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Cropper anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Cropper>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Cropper {...args}>
      <Typography>Cropper</Typography>
    </Cropper>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Cropper {...args}>
        <Typography>First</Typography>
      </Cropper>
      <Cropper>
        <Typography>Second</Typography>
      </Cropper>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Cropper anywhere below.</Typography>
        <Cropper {...args}>
          <Typography>First use</Typography>
        </Cropper>
        <Cropper>
          <Typography>Second use</Typography>
        </Cropper>
      </Flex>
    </BearProvider>
  ),
};
