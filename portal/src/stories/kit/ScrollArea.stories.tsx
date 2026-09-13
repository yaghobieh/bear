import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea, BearProvider, Flex, Typography } from '@forgedevstack/bear';

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
  args: {
    orientation: 'vertical',
    scrollbarSize: 'sm',
    scrollbarVariant: 'default',
    maxHeight: 240,
    maxWidth: 320,
  },
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal', 'both'] },
    scrollbarSize: { control: 'select', options: ['sm', 'md', 'lg'] },
    scrollbarVariant: { control: 'select', options: ['default', 'minimal', 'hidden'] },
  },
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

const LONG_COPY = (
  <>
    <Typography>Line one of a tall list that needs a scrollbar.</Typography>
    <Typography>Line two keeps going so the overflow is obvious.</Typography>
    <Typography>Line three.</Typography>
    <Typography>Line four.</Typography>
    <Typography>Line five.</Typography>
    <Typography>Line six.</Typography>
    <Typography>Line seven.</Typography>
    <Typography>Line eight.</Typography>
  </>
);

export const Basic: Story = {
  render: (args) => <ScrollArea {...args} />,
};

export const MinimalScrollbar: Story = {
  render: () => (
    <ScrollArea maxHeight={120} scrollbarVariant="minimal">
      {LONG_COPY}
    </ScrollArea>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <ScrollArea maxHeight={100}>
          <Typography>First scroll area</Typography>
          {LONG_COPY}
        </ScrollArea>
        <ScrollArea maxHeight={100}>
          <Typography>Reuse</Typography>
          {LONG_COPY}
        </ScrollArea>
      </Flex>
    </BearProvider>
  ),
};
