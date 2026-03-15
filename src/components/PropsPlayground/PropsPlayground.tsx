import { FC, useState, useMemo, useCallback } from 'react';
import { cn } from '@utils';
import { Icon } from '../Icon/Icon';
import type { PropsPlaygroundProps, PropValues } from './PropsPlayground.types';
import { ROOT_CLASS, SIZE_CLASSES, COLUMN_CLASSES, TYPE_LABELS } from './PropsPlayground.const';
import { getDefaults } from './PropsPlayground.utils';

const ChevronDown: FC<{ size: number }> = ({ size }) => (
  <Icon size={size}><polyline points="6 9 12 15 18 9" /></Icon>
);

const ChevronRight: FC<{ size: number }> = ({ size }) => (
  <Icon size={size}><polyline points="9 18 15 12 9 6" /></Icon>
);

const SlidersIcon: FC<{ size: number }> = ({ size }) => (
  <Icon size={size}>
    <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </Icon>
);

export const PropsPlayground: FC<PropsPlaygroundProps> = ({
  config,
  render,
  title = 'Props',
  size = 'md',
  defaultCollapsed = false,
  showReset = true,
  columns = 3,
  className,
  testId,
}) => {
  const defaults = useMemo(() => getDefaults(config), [config]);
  const [values, setValues] = useState<PropValues>(defaults);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const handleChange = useCallback(
    (key: string, value: string | number | boolean) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleReset = useCallback(() => {
    setValues(defaults);
  }, [defaults]);

  const s = SIZE_CLASSES[size];
  const controlCount = Object.keys(config).length;

  const inputClass = cn(
    'bear-w-full bear-rounded-md bear-border bear-border-zinc-700',
    'bear-bg-zinc-800 bear-text-zinc-100',
    'placeholder:bear-text-zinc-500',
    'focus:bear-outline-none focus:bear-ring-2 focus:bear-ring-pink-500/30 focus:bear-border-pink-500',
    'bear-transition-colors',
    s.input
  );

  return (
    <div
      data-testid={testId}
      className={cn(
        ROOT_CLASS,
        'bear-rounded-lg bear-border bear-border-zinc-700 bear-overflow-hidden',
        className
      )}
    >
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className={cn(
          'bear-w-full bear-flex bear-items-center bear-gap-2 bear-text-left bear-font-medium bear-transition-colors',
          'bear-bg-zinc-800/60 hover:bear-bg-zinc-800',
          'bear-text-zinc-200 bear-border-b bear-border-zinc-700',
          'bear-px-4 bear-py-3',
          s.text
        )}
      >
        <span className="bear-text-pink-500">
          {collapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
        </span>
        <span className="bear-text-pink-500">
          <SlidersIcon size={14} />
        </span>
        <span className="bear-font-semibold">{title}</span>
        <span className="bear-ml-auto bear-flex bear-items-center bear-gap-2">
          <span className="bear-text-[10px] bear-font-medium bear-text-zinc-500">
            {controlCount} {controlCount === 1 ? 'control' : 'controls'}
          </span>
          {showReset && !collapsed && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleReset(); }}
              className="bear-text-[10px] bear-font-semibold bear-text-pink-500 hover:bear-text-pink-400 hover:bear-underline"
            >
              Reset
            </button>
          )}
        </span>
      </button>

      {!collapsed && (
        <div className={cn('bear-bg-zinc-900/50', s.padding)}>
          <div className={cn('bear-grid', s.gap, COLUMN_CLASSES[columns])}>
            {Object.entries(config).map(([key, spec]) => {
              const value = values[key];
              const label = key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (c) => c.toUpperCase())
                .trim();

              if (spec.type === 'boolean') {
                const checked = value === true;
                return (
                  <div
                    key={key}
                    className="bear-rounded-lg bear-border bear-border-zinc-700/60 bear-bg-zinc-800/30 bear-p-3"
                  >
                    <span className={cn('bear-block bear-font-semibold bear-uppercase bear-tracking-wider bear-text-pink-500 bear-mb-2', s.label)}>
                      {TYPE_LABELS.boolean}
                    </span>
                    <label className="bear-flex bear-items-center bear-gap-2.5 bear-cursor-pointer">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={checked}
                        onClick={() => handleChange(key, !checked)}
                        className={cn(
                          'bear-relative bear-inline-flex bear-h-5 bear-w-9 bear-flex-shrink-0 bear-rounded-full bear-border-2 bear-border-transparent bear-transition-colors',
                          checked ? 'bear-bg-pink-500' : 'bear-bg-zinc-600'
                        )}
                      >
                        <span
                          className={cn(
                            'bear-pointer-events-none bear-inline-block bear-h-4 bear-w-4 bear-transform bear-rounded-full bear-bg-white bear-shadow bear-transition',
                            checked ? 'bear-translate-x-4' : 'bear-translate-x-0'
                          )}
                        />
                      </button>
                      <span className={cn('bear-font-medium bear-text-zinc-200 bear-truncate', s.text)}>
                        {label}
                      </span>
                    </label>
                  </div>
                );
              }

              if (spec.type === 'select' && spec.options) {
                return (
                  <div
                    key={key}
                    className="bear-rounded-lg bear-border bear-border-zinc-700/60 bear-bg-zinc-800/30 bear-p-3"
                  >
                    <div className="bear-flex bear-items-center bear-justify-between bear-mb-1.5">
                      <label htmlFor={`pp-${key}`} className={cn('bear-font-medium bear-text-zinc-300 bear-truncate', s.label)}>
                        {label}
                      </label>
                      <span className={cn('bear-font-semibold bear-uppercase bear-tracking-wider bear-text-pink-500', s.label)}>
                        {TYPE_LABELS.select}
                      </span>
                    </div>
                    <select
                      id={`pp-${key}`}
                      value={String(value)}
                      onChange={(e) => {
                        const opt = spec.options!.find((o) => String(o.value) === e.target.value);
                        handleChange(key, opt ? opt.value : e.target.value);
                      }}
                      className={cn(inputClass, 'bear-cursor-pointer bear-appearance-none')}
                    >
                      {spec.options.map((opt) => (
                        <option key={String(opt.value)} value={String(opt.value)}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              if (spec.type === 'number') {
                const numVal = Number(value);
                const displayVal = Number.isNaN(numVal) ? (spec.default as number) : numVal;
                return (
                  <div
                    key={key}
                    className="bear-rounded-lg bear-border bear-border-zinc-700/60 bear-bg-zinc-800/30 bear-p-3"
                  >
                    <div className="bear-flex bear-items-center bear-justify-between bear-mb-1.5">
                      <label htmlFor={`pp-${key}`} className={cn('bear-font-medium bear-text-zinc-300 bear-truncate', s.label)}>
                        {label}
                      </label>
                      <span className={cn('bear-font-semibold bear-uppercase bear-tracking-wider bear-text-pink-500', s.label)}>
                        {TYPE_LABELS.number}
                      </span>
                    </div>
                    <input
                      id={`pp-${key}`}
                      type="number"
                      value={displayVal}
                      min={spec.min}
                      max={spec.max}
                      step={spec.step}
                      onChange={(e) => {
                        const v = e.target.valueAsNumber;
                        handleChange(key, Number.isNaN(v) ? spec.default : v);
                      }}
                      className={inputClass}
                    />
                  </div>
                );
              }

              return (
                <div
                  key={key}
                  className="bear-rounded-lg bear-border bear-border-zinc-700/60 bear-bg-zinc-800/30 bear-p-3"
                >
                  <div className="bear-flex bear-items-center bear-justify-between bear-mb-1.5">
                    <label htmlFor={`pp-${key}`} className={cn('bear-font-medium bear-text-zinc-300 bear-truncate', s.label)}>
                      {label}
                    </label>
                    <span className={cn('bear-font-semibold bear-uppercase bear-tracking-wider bear-text-pink-500', s.label)}>
                      {TYPE_LABELS.string}
                    </span>
                  </div>
                  <input
                    id={`pp-${key}`}
                    type="text"
                    value={String(value ?? '')}
                    onChange={(e) => handleChange(key, e.target.value)}
                    placeholder={spec.placeholder}
                    className={inputClass}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="bear-border-t bear-border-zinc-700 bear-p-6 bear-bg-zinc-900 bear-flex bear-items-center bear-justify-center bear-min-h-[180px]">
        <div className="bear-w-full">{render(values)}</div>
      </div>
    </div>
  );
};
