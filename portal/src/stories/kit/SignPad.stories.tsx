import type { Meta, StoryObj } from '@storybook/react';
import { SignPad, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof SignPad> = {
  title: 'Components/SignPad',
  component: SignPad,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'SignPad from @forgedevstack/bear. Draw in the pad. Change stroke color, stroke width, and height in Controls.',
      },
    },
  },
  args: {
    width: 400,
    height: 200,
    strokeWidth: 2,
    strokeColor: '#1f2937',
    placeholder: 'Sign here',
    disabled: false,
    readOnly: false,
    showClear: true,
    showSave: true,
    outputFormat: 'image/png',
    outputQuality: 0.92,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    strokeColor: { control: 'color' },
    backgroundColor: { control: 'color' },
    strokeWidth: { control: { type: 'number', min: 1, max: 12 } },
    height: { control: { type: 'number', min: 120, max: 360 } },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    showClear: { control: 'boolean' },
    showSave: { control: 'boolean' },
    outputFormat: { control: 'select', options: ['image/png', 'image/jpeg', 'image/webp'] },
  },
};

export default meta;

type Story = StoryObj<typeof SignPad>;

export const Basic: Story = {
  render: (args) => <SignPad {...args} />,
};

export const Styled: Story = {
  args: {
    placeholder: 'Sign with style',
    strokeColor: '#EA0A8E',
    strokeWidth: 3,
    showSave: true,
    clearText: 'Reset',
    saveText: 'Confirm',
  },
  render: (args) => <SignPad {...args} />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse SignPad anywhere below.</Typography>
        <SignPad placeholder="First signature" />
        <SignPad placeholder="Reuse" height={140} />
      </Flex>
    </BearProvider>
  ),
};
