import type { Meta, StoryObj } from '@storybook/react';
import { Editable, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Editable> = {
  title: 'Components/Editable',
  component: Editable,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Editable from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Editable anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Editable>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Editable {...args}>
      <Typography>Editable</Typography>
    </Editable>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Editable {...args}>
        <Typography>First</Typography>
      </Editable>
      <Editable>
        <Typography>Second</Typography>
      </Editable>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Editable anywhere below.</Typography>
        <Editable {...args}>
          <Typography>First use</Typography>
        </Editable>
        <Editable>
          <Typography>Second use</Typography>
        </Editable>
      </Flex>
    </BearProvider>
  ),
};
