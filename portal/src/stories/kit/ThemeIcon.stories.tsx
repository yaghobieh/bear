import type { Meta, StoryObj } from '@storybook/react';
import { ThemeIcon, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof ThemeIcon> = {
  title: 'Components/ThemeIcon',
  component: ThemeIcon,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ThemeIcon from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ThemeIcon anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ThemeIcon>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <ThemeIcon {...args}>
      <Typography>ThemeIcon</Typography>
    </ThemeIcon>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <ThemeIcon {...args}>
        <Typography>First</Typography>
      </ThemeIcon>
      <ThemeIcon>
        <Typography>Second</Typography>
      </ThemeIcon>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ThemeIcon anywhere below.</Typography>
        <ThemeIcon {...args}>
          <Typography>First use</Typography>
        </ThemeIcon>
        <ThemeIcon>
          <Typography>Second use</Typography>
        </ThemeIcon>
      </Flex>
    </BearProvider>
  ),
};
