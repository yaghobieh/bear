import type { Meta, StoryObj } from '@storybook/react';
import { TagsInput, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof TagsInput> = {
  title: 'Components/TagsInput',
  component: TagsInput,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'TagsInput from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse TagsInput anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    value: ['bear', 'ui'],
    defaultValue: ['bear', 'ui'],
    placeholder: 'Type here',
    disabled: false,
    maxTags: 100,
    minLength: 0,
    maxLength: 100,
    size: 'sm',
    fullWidth: false,
  },
  argTypes: {
    onChange: { action: 'onChange' },
    onAdd: { action: 'onAdd' },
    onRemove: { action: 'onRemove' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof TagsInput>;

export const Basic: Story = {
  render: (args) => <TagsInput {...args} />,
};

export const MaxTags: Story = {
  render: () => (
    <TagsInput defaultValue={['bear', 'ui']} maxTags={4} placeholder="Max 4 tags" fullWidth />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <TagsInput defaultValue={['bear']} placeholder="First tags" />
        <TagsInput defaultValue={['reuse']} placeholder="Same provider" size="sm" />
      </Flex>
    </BearProvider>
  ),
};
