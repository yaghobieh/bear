import { FC, useMemo, useState, useCallback } from 'react';
import { cn } from '@utils';
import { useBear } from '../../context/BearProvider';
import { Typography } from '../Typography';
import type { DiffViewerProps, DiffLineType } from './DiffViewer.types';
import {
  DIFF_COLORS,
  LINE_NUMBER_WIDTH,
  LINE_SPACING,
  LINE_HOVER_LABELS,
  DEFAULT_OLD_TITLE,
  DEFAULT_NEW_TITLE,
  DEFAULT_SPACING,
} from './DiffViewer.const';
import { computeDiff, computeStats } from './DiffViewer.utils';

export const DiffViewer: FC<DiffViewerProps> = ({
  oldValue,
  newValue,
  viewMode = 'split',
  showLineNumbers = true,
  oldTitle = DEFAULT_OLD_TITLE,
  newTitle = DEFAULT_NEW_TITLE,
  showStats = true,
  spacing = DEFAULT_SPACING,
  showLineHoverInfo = false,
  className,
  testId,
}) => {
  const { mode } = useBear();
  const isDark = mode === 'dark';
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  const diff = useMemo(() => computeDiff(oldValue, newValue), [oldValue, newValue]);
  const stats = useMemo(() => computeStats(diff), [diff]);

  const spacingClass = LINE_SPACING[spacing];

  const handleLineEnter = useCallback((index: number) => {
    if (showLineHoverInfo) setHoveredLine(index);
  }, [showLineHoverInfo]);

  const handleLineLeave = useCallback(() => {
    setHoveredLine(null);
  }, []);

  const renderLineNumber = (num?: number) => {
    if (!showLineNumbers) return null;
    return (
      <span
        className={cn('select-none text-gray-400 dark:text-gray-600 text-right pr-3', spacingClass)}
        style={{ minWidth: LINE_NUMBER_WIDTH }}
      >
        {num ?? ''}
      </span>
    );
  };

  const renderLine = (content: string, type: DiffLineType, lineIndex?: number) => {
    const colors = DIFF_COLORS[type];
    const prefix = type === 'add' ? '+' : type === 'remove' ? '-' : ' ';
    const isHovered = lineIndex != null && hoveredLine === lineIndex;

    return (
      <div
        className={cn('flex font-mono text-sm relative group', spacingClass)}
        style={{
          backgroundColor: colors.bg,
          borderLeft: `3px solid ${colors.border}`,
        }}
        onMouseEnter={() => lineIndex != null && handleLineEnter(lineIndex)}
        onMouseLeave={handleLineLeave}
      >
        <span
          className="px-2 select-none font-bold"
          style={{ color: colors.text }}
        >
          {prefix}
        </span>
        <span className="flex-1 whitespace-pre">{content}</span>
        {showLineHoverInfo && isHovered && type !== 'context' && (
          <span
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-0.5 rounded',
              type === 'add' ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-red-500/20 text-red-600 dark:text-red-400'
            )}
          >
            {LINE_HOVER_LABELS[type]}
          </span>
        )}
      </div>
    );
  };

  const renderStatsBar = () => {
    if (!showStats) return null;
    return (
      <div className="flex items-center gap-4 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <Typography variant="caption" className="text-green-600">
          +{stats.additions} additions
        </Typography>
        <Typography variant="caption" className="text-red-600">
          -{stats.deletions} deletions
        </Typography>
        <Typography variant="caption" className="text-gray-500">
          {stats.unchanged} unchanged
        </Typography>
      </div>
    );
  };

  const containerClass = cn(
    'Bear-DiffViewer',
    'rounded-lg overflow-hidden border',
    isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200',
    className
  );

  if (viewMode === 'unified') {
    return (
      <div className={containerClass} data-testid={testId}>
        {renderStatsBar()}
        <div className="overflow-x-auto">
          {diff.map((line, index) => (
            <div key={index} className="flex">
              {renderLineNumber(line.oldLineNumber || line.newLineNumber)}
              <div className="flex-1">
                {renderLine(line.content, line.type, index)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const oldLines = diff.filter(l => l.type !== 'add');
  const newLines = diff.filter(l => l.type !== 'remove');

  return (
    <div className={containerClass} data-testid={testId}>
      {renderStatsBar()}
      <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
        <div>
          <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <Typography variant="caption" className="font-semibold">
              {oldTitle}
            </Typography>
          </div>
          <div className="overflow-x-auto">
            {oldLines.map((line, index) => (
              <div key={index} className="flex">
                {renderLineNumber(line.oldLineNumber)}
                <div className="flex-1">
                  {renderLine(line.content, line.type === 'remove' ? 'remove' : 'context', index)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <Typography variant="caption" className="font-semibold">
              {newTitle}
            </Typography>
          </div>
          <div className="overflow-x-auto">
            {newLines.map((line, index) => (
              <div key={index} className="flex">
                {renderLineNumber(line.newLineNumber)}
                <div className="flex-1">
                  {renderLine(line.content, line.type === 'add' ? 'add' : 'context', index)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiffViewer;
