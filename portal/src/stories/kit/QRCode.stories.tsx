import type { Meta, StoryObj } from '@storybook/react';
import { QRCode, BearProvider, Flex, Typography } from '@forgedevstack/bear';

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
  args: {
    size: 0,
    level: 'L',
    includeMargin: false,
    imageSize: 0,
  },
  argTypes: {
    level: { control: 'select', options: ['L', 'M', 'Q', 'H'] },
    bgColor: { control: 'color' },
    fgColor: { control: 'color' },
    includeMargin: { control: 'boolean' },
    renderAs: { control: 'select', options: ['canvas', 'svg'] },
  },
};

export default meta;

type Story = StoryObj<typeof QRCode>;

export const Basic: Story = {
  render: (args) => <QRCode {...args} />,
};

export const Colored: Story = {
  render: () => (
    <Flex gap={4} wrap="wrap">
      <QRCode value="https://forgestack.dev" size={128} />
      <QRCode value="https://forgestack.dev" size={128} fgColor="#EA0A8E" bgColor="#FFF5FA" />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse QRCode anywhere below.</Typography>
        <QRCode value="https://forgestack.dev" />
        <QRCode value="npm install @forgedevstack/bear" size={96} />
      </Flex>
    </BearProvider>
  ),
};
