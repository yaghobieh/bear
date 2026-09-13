import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Column, Columns, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Columns> = {
  title: 'Components/Columns',
  component: Columns,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Columns from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Columns anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  subcomponents: { Column },
  args: {
    gap: 'none',
    fill: false,
  },
  argTypes: {
    gap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'] },
    fill: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Columns>;

export const Basic: Story = {
  render: (args) => (
    <Columns {...args} count={2} gap="md">
      <Typography>First column. Magazine-style text flows down this pane.</Typography>
      <Typography>Second column. Use Columns when you want newspaper layout.</Typography>
    </Columns>
  ),
};

export const ThreeColumns: Story = {
  render: () => (
    <Columns count={3} gap="lg">
      <Typography>Alpha</Typography>
      <Typography>Beta</Typography>
      <Typography>Gamma</Typography>
    </Columns>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Columns count={2}>
          <Typography>First use</Typography>
          <Typography>Left / right</Typography>
        </Columns>
        <Columns count={2}>
          <Typography>Reuse</Typography>
          <Typography>Same provider</Typography>
        </Columns>
      </Flex>
    </BearProvider>
  ),
};
