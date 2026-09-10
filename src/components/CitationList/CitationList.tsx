import { COMPONENT_NAME_CITATION_LIST } from '@const';
import { cn, resolveBearId, useBearId } from '@utils';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Link } from '../Link';
import { Typography } from '../Typography';
import type { CitationListProps } from './CitationList.types';

export const CitationList = (props: CitationListProps) => {
  const { id, testId, citations, className } = props;
  const generatedId = useBearId(COMPONENT_NAME_CITATION_LIST);
  const domId = resolveBearId(id, generatedId);

  return (
    <Flex
      id={domId}
      testId={testId}
      className={cn('Bear-CitationList', className)}
      direction="column"
      gap={2}
    >
      {citations.map((citation) => (
        <Box key={citation.id} className="Bear-CitationList__item">
          {citation.href ? (
            <Link href={citation.href}>{citation.title}</Link>
          ) : (
            <Typography variant="subtitle2">{citation.title}</Typography>
          )}
          {citation.excerpt && (
            <Typography variant="caption" color="muted">
              {citation.excerpt}
            </Typography>
          )}
        </Box>
      ))}
    </Flex>
  );
};
