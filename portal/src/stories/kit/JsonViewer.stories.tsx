import type { Meta, StoryObj } from '@storybook/react';
import { JsonViewer, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof JsonViewer> = {
  title: 'Components/JsonViewer',
  component: JsonViewer,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Developer from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse JsonViewer anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof JsonViewer>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <JsonViewer {...args}>
      <Typography>JsonViewer</Typography>
    </JsonViewer>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <JsonViewer {...args}>
        <Typography>First</Typography>
      </JsonViewer>
      <JsonViewer>
        <Typography>Second</Typography>
      </JsonViewer>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse JsonViewer anywhere below.</Typography>
        <JsonViewer {...args}>
          <Typography>First use</Typography>
        </JsonViewer>
        <JsonViewer>
          <Typography>Second use</Typography>
        </JsonViewer>
      </Flex>
    </BearProvider>
  ),
};
