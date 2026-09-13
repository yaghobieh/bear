import type { Meta, StoryObj } from '@storybook/react';
import { Spoiler, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Spoiler> = {
  title: 'Components/Spoiler',
  component: Spoiler,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Spoiler from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Spoiler anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    children: 'Hidden details until you expand.',
    maxHeight: 240,
    initialExpanded: false,
    transitionDuration: 0,
  },
  argTypes: {
    initialExpanded: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Spoiler>;

const LONG_TEXT = (
  <Typography>
    Bear ships theme tokens through BearProvider. This spoiler clips tall copy at a max height so the page stays compact until the reader expands it. Keep wrapping the tree once, then reuse components anywhere below the provider.
  </Typography>
);

export const Basic: Story = {
  render: (args) => <Spoiler {...args} />,
};

export const Expanded: Story = {
  render: () => (
    <Spoiler maxHeight={48} initialExpanded showLabel="Show more" hideLabel="Show less">
      {LONG_TEXT}
    </Spoiler>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Spoiler maxHeight={40}>
          <Typography>First spoiler with enough copy to overflow the clipped height and reveal the toggle.</Typography>
        </Spoiler>
        <Spoiler maxHeight={40}>
          <Typography>Reuse spoiler with enough copy to overflow the clipped height and reveal the toggle.</Typography>
        </Spoiler>
      </Flex>
    </BearProvider>
  ),
};
