import { useState } from 'react';
import { Calendar } from './Calendar';

export default {
  title: 'Inputs/Calendar',
  description: 'Standalone calendar with date selection, navigation, and customizable slots.',
  stories: {
    Default: {
      render: () => {
        const [viewDate, setViewDate] = useState(new Date());
        const [value, setValue] = useState<Date | null>(null);

        return (
          <Calendar
            viewDate={viewDate}
            onViewChange={setViewDate}
            value={value}
            onSelect={setValue}
            onClear={() => setValue(null)}
            onToday={() => {
              const today = new Date();
              setValue(today);
              setViewDate(today);
            }}
            inline
          />
        );
      },
    },
    Highlighted: {
      render: () => {
        const [viewDate, setViewDate] = useState(new Date());
        const [value, setValue] = useState<Date | null>(null);
        const highlighted = [
          new Date(viewDate.getFullYear(), viewDate.getMonth(), 10),
          new Date(viewDate.getFullYear(), viewDate.getMonth(), 15),
          new Date(viewDate.getFullYear(), viewDate.getMonth(), 20),
        ];

        return (
          <Calendar
            viewDate={viewDate}
            onViewChange={setViewDate}
            value={value}
            onSelect={setValue}
            highlightedDates={highlighted}
            inline
          />
        );
      },
    },
    'Min/Max Dates': {
      render: () => {
        const [viewDate, setViewDate] = useState(new Date());
        const [value, setValue] = useState<Date | null>(null);
        const today = new Date();
        const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);

        return (
          <Calendar
            viewDate={viewDate}
            onViewChange={setViewDate}
            value={value}
            onSelect={setValue}
            minDate={today}
            maxDate={maxDate}
            inline
          />
        );
      },
    },
    'Week Starts Monday': {
      render: () => {
        const [viewDate, setViewDate] = useState(new Date());
        const [value, setValue] = useState<Date | null>(null);

        return (
          <Calendar
            viewDate={viewDate}
            onViewChange={setViewDate}
            value={value}
            onSelect={setValue}
            firstDayOfWeek={1}
            inline
          />
        );
      },
    },
    'Disabled Dates': {
      render: () => {
        const [viewDate, setViewDate] = useState(new Date());
        const [value, setValue] = useState<Date | null>(null);
        const disabled = [
          new Date(viewDate.getFullYear(), viewDate.getMonth(), 5),
          new Date(viewDate.getFullYear(), viewDate.getMonth(), 12),
          new Date(viewDate.getFullYear(), viewDate.getMonth(), 19),
        ];

        return (
          <Calendar
            viewDate={viewDate}
            onViewChange={setViewDate}
            value={value}
            onSelect={setValue}
            disabledDates={disabled}
            inline
          />
        );
      },
    },
  },
};
