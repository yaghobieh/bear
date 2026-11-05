import { Flex } from '../../../src/components/Flex';
import { Typography } from '../../../src/components/Typography';
import { resolveBearId } from '../../../src/utils/generateBearId.utils';
import { useBearId } from '../../../src/utils/useBearId';
import { LIST_BLOCK_NOTE, LIST_BLOCK_TITLE } from './ListBlock.const';
import type { ListBlockProps } from './ListBlock.types';

export const ListBlock = ({ id, testId, title = LIST_BLOCK_TITLE, items }: ListBlockProps) => {
  const generatedId = useBearId('ListBlock');
  const blockId = resolveBearId(id, generatedId);

  return (
    <Flex id={blockId} data-testid={testId} direction="column" gap={3} className="Bear-ListBlock">
      <Typography variant="h4">{title}</Typography>
      <Flex direction="column" gap={2}>
        {items.map((item) => (
          <Flex key={item.id} direction="column" gap={1} className="Bear-ListBlock__item">
            <Typography variant="subtitle1">{item.title}</Typography>
            {item.detail ? <Typography variant="body2">{item.detail}</Typography> : null}
          </Flex>
        ))}
      </Flex>
      <Typography variant="body2">{LIST_BLOCK_NOTE}</Typography>
    </Flex>
  );
};
