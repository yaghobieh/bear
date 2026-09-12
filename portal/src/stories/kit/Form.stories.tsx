import type { Meta, StoryObj } from '@storybook/react';
import { Form, Flex, Typography, BearProvider } from '@forgedevstack/bear';

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
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Form {...args}>
      <Typography>Form</Typography>
    </Form>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Form {...args}>
        <Typography>First</Typography>
      </Form>
      <Form>
        <Typography>Second</Typography>
      </Form>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Form anywhere below.</Typography>
        <Form {...args}>
          <Typography>First use</Typography>
        </Form>
        <Form>
          <Typography>Second use</Typography>
        </Form>
      </Flex>
    </BearProvider>
  ),
};
