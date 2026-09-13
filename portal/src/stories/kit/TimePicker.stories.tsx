import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { TimePicker, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'TimePicker from @forgedevstack/bear. Change value, format, size, and variant in Controls. Click the field to open the picker.',
      },
    },
  },
  args: {
    value: '09:30 AM',
    format: '12h',
    disabled: false,
    placeholder: 'Select time',
    label: 'Meeting time',
    helperText: 'Uses a 12-hour clock',
    minuteStep: 5,
    clearable: true,
    size: 'md',
    variant: 'default',
    dropdownVariant: 'columns',
    dropdownVariantBreakpoint: 768,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    format: { control: 'select', options: ['12h', '24h'] },
    disabled: { control: 'boolean' },
    clearable: { control: 'boolean' },
    minuteStep: { control: 'select', options: [1, 5, 10, 15, 30] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'filled', 'outline'] },
    dropdownVariant: { control: 'select', options: ['columns', 'dial', 'auto'] },
  },
};

export default meta;

type Story = StoryObj<typeof TimePicker>;

export const Basic: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <TimePicker
        {...args}
        onChange={(value) => updateArgs({ value })}
      />
    );
  },
};

export const Format24h: Story = {
  args: {
    value: '14:30',
    format: '24h',
    label: 'Meeting',
    helperText: '24-hour clock',
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <TimePicker
        {...args}
        onChange={(value) => updateArgs({ value })}
      />
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <TimePicker label="Open" value="09:00 AM" format="12h" />
        <TimePicker label="Reuse" value="17:45" format="24h" size="sm" variant="outline" />
      </Flex>
    </BearProvider>
  ),
};
