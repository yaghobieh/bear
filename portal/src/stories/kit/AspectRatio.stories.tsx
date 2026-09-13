import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio, BearProvider, Flex, Paper, Typography } from '@forgedevstack/bear';

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
  args: {
    ratio: 0,
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Basic: Story = {
  render: (args) => <AspectRatio {...args} />,
};

export const Square: Story = {
  render: () => (
    <AspectRatio ratio={1} maxWidth={240}>
      <Paper padding="md" elevation={1}>
        <Typography>1:1 square</Typography>
      </Paper>
    </AspectRatio>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={4} wrap="wrap">
        <AspectRatio ratio={16 / 9} maxWidth={220}>
          <Paper padding="sm">
            <Typography>First</Typography>
          </Paper>
        </AspectRatio>
        <AspectRatio ratio={4 / 3} maxWidth={220}>
          <Paper padding="sm">
            <Typography>Reuse</Typography>
          </Paper>
        </AspectRatio>
      </Flex>
    </BearProvider>
  ),
};
