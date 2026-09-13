import type { Meta, StoryObj } from '@storybook/react';
import { Affix, Button, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Affix> = {
  title: 'Components/Affix',
  component: Affix,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Affix from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Affix anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    offset: 0,
    zIndex: 0,
    withinPortal: false,
  },
  argTypes: {
    withinPortal: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Affix>;

export const Basic: Story = {
  render: (args) => <Affix {...args} />,
};

export const Bottom: Story = {
  render: () => (
    <Affix position="bottom" offset={24}>
      <Button variant="outline">Pinned to bottom</Button>
    </Affix>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Affix position="top">
          <Typography>First affix</Typography>
        </Affix>
        <Affix position="bottom">
          <Typography>Second affix, same provider</Typography>
        </Affix>
      </Flex>
    </BearProvider>
  ),
};
