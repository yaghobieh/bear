import type { Meta, StoryObj } from '@storybook/react';
import { OTPInput, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof OTPInput> = {
  title: 'Components/OTPInput',
  component: OTPInput,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'OTPInput from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse OTPInput anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    length: 6,
    disabled: false,
    error: false,
    autoFocus: false,
    mask: false,
    size: 'sm',
    separator: 0,
    stackOnNarrow: false,
    cancelAutoJump: false,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    onComplete: { action: 'onComplete' },
    onFinish: { action: 'onFinish' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
    mask: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    stackOnNarrow: { control: 'boolean' },
    cancelAutoJump: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof OTPInput>;

export const Basic: Story = {
  render: (args) => <OTPInput {...args} />,
};

export const Circle: Story = {
  render: () => <OTPInput length={6} value="19" variant="circle" />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <OTPInput length={6} value="12" />
        <OTPInput length={4} variant="underline" />
      </Flex>
    </BearProvider>
  ),
};
