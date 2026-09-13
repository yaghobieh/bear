import type { Meta, StoryObj } from '@storybook/react';
import { Typography, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Typography from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Typography anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    children: 'The quick brown fox',
    weight: 'thin',
    color: 'primary',
    truncate: false,
    maxLines: 100,
    italic: false,
    underline: false,
    strikethrough: false,
    noWrap: false,
    inline: false,
    paragraph: false,
    lineHeight: 'tight',
  },
  argTypes: {
    weight: { control: 'select', options: ['thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'] },
    color: { control: 'select', options: ['primary', 'secondary', 'muted', 'success', 'danger', 'warning'] },
    truncate: { control: 'boolean' },
    italic: { control: 'boolean' },
    underline: { control: 'boolean' },
    strikethrough: { control: 'boolean' },
    noWrap: { control: 'boolean' },
    inline: { control: 'boolean' },
    paragraph: { control: 'boolean' },
    lineHeight: { control: 'select', options: ['tight', 'normal', 'relaxed', 'loose'] },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Basic: Story = {
  render: (args) => <Typography {...args} />,
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Typography variant="h5">Heading</Typography>
      <Typography>Body copy</Typography>
      <Typography color="muted">Muted</Typography>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={2}>
        <Typography variant="h6">First use</Typography>
        <Typography color="muted">Reuse below the same provider</Typography>
      </Flex>
    </BearProvider>
  ),
};
