import type { Meta, StoryObj } from '@storybook/react';
import { CssBaseline, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof CssBaseline> = {
  title: 'Components/CssBaseline',
  component: CssBaseline,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CssBaseline from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {},
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof CssBaseline>;

export const Basic: Story = {
  render: (args) => (
    <>
      <CssBaseline {...args} />
      <Typography>Baseline styles are applied to this page.</Typography>
    </>
  ),
};
