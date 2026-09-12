import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitcher, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Components/ThemeSwitcher',
  component: ThemeSwitcher,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ThemeSwitcher from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ThemeSwitcher anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ThemeSwitcher>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <ThemeSwitcher {...args}>
      <Typography>ThemeSwitcher</Typography>
    </ThemeSwitcher>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <ThemeSwitcher {...args}>
        <Typography>First</Typography>
      </ThemeSwitcher>
      <ThemeSwitcher>
        <Typography>Second</Typography>
      </ThemeSwitcher>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ThemeSwitcher anywhere below.</Typography>
        <ThemeSwitcher {...args}>
          <Typography>First use</Typography>
        </ThemeSwitcher>
        <ThemeSwitcher>
          <Typography>Second use</Typography>
        </ThemeSwitcher>
      </Flex>
    </BearProvider>
  ),
};
