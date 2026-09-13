import type { Meta, StoryObj } from '@storybook/react';
import { RichEditor, BearProvider, Flex, Typography } from '@forgedevstack/bear';

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
        component: 'RichEditor from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse RichEditor anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    placeholder: 'Type here',
    disabled: false,
    readOnly: false,
    allowImagePaste: true,
    showCharCount: true,
    charCountMax: 100,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    allowImagePaste: { control: 'boolean' },
    showCharCount: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof RichEditor>;

export const Basic: Story = {
  render: (args) => <RichEditor {...args} />,
};

export const MinimalToolbar: Story = {
  render: () => (
    <RichEditor
      toolbar={['bold', 'italic', 'underline', 'strikethrough']}
      placeholder="Format your text..."
      minHeight={160}
    />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse RichEditor anywhere below.</Typography>
        <RichEditor defaultValue="<p>First use</p>" />
        <RichEditor defaultValue="<p>Reuse</p>" readOnly />
      </Flex>
    </BearProvider>
  ),
};
