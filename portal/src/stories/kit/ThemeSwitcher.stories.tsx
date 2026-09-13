import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitcher, BearProvider, Flex, Typography } from '@forgedevstack/bear';

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
  args: {

  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

export default meta;

type Story = StoryObj<typeof ThemeSwitcher>;

export const Basic: Story = {
  render: (args) => <ThemeSwitcher {...args} />,
};

export const DarkValue: Story = {
  render: () => <ThemeSwitcher value="dark" />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ThemeSwitcher anywhere below.</Typography>
        <ThemeSwitcher />
        <ThemeSwitcher />
      </Flex>
    </BearProvider>
  ),
};
