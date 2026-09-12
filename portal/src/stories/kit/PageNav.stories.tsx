import type { Meta, StoryObj } from '@storybook/react';
import { PageNav, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof PageNav> = {
  title: 'Components/PageNav',
  component: PageNav,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'PageNav from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse PageNav anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PageNav>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <PageNav {...args}>
      <Typography>PageNav</Typography>
    </PageNav>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <PageNav {...args}>
        <Typography>First</Typography>
      </PageNav>
      <PageNav>
        <Typography>Second</Typography>
      </PageNav>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse PageNav anywhere below.</Typography>
        <PageNav {...args}>
          <Typography>First use</Typography>
        </PageNav>
        <PageNav>
          <Typography>Second use</Typography>
        </PageNav>
      </Flex>
    </BearProvider>
  ),
};
