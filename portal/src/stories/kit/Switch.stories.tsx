import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, Switch, SwitchGroup, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Switch from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Switch anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  subcomponents: { SwitchGroup },
  args: {
    label: 'Label',
    checked: false,
    size: 'sm',
    showIconsInThumb: true,
    disabled: false,
  },
  argTypes: {
    checked: { control: 'boolean' },
    onCheckedChange: { action: 'onCheckedChange' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    showIconsInThumb: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Basic: Story = {
  render: (args) => <Switch {...args} />,
};

export const States: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={2}>
        <Switch label="First" />
        <Switch label="Reuse" defaultChecked />
      </Flex>
    </BearProvider>
  ),
};
