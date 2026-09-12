import type { Meta, StoryObj } from '@storybook/react';
import { QRCode, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof QRCode> = {
  title: 'Components/QRCode',
  component: QRCode,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'QRCode from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse QRCode anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof QRCode>;

export const Basic: Story = {
  args: {},
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex direction="column" gap={3}>
      <QRCode {...args} />
      <QRCode {...args} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse QRCode anywhere below.</Typography>
        <QRCode {...args} />
        <QRCode {...args} />
      </Flex>
    </BearProvider>
  ),
};
