import type { Meta, StoryObj } from '@storybook/react';
import { Divider, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Divider from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Divider anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    color: '#EA0A8E',
    textAlign: 'left',
    thickness: 0,
    spacing: 0,
  },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    variant: { control: 'select', options: ['solid', 'dashed', 'dotted'] },
    color: { control: 'color' },
    textAlign: { control: 'select', options: ['left', 'center', 'right'] },
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Basic: Story = {
  render: (args) => <Divider {...args} />,
};

export const WithLabel: Story = {
  render: () => (
    <Flex direction="column" gap={4}>
      <Typography variant="body2">Email sign-in</Typography>
      <Divider>OR</Divider>
      <Typography variant="body2">Continue with SSO</Typography>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Section one</Typography>
        <Divider variant="dashed" />
        <Typography variant="subtitle2">Reuse</Typography>
        <Divider variant="dotted">More</Divider>
      </Flex>
    </BearProvider>
  ),
};
