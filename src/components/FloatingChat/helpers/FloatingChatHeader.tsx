import { Avatar } from '../../Avatar';
import { Box } from '../../Box';
import { CloseButton } from '../../CloseButton';
import { Flex } from '../../Flex';
import { Typography } from '../../Typography';
import type { FloatingChatProps } from '../FloatingChat.types';

export const FloatingChatHeader = (props: {
  header?: FloatingChatProps['header'];
  title: string;
  subtitle: string;
  avatar?: string;
  closeLabel: string;
  onClose: () => void;
}) => {
  const { header, title, subtitle, avatar, closeLabel, onClose } = props;

  if (header) {
    return <Box className="Bear-FloatingChat__header">{header}</Box>;
  }

  return (
    <Flex className="Bear-FloatingChat__header" align="center" gap={3}>
      <Avatar src={avatar} initials={title[0]} size="sm" />
      <Box>
        <Typography variant="subtitle2" className="Bear-FloatingChat__title">
          {title}
        </Typography>
        <Typography variant="caption" className="Bear-FloatingChat__subtitle">
          {subtitle}
        </Typography>
      </Box>
      <CloseButton aria-label={closeLabel} onClick={onClose} />
    </Flex>
  );
};
