import type { Meta, StoryObj } from '@storybook/react';
import { Progress, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Progress from @forgedevstack/bear. Change value, size, color, and label in Controls. The bar stays full width so Docs and Canvas both show it.',
      },
      story: {
        inline: true,
        height: '96px',
      },
    },
    layout: 'padded',
  },
  args: {
    value: 64,
    max: 100,
    size: 'lg',
    color: 'info',
    showLabel: true,
    label: 'Upload',
    labelPosition: 'outside',
    striped: false,
    animated: false,
    indeterminate: false,
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: { type: 'number', min: 1 } },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    color: { control: 'select', options: ['default', 'success', 'warning', 'danger', 'info'] },
    showLabel: { control: 'boolean' },
    labelPosition: { control: 'select', options: ['inside', 'outside'] },
    striped: { control: 'boolean' },
    animated: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Basic: Story = {
  render: (args) => (
    <div className="bear-w-full" style={{ minWidth: 280 }}>
      <Progress {...args} />
    </div>
  ),
};

export const Values: Story = {
  render: (args) => (
    <Flex direction="column" gap={3} className="bear-w-full" style={{ minWidth: 280 }}>
      <Progress {...args} />
      <Progress value={20} size="md" color="warning" showLabel label="Low" labelPosition="outside" />
      <Progress value={70} size="md" color="success" showLabel label="High" labelPosition="outside" />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3} className="bear-w-full" style={{ minWidth: 280 }}>
        <Progress value={32} size="md" color="info" showLabel label="First" labelPosition="outside" />
        <Progress value={84} size="md" color="success" showLabel label="Reuse" labelPosition="outside" />
      </Flex>
    </BearProvider>
  ),
};
