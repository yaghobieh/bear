import { COMPONENT_NAME_ARTIFACT_CARD } from '@const';
import { cn, resolveBearId, useBearId } from '@utils';
import { Badge } from '../Badge';
import { Box } from '../Box';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { ARTIFACT_CARD_DEFAULT_KIND, ARTIFACT_CARD_DEFAULT_TRANSLATIONS } from './ArtifactCard.const';
import type { ArtifactCardProps } from './ArtifactCard.types';

export const ArtifactCard = (props: ArtifactCardProps) => {
  const {
    id,
    testId,
    title,
    kind = ARTIFACT_CARD_DEFAULT_KIND,
    children,
    onOpen,
    translations,
    className,
  } = props;

  const generatedId = useBearId(COMPONENT_NAME_ARTIFACT_CARD);
  const domId = resolveBearId(id, generatedId);
  const labels = { ...ARTIFACT_CARD_DEFAULT_TRANSLATIONS, ...translations };

  return (
    <Box
      id={domId}
      data-testid={testId}
      className={cn('Bear-ArtifactCard', `Bear-ArtifactCard--${kind}`, className)}
    >
      <Flex align="center" justify="between" gap={2}>
        <Typography variant="subtitle2">{title}</Typography>
        <Badge size="sm">{kind}</Badge>
      </Flex>
      {children && <Box className="Bear-ArtifactCard__body">{children}</Box>}
      {onOpen && (
        <Button type="button" variant="ghost" size="sm" onClick={onOpen}>
          {labels.openLabel}
        </Button>
      )}
    </Box>
  );
};
