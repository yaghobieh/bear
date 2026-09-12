import type { Meta, StoryObj } from '@storybook/react';
import { FormControl, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof FormControl> = {
  title: 'Components/FormControl',
  component: FormControl,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'FormControl from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse FormControl anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormControl>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <FormControl {...args}>
      <Typography>FormControl</Typography>
    </FormControl>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <FormControl {...args}>
        <Typography>First</Typography>
      </FormControl>
      <FormControl>
        <Typography>Second</Typography>
      </FormControl>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse FormControl anywhere below.</Typography>
        <FormControl {...args}>
          <Typography>First use</Typography>
        </FormControl>
        <FormControl>
          <Typography>Second use</Typography>
        </FormControl>
      </Flex>
    </BearProvider>
  ),
};
