import type { Meta, StoryObj } from '@storybook/react';
import { Box, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Box> = {
  title: 'Components/Box',
  component: Box,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Box from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Box anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Box {...args}>
      <Typography>Box</Typography>
    </Box>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Box {...args}>
        <Typography>First</Typography>
      </Box>
      <Box>
        <Typography>Second</Typography>
      </Box>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Box anywhere below.</Typography>
        <Box {...args}>
          <Typography>First use</Typography>
        </Box>
        <Box>
          <Typography>Second use</Typography>
        </Box>
      </Flex>
    </BearProvider>
  ),
};
