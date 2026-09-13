import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { BearProvider, Flex, Stepper, StepperControls, Typography } from '@forgedevstack/bear';

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
  subcomponents: { StepperControls },
  args: {
    steps: [
      { label: 'Account' },
      { label: 'Details' },
      { label: 'Done' },
    ],
    activeStep: 1,
    showNumbers: true,
    clickable: false,
    showConnectors: true,
    connectorStyle: 'solid',
    alternativeLabel: false,
  },
  argTypes: {
    onStepClick: { action: 'onStepClick' },
    showNumbers: { control: 'boolean' },
    clickable: { control: 'boolean' },
    showConnectors: { control: 'boolean' },
    connectorStyle: { control: 'select', options: ['solid', 'dashed'] },
    alternativeLabel: { control: 'boolean' },
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
    clickable: true,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return <Stepper {...args} onStepClick={(activeStep) => updateArgs({ activeStep })} />;
  },
};

export const Vertical: Story = {
  args: {
    activeStep: 0,
    orientation: 'vertical',
    clickable: true,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return <Stepper {...args} onStepClick={(activeStep) => updateArgs({ activeStep })} />;
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
