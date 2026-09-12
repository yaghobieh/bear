import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ColorPicker from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ColorPicker anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <ColorPicker {...args} />
      <ColorPicker {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ColorPicker anywhere below.</Typography>
        <ColorPicker {...args} />
        <ColorPicker {...args} />
      </Flex>
    </BearProvider>
  ),
};
