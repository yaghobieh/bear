import { defineStories } from '@forgedevstack/kiln';
import { Stepper } from './Stepper';

export default defineStories({
  title: 'Stepper',
  component: Stepper,
  description: 'Multi-step progress indicator.',
  stories: [
    {
      name: 'Default',
      component: () => (
        <Stepper
          activeStep={1}
          steps={[
            { label: 'Step 1' },
            { label: 'Step 2' },
            { label: 'Step 3' },
          ]}
        />
      ),
      code: `<Stepper activeStep={1} steps={[
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
]} />`,
      description: 'Horizontal stepper',
    },
    {
      name: 'Vertical',
      component: () => (
        <Stepper
          orientation="vertical"
          activeStep={1}
          steps={[
            { label: 'Account', description: 'Create your account' },
            { label: 'Details', description: 'Add personal info' },
            { label: 'Done', description: 'Complete setup' },
          ]}
        />
      ),
      code: `<Stepper orientation="vertical" steps={[...]} />`,
      description: 'Vertical orientation',
    },
    {
      name: 'Completed',
      component: () => (
        <Stepper
          activeStep={3}
          steps={[
            { label: 'Step 1', completed: true },
            { label: 'Step 2', completed: true },
            { label: 'Step 3', completed: true },
          ]}
        />
      ),
      code: `<Stepper activeStep={3} steps={[...completed]} />`,
      description: 'All steps completed',
    },
  ],
});

