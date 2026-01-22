import { defineStories } from '@forgedevstack/kiln';
import { TimePicker } from './TimePicker';

export default defineStories({
  title: 'TimePicker',
  component: TimePicker,
  description: 'Time selection component.',
  stories: [
    {
      name: 'Default',
      component: () => <TimePicker />,
      code: `<TimePicker />`,
      description: 'Basic time picker',
    },
    {
      name: 'With Value',
      component: () => <TimePicker value="14:30" />,
      code: `<TimePicker value="14:30" />`,
      description: 'Time picker with pre-selected time',
    },
    {
      name: '12-Hour Format',
      component: () => <TimePicker use12HourFormat />,
      code: `<TimePicker use12HourFormat />`,
      description: 'AM/PM format',
    },
    {
      name: 'With Seconds',
      component: () => <TimePicker showSeconds />,
      code: `<TimePicker showSeconds />`,
      description: 'Include seconds',
    },
    {
      name: 'Disabled',
      component: () => <TimePicker disabled />,
      code: `<TimePicker disabled />`,
      description: 'Disabled state',
    },
  ],
});

