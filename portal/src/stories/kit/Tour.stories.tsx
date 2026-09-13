import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { useState } from 'react';
import { Tour, Button, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const BASIC_STEPS = [
  { target: '#tour-btn-start', title: 'Welcome', description: 'This is the first stop. Use Next to continue.', placement: 'bottom' as const },
  { target: '#tour-btn-nav', title: 'Navigation', description: 'Call out any control in the page.', placement: 'bottom' as const },
  { target: '#tour-btn-done', title: 'Done', description: 'Finish closes the tour.', placement: 'bottom' as const },
];

const SKIP_STEPS = [
  { target: '#tour-skip-a', title: 'First stop', description: 'Skip is available.', placement: 'bottom' as const },
  { target: '#tour-skip-b', title: 'Second stop', description: 'Finish when ready.', placement: 'bottom' as const },
];

const FIRST_STEPS = [
  { target: '#tour-first-a', title: 'First tour', description: 'First instance.', placement: 'bottom' as const },
  { target: '#tour-first-b', title: 'Next', description: 'Keep going.', placement: 'bottom' as const },
];

const SECOND_STEPS = [
  { target: '#tour-second-a', title: 'Reuse tour', description: 'Second instance.', placement: 'bottom' as const },
  { target: '#tour-second-b', title: 'Finish', description: 'Same provider.', placement: 'bottom' as const },
];

const meta: Meta<typeof Tour> = {
  title: 'Components/Tour',
  component: Tour,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Tour from @forgedevstack/bear. Toggle open in Controls or click Start tour. Next/Back update the current step.',
      },
    },
  },
  args: {
    steps: BASIC_STEPS,
    open: false,
    current: 0,
    showIndicators: true,
    showCloseButton: true,
    showSkipButton: true,
    showPrevButton: true,
    maskOpacity: 0.45,
    animated: true,
  },
  argTypes: {
    open: { control: 'boolean' },
    onClose: { action: 'onClose' },
    onStepChange: { action: 'onStepChange' },
    onFinish: { action: 'onFinish' },
    showIndicators: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    showSkipButton: { control: 'boolean' },
    showPrevButton: { control: 'boolean' },
    maskColor: { control: 'color' },
    animated: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Tour>;

export const Basic: Story = {
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <Flex direction="column" gap={3}>
        <Typography>Click Start tour, or turn open on in Controls.</Typography>
        <Flex gap={2} wrap="wrap">
          <Button id="tour-btn-start" onClick={() => updateArgs({ open: true, current: 0 })}>
            Start tour
          </Button>
          <Button id="tour-btn-nav" variant="outline">
            Navigation
          </Button>
          <Button id="tour-btn-done" variant="secondary">
            Finish
          </Button>
        </Flex>
        <Tour
          {...args}
          onClose={() => updateArgs({ open: false })}
          onFinish={() => updateArgs({ open: false })}
          onStepChange={(current) => updateArgs({ current })}
        />
      </Flex>
    );
  },
};

export const WithSkip: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Flex gap={2}>
          <Button id="tour-skip-a" variant="outline" onClick={() => setOpen(true)}>Start with skip</Button>
          <Button id="tour-skip-b" variant="secondary">Next target</Button>
        </Flex>
        <Tour
          steps={SKIP_STEPS}
          open={open}
          onClose={() => setOpen(false)}
          onFinish={() => setOpen(false)}
          showSkipButton
        />
      </>
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => {
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    return (
      <BearProvider>
        <Flex gap={2} wrap="wrap">
          <Button id="tour-first-a" onClick={() => setFirst(true)}>First</Button>
          <Button id="tour-first-b" variant="secondary">First next</Button>
          <Button id="tour-second-a" variant="outline" onClick={() => setSecond(true)}>Reuse</Button>
          <Button id="tour-second-b" variant="secondary">Reuse next</Button>
          <Tour steps={FIRST_STEPS} open={first} onClose={() => setFirst(false)} onFinish={() => setFirst(false)} />
          <Tour steps={SECOND_STEPS} open={second} onClose={() => setSecond(false)} onFinish={() => setSecond(false)} />
        </Flex>
      </BearProvider>
    );
  },
};
