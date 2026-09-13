import type { Meta, StoryObj } from '@storybook/react';
import { Form, Input, Button, BearProvider, Flex } from '@forgedevstack/bear';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Form from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Form anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    validateOnChange: false,
    validateOnBlur: false,
  },
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onError: { action: 'onError' },
    validateOnChange: { control: 'boolean' },
    validateOnBlur: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Basic: Story = {
  render: (args) => (
    <Form {...args} onSubmit={() => undefined} initialValues={{ email: '', name: '' }}>
      <Form.Item name="name" label="Name" rules={{ required: true }}>
        <Input placeholder="Ada Lovelace" />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={{ required: true, email: true }}>
        <Input type="email" placeholder="ada@forge.dev" />
      </Form.Item>
      <Button type="submit">Submit</Button>
    </Form>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Form layout="horizontal" onSubmit={() => undefined} initialValues={{ username: '' }}>
      <Form.Item name="username" label="Username" rules={{ required: true, minLength: { value: 3, message: 'At least 3 characters' } }}>
        <Input placeholder="forge-dev" />
      </Form.Item>
      <Button type="submit">Save</Button>
    </Form>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Form onSubmit={() => undefined} initialValues={{ email: '' }}>
          <Form.Item name="email" label="Email">
            <Input type="email" placeholder="first@forge.dev" />
          </Form.Item>
          <Button type="submit">First</Button>
        </Form>
        <Form onSubmit={() => undefined} initialValues={{ email: '' }}>
          <Form.Item name="email" label="Email">
            <Input type="email" placeholder="reuse@forge.dev" />
          </Form.Item>
          <Button type="submit">Reuse</Button>
        </Form>
      </Flex>
    </BearProvider>
  ),
};
