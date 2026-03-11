import { FC, useMemo, useState, useEffect, useRef } from 'react';
import { cn } from '@utils';
import type { NumberFormatterProps } from './NumberFormatter.types';
import { DEFAULT_ANIMATION_DURATION, ANIMATION_FRAME_RATE, ROOT_CLASSES } from './NumberFormatter.const';
import { buildFormatter } from './NumberFormatter.utils';

export const NumberFormatter: FC<NumberFormatterProps> = (props) => {
  const {
    value, prefix = '', suffix = '',
    animated = false, animationDuration = DEFAULT_ANIMATION_DURATION,
    className, testId, ...rest
  } = props;

  const formatter = useMemo(() => buildFormatter(props), [
    props.formatStyle, props.locale, props.currency, props.currencyDisplay,
    props.unit, props.unitDisplay, props.notation,
    props.minimumFractionDigits, props.maximumFractionDigits, props.signDisplay,
  ]);

  const [displayValue, setDisplayValue] = useState(value);
  const prevValue = useRef(value);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (!animated) {
      setDisplayValue(value);
      prevValue.current = value;
      return;
    }
    const from = prevValue.current;
    const diff = value - from;
    if (diff === 0) return;

    const steps = Math.max(1, Math.round(animationDuration / ANIMATION_FRAME_RATE));
    let step = 0;

    const tick = () => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(from + diff * eased);
      if (step < steps) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        setDisplayValue(value);
        prevValue.current = value;
      }
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [value, animated, animationDuration]);

  const formatted = formatter.format(displayValue);

  return (
    <span className={cn(ROOT_CLASSES, className)} data-testid={testId} {...rest}>
      {prefix}{formatted}{suffix}
    </span>
  );
};

export default NumberFormatter;
