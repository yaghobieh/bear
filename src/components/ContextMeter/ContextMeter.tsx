import { COMPONENT_NAME_CONTEXT_METER, PERCENT_UNIT, ZERO } from '@const';
import { cn, resolveBearId, useBearId } from '@utils';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import {
  CONTEXT_METER_DEFAULT_TRANSLATIONS,
  CONTEXT_METER_MAX_DEFAULT,
} from './ContextMeter.const';
import type { ContextMeterProps } from './ContextMeter.types';
import { resolveContextMeterPercent, resolveContextMeterTone } from './ContextMeter.utils';

export const ContextMeter = (props: ContextMeterProps) => {
  const { id, testId, used, max = CONTEXT_METER_MAX_DEFAULT, translations, className } = props;
  const generatedId = useBearId(COMPONENT_NAME_CONTEXT_METER);
  const domId = resolveBearId(id, generatedId);
  const labels = { ...CONTEXT_METER_DEFAULT_TRANSLATIONS, ...translations };
  const percent = resolveContextMeterPercent(used, max);
  const tone = resolveContextMeterTone(percent);
  const labelId = `${domId}-label`;

  return (
    <Box
      id={domId}
      data-testid={testId}
      className={cn('Bear-ContextMeter', `Bear-ContextMeter--${tone}`, className)}
      style={{ ['--Bear-ContextMeter-percent' as string]: `${percent}${PERCENT_UNIT}` }}
    >
      <Flex justify="between" align="center" gap={2}>
        <Typography id={labelId} variant="caption">
          {labels.label}
        </Typography>
        <Typography variant="caption">
          {used}/{max}
        </Typography>
      </Flex>
      <Box
        className="Bear-ContextMeter__track"
        role="progressbar"
        aria-labelledby={labelId}
        aria-valuemin={ZERO}
        aria-valuemax={max}
        aria-valuenow={used}
      >
        <Box className="Bear-ContextMeter__fill" />
      </Box>
    </Box>
  );
};
