import type { Meta, StoryObj } from '@storybook/react';
import { GradientText, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof GradientText> = {
  title: 'Components/GradientText',
  component: GradientText,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'GradientText from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse GradientText anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof GradientText>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <GradientText {...args}>
      <Typography>GradientText</Typography>
    </GradientText>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <GradientText {...args}>
        <Typography>First</Typography>
      </GradientText>
      <GradientText>
        <Typography>Second</Typography>
      </GradientText>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse GradientText anywhere below.</Typography>
        <GradientText {...args}>
          <Typography>First use</Typography>
        </GradientText>
        <GradientText>
          <Typography>Second use</Typography>
        </GradientText>
      </Flex>
    </BearProvider>
  ),
};
