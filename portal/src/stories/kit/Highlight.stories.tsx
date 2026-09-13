import type { Meta, StoryObj } from '@storybook/react';
import { Highlight, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Highlight> = {
  title: 'Components/Highlight',
  component: Highlight,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Highlight from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Highlight anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    children: 'Search match',
    animated: true,
  },
  argTypes: {
    color: { control: 'color' },
    animated: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Highlight>;

export const Basic: Story = {
  render: (args) => <Highlight {...args} />,
};

export const Colors: Story = {
  render: () => (
    <Flex gap={2} wrap="wrap">
      <Highlight color="yellow">Yellow</Highlight>
      <Highlight color="pink">Pink</Highlight>
      <Highlight color="primary" animated>
        Primary pulse
      </Highlight>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={2}>
        <Highlight>First</Highlight>
        <Highlight color="green">Reuse</Highlight>
      </Flex>
    </BearProvider>
  ),
};
