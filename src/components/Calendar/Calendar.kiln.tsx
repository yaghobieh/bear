import { useState } from 'react';
import { defineStories } from '@forgedevstack/kiln';
import { Calendar } from './Calendar';

export default defineStories({
  title: 'Calendar',
  component: Calendar,
  description: 'Standalone calendar with customizable slots. Use with DatePicker or alone.',
  stories: [
    {
      name: 'Default',
      component: () => {
        const [view, setView] = useState(new Date());
        const [value, setValue] = useState<Date | null>(null);
        return (
          <div className="p-4 relative">
            <Calendar
              viewDate={view}
              onViewChange={setView}
              value={value}
              onSelect={setValue}
              onClear={() => setValue(null)}
              onToday={() => { setValue(new Date()); setView(new Date()); }}
            />
          </div>
        );
      },
      code: `<Calendar viewDate={view} onViewChange={setView} value={value} onSelect={setValue} onClear={() => setValue(null)} onToday={...} />`,
      description: 'Basic calendar',
    },
    {
      name: 'With Min/Max',
      component: () => {
        const [view, setView] = useState(new Date());
        const [value, setValue] = useState<Date | null>(null);
        return (
          <div className="p-4 relative">
            <Calendar
              viewDate={view}
              onViewChange={setView}
              value={value}
              onSelect={setValue}
              minDate={new Date()}
              maxDate={new Date(new Date().getFullYear(), 11, 31)}
              onClear={() => setValue(null)}
              onToday={() => { setValue(new Date()); setView(new Date()); }}
            />
          </div>
        );
      },
      code: `minDate={new Date()} maxDate={new Date(y, 11, 31)}`,
      description: 'Restrict selectable range',
    },
    {
      name: 'Custom Week Start (Monday)',
      component: () => {
        const [view, setView] = useState(new Date());
        const [value, setValue] = useState<Date | null>(null);
        return (
          <div className="p-4 relative">
            <Calendar
              viewDate={view}
              onViewChange={setView}
              value={value}
              onSelect={setValue}
              firstDayOfWeek={1}
              weekdayLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
              onClear={() => setValue(null)}
              onToday={() => { setValue(new Date()); setView(new Date()); }}
            />
          </div>
        );
      },
      code: `firstDayOfWeek={1} weekdayLabels={['Mon','Tue',...]} `,
      description: 'Week starts on Monday',
    },
    {
      name: 'Highlighted Dates',
      component: () => {
        const [view, setView] = useState(new Date());
        const [value, setValue] = useState<Date | null>(null);
        const highlights = [
          new Date(view.getFullYear(), view.getMonth(), 5),
          new Date(view.getFullYear(), view.getMonth(), 15),
        ];
        return (
          <div className="p-4 relative">
            <Calendar
              viewDate={view}
              onViewChange={setView}
              value={value}
              onSelect={setValue}
              highlightedDates={highlights}
              onClear={() => setValue(null)}
              onToday={() => { setValue(new Date()); setView(new Date()); }}
            />
          </div>
        );
      },
      code: `highlightedDates={[new Date(...), ...]} `,
      description: 'Highlight specific dates',
    },
  ],
});
