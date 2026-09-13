import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, BearProvider, Button, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Collapsible from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Collapsible anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    open: false,
    defaultOpen: false,
    disabled: false,
    animationDuration: 0,
  },
  argTypes: {
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Basic: Story = {
  render: (args) => <Collapsible {...args} />,
};

export const Closed: Story = {
  render: () => (
    <Collapsible trigger={<Button variant="ghost">Show more</Button>}>
      <Typography>Starts closed. Click the trigger to expand.</Typography>
    </Collapsible>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Collapsible trigger={<Button>First</Button>} defaultOpen>
          <Typography>First use</Typography>
        </Collapsible>
        <Collapsible trigger={<Button variant="outline">Reuse</Button>}>
          <Typography>Same provider</Typography>
        </Collapsible>
      </Flex>
    </BearProvider>
  ),
};
