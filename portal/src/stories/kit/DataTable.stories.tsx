import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Data Display from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse DataTable anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {

  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof DataTable>;

type Person = { id: string; name: string; role: string };

const ROWS: Person[] = [
  { id: '1', name: 'Ada', role: 'Engineer' },
  { id: '2', name: 'Grace', role: 'Lead' },
];

const COLUMNS = [
  { key: 'name', header: 'Name', accessor: (row: Person) => row.name },
  { key: 'role', header: 'Role', accessor: (row: Person) => row.role },
];

export const Basic: Story = {
  args: {
    variant: 'simple',
    loading: false,
    clickable: false,
  },
  render: (args) => (
    <DataTable
      {...args}
      columns={COLUMNS}
      data={ROWS}
      rowKey={(row) => row.id}
    />
  ),
};

export const Striped: Story = {
  render: () => (
    <DataTable variant="striped" columns={COLUMNS} data={ROWS} rowKey={(row) => row.id} />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <DataTable columns={COLUMNS} data={ROWS} rowKey={(row) => row.id} />
        <DataTable variant="bordered" columns={COLUMNS} data={ROWS} rowKey={(row) => row.id} />
      </Flex>
    </BearProvider>
  ),
};
