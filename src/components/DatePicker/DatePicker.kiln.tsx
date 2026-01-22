import { defineStories } from '@forgedevstack/kiln';
import { DatePicker } from './DatePicker';

export default defineStories({
  title: 'DatePicker',
  component: DatePicker,
  description: 'Date selection component with calendar interface.',
  stories: [
    {
      name: 'Default',
      component: () => <DatePicker />,
      code: `<DatePicker />`,
      description: 'Basic date picker',
    },
    {
      name: 'With Value',
      component: () => <DatePicker value={new Date()} />,
      code: `<DatePicker value={new Date()} />`,
      description: 'Date picker with pre-selected date',
    },
    {
      name: 'Variants',
      component: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <DatePicker variant="outlined" />
          <DatePicker variant="filled" />
          <DatePicker variant="standard" />
        </div>
      ),
      code: `<DatePicker variant="outlined" />
<DatePicker variant="filled" />
<DatePicker variant="standard" />`,
      description: 'Different visual styles',
    },
    {
      name: 'Disabled',
      component: () => <DatePicker disabled />,
      code: `<DatePicker disabled />`,
      description: 'Disabled state',
    },
  ],
});

