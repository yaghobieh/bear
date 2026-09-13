import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, Stepper, StepperControls, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof StepperControls> = {
  title: 'Components/Stepper/StepperControls',
  component: StepperControls,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'StepperControls from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    activeStep: 1,
    totalSteps: 1,
    disablePrev: false,
    disableNext: false,
    showIndicator: true,
  },
  argTypes: {
    onPrev: { action: 'onPrev' },
    onNext: { action: 'onNext' },
    onComplete: { action: 'onComplete' },
    disablePrev: { control: 'boolean' },
    disableNext: { control: 'boolean' },
    showIndicator: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof StepperControls>;

export const Basic: Story = {
  render: (args) => <StepperControls {...args} />,
};
