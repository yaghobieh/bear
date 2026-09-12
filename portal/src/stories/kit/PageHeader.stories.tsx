import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof PageHeader> = {
  title: 'Components/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'PageHeader from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse PageHeader anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <PageHeader {...args}>
      <Typography>PageHeader</Typography>
    </PageHeader>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <PageHeader {...args}>
        <Typography>First</Typography>
      </PageHeader>
      <PageHeader>
        <Typography>Second</Typography>
      </PageHeader>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse PageHeader anywhere below.</Typography>
        <PageHeader {...args}>
          <Typography>First use</Typography>
        </PageHeader>
        <PageHeader>
          <Typography>Second use</Typography>
        </PageHeader>
      </Flex>
    </BearProvider>
  ),
};
