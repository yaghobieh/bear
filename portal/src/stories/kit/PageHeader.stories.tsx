import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader, Button, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof PageHeader> = {
  title: 'Components/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'PageHeader from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse PageHeader anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    title: 'Title',
    description: 'Helper text',
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

export const Basic: Story = {
  render: (args) => <PageHeader {...args} />,
};

export const WithActions: Story = {
  render: () => (
    <PageHeader
      title="Projects"
      description="Manage workspace projects"
      breadcrumbs={<Typography>Workspace / Projects</Typography>}
      actions={<Button size="sm">New project</Button>}
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <PageHeader title="First" description="First header" />
        <PageHeader title="Reuse" description="Second header, same provider" actions={<Button size="sm">New</Button>} />
      </Flex>
    </BearProvider>
  ),
};
