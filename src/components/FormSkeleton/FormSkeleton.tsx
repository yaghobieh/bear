import { cn, resolveBearId, useBearId } from '@utils';
import { Skeleton } from '../Skeleton';
import type { FormSkeletonProps } from './FormSkeleton.types';
import {
  FORM_SKELETON_DEFAULT_FIELDS,
  FORM_SKELETON_FIELD_GAP_PX,
  FORM_SKELETON_FIELD_HEIGHT_PX,
  FORM_SKELETON_LABEL_HEIGHT_PX,
  FORM_SKELETON_ROOT_CLASS,
} from './FormSkeleton.const';

export const FormSkeleton = ({
  fields = FORM_SKELETON_DEFAULT_FIELDS,
  animation = 'pulse',
  id,
  testId,
  className,
}: FormSkeletonProps) => {
  const generatedId = useBearId('FormSkeleton');
  const domId = resolveBearId(id, generatedId);

  return (
    <div
      id={domId}
      data-testid={testId}
      className={cn(FORM_SKELETON_ROOT_CLASS, 'bear-flex bear-flex-col', className)}
      style={{ gap: FORM_SKELETON_FIELD_GAP_PX }}
    >
      {Array.from({ length: fields }).map((_, index) => (
        <div key={`field-${index}`} className="Bear-FormSkeleton__field bear-flex bear-flex-col bear-gap-2">
          <Skeleton animation={animation} width="30%" height={FORM_SKELETON_LABEL_HEIGHT_PX} />
          <Skeleton animation={animation} width="100%" height={FORM_SKELETON_FIELD_HEIGHT_PX} />
        </div>
      ))}
    </div>
  );
};
