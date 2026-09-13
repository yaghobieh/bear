import type { Meta, StoryObj } from '@storybook/react';
import { GradientText, BearProvider, Flex } from '@forgedevstack/bear';

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
  args: {
    children: 'ForgeStack',
    animate: false,
    animationSpeed: 0,
    as: 'span',
    weight: 'normal',
  },
  argTypes: {
    colors: { control: 'color' },
    animate: { control: 'boolean' },
    as: { control: 'select', options: ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'] },
    weight: { control: 'select', options: ['normal', 'medium', 'semibold', 'bold', 'extrabold'] },
  },
};

export default meta;

type Story = StoryObj<typeof GradientText>;

export const Basic: Story = {
  render: (args) => <GradientText {...args} />,
};

export const Animated: Story = {
  render: () => (
    <GradientText preset="sunset" animate weight="extrabold" as="h3">
      Sunset gradient
    </GradientText>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <GradientText preset="ocean">First use</GradientText>
        <GradientText preset="neon">Reuse</GradientText>
      </Flex>
    </BearProvider>
  ),
};
