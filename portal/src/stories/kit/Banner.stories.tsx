import type { Meta, StoryObj } from '@storybook/react';
import { Banner, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Banner from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Banner anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    children: 'New Bear release is live.',
    title: 'Title',
    dismissible: false,
    open: false,
    fullWidth: false,
  },
  argTypes: {
    icon: { control: 'boolean' },
    dismissible: { control: 'boolean' },
    onDismiss: { action: 'onDismiss' },
    open: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Banner>;

export const Basic: Story = {
  render: (args) => <Banner {...args} />,
};

export const Warning: Story = {
  render: () => (
    <Banner title="Maintenance window" severity="warning" dismissible>
      The API will restart at 02:00 UTC. Save your work.
    </Banner>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Banner anywhere below.</Typography>
        <Banner title="First" severity="success">Saved.</Banner>
        <Banner title="Reuse" severity="error">Try again.</Banner>
      </Flex>
    </BearProvider>
  ),
};
