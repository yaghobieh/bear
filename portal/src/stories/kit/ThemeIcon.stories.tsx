import type { Meta, StoryObj } from '@storybook/react';
import { ThemeIcon, BearProvider, Flex, Typography } from '@forgedevstack/bear';

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
  args: {
    children: '★',
    radius: 'sm',
  },
  argTypes: {
    radius: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
  },
};

export default meta;

type Story = StoryObj<typeof ThemeIcon>;

export const Basic: Story = {
  render: (args) => <ThemeIcon {...args} />,
};

export const Variants: Story = {
  render: () => (
    <Flex gap={3} align="center">
      <ThemeIcon variant="primary">
        <Typography>★</Typography>
      </ThemeIcon>
      <ThemeIcon variant="success">
        <Typography>✓</Typography>
      </ThemeIcon>
      <ThemeIcon variant="warning" size="lg">
        <Typography>!</Typography>
      </ThemeIcon>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3}>
        <ThemeIcon variant="primary">
          <Typography>×</Typography>
        </ThemeIcon>
        <ThemeIcon variant="info">
          <Typography>i</Typography>
        </ThemeIcon>
      </Flex>
    </BearProvider>
  ),
};
