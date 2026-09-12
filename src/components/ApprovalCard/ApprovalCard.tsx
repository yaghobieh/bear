import { COMPONENT_NAME_APPROVAL_CARD } from '@const';
import { cn, resolveBearId, useBearId } from '@utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { APPROVAL_CARD_DEFAULT_TRANSLATIONS } from './ApprovalCard.const';
import type { ApprovalCardProps } from './ApprovalCard.types';

export const ApprovalCard = (props: ApprovalCardProps) => {
  const { id, testId, title, children, onApprove, onReject, translations, className } = props;
  const generatedId = useBearId(COMPONENT_NAME_APPROVAL_CARD);
  const domId = resolveBearId(id, generatedId);
  const labels = { ...APPROVAL_CARD_DEFAULT_TRANSLATIONS, ...translations };

  return (
    <Box id={domId} data-testid={testId} className={cn('Bear-ApprovalCard', className)}>
      <Flex direction="column" gap={3} align="start">
        <Typography variant="subtitle1">{title}</Typography>
        {children && <Typography variant="body2">{children}</Typography>}
        <Flex gap={2}>
          {onReject && (
            <Button type="button" variant="outline" size="sm" onClick={onReject}>
              {labels.rejectLabel}
            </Button>
          )}
          {onApprove && (
            <Button type="button" variant="primary" size="sm" onClick={onApprove}>
              {labels.approveLabel}
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
