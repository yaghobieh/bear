import type { Meta, StoryObj } from '@storybook/react';
import { ResizableTextarea, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof ResizableTextarea> = {
  title: 'Components/ResizableTextarea',
  component: ResizableTextarea,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ResizableTextarea from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ResizableTextarea anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    label: 'Label',
    helperText: 'Helper text',
    minHeight: 240,
    maxHeight: 240,
    resizable: false,
    showCharCount: true,
    charCountMax: 100,
  },
  argTypes: {
    resizable: { control: 'boolean' },
    showCharCount: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ResizableTextarea>;

export const Basic: Story = {
  render: (args) => <ResizableTextarea {...args} />,
};

export const WithCharCount: Story = {
  render: () => (
    <ResizableTextarea
      label="Feedback"
      defaultValue="The canvas should show a visible textarea."
      showCharCount
      charCountMax={160}
      minHeight={120}
      maxHeight={240}
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <ResizableTextarea label="First note" defaultValue="First use" minHeight={80} />
        <ResizableTextarea label="Reuse" defaultValue="Same provider" minHeight={80} />
      </Flex>
    </BearProvider>
  ),
};
