import type { Meta, StoryObj } from '@storybook/react';
import { Indicator, Avatar, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Indicator> = {
  title: 'Components/Indicator',
  component: Indicator,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Indicator from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Indicator anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    label: 'Label',
    color: '#EA0A8E',
    size: 0,
    radius: 'sm',
    processing: false,
    disabled: false,
    offset: 0,
    withBorder: false,
    inline: false,
  },
  argTypes: {
    color: { control: 'color' },
    radius: { control: 'select', options: ['sm', 'md', 'lg', 'full'] },
    processing: { control: 'boolean' },
    disabled: { control: 'boolean' },
    withBorder: { control: 'boolean' },
    inline: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Indicator>;

export const Basic: Story = {
  render: (args) => <Indicator {...args} />,
};

export const Processing: Story = {
  render: () => (
    <Flex gap={4} align="center">
      <Indicator processing position="bottom-end">
        <Avatar initials="ON" />
      </Indicator>
      <Indicator label="9+" color="#EA0A8E" withBorder>
        <Typography>Inbox</Typography>
      </Indicator>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={4}>
        <Indicator label="1">
          <Avatar initials="A" />
        </Indicator>
        <Indicator label="2">
          <Avatar initials="B" />
        </Indicator>
      </Flex>
    </BearProvider>
  ),
};
