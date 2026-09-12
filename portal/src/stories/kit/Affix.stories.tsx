import type { Meta, StoryObj } from '@storybook/react';
import { Affix, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Affix> = {
  title: 'Components/Affix',
  component: Affix,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Affix from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Affix anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Affix>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Affix {...args}>
      <Typography>Affix</Typography>
    </Affix>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Affix {...args}>
        <Typography>First</Typography>
      </Affix>
      <Affix>
        <Typography>Second</Typography>
      </Affix>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Affix anywhere below.</Typography>
        <Affix {...args}>
          <Typography>First use</Typography>
        </Affix>
        <Affix>
          <Typography>Second use</Typography>
        </Affix>
      </Flex>
    </BearProvider>
  ),
};
