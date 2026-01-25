import { FC, useCallback, useMemo } from 'react';
import type { CalendarProps, CalendarDayProps, CalendarNavActions } from './Calendar.types';
import { cn } from '../../utils/cn';
import { useBearStyles } from '../../hooks/useBearStyles';

const DEFAULT_WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
const getFirstDay = (y: number, m: number) => new Date(y, m, 1).getDay();

const isSameDay = (a: Date | null, b: Date | null): boolean => {
  if (!a || !b) return false;
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
};

/** Build 6-week grid: prev month trailing, current month, next month leading (react-calendar style) */
function buildCalendarGrid(year: number, month: number, firstDayOfWeek: number): { date: Date; isCurrentMonth: boolean }[] {
  const first = getFirstDay(year, month);
  let startOffset = (first - firstDayOfWeek + 7) % 7;
  const daysInMonth = getDaysInMonth(year, month);
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrev = getDaysInMonth(prevYear, prevMonth);

  const cells: { date: Date; isCurrentMonth: boolean }[] = [];
  const totalCells = 42;

  for (let i = 0; i < totalCells; i++) {
    if (i < startOffset) {
      const d = daysInPrev - startOffset + i + 1;
      cells.push({ date: new Date(prevYear, prevMonth, d), isCurrentMonth: false });
    } else if (i < startOffset + daysInMonth) {
      const d = i - startOffset + 1;
      cells.push({ date: new Date(year, month, d), isCurrentMonth: true });
    } else {
      const d = i - startOffset - daysInMonth + 1;
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      cells.push({ date: new Date(nextYear, nextMonth, d), isCurrentMonth: false });
    }
  }
  return cells;
}

