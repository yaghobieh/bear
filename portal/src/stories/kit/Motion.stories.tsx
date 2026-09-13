import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, Motion, Transition, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Motion> = {
  title: 'Components/Transition/Motion',
  component: Motion,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Motion from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    inView: false,
  },
  argTypes: {
    inView: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Motion>;

export const Basic: Story = {
  render: (args) => <Motion {...args} />,
};
