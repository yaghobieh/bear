import type { Meta, StoryObj } from '@storybook/react';
import { Banner, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Banner from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Banner anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Banner>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Banner {...args}>
      <Typography>Banner</Typography>
    </Banner>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Banner {...args}>
        <Typography>First</Typography>
      </Banner>
      <Banner>
        <Typography>Second</Typography>
      </Banner>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Banner anywhere below.</Typography>
        <Banner {...args}>
          <Typography>First use</Typography>
        </Banner>
        <Banner>
          <Typography>Second use</Typography>
        </Banner>
      </Flex>
    </BearProvider>
  ),
};
