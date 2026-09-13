import type { Meta, StoryObj } from '@storybook/react';
import { Biometric, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Biometric> = {
  title: 'Components/Biometric',
  component: Biometric,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Biometric from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Biometric anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    label: 'Label',
    disabled: false,
    animated: true,
  },
  argTypes: {
    onScan: { action: 'onScan' },
    onSuccess: { action: 'onSuccess' },
    onError: { action: 'onError' },
    disabled: { control: 'boolean' },
    animated: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Biometric>;

export const Basic: Story = {
  render: (args) => <Biometric {...args} />,
};

export const FaceScan: Story = {
  render: () => (
    <Flex gap={6} align="end">
      <Biometric type="face" size="lg" label="Look at the camera" />
      <Biometric type="iris" size="lg" label="Hold steady" />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Biometric anywhere below.</Typography>
        <Biometric type="fingerprint" label="First" />
        <Biometric type="face" label="Reuse" />
      </Flex>
    </BearProvider>
  ),
};
