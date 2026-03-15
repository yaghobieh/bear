import { FC, useCallback } from 'react';
import type { EditablePropsConfig, LiveProps } from './PropsControls.types';

const TYPE_LABELS: Record<string, string> = {
  boolean: '◉ bool',
  select: '▾ select',
  number: '# num',
  string: 'Aa str',
};

const CARD_CLASS =
  'rounded-lg border border-pink-200 dark:border-pink-800/40 bg-pink-50/30 dark:bg-pink-950/10 p-3 transition-all focus-within:ring-2 focus-within:ring-pink-500/20';

const INPUT_BASE =
  'w-full px-2.5 py-1.5 text-xs rounded-md border border-pink-200 dark:border-pink-700/50 bg-white dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500 transition-colors';

interface PropsControlsProps {
  config: EditablePropsConfig;
  values: LiveProps;
  onChange: (values: LiveProps) => void;
}

export const PropsControls: FC<PropsControlsProps> = ({
  config,
  values,
  onChange,
}) => {
  const handleChange = useCallback(
    (key: string, value: string | number | boolean) => {
      onChange({ ...values, [key]: value });
    },
    [values, onChange]
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {Object.entries(config).map(([key, spec]) => {
        const value = values[key];
        const label = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (s) => s.toUpperCase())
          .trim();

        if (spec.type === 'boolean') {
          const checked = value === true;
          return (
            <div key={key} className={CARD_CLASS}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-pink-500 dark:text-pink-400">
                  {TYPE_LABELS.boolean}
                </span>
              </div>
              <label className="flex items-center gap-2.5 cursor-pointer" title={key}>
                <button
                  type="button"
                  role="switch"
                  aria-checked={checked}
                  onClick={() => handleChange(key, !checked)}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-pink-500/40 ${
                    checked
                      ? 'bg-pink-500 dark:bg-pink-600'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      checked ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">
                  {label}
                </span>
              </label>
            </div>
          );
        }

        if (spec.type === 'select' && spec.options) {
          return (
            <div key={key} className={CARD_CLASS}>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor={`prop-${key}`} className="text-[11px] font-medium text-gray-600 dark:text-gray-300 truncate">
                  {label}
                </label>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-pink-500 dark:text-pink-400">
                  {TYPE_LABELS.select}
                </span>
              </div>
              <select
                id={`prop-${key}`}
                value={String(value)}
                onChange={(e) => {
                  const opt = spec.options!.find(
                    (o) => String(o.value) === e.target.value
                  );
                  handleChange(key, opt ? opt.value : e.target.value);
                }}
                className={`${INPUT_BASE} cursor-pointer appearance-none bg-[length:12px] bg-[right_0.35rem_center] bg-no-repeat pr-7`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ec4899' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                }}
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
          const displayVal = Number.isNaN(numVal)
            ? (spec.default as number)
            : numVal;
          return (
            <div key={key} className={CARD_CLASS}>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor={`prop-${key}`} className="text-[11px] font-medium text-gray-600 dark:text-gray-300 truncate">
                  {label}
                </label>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-pink-500 dark:text-pink-400">
                  {TYPE_LABELS.number}
                </span>
              </div>
              <input
                id={`prop-${key}`}
                type="number"
                value={displayVal}
                min={spec.min}
                max={spec.max}
                onChange={(e) => {
                  const v = e.target.valueAsNumber;
                  handleChange(key, Number.isNaN(v) ? spec.default : v);
                }}
                className={INPUT_BASE}
              />
            </div>
          );
        }

        return (
          <div key={key} className={CARD_CLASS}>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor={`prop-${key}`} className="text-[11px] font-medium text-gray-600 dark:text-gray-300 truncate">
                {label}
              </label>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-pink-500 dark:text-pink-400">
                {TYPE_LABELS.string}
              </span>
            </div>
            <input
              id={`prop-${key}`}
              type="text"
              value={String(value ?? '')}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={spec.placeholder}
              className={INPUT_BASE}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PropsControls;
