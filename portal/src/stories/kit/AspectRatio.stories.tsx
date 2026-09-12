import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'AspectRatio from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse AspectRatio anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <AspectRatio {...args}>
      <Typography>AspectRatio</Typography>
    </AspectRatio>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <AspectRatio {...args}>
        <Typography>First</Typography>
      </AspectRatio>
      <AspectRatio>
        <Typography>Second</Typography>
      </AspectRatio>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse AspectRatio anywhere below.</Typography>
        <AspectRatio {...args}>
          <Typography>First use</Typography>
        </AspectRatio>
        <AspectRatio>
          <Typography>Second use</Typography>
        </AspectRatio>
      </Flex>
    </BearProvider>
  ),
};
