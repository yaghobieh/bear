import type { Meta, StoryObj } from '@storybook/react';
import { Anchor, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof Anchor> = {
  title: 'Components/Anchor',
  component: Anchor,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Anchor from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Anchor anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    offset: 0,
    affix: false,
    affixTop: 0,
    targetOffset: 0,
  },
  argTypes: {
    affix: { control: 'boolean' },
    onClick: { action: 'onClick' },
    activeColor: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<typeof Anchor>;

const LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'usage', label: 'Usage' },
  { id: 'api', label: 'API' },
];

const NESTED_LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'usage', label: 'Usage' },
  {
    id: 'api',
    label: 'API Reference',
    children: [
      { id: 'props', label: 'Props' },
      { id: 'events', label: 'Events' },
    ],
  },
];

export const Basic: Story = {
  args: {
    links: LINKS,
  },
  render: (args) => <Anchor {...args} />,
};

export const Nested: Story = {
  render: () => <Anchor links={NESTED_LINKS} affix={false} />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Anchor links={LINKS} />
        <Anchor links={NESTED_LINKS} />
      </Flex>
    </BearProvider>
  ),
};
