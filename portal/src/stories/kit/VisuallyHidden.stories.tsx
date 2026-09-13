import type { Meta, StoryObj } from '@storybook/react';
import { Button, VisuallyHidden } from '@forgedevstack/bear';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'VisuallyHidden from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    children: 'Close dialog',
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof VisuallyHidden>;

export const Basic: Story = {
  render: (args) => (
    <Button>
      ×
      <VisuallyHidden {...args} />
    </Button>
  ),
};
