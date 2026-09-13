import type { Meta, StoryObj } from '@storybook/react';
import { Em, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Em> = {
  title: 'Components/Em',
  component: Em,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Em from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Em anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    children: 'Emphasis',
    variant: 'default',
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'strong', 'subtle'] },
  },
};

export default meta;

type Story = StoryObj<typeof Em>;

export const Basic: Story = {
  render: (args) => <Em {...args} />,
};

export const Strong: Story = {
  render: () => (
    <Typography>
      This is <Em variant="strong">strong emphasis</Em> and this is <Em variant="subtle">subtle</Em>.
    </Typography>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={2}>
        <Em>First</Em>
        <Em variant="strong">Reuse</Em>
      </Flex>
    </BearProvider>
  ),
};
