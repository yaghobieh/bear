import type { Meta, StoryObj } from '@storybook/react';
import { TagCloud, BearProvider, Flex } from '@forgedevstack/bear';
import type { TagCloudItem } from '@forgedevstack/bear';

const meta: Meta<typeof TagCloud> = {
  title: 'Components/TagCloud',
  component: TagCloud,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'TagCloud from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse TagCloud anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    minFontSize: 0,
    maxFontSize: 100,
    mobileCompact: false,
  },
  argTypes: {
    colors: { control: 'color' },
    mobileCompact: { control: 'boolean' },
    onTagClick: { action: 'onTagClick' },
  },
};

export default meta;

type Story = StoryObj<typeof TagCloud>;

const TAGS: TagCloudItem[] = [
  { text: 'React', value: 100 },
  { text: 'TypeScript', value: 85 },
  { text: 'Tailwind', value: 75 },
  { text: 'Bear UI', value: 90 },
  { text: 'ForgeStack', value: 80 },
  { text: 'Vite', value: 60 },
  { text: 'Node.js', value: 55 },
  { text: 'GraphQL', value: 40 },
];

export const Basic: Story = {
  args: {
    tags: TAGS,
  },
  render: (args) => <TagCloud {...args} />,
};

export const Circle: Story = {
  render: () => <TagCloud tags={TAGS} layout="circle" minFontSize={12} maxFontSize={32} />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <TagCloud tags={TAGS} />
        <TagCloud tags={TAGS} layout="circle" />
      </Flex>
    </BearProvider>
  ),
};
