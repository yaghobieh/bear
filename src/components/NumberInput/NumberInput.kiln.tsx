import { defineStories } from '@forgedevstack/kiln';
import { NumberInput } from './NumberInput';

export default defineStories({
  title: 'NumberInput',
  component: NumberInput,
  description: 'Numeric input with stepper controls.',
  stories: [
    {
      name: 'Default',
      component: () => <NumberInput value={5} />,
      code: `<NumberInput value={5} onChange={setValue} />`,
      description: 'Basic number input',
    },
    {
      name: 'With Range',
      component: () => <NumberInput min={0} max={10} value={5} />,
      code: `<NumberInput min={0} max={10} />`,
      description: 'Limited range',
    },
    {
      name: 'Custom Step',
      component: () => <NumberInput step={5} value={10} />,
      code: `<NumberInput step={5} />`,
      description: 'Step by 5',
    },
    {
      name: 'Disabled',
      component: () => <NumberInput disabled value={3} />,
      code: `<NumberInput disabled />`,
      description: 'Disabled state',
    },
  ],
});

