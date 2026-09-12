import type { Meta, StoryObj } from '@storybook/react';
import { ColorSwatch, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof ColorSwatch> = {
  title: 'Components/ColorSwatch',
  component: ColorSwatch,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ColorSwatch from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ColorSwatch anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ColorSwatch>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <ColorSwatch {...args} />
      <ColorSwatch {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ColorSwatch anywhere below.</Typography>
        <ColorSwatch {...args} />
        <ColorSwatch {...args} />
      </Flex>
    </BearProvider>
  ),
};
