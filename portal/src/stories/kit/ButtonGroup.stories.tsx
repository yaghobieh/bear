import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup, Button, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'ButtonGroup from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse ButtonGroup anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Basic: Story = {
  render: () => (
    <ButtonGroup>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  ),
};

export const Outline: Story = {
  render: () => (
    <ButtonGroup variant="outline">
      <Button>Left</Button>
      <Button>Right</Button>
    </ButtonGroup>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <ButtonGroup>
          <Button>First</Button>
          <Button>Group</Button>
        </ButtonGroup>
        <ButtonGroup variant="outline">
          <Button>Reused</Button>
          <Button>Group</Button>
        </ButtonGroup>
      </Flex>
    </BearProvider>
  ),
};
