import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload, BearProvider, Flex } from '@forgedevstack/bear';

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
  args: {
    multiple: false,
    maxSize: 100,
    maxFiles: 100,
    disabled: false,
    label: 'Label',
    helperText: 'Helper text',
    showPreview: true,
    variant: 'dropzone',
  },
  argTypes: {
    onFilesSelect: { action: 'onFilesSelect' },
    onFileRemove: { action: 'onFileRemove' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showPreview: { control: 'boolean' },
    variant: { control: 'select', options: ['dropzone', 'button', 'compact'] },
  },
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Basic: Story = {
  render: (args) => <FileUpload {...args} />,
};

export const ButtonVariant: Story = {
  render: () => (
    <FileUpload
      variant="button"
      multiple
      accept=".pdf,.md"
      label="Attach documents"
      onFilesSelect={() => undefined}
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <FileUpload variant="compact" label="First upload" onFilesSelect={() => undefined} />
        <FileUpload variant="compact" label="Reuse" onFilesSelect={() => undefined} />
      </Flex>
    </BearProvider>
  ),
};
