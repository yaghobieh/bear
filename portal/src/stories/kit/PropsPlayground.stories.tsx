import type { Meta, StoryObj } from '@storybook/react';
import { PropsPlayground, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof PropsPlayground> = {
  title: 'Components/PropsPlayground',
  component: PropsPlayground,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'PropsPlayground from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse PropsPlayground anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PropsPlayground>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <PropsPlayground {...args}>
      <Typography>PropsPlayground</Typography>
    </PropsPlayground>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <PropsPlayground {...args}>
        <Typography>First</Typography>
      </PropsPlayground>
      <PropsPlayground>
        <Typography>Second</Typography>
      </PropsPlayground>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse PropsPlayground anywhere below.</Typography>
        <PropsPlayground {...args}>
          <Typography>First use</Typography>
        </PropsPlayground>
        <PropsPlayground>
          <Typography>Second use</Typography>
        </PropsPlayground>
      </Flex>
    </BearProvider>
  ),
};
