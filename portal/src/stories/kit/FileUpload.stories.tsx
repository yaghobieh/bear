import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'FileUpload from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse FileUpload anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <FileUpload {...args}>
      <Typography>FileUpload</Typography>
    </FileUpload>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <FileUpload {...args}>
        <Typography>First</Typography>
      </FileUpload>
      <FileUpload>
        <Typography>Second</Typography>
      </FileUpload>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse FileUpload anywhere below.</Typography>
        <FileUpload {...args}>
          <Typography>First use</Typography>
        </FileUpload>
        <FileUpload>
          <Typography>Second use</Typography>
        </FileUpload>
      </Flex>
    </BearProvider>
  ),
};
