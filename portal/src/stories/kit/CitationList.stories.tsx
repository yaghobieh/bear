import type { Meta, StoryObj } from '@storybook/react';
import { CitationList, BearProvider, Flex } from '@forgedevstack/bear';
import type { CitationItem } from '@forgedevstack/bear';

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
  args: {

  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof CitationList>;

const CITATIONS: CitationItem[] = [
  { id: '1', title: 'Bear Chat API', href: '/components/chat', excerpt: 'Composer, streaming, and live region' },
  { id: '2', title: 'Chart', href: '/components/chart', excerpt: 'Bar, line, pie, radar, and funnel' },
  { id: '3', title: 'Internal note', excerpt: 'No link — title only' },
];

const SHORT_CITATIONS: CitationItem[] = [
  { id: 'c1', title: 'PromptComposer', href: '/components/prompt-composer' },
];

export const Basic: Story = {
  args: {
    citations: CITATIONS,
  },
  render: (args) => <CitationList {...args} />,
};

export const SingleSource: Story = {
  render: () => <CitationList citations={SHORT_CITATIONS} />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <CitationList citations={CITATIONS} />
        <CitationList citations={SHORT_CITATIONS} />
      </Flex>
    </BearProvider>
  ),
};
