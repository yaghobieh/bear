import { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  BOOLEAN_FALSE,
  COMPONENT_NAME_FLOATING_CHAT,
} from '@const';
import { cn, resolveBearId, useBearId } from '@utils';
import { Box } from '../Box';
import { Chat } from '../Chat';
import { Typography } from '../Typography';
import {
  CHAT_WINDOW_SIZE,
  FLOATING_CHAT_DEFAULT_OPEN,
  FLOATING_CHAT_DEFAULT_TRANSLATIONS,
  FLOATING_CHAT_CHROME_PX,
  FLOATING_CHAT_DEFAULTS,
  FLOATING_CHAT_POWERED_BY,
  FLOATING_CHAT_WELCOME_ID,
} from './FloatingChat.const';
import type { FloatingChatProps } from './FloatingChat.types';
import { resolveFloatingChatVars } from './FloatingChat.utils';
import { FloatingChatHeader } from './helpers/FloatingChatHeader';
import { FloatingChatTrigger } from './helpers/FloatingChatTrigger';

export const FloatingChat = (props: FloatingChatProps) => {
  const {
    id,
    testId,
    messages,
    onSend,
    onStop,
    onAttach,
    isLoading = BOOLEAN_FALSE,
    isStreaming = BOOLEAN_FALSE,
    isTyping = BOOLEAN_FALSE,
    title = FLOATING_CHAT_DEFAULTS.TITLE,
    subtitle = FLOATING_CHAT_DEFAULTS.SUBTITLE,
    avatar,
    position = FLOATING_CHAT_DEFAULTS.POSITION,
    bottom = FLOATING_CHAT_DEFAULTS.BOTTOM,
    side = FLOATING_CHAT_DEFAULTS.SIDE,
    defaultOpen = FLOATING_CHAT_DEFAULT_OPEN,
    open,
    onOpenChange,
    trigger,
    badgeCount,
    header,
    welcomeMessage = FLOATING_CHAT_DEFAULTS.WELCOME_MESSAGE,
    poweredBy = FLOATING_CHAT_POWERED_BY,
    allowAttach,
    className,
    translations,
  } = props;

  const generatedId = useBearId(COMPONENT_NAME_FLOATING_CHAT);
  const domId = resolveBearId(id, generatedId);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const labels = { ...FLOATING_CHAT_DEFAULT_TRANSLATIONS, ...translations };
  const displayMessages =
    messages.length === 0 && welcomeMessage
      ? [{ id: FLOATING_CHAT_WELCOME_ID, content: welcomeMessage, sender: 'bot' as const, timestamp: new Date() }]
      : messages;

  const setOpen = (next: boolean) => {
    if (open === undefined) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  };

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <Box
      id={domId}
      data-testid={testId}
      className={cn(
        'Bear-FloatingChat',
        position === 'bottom-left' && 'Bear-FloatingChat--left',
        className
      )}
      style={resolveFloatingChatVars(bottom, side)}
    >
      <Box
        className={cn('Bear-FloatingChat__window', !isOpen && 'Bear-FloatingChat__window--closed')}
      >
        <FloatingChatHeader
          header={header}
          title={title}
          subtitle={subtitle}
          avatar={avatar}
          closeLabel={labels.closeLabel}
          onClose={() => setOpen(BOOLEAN_FALSE)}
        />
        <Chat
          messages={displayMessages}
          onSend={onSend}
          onStop={onStop}
          onAttach={onAttach}
          isLoading={isLoading}
          isStreaming={isStreaming}
          isTyping={isTyping}
          showAvatars={BOOLEAN_FALSE}
          height={CHAT_WINDOW_SIZE.height - FLOATING_CHAT_CHROME_PX}
          allowAttach={allowAttach}
          className="Bear-FloatingChat__chat"
        />
        {poweredBy && (
          <Typography variant="caption" className="Bear-FloatingChat__powered" color="secondary">
            {poweredBy}
          </Typography>
        )}
      </Box>
      <FloatingChatTrigger
        isOpen={isOpen}
        trigger={trigger}
        badgeCount={badgeCount}
        openLabel={labels.openLabel}
        closeLabel={labels.closeLabel}
        onToggle={() => setOpen(!isOpen)}
      />
    </Box>,
    document.body
  );
};
