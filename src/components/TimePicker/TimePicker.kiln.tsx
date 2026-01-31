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
      component: () => <TimePicker format="12h" />,
      code: `<TimePicker format="12h" />`,
      description: 'AM/PM format',
    },
    {
      name: 'Dial Variant',
      component: () => <TimePicker dropdownVariant="dial" />,
      code: `<TimePicker dropdownVariant="dial" />`,
      description: 'Clock face dropdown',
    },
    {
      name: 'Disabled',
      component: () => <TimePicker disabled />,
      code: `<TimePicker disabled />`,
      description: 'Disabled state',
    },
  ],
});

