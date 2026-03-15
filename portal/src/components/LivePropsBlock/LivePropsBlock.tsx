import { FC, ReactNode, useState, useMemo } from 'react';
import { PropsControls } from '../PropsControls';
import { BearIcons } from '@forgedevstack/bear';
import type { EditablePropsConfig, LiveProps } from '../PropsControls/PropsControls.types';

export interface LivePropsBlockProps {
  config: EditablePropsConfig;
  values: LiveProps;
  onChange: (values: LiveProps) => void;
  /** When provided, shows a "Reset to defaults" button in the header */
  onReset?: () => void;
  children?: ReactNode;
  defaultCollapsed?: boolean;
}

export const LivePropsBlock: FC<LivePropsBlockProps> = ({
  config,
  values,
  onChange,
  onReset,
  children,
  defaultCollapsed = false,
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const spec of Object.values(config)) {
      counts[spec.type] = (counts[spec.type] ?? 0) + 1;
    }
    return counts;
  }, [config]);

  return (
    <div className="rounded-lg border border-pink-200 dark:border-pink-800/40 overflow-hidden shadow-sm">
      {/* Header */}
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="w-full flex items-center gap-2.5 px-4 py-3 text-left text-sm font-medium transition-colors
          bg-pink-50/80 dark:bg-pink-950/20
          hover:bg-pink-100/80 dark:hover:bg-pink-950/30
          text-gray-800 dark:text-gray-200
          border-b border-pink-200 dark:border-pink-800/40"
      >
        <span className="text-pink-500 dark:text-pink-400">
          {collapsed
            ? <BearIcons.ChevronRightIcon size={12} />
            : <BearIcons.ChevronDownIcon size={12} />
          }
        </span>
        <span className="text-pink-500 dark:text-pink-400">
          <BearIcons.TuneIcon size={14} />
        </span>
        <span className="font-semibold">Edit props</span>

        {/* Type count badges + Reset */}
        <span className="ml-auto flex items-center gap-2">
          {Object.entries(typeCounts).map(([type, count]) => (
            <span
              key={type}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400"
            >
              {count} {type}
            </span>
          ))}
          {onReset && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onReset(); }}
              className="text-[10px] font-semibold text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 hover:underline"
            >
              Reset
            </button>
          )}
        </span>
      </button>

      {/* Controls */}
      {!collapsed && (
        <div className="p-4 pt-3 bg-gray-50/50 dark:bg-gray-800/30">
          <PropsControls config={config} values={values} onChange={onChange} />
        </div>
      )}

      {/* Preview slot */}
      {children && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-900 flex items-center justify-center min-h-[180px]">
          {children}
        </div>
      )}
    </div>
  );
};

export default LivePropsBlock;
