import { useState } from 'react';
import { defineStories } from '@forgedevstack/kiln';
import { DatePicker } from './DatePicker';

export default defineStories({
  title: 'DatePicker',
  component: DatePicker,
  description: 'Date selection with customizable calendar. Slots allow overriding header, days, nav, footer.',
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
      description: 'Pre-selected date',
    },
    {
      name: 'Variants',
      component: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <DatePicker variant="default" placeholder="Default" />
          <DatePicker variant="filled" placeholder="Filled" />
          <DatePicker variant="outline" placeholder="Outline" />
        </div>
      ),
      code: `<DatePicker variant="default" />
<DatePicker variant="filled" />
<DatePicker variant="outline" />`,
      description: 'default | filled | outline',
    },
    {
      name: 'Sizes',
      component: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <DatePicker size="sm" placeholder="Small" />
          <DatePicker size="md" placeholder="Medium" />
          <DatePicker size="lg" placeholder="Large" />
        </div>
      ),
      code: `size="sm" | "md" | "lg"`,
      description: 'Size variants',
    },
    {
      name: 'Min/Max',
      component: () => (
        <DatePicker
          minDate={new Date()}
          maxDate={new Date(new Date().getFullYear(), 11, 31)}
          placeholder="Restricted range"
        />
      ),
      code: `minDate={new Date()} maxDate={...} `,
      description: 'Restrict selectable range',
    },
    {
      name: 'Highlighted',
      component: () => {
        const [v, setV] = useState(new Date());
        const highlights = [
          new Date(v.getFullYear(), v.getMonth(), 5),
          new Date(v.getFullYear(), v.getMonth(), 15),
        ];
        return (
          <DatePicker
            value={v}
            onChange={(d) => d && setV(d)}
            highlightedDates={highlights}
            placeholder="Highlighted dates"
          />
        );
      },
      code: `highlightedDates={[...]} `,
      description: 'Highlight specific dates',
    },
    {
      name: 'Disabled',
      component: () => <DatePicker disabled placeholder="Disabled" />,
      code: `<DatePicker disabled />`,
      description: 'Disabled state',
    },
    {
      name: 'With bis',
      component: () => (
        <DatePicker
          placeholder="Custom margin via bis"
          bis={{ marginTop: 16, padding: 4 }}
        />
      ),
      code: `bis={{ marginTop: 16, padding: 4 }}`,
      description: 'Bear Inner Style (sx-like) overrides',
    },
  ],
});
