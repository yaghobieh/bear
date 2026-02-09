import { FC, useMemo } from 'react';
import { cn } from '@utils';
import { useBear } from '../../context/BearProvider';
import { Typography } from '../Typography';
import type { DiffViewerProps } from './DiffViewer.types';
import { DIFF_COLORS, LINE_NUMBER_WIDTH } from './DiffViewer.const';
import { computeDiff, computeStats } from './DiffViewer.utils';

/**
 * DiffViewer - Compare and visualize text/code differences
 * 
 * @example
 * ```tsx
 * <DiffViewer
 *   oldValue="const x = 1;"
 *   newValue="const x = 2;"
 *   viewMode="split"
 *   showLineNumbers
 *   showStats
 * />
 * ```
 */
export const DiffViewer: FC<DiffViewerProps> = ({
  oldValue,
  newValue,
  viewMode = 'split',
  showLineNumbers = true,
  oldTitle = 'Original',
  newTitle = 'Modified',
  showStats = true,
  className,
  testId,
}) => {
  const { mode } = useBear();
  const isDark = mode === 'dark';

  const diff = useMemo(() => computeDiff(oldValue, newValue), [oldValue, newValue]);
  const stats = useMemo(() => computeStats(diff), [diff]);

  const renderLineNumber = (num?: number) => {
    if (!showLineNumbers) return null;
    return (
      <span 
        className="select-none text-gray-400 dark:text-gray-600 text-right pr-3"
        style={{ minWidth: LINE_NUMBER_WIDTH }}
      >
        {num ?? ''}
      </span>
    );
  };

  const renderLine = (content: string, type: 'add' | 'remove' | 'context') => {
    const colors = DIFF_COLORS[type];
    const prefix = type === 'add' ? '+' : type === 'remove' ? '-' : ' ';
    
    return (
      <div 
        className="flex font-mono text-sm"
        style={{ 
          backgroundColor: colors.bg,
          borderLeft: `3px solid ${colors.border}`,
        }}
      >
        <span 
          className="px-2 select-none font-bold"
          style={{ color: colors.text }}
        >
          {prefix}
        </span>
        <span className="flex-1 whitespace-pre">{content}</span>
      </div>
    );
  };

  if (viewMode === 'unified') {
    return (
      <div 
        className={cn(
          'Bear-DiffViewer',
          'rounded-lg overflow-hidden border',
          isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200',
          className
        )}
        data-testid={testId}
      >
        {/* Stats */}
        {showStats && (
          <div className="flex items-center gap-4 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <Typography variant="caption" className="text-green-600">
              +{stats.additions} additions
            </Typography>
            <Typography variant="caption" className="text-red-600">
              -{stats.deletions} deletions
            </Typography>
          </div>
        )}
        
        {/* Unified diff */}
        <div className="overflow-x-auto">
          {diff.map((line, index) => (
            <div key={index} className="flex">
              {renderLineNumber(line.oldLineNumber || line.newLineNumber)}
              <div className="flex-1">
                {renderLine(line.content, line.type)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Split view
  const oldLines = diff.filter(l => l.type !== 'add');
  const newLines = diff.filter(l => l.type !== 'remove');

  return (
    <div 
      className={cn(
        'Bear-DiffViewer',
        'rounded-lg overflow-hidden border',
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200',
        className
      )}
      data-testid={testId}
    >
      {/* Stats */}
      {showStats && (
        <div className="flex items-center gap-4 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <Typography variant="caption" className="text-green-600">
            +{stats.additions} additions
          </Typography>
          <Typography variant="caption" className="text-red-600">
            -{stats.deletions} deletions
          </Typography>
        </div>
      )}
      
      {/* Split view */}
      <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
        {/* Left (old) */}
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
                  {renderLine(line.content, line.type === 'remove' ? 'remove' : 'context')}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right (new) */}
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
                  {renderLine(line.content, line.type === 'add' ? 'add' : 'context')}
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
