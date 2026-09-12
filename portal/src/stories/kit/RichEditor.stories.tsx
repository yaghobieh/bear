import type { Meta, StoryObj } from '@storybook/react';
import { RichEditor, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof RichEditor> = {
  title: 'Components/RichEditor',
  component: RichEditor,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Editors from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse RichEditor anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof RichEditor>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <RichEditor {...args}>
      <Typography>RichEditor</Typography>
    </RichEditor>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <RichEditor {...args}>
        <Typography>First</Typography>
      </RichEditor>
      <RichEditor>
        <Typography>Second</Typography>
      </RichEditor>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse RichEditor anywhere below.</Typography>
        <RichEditor {...args}>
          <Typography>First use</Typography>
        </RichEditor>
        <RichEditor>
          <Typography>Second use</Typography>
        </RichEditor>
      </Flex>
    </BearProvider>
  ),
};
