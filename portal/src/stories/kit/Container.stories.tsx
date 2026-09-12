import type { Meta, StoryObj } from '@storybook/react';
import { Container, Flex, Typography, BearProvider } from '@forgedevstack/bear';

const meta: Meta<typeof Container> = {
  title: 'Components/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Container from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Container anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Container {...args}>
      <Typography>Container</Typography>
    </Container>
  ),
};

export const AnotherExample: Story = {
  render: (args) => (
    <Flex gap={3} wrap="wrap">
      <Container {...args}>
        <Typography>First</Typography>
      </Container>
      <Container>
        <Typography>Second</Typography>
      </Container>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Container anywhere below.</Typography>
        <Container {...args}>
          <Typography>First use</Typography>
        </Container>
        <Container>
          <Typography>Second use</Typography>
        </Container>
      </Flex>
    </BearProvider>
  ),
};
