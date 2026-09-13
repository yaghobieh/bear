import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker, BearProvider, Flex } from '@forgedevstack/bear';

const PRESETS = ['#EA0A8E', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ColorPicker from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ColorPicker anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    showInput: true,
    showPresets: true,
    disabled: false,
    label: 'Label',
    size: 'sm',
  },
  argTypes: {
    onChange: { action: 'onChange' },
    showInput: { control: 'boolean' },
    showPresets: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const Basic: Story = {
  render: (args) => <ColorPicker {...args} />,
};

export const WithPresets: Story = {
  render: () => (
    <ColorPicker value="#3B82F6" label="Accent" presets={PRESETS} showInput showPresets />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <ColorPicker value="#EA0A8E" label="Primary" />
        <ColorPicker value="#10B981" label="Reuse" size="sm" />
      </Flex>
    </BearProvider>
  ),
};
