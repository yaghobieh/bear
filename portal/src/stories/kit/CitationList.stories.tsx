import type { Meta, StoryObj } from '@storybook/react';
import { CitationList, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof CitationList> = {
  title: 'Components/CitationList',
  component: CitationList,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CitationList from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse CitationList anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CitationList>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <CitationList {...args}>
      <Typography>CitationList</Typography>
    </CitationList>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <CitationList {...args}>
        <Typography>First</Typography>
      </CitationList>
      <CitationList>
        <Typography>Second</Typography>
      </CitationList>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse CitationList anywhere below.</Typography>
        <CitationList {...args}>
          <Typography>First use</Typography>
        </CitationList>
        <CitationList>
          <Typography>Second use</Typography>
        </CitationList>
      </Flex>
    </BearProvider>
  ),
};
