import type { Meta, StoryObj } from '@storybook/react';
import { PromptSuggestions, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof PromptSuggestions> = {
  title: 'Components/PromptSuggestions',
  component: PromptSuggestions,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'PromptSuggestions from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse PromptSuggestions anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PromptSuggestions>;

const ITEMS = [
  { id: 'plan', label: 'Draft a plan' },
  { id: 'cite', label: 'Cite sources' },
  { id: 'fix', label: 'Fix the types' },
];

export const Basic: Story = {
  args: {
    suggestions: ITEMS,
  },
};

export const Selected: Story = {
  render: () => <PromptSuggestions suggestions={ITEMS} selectedId="cite" />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <PromptSuggestions suggestions={ITEMS} />
        <PromptSuggestions suggestions={ITEMS} selectedId="plan" />
      </Flex>
    </BearProvider>
  ),
};
