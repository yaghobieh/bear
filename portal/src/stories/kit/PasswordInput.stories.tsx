import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { PasswordInput, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'PasswordInput from @forgedevstack/bear. Click the eye to show or hide the password. The visible control stays in sync.',
      },
    },
  },
  args: {
    label: 'Password',
    value: 'ForgeStack',
    placeholder: 'Enter password',
    visible: false,
    hideToggle: false,
    showShiftIndicator: true,
    disabled: false,
    size: 'md',
  },
  argTypes: {
    visible: { control: 'boolean' },
    onVisibilityChange: { action: 'onVisibilityChange' },
    hideToggle: { control: 'boolean' },
    showShiftIndicator: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    onChange: { action: 'onChange' },
  },
};

export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Basic: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <PasswordInput
        {...args}
        onChange={(event) => updateArgs({ value: event.target.value })}
        onVisibilityChange={(visible) => updateArgs({ visible })}
      />
    );
  },
};

export const WithShiftIndicator: Story = {
  args: {
    label: 'New password',
    placeholder: 'At least 8 characters',
    showShiftIndicator: true,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <PasswordInput
        {...args}
        onChange={(event) => updateArgs({ value: event.target.value })}
        onVisibilityChange={(visible) => updateArgs({ visible })}
      />
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <PasswordInput label="Current password" placeholder="••••••••" />
        <PasswordInput label="Reuse" placeholder="Confirm password" size="sm" />
      </Flex>
    </BearProvider>
  ),
};
