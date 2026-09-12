import type { Meta, StoryObj } from '@storybook/react';
import { AppBar, BearProvider, Button, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof AppBar> = {
  title: 'Components/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'AppBar from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse AppBar anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AppBar>;

export const Basic: Story = {
  render: () => (
    <AppBar position="relative" leftContent={<Typography variant="subtitle2">Bear</Typography>} rightContent={<Button size="sm">Docs</Button>} />
  ),
};

export const Dense: Story = {
  render: () => (
    <AppBar position="relative" dense leftContent={<Typography>Dense bar</Typography>} />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <AppBar position="relative" leftContent={<Typography>First</Typography>} />
        <AppBar position="relative" color="primary" leftContent={<Typography>Reuse</Typography>} />
      </Flex>
    </BearProvider>
  ),
};
