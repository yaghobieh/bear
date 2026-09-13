import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PromptComposer, BearProvider, Flex } from '@forgedevstack/bear';

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
  args: {
    isStreaming: false,
    disabled: false,
    allowAttach: true,
    placeholder: 'Type here',
  },
  argTypes: {
    onChange: { action: 'onChange' },
    onSubmit: { action: 'onSubmit' },
    onStop: { action: 'onStop' },
    onAttach: { action: 'onAttach' },
    onFileRemove: { action: 'onFileRemove' },
    isStreaming: { control: 'boolean' },
    disabled: { control: 'boolean' },
    allowAttach: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof PromptComposer>;

export const Basic: Story = {
  render: (args) => <PromptComposer {...args} />,
};

export const WithAttach: Story = {
  render: () => {
    const [value, setValue] = useState('Draft a plan');
    return (
      <PromptComposer
        value={value}
        onChange={setValue}
        onSubmit={() => setValue('')}
        allowAttach
        onStop={() => undefined}
      />
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <PromptComposer placeholder="First composer" onSubmit={() => undefined} />
        <PromptComposer placeholder="Reuse below the same provider" allowAttach onSubmit={() => undefined} />
      </Flex>
    </BearProvider>
  ),
};
