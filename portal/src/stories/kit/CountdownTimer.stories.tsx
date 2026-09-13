import type { Meta, StoryObj } from '@storybook/react';
import { CountdownTimer, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const TARGET = new Date('2027-01-01T00:00:00');

const meta: Meta<typeof CountdownTimer> = {
  title: 'Components/CountdownTimer',
  component: CountdownTimer,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'CountdownTimer from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse CountdownTimer anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  args: {
    targetDate: new Date('2026-09-12'),
    duration: 0,
    showDays: true,
    showHours: true,
    showMinutes: true,
    showSeconds: true,
    showLabels: true,
    showSeparator: true,
    paused: false,
    narrowLayout: false,
  },
  argTypes: {
    showDays: { control: 'boolean' },
    showHours: { control: 'boolean' },
    showMinutes: { control: 'boolean' },
    showSeconds: { control: 'boolean' },
    showLabels: { control: 'boolean' },
    showSeparator: { control: 'boolean' },
    onComplete: { action: 'onComplete' },
    onTick: { action: 'onTick' },
    paused: { control: 'boolean' },
    narrowLayout: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof CountdownTimer>;

export const Basic: Story = {
  render: (args) => <CountdownTimer {...args} />,
};

export const CardVariant: Story = {
  render: () => <CountdownTimer targetDate={TARGET} variant="card" size="lg" />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse CountdownTimer anywhere below.</Typography>
        <CountdownTimer targetDate={TARGET} />
        <CountdownTimer duration={90} variant="minimal" showDays={false} showHours={false} />
      </Flex>
    </BearProvider>
  ),
};
