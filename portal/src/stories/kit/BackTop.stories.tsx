import type { Meta, StoryObj } from '@storybook/react';
import { BackTop, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const SECTIONS = [
  'Overview',
  'Usage',
  'Variants',
  'Sizes',
  'Accessibility',
  'Theming',
  'Examples',
  'Recipes',
  'FAQ',
  'Changelog',
  'Support',
  'Footer',
];

const meta: Meta<typeof BackTop> = {
  title: 'Components/BackTop',
  component: BackTop,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'BackTop from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse BackTop anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    bottom: 0,
    right: 0,
    visibleAt: 0,
    duration: 0,
    animated: true,
  },
  argTypes: {
    animated: { control: 'boolean' },
    onClick: { action: 'onClick' },
  },
};

export default meta;

type Story = StoryObj<typeof BackTop>;

export const Basic: Story = {
  render: (args) => <BackTop {...args} />,
};

export const Large: Story = {
  render: () => (
    <Flex direction="column" gap={4}>
      {SECTIONS.map((section) => (
        <Typography key={section} variant="body1">
          {section}
        </Typography>
      ))}
      <BackTop visibleAt={0} size="lg" variant="secondary" />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        {SECTIONS.map((section) => (
          <Typography key={section} variant="body1">
            {section}
          </Typography>
        ))}
        <BackTop visibleAt={0} bottom={24} right={24} />
        <BackTop visibleAt={0} bottom={88} right={24} variant="outline" size="sm" />
      </Flex>
    </BearProvider>
  ),
};
