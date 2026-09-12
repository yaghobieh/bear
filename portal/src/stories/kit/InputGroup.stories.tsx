import type { Meta, StoryObj } from '@storybook/react';
import { InputGroup, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'InputGroup from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse InputGroup anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputGroup>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <InputGroup {...args}>
      <Typography>InputGroup</Typography>
    </InputGroup>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <InputGroup {...args}>
        <Typography>First</Typography>
      </InputGroup>
      <InputGroup>
        <Typography>Second</Typography>
      </InputGroup>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse InputGroup anywhere below.</Typography>
        <InputGroup {...args}>
          <Typography>First use</Typography>
        </InputGroup>
        <InputGroup>
          <Typography>Second use</Typography>
        </InputGroup>
      </Flex>
    </BearProvider>
  ),
};
