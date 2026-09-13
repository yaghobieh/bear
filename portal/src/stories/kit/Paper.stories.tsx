import type { Meta, StoryObj } from '@storybook/react';
import { Paper, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Paper> = {
  title: 'Components/Paper',
  component: Paper,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Paper from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Paper anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    children: 'Paper surface',
    rounded: 'none',
    variant: 'elevation',
    fullWidth: false,
    padding: 'none',
    background: 'default',
  },
  argTypes: {
    rounded: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'xl', 'full'] },
    variant: { control: 'select', options: ['elevation', 'outlined'] },
    fullWidth: { control: 'boolean' },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    background: { control: 'select', options: ['default', 'paper', 'transparent'] },
  },
};

export default meta;

type Story = StoryObj<typeof Paper>;

export const Basic: Story = {
  render: (args) => <Paper {...args} />,
};

export const Outlined: Story = {
  render: () => (
    <Paper padding="lg" variant="outlined" rounded="lg">
      <Typography>Outlined paper without a drop shadow.</Typography>
    </Paper>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Paper padding="sm" elevation={1}>
          <Typography>First use</Typography>
        </Paper>
        <Paper padding="sm" elevation={3}>
          <Typography>Reuse</Typography>
        </Paper>
      </Flex>
    </BearProvider>
  ),
};
