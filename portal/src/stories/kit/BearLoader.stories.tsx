import type { Meta, StoryObj } from '@storybook/react';
import { BearLoader, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof BearLoader> = {
  title: 'Components/BearLoader',
  component: BearLoader,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'BearLoader from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse BearLoader anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    size: 'sm',
    text: 'Hello Bear',
    fullscreen: false,
    duration: 0,
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    fullscreen: { control: 'boolean' },
    onComplete: { action: 'onComplete' },
  },
};

export default meta;

type Story = StoryObj<typeof BearLoader>;

export const Basic: Story = {
  render: (args) => <BearLoader {...args} />,
};

export const WithText: Story = {
  render: () => <BearLoader size="lg" text="Loading your content..." />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={6} align="center" wrap="wrap">
        <BearLoader size="sm" />
        <BearLoader size="md" text="Reuse" />
      </Flex>
    </BearProvider>
  ),
};
