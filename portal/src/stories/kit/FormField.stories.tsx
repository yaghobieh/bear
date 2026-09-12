import type { Meta, StoryObj } from '@storybook/react';
import { FormField, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'FormField from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse FormField anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormField>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <FormField {...args}>
      <Typography>FormField</Typography>
    </FormField>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <FormField {...args}>
        <Typography>First</Typography>
      </FormField>
      <FormField>
        <Typography>Second</Typography>
      </FormField>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse FormField anywhere below.</Typography>
        <FormField {...args}>
          <Typography>First use</Typography>
        </FormField>
        <FormField>
          <Typography>Second use</Typography>
        </FormField>
      </Flex>
    </BearProvider>
  ),
};
