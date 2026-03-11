import { FC } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { DescriptionsProps, DescriptionItem } from './Descriptions.types';
import {
  ROOT_CLASS,
  DEFAULT_COLUMNS,
  TITLE_CLASSES,
  TABLE_CLASSES,
  BORDERED_TABLE_CLASSES,
  UNBORDERED_TABLE_CLASSES,
  SIZE_CLASSES,
  BORDERED_LABEL_CELL_CLASSES,
  BORDERED_VALUE_CELL_CLASSES,
  UNBORDERED_LABEL_CELL_CLASSES,
  UNBORDERED_VALUE_CELL_CLASSES,
} from './Descriptions.const';

export const Descriptions: FC<DescriptionsProps> = (props) => {
  const {
    title,
    items,
    columns = DEFAULT_COLUMNS,
    bordered = false,
    size = 'md',
    layout = 'horizontal',
    labelWidth,
    className,
    testId,
    ...rest
  } = props;

  const sizeClasses = SIZE_CLASSES[size];
  const labelCellClasses = bordered ? BORDERED_LABEL_CELL_CLASSES : UNBORDERED_LABEL_CELL_CLASSES;
  const valueCellClasses = bordered ? BORDERED_VALUE_CELL_CLASSES : UNBORDERED_VALUE_CELL_CLASSES;

  const renderRow = (rowItems: DescriptionItem[], rowIndex: number) => (
    <tr key={rowIndex} className="Bear-Descriptions__row">
      {rowItems.flatMap((item, idx) => {
        const span = item.span ?? 1;
        const baseKey = rowIndex * 100 + idx;
        return [
          <td
            key={`${baseKey}-l`}
            colSpan={span}
            className={cn(
              'Bear-Descriptions__label-cell',
              sizeClasses.label,
              labelCellClasses,
              layout === 'vertical' && 'bear-align-top'
            )}
            style={labelWidth ? { width: labelWidth } : undefined}
          >
            <Typography variant="body2" weight="medium" color="secondary">
              {item.label}
            </Typography>
          </td>,
          <td
            key={`${baseKey}-v`}
            colSpan={span}
            className={cn(
              'Bear-Descriptions__value-cell',
              sizeClasses.cell,
              valueCellClasses,
              layout === 'vertical' && 'bear-align-top'
            )}
          >
            {typeof item.value === 'string' ? (
              <Typography variant="body2" className="bear-text-gray-900 dark:bear-text-zinc-100">
                {item.value}
              </Typography>
            ) : (
              item.value
            )}
          </td>,
        ];
      })}
    </tr>
  );

  const rows: DescriptionItem[][] = [];
  let currentRow: DescriptionItem[] = [];
  let currentSpan = 0;

  items.forEach((item) => {
    const span = item.span ?? 1;
    if (currentSpan + span > columns) {
      if (currentRow.length > 0) {
        rows.push(currentRow);
        currentRow = [];
        currentSpan = 0;
      }
    }
    currentRow.push(item);
    currentSpan += span;
  });
  if (currentRow.length > 0) rows.push(currentRow);

  const tableClasses = bordered ? BORDERED_TABLE_CLASSES : UNBORDERED_TABLE_CLASSES;

  return (
    <div className={cn(ROOT_CLASS, className)} data-testid={testId} {...rest}>
      {title && (
        <Typography variant="h6" className={cn(TITLE_CLASSES, 'bear-text-gray-900 dark:bear-text-zinc-100')}>
          {title}
        </Typography>
      )}
      <table className={cn(TABLE_CLASSES, tableClasses)}>
        <tbody>
          {layout === 'horizontal'
            ? rows.map((row, i) => renderRow(row, i))
            : items.map((item, i) => renderRow([item], i))}
        </tbody>
      </table>
    </div>
  );
};

export default Descriptions;
