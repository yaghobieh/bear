import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ScrollArea from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ScrollArea anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <ScrollArea {...args}>
      <Typography>ScrollArea</Typography>
    </ScrollArea>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <ScrollArea {...args}>
        <Typography>First</Typography>
      </ScrollArea>
      <ScrollArea>
        <Typography>Second</Typography>
      </ScrollArea>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse ScrollArea anywhere below.</Typography>
        <ScrollArea {...args}>
          <Typography>First use</Typography>
        </ScrollArea>
        <ScrollArea>
          <Typography>Second use</Typography>
        </ScrollArea>
      </Flex>
    </BearProvider>
  ),
};
