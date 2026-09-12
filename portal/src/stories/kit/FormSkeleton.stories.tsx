import type { Meta, StoryObj } from '@storybook/react';
import { FormSkeleton, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof FormSkeleton> = {
  title: 'Components/FormSkeleton',
  component: FormSkeleton,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'FormSkeleton from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse FormSkeleton anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormSkeleton>;

export const Basic: Story = {
  args: {
    fields: 3,
  },
};

export const Static: Story = {
  render: () => <FormSkeleton fields={2} animation="none" />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <FormSkeleton fields={2} />
        <FormSkeleton fields={3} />
      </Flex>
    </BearProvider>
  ),
};
