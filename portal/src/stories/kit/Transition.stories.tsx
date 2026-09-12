import type { Meta, StoryObj } from '@storybook/react';
import { Transition, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Transition> = {
  title: 'Components/Transition',
  component: Transition,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Animation from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Transition anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Transition>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Transition {...args}>
      <Typography>Transition</Typography>
    </Transition>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Transition {...args}>
        <Typography>First</Typography>
      </Transition>
      <Transition>
        <Typography>Second</Typography>
      </Transition>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Transition anywhere below.</Typography>
        <Transition {...args}>
          <Typography>First use</Typography>
        </Transition>
        <Transition>
          <Typography>Second use</Typography>
        </Transition>
      </Flex>
    </BearProvider>
  ),
};