export const Calendar: FC<CalendarProps> = ({
  viewDate,
  value = null,
  onSelect,
  onViewChange,
  minDate,
  maxDate,
  disabledDates = [],
  highlightedDates = [],
  weekdayLabels = DEFAULT_WEEKDAYS,
  firstDayOfWeek = 0,
  showWeekNumbers: _showWeekNumbers = false,
  slots = {},
  clearable = true,
  onClear,
  showTodayButton = true,
  onToday,
  bis,
  style,
  inline = false,
  className,
}) => {
  const year = viewDate.getFullYear();
  const mergedStyle = useBearStyles(bis, style);
  const month = viewDate.getMonth();
  const today = useMemo(() => new Date(), []);

  const handlePrevYear = useCallback(() => {
    onViewChange?.(new Date(year - 1, month, 1));
  }, [year, month, onViewChange]);

  const handlePrevMonth = useCallback(() => {
    onViewChange?.(new Date(year, month - 1, 1));
  }, [year, month, onViewChange]);

  const handleNextMonth = useCallback(() => {
    onViewChange?.(new Date(year, month + 1, 1));
  }, [year, month, onViewChange]);

  const handleNextYear = useCallback(() => {
    onViewChange?.(new Date(year + 1, month, 1));
  }, [year, month, onViewChange]);

  const handlePrev = handlePrevMonth;
  const handleNext = handleNextMonth;

  const nav: CalendarNavActions = {
    onPrevYear: handlePrevYear,
    onPrevMonth: handlePrevMonth,
    onNextMonth: handleNextMonth,
    onNextYear: handleNextYear,
  };

  const isDateDisabled = useCallback(
    (d: Date): boolean => {
      if (minDate && d < minDate) return true;
      if (maxDate && d > maxDate) return true;
      return disabledDates.some((x) => isSameDay(x, d));
    },
    [minDate, maxDate, disabledDates]
  );

  const isHighlighted = useCallback(
    (d: Date): boolean => highlightedDates.some((x) => isSameDay(x, d)),
    [highlightedDates]
  );

  const grid = useMemo(
    () => buildCalendarGrid(year, month, firstDayOfWeek),
    [year, month, firstDayOfWeek]
  );

  const weekdays = useMemo(
    () => (firstDayOfWeek > 0 ? [...weekdayLabels.slice(firstDayOfWeek), ...weekdayLabels.slice(0, firstDayOfWeek)] : weekdayLabels),
    [weekdayLabels, firstDayOfWeek]
  );

  const monthLabel = MONTHS[month];
  const hasSelection = value != null;

  const rootClassName = inline
    ? 'bear-block bear-w-full bear-bg-white bear-rounded-xl bear-shadow-none bear-border bear-border-zinc-200 bear-p-4 bear-text-zinc-900'
    : 'bear-absolute bear-z-50 bear-mt-2 bear-bg-white bear-rounded-xl bear-shadow-xl bear-border bear-border-zinc-200 bear-p-4 bear-w-80 bear-text-zinc-900';

  const renderHeader = () => {
    if (slots.header) {
      return slots.header({ month: monthLabel, year, onPrev: handlePrev, onNext: handleNext, nav });
    }
    const NavPrevY = slots.navPrevYear;
    const NavPrev = slots.navPrev;
    const NavNext = slots.navNext;
    const NavNextY = slots.navNextYear;
    const Label = slots.headerLabel;
    return (
      <div className="bear-flex bear-items-center bear-justify-between bear-gap-1 bear-mb-4">
        <div className="bear-flex bear-items-center bear-gap-0.5">
          {NavPrevY ? (
            NavPrevY({ onClick: handlePrevYear })
          ) : (
            <button
              type="button"
              onClick={handlePrevYear}
              className="bear-p-1.5 bear-rounded bear-text-zinc-500 hover:bear-bg-zinc-100 bear-dark:hover:bear-bg-zinc-800 bear-transition-colors bear-font-medium"
              aria-label="Previous year"
            >
              ‹‹
            </button>
          )}
          {NavPrev ? (
            NavPrev({ onClick: handlePrev })
          ) : (
            <button
              type="button"
              onClick={handlePrev}
              className="bear-p-1.5 bear-rounded bear-text-zinc-500 hover:bear-bg-zinc-100 bear-dark:hover:bear-bg-zinc-800 bear-transition-colors"
              aria-label="Previous month"
            >
              ‹
            </button>
          )}
        </div>
        {Label ? (
          Label({ month: monthLabel, year })
        ) : (
          <span className="bear-font-semibold bear-text-sm bear-select-none">
            {monthLabel} {year}
          </span>
        )}
        <div className="bear-flex bear-items-center bear-gap-0.5">
          {NavNext ? (
            NavNext({ onClick: handleNext })
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="bear-p-1.5 bear-rounded bear-text-zinc-500 hover:bear-bg-zinc-100 bear-dark:hover:bear-bg-zinc-800 bear-transition-colors"
              aria-label="Next month"
            >
              ›
            </button>
          )}
          {NavNextY ? (
            NavNextY({ onClick: handleNextYear })
          ) : (
            <button
              type="button"
              onClick={handleNextYear}
              className="bear-p-1.5 bear-rounded bear-text-zinc-500 hover:bear-bg-zinc-100 bear-dark:hover:bear-bg-zinc-800 bear-transition-colors bear-font-medium"
              aria-label="Next year"
            >
              ››
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderWeekdays = () => {
    if (slots.weekdays) return slots.weekdays({ days: weekdays });
    const Weekday = slots.weekday;
    return (
      <div className="bear-grid bear-grid-cols-7 bear-gap-1 bear-mb-2">
        {weekdays.map((label) =>
          Weekday ? (
            <div key={label}>{Weekday({ label })}</div>
          ) : (
            <div
              key={label}
              className={cn(
                'bear-text-center bear-text-xs bear-font-medium bear-uppercase',
                (label === 'SUN' || label === 'SAT' || label === 'Sun' || label === 'Sat') && 'bear-text-red-500'
              )}
            >
              {label}
            </div>
          )
        )}
      </div>
    );
  };

  const renderDay = (cell: { date: Date; isCurrentMonth: boolean }, index: number) => {
    const { date, isCurrentMonth } = cell;
    const day = date.getDate();
    const weekday = date.getDay();
    const isWeekend = weekday === 0 || weekday === 6;
    const selected = isSameDay(value, date);
    const isToday = isSameDay(today, date);
    const disabled = isDateDisabled(date);
    const highlighted = isHighlighted(date);

    const handleClick = () => {
      if (disabled) return;
      onSelect?.(date);
    };

    const dayProps: CalendarDayProps & { onClick: () => void } = {
      date,
      day,
      isCurrentMonth,
      isSelected: selected,
      isToday,
      isDisabled: disabled,
      isHighlighted: highlighted,
      onClick: handleClick,
    };

    if (slots.day) return <span key={index}>{slots.day(dayProps)}</span>;

    return (
      <button
        key={index}
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          'bear-w-8 bear-h-8 bear-rounded-full bear-text-sm bear-font-medium bear-transition-colors bear-flex bear-items-center bear-justify-center',
          selected && 'bear-bg-bear-500 bear-text-white hover:bear-bg-bear-600',
          !selected && isToday && 'bear-ring-2 bear-ring-bear-500/50 bear-bg-transparent',
          !selected &&
            !isToday &&
            (isCurrentMonth
              ? isWeekend
                ? 'bear-text-red-500 hover:bear-bg-zinc-100'
                : 'bear-text-zinc-700 hover:bear-bg-zinc-100'
              : 'bear-text-zinc-400 hover:bear-bg-zinc-50'),
          highlighted && !selected && 'bear-bg-bear-500/15',
          disabled && 'bear-opacity-40 bear-cursor-not-allowed'
        )}
      >
        {day}
      </button>
    );
  };

  const renderDays = () => {
    const cells = grid.map((cell, i) => renderDay(cell, i));
    if (slots.daysGrid) return slots.daysGrid({ children: cells, className: 'bear-grid bear-grid-cols-7 bear-gap-1' });
    return <div className="bear-grid bear-grid-cols-7 bear-gap-1">{cells}</div>;
  };

  const renderFooter = () => {
    const showClear = clearable && hasSelection && onClear;
    const showToday = showTodayButton && onToday;
    if (!showClear && !showToday) return null;

    if (slots.footer) {
      const Clear = slots.clearButton;
      const Today = slots.todayButton;
      return slots.footer({
        children: (
          <div className="bear-flex bear-justify-between bear-gap-2 bear-mt-4 bear-pt-3 bear-border-t bear-border-zinc-200">
            {showClear && Clear ? Clear({ onClick: onClear!, hasSelection }) : showClear ? (
              <button type="button" onClick={onClear} className="bear-text-sm bear-text-zinc-500 hover:bear-text-zinc-700">
                Clear
              </button>
            ) : <span />}
            {showToday && Today ? Today({ onClick: onToday }) : showToday ? (
              <button type="button" onClick={onToday} className="bear-text-sm bear-text-bear-600 hover:bear-text-bear-700 bear-font-medium">
                Today
              </button>
            ) : null}
          </div>
        ),
      });
    }
    if (slots.clearButton && slots.todayButton) {
      return (
        <div className="bear-flex bear-justify-between bear-gap-2 bear-mt-4 bear-pt-3 bear-border-t bear-border-zinc-200">
          {showClear && slots.clearButton({ onClick: onClear!, hasSelection })}
          {showToday && slots.todayButton({ onClick: onToday! })}
        </div>
      );
    }
    return (
      <div className="bear-flex bear-justify-between bear-gap-2 bear-mt-4 bear-pt-3 bear-border-t bear-border-zinc-200">
        {showClear ? (
          <button type="button" onClick={onClear} className="bear-text-sm bear-text-zinc-500 hover:bear-text-zinc-700 bear-transition-colors">
            Clear
          </button>
        ) : (
          <span />
        )}
        {showToday ? (
          <button type="button" onClick={onToday} className="bear-text-sm bear-text-bear-600 hover:bear-text-bear-700 bear-font-medium bear-transition-colors">
            Today
          </button>
        ) : null}
      </div>
    );
  };

  const content = (
    <>
      {renderHeader()}
      {renderWeekdays()}
      {renderDays()}
      {renderFooter()}
    </>
  );

  const rootCn = cn(rootClassName, className);
  const rootStyle = Object.keys(mergedStyle).length ? mergedStyle : undefined;
  const root = slots.root ? slots.root({ children: content, className: rootCn }) : <div className={rootCn} style={rootStyle}>{content}</div>;
  return root;
};
