import { FC, useMemo } from 'react';
import { cn } from '@utils';
import type { TagCloudProps } from './TagCloud.types';
import { DEFAULT_MIN_FONT, DEFAULT_MAX_FONT, DEFAULT_COLORS, CIRCLE_RADIUS_RATIO, FULL_CIRCLE_DEG } from './TagCloud.const';

export const TagCloud: FC<TagCloudProps> = ({
  tags,
  minFontSize = DEFAULT_MIN_FONT,
  maxFontSize = DEFAULT_MAX_FONT,
  colors = DEFAULT_COLORS,
  layout = 'flow',
  mobileCompact = false,
  onTagClick,
  testId,
  className,
  ...rest
}) => {
  const { minVal, maxVal } = useMemo(() => {
    let min = Infinity, max = -Infinity;
    for (const t of tags) {
      if (t.value < min) min = t.value;
      if (t.value > max) max = t.value;
    }
    return { minVal: min, maxVal: max };
  }, [tags]);

  const getFontSize = (value: number): number => {
    if (maxVal === minVal) return (minFontSize + maxFontSize) / 2;
    return minFontSize + ((value - minVal) / (maxVal - minVal)) * (maxFontSize - minFontSize);
  };

  const getOpacity = (value: number): number =>
    0.5 + ((value - minVal) / (maxVal - minVal || 1)) * 0.5;

  const isCircle = layout === 'circle';

  const renderTag = (tag: typeof tags[0], i: number, style?: React.CSSProperties) => {
    const fontSize = getFontSize(tag.value);
    const color = tag.color ?? colors[i % colors.length];
    const opacity = getOpacity(tag.value);
    const Tag = tag.href ? 'a' : 'span';
    return (
      <Tag
        key={`${tag.text}-${i}`}
        className={cn(
          'Bear-TagCloud__tag inline-block transition-all duration-200 hover:scale-110 hover:opacity-100',
          (onTagClick || tag.href) && 'cursor-pointer'
        )}
        style={{ fontSize, color, opacity, lineHeight: 1.2, ...style }}
        onClick={() => onTagClick?.(tag)}
        {...(tag.href ? { href: tag.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {tag.text}
      </Tag>
    );
  };

  if (isCircle) {
    const angleStep = FULL_CIRCLE_DEG / tags.length;
    return (
      <div
        className={cn('Bear-TagCloud Bear-TagCloud--circle relative', className)}
        style={{ width: '100%', paddingBottom: '100%' }}
        data-testid={testId}
        {...rest}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {tags.map((tag, i) => {
            const angle = (angleStep * i - 90) * (Math.PI / 180);
            const radius = CIRCLE_RADIUS_RATIO;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            return renderTag(tag, i, {
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            });
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'Bear-TagCloud flex flex-wrap items-center justify-center gap-2 p-4',
        mobileCompact && 'max-sm:flex-nowrap max-sm:overflow-x-auto max-sm:justify-start max-sm:gap-3 max-sm:pb-2',
        className
      )}
      data-testid={testId}
      {...rest}
    >
      {tags.map((tag, i) => renderTag(tag, i))}
    </div>
  );
};
