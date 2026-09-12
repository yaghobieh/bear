import type { Meta, StoryObj } from '@storybook/react';
import { Stepper, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Stepper from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Stepper anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Stepper>;

const STEPS = [
  { label: 'Account' },
  { label: 'Details' },
  { label: 'Done' },
];

export const Basic: Story = {
  args: {
    steps: STEPS,
    activeStep: 1,
  },
};

export const Vertical: Story = {
  args: {
    steps: STEPS,
    activeStep: 0,
    orientation: 'vertical',
  },
};

export const ReuseWithProvider: Story = {
  args: {
    steps: STEPS,
    activeStep: 1,
  },
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Stepper {...args} />
        <Stepper steps={STEPS} activeStep={2} />
      </Flex>
    </BearProvider>
  ),
};
