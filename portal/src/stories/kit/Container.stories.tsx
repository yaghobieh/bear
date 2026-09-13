import type { Meta, StoryObj } from '@storybook/react';
import { Container, BearProvider, Flex, Typography } from '@forgedevstack/bear';

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
  args: {
    centered: false,
    padding: false,
  },
  argTypes: {
    centered: { control: 'boolean' },
    padding: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Basic: Story = {
  render: (args) => <Container {...args} />,
};

export const Wide: Story = {
  render: () => (
    <Container size="xl" centered padding>
      <Typography>Wide container for denser pages.</Typography>
    </Container>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Container size="sm" centered>
          <Typography>First use</Typography>
        </Container>
        <Container size="sm" centered>
          <Typography>Reuse</Typography>
        </Container>
      </Flex>
    </BearProvider>
  ),
};
