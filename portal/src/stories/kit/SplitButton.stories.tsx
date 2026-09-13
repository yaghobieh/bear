import type { Meta, StoryObj } from '@storybook/react';
import { SplitButton, BearProvider, Flex } from '@forgedevstack/bear';

const SAVE_OPTIONS = [
  { id: 'draft', label: 'Save as draft', onClick: () => undefined },
  { id: 'template', label: 'Save as template', onClick: () => undefined },
  { id: 'copy', label: 'Save a copy', onClick: () => undefined },
];

const EXPORT_OPTIONS = [
  { id: 'csv', label: 'Export as CSV', onClick: () => undefined },
  { id: 'pdf', label: 'Export as PDF', onClick: () => undefined },
  { id: 'xlsx', label: 'Export as Excel', onClick: () => undefined },
];

const meta: Meta<typeof SplitButton> = {
  title: 'Components/SplitButton',
  component: SplitButton,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'SplitButton from @forgedevstack/bear. Change label, variant, size, and disabled in Controls. The chevron opens the options menu.',
      },
    },
  },
  args: {
    label: 'Save',
    options: SAVE_OPTIONS,
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    dropdownAlign: 'left',
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    onClick: { action: 'onClick' },
    dropdownAlign: { control: 'select', options: ['left', 'right'] },
  },
};

export default meta;

type Story = StoryObj<typeof SplitButton>;

export const Basic: Story = {
  render: (args) => <SplitButton {...args} />,
};

export const Outline: Story = {
  args: {
    label: 'Export',
    options: EXPORT_OPTIONS,
    variant: 'outline',
    dropdownAlign: 'right',
  },
  render: (args) => <SplitButton {...args} />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={2}>
        <SplitButton label="Save" options={SAVE_OPTIONS} onClick={() => undefined} />
        <SplitButton label="Export" options={EXPORT_OPTIONS} variant="secondary" onClick={() => undefined} />
      </Flex>
    </BearProvider>
  ),
};
