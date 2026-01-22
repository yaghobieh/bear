import { defineStories } from '@forgedevstack/kiln';
import { Slider } from './Slider';

export default defineStories({
  title: 'Slider',
  component: Slider,
  description: 'Select values from a range.',
  stories: [
    {
      name: 'Default',
      component: () => <Slider defaultValue={50} />,
      code: `<Slider defaultValue={50} onChange={setValue} />`,
      description: 'Basic slider',
    },
    {
      name: 'With Range',
      component: () => <Slider min={0} max={100} defaultValue={25} />,
      code: `<Slider min={0} max={100} />`,
      description: 'Custom range',
    },
    {
      name: 'With Steps',
      component: () => <Slider step={10} marks defaultValue={30} />,
      code: `<Slider step={10} marks />`,
      description: 'Step increments with marks',
    },
    {
      name: 'Disabled',
      component: () => <Slider disabled defaultValue={40} />,
      code: `<Slider disabled />`,
      description: 'Disabled state',
    },
  ],
});

