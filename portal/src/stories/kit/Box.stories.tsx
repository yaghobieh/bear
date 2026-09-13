import type { Meta, StoryObj } from '@storybook/react';
import { Box, BearProvider, Flex, Typography } from '@forgedevstack/bear';

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
  args: {
    children: 'Box content',
    as: 'div',
    p: 0,
    px: 0,
    py: 0,
    pt: 0,
    pb: 0,
    pl: 0,
    pr: 0,
    m: 0,
    mx: 0,
    my: 0,
    mt: 0,
    mb: 0,
    ml: 0,
    mr: 0,
    rounded: 'none',
    shadow: 'none',
    border: false,
  },
  argTypes: {
    as: { control: 'select', options: ['div', 'section', 'article', 'aside', 'main', 'header', 'footer', 'nav', 'span'] },
    rounded: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] },
    shadow: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'] },
    border: { control: 'boolean' },
    borderColor: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Basic: Story = {
  render: (args) => <Box {...args} />,
};

export const Shadowed: Story = {
  render: () => (
    <Box p={4} rounded="xl" shadow="md">
      <Typography>Elevated surface for grouping content.</Typography>
    </Box>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Box p={3} border>
          <Typography>First use</Typography>
        </Box>
        <Box p={3} rounded="md" shadow="sm">
          <Typography>Reuse</Typography>
        </Box>
      </Flex>
    </BearProvider>
  ),
};
