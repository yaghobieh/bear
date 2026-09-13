import type { Meta, StoryObj } from '@storybook/react';
import { FormControl, Input, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof FormControl> = {
  title: 'Components/FormControl',
  component: FormControl,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'FormControl from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse FormControl anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    label: 'Label',
    error: false,
    disabled: false,
    required: false,
    fullWidth: false,
  },
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof FormControl>;

export const Basic: Story = {
  render: (args) => <FormControl {...args} />,
};

export const WithError: Story = {
  render: () => (
    <FormControl label="Password" error helperText="Password is required">
      <Input type="password" />
    </FormControl>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <FormControl label="First" helperText="Below the provider">
          <Input placeholder="First field" />
        </FormControl>
        <FormControl label="Reuse">
          <Input placeholder="Second field" />
        </FormControl>
      </Flex>
    </BearProvider>
  ),
};
