import { useState } from 'react';
import { defineStories } from '@forgedevstack/kiln';
import { DateTimePicker } from './DateTimePicker';
import { TimePicker } from '../TimePicker';

export default defineStories({
  title: 'DateTimePicker',
  component: DateTimePicker,
  description: 'Date + time picker using Calendar for date and time controls. Uses the same Calendar as DatePicker.',
  stories: [
    {
      name: 'Default',
      component: () => {
        const [value, setValue] = useState<Date | null>(null);
        return (
          <div className="relative w-full max-w-xs">
            <DateTimePicker value={value} onChange={setValue} />
          </div>
        );
      },
      code: `<DateTimePicker value={value} onChange={setValue} />`,
      description: 'Date and time selection using Calendar',
    },
    {
      name: 'With Value',
      component: () => {
        const [value, setValue] = useState<Date | null>(new Date());
        return (
          <div className="relative w-full max-w-xs">
            <DateTimePicker value={value} onChange={setValue} />
          </div>
        );
      },
      code: `<DateTimePicker value={new Date()} onChange={setValue} />`,
      description: 'Pre-selected date and time',
    },
    {
      name: 'TimePicker mode="datetime" (uses Calendar)',
      component: () => {
        const [value, setValue] = useState<Date | null>(null);
        return (
          <div className="relative w-full max-w-xs">
            <TimePicker mode="datetime" value={value} onChange={setValue} placeholder="Select date and time" />
          </div>
        );
      },
      code: `<TimePicker mode="datetime" value={value} onChange={setValue} />`,
      description: 'TimePicker with mode="datetime" uses Calendar + time (same as DateTimePicker)',
    },
  ],
});
