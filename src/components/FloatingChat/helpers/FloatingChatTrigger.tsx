import { Badge } from '../../Badge';
import { Box } from '../../Box';
import { Button } from '../../Button';
import { CloseButton } from '../../CloseButton';
import { FLOATING_CHAT_BADGE_MAX } from '../FloatingChat.const';
import type { FloatingChatProps } from '../FloatingChat.types';
import { resolveFloatingChatBadge } from '../FloatingChat.utils';

export const FloatingChatTrigger = (props: {
  isOpen: boolean;
  trigger?: FloatingChatProps['trigger'];
  badgeCount?: number;
  openLabel: string;
  closeLabel: string;
  onToggle: () => void;
}) => {
  const { isOpen, trigger, badgeCount, openLabel, closeLabel, onToggle } = props;
  const count = badgeCount ?? 0;
  const showBadge = !isOpen && count > 0;

  if (trigger) {
    return (
      <Box className="Bear-FloatingChat__trigger" onClick={onToggle}>
        {trigger}
      </Box>
    );
  }

  return (
    <Box className="Bear-FloatingChat__trigger">
      {isOpen ? (
        <CloseButton aria-label={closeLabel} onClick={onToggle} size="lg" />
      ) : (
        <Button type="button" variant="primary" aria-label={openLabel} onClick={onToggle}>
          {openLabel}
        </Button>
      )}
      {showBadge && (
        <Badge variant="danger" size="sm" className="Bear-FloatingChat__badge">
          {resolveFloatingChatBadge(count, FLOATING_CHAT_BADGE_MAX)}
        </Badge>
      )}
    </Box>
  );
};
