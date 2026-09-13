import type { Meta, StoryObj } from '@storybook/react';
import { Form, Input, Button } from '@forgedevstack/bear';

const meta: Meta<typeof Form.Item> = {
  title: 'Components/Form/Item',
  component: Form.Item,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Form.Item from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    name: 'email',
    label: 'Email',
    required: true,
    helperText: 'Work email',
  },
  argTypes: {
    required: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Form.Item>;

export const Basic: Story = {
  render: (args) => (
    <Form onSubmit={() => undefined}>
      <Form.Item {...args} name={args.name ?? 'email'}>
        <Input />
      </Form.Item>
      <Button type="submit">Submit</Button>
    </Form>
  ),
};
