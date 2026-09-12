import { ANIMATION_PULSE, FOURTEEN, FORTY, THREE } from '@const';
import { cn, resolveBearId, useBearId } from '@utils';
import { Flex } from '../Flex';
import { Skeleton } from '../Skeleton';
import type { FormSkeletonProps } from './FormSkeleton.types';

export const FormSkeleton = (props: FormSkeletonProps) => {
  const { fields = THREE, animation = ANIMATION_PULSE, id, testId, className } = props;

  return (
    <Flex
      id={resolveBearId(id, useBearId('FormSkeleton'))}
      testId={testId}
      direction="column"
      gap={4}
      className={cn('Bear-FormSkeleton', className)}
    >
      {Array.from({ length: fields }).map((_, index) => (
        <Flex key={`field-${index}`} direction="column" gap={2} className="Bear-FormSkeleton__field">
          <Skeleton
            animation={animation}
            height={FOURTEEN}
            className="Bear-FormSkeleton__label"
          />
          <Skeleton
            animation={animation}
            height={FORTY}
            className="Bear-FormSkeleton__control"
          />
        </Flex>
      ))}
    </Flex>
  );
};
