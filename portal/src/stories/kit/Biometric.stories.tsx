import type { Meta, StoryObj } from '@storybook/react';
import { Biometric, Flex, Typography, BearProvider } from '@forgedevstack/bear';

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
};

export default meta;

type Story = StoryObj<typeof Biometric>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Biometric {...args}>
      <Typography>Biometric</Typography>
    </Biometric>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Biometric {...args}>
        <Typography>First</Typography>
      </Biometric>
      <Biometric>
        <Typography>Second</Typography>
      </Biometric>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Biometric anywhere below.</Typography>
        <Biometric {...args}>
          <Typography>First use</Typography>
        </Biometric>
        <Biometric>
          <Typography>Second use</Typography>
        </Biometric>
      </Flex>
    </BearProvider>
  ),
};
