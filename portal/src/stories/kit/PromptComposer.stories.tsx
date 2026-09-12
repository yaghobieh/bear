import type { Meta, StoryObj } from '@storybook/react';
import { PromptComposer, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof PromptComposer> = {
  title: 'Components/PromptComposer',
  component: PromptComposer,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'PromptComposer from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse PromptComposer anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PromptComposer>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <PromptComposer {...args}>
      <Typography>PromptComposer</Typography>
    </PromptComposer>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <PromptComposer {...args}>
        <Typography>First</Typography>
      </PromptComposer>
      <PromptComposer>
        <Typography>Second</Typography>
      </PromptComposer>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse PromptComposer anywhere below.</Typography>
        <PromptComposer {...args}>
          <Typography>First use</Typography>
        </PromptComposer>
        <PromptComposer>
          <Typography>Second use</Typography>
        </PromptComposer>
      </Flex>
    </BearProvider>
  ),
};
