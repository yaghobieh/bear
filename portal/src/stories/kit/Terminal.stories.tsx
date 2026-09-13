import type { Meta, StoryObj } from '@storybook/react';
import { Terminal, BearProvider, Flex } from '@forgedevstack/bear';
import type { TerminalLine } from '@forgedevstack/bear';

const meta: Meta<typeof Terminal> = {
  title: 'Components/Terminal',
  component: Terminal,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Terminal from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Terminal anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    title: 'Title',
    showHeader: true,
    showLineNumbers: true,
    showTimestamps: true,
    readOnly: false,
    height: 240,
    theme: 'dark',
    autoScroll: false,
    isLoading: false,
  },
  argTypes: {
    onCommand: { action: 'onCommand' },
    showHeader: { control: 'boolean' },
    showLineNumbers: { control: 'boolean' },
    showTimestamps: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    theme: { control: 'select', options: ['dark', 'light', 'matrix'] },
    onHistoryChange: { action: 'onHistoryChange' },
    autoScroll: { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Terminal>;

const LINES: TerminalLine[] = [
  { id: '1', type: 'system', content: 'Welcome to Bear Terminal' },
  { id: '2', type: 'info', content: 'Type help for available commands' },
  { id: '3', type: 'input', content: 'whoami' },
  { id: '4', type: 'output', content: 'bear@forge' },
];

export const Basic: Story = {
  args: {
    lines: LINES,
  },
  render: (args) => <Terminal {...args} />,
};

export const Matrix: Story = {
  render: () => (
    <Terminal
      lines={LINES}
      theme="matrix"
      title="bear@forge"
      showLineNumbers
      height={220}
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Terminal lines={LINES} readOnly height={180} />
        <Terminal lines={LINES} theme="light" readOnly height={180} />
      </Flex>
    </BearProvider>
  ),
};
