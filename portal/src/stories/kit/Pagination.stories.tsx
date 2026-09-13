import type { Meta, StoryObj } from '@storybook/react';
import { Pagination, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Pagination from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Pagination anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    count: 0,
    page: 0,
    defaultPage: 0,
    boundaryCount: 0,
    siblingCount: 0,
    variant: 'text',
    shape: 'circular',
    showFirstLast: true,
    showPrevNext: true,
    disabled: false,
  },
  argTypes: {
    variant: { control: 'select', options: ['text', 'outlined', 'contained'] },
    color: { control: 'color' },
    shape: { control: 'select', options: ['circular', 'rounded'] },
    showFirstLast: { control: 'boolean' },
    showPrevNext: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { action: 'onChange' },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Basic: Story = {
  render: (args) => <Pagination {...args} />,
};

export const ManyPages: Story = {
  render: () => <Pagination page={5} count={20} onChange={() => undefined} />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Pagination page={1} count={5} onChange={() => undefined} />
        <Pagination page={3} count={5} onChange={() => undefined} />
      </Flex>
    </BearProvider>
  ),
};
