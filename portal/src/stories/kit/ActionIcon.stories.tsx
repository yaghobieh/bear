import type { Meta, StoryObj } from '@storybook/react';
import { ActionIcon, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof ActionIcon> = {
  title: 'Components/ActionIcon',
  component: ActionIcon,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ActionIcon from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ActionIcon anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    children: '★',
    loading: false,
    disabled: false,
  },
  argTypes: {
    color: { control: 'color' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ActionIcon>;

export const Basic: Story = {
  render: (args) => <ActionIcon {...args} />,
};

export const Variants: Story = {
  render: () => (
    <Flex gap={2} align="center">
      <ActionIcon aria-label="Close" variant="filled" color="primary">
        <Typography>×</Typography>
      </ActionIcon>
      <ActionIcon aria-label="Edit" variant="outline" color="success">
        <Typography>+</Typography>
      </ActionIcon>
      <ActionIcon aria-label="More" variant="subtle">
        <Typography>⋯</Typography>
      </ActionIcon>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={2}>
        <ActionIcon aria-label="Close">
          <Typography>×</Typography>
        </ActionIcon>
        <ActionIcon aria-label="Add" variant="filled">
          <Typography>+</Typography>
        </ActionIcon>
      </Flex>
    </BearProvider>
  ),
};
