import { useEffect, useRef, useState } from 'react';
import {
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  COMPONENT_NAME_CHAT,
} from '@const';
import { cn, getBearLiveRegionProps, resolveBearId, useBearId } from '@utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { ChatBubble } from '../ChatBubble';
import { ChatError } from '../ChatError';
import { PromptComposer } from '../PromptComposer';
import { PromptSuggestions } from '../PromptSuggestions';
import {
  CHAT_DEFAULT_DISABLED,
  CHAT_DEFAULT_SHOW_AVATARS,
  CHAT_DEFAULT_SHOW_STATUS,
  CHAT_DEFAULT_SHOW_TIMESTAMPS,
  CHAT_DEFAULT_TRANSLATIONS,
  CHAT_DEFAULTS,
} from './Chat.const';
import type { ChatProps } from './Chat.types';
import { isChatScrollerAtBottom, resolveChatHeightVar } from './Chat.utils';
import { ChatTypingIndicator } from './helpers/ChatTypingIndicator';

export const Chat = (props: ChatProps) => {
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
    placeholder,
    header,
    footer,
    showTimestamps = CHAT_DEFAULT_SHOW_TIMESTAMPS,
    showStatus = CHAT_DEFAULT_SHOW_STATUS,
    showAvatars = CHAT_DEFAULT_SHOW_AVATARS,
    userAvatar,
    botAvatar,
    typingText,
    className,
    height = CHAT_DEFAULTS.HEIGHT,
    disabled = CHAT_DEFAULT_DISABLED,
    allowAttach,
    suggestions,
    onSuggestionSelect,
    errorTitle,
    errorMessage,
    onRetry,
    translations,
  } = props;

  const generatedId = useBearId(COMPONENT_NAME_CHAT);
  const domId = resolveBearId(id, generatedId);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(BOOLEAN_TRUE);
  const lastMessageIdRef = useRef<string | null>(null);
  const [hasNewMessages, setHasNewMessages] = useState(BOOLEAN_FALSE);
  const labels = { ...CHAT_DEFAULT_TRANSLATIONS, ...translations };
  const streaming = isStreaming || isLoading;
  const lastMessage = messages[messages.length - 1];
  const liveText = streaming && typeof lastMessage?.content === 'string' ? lastMessage.content : undefined;
  const liveProps = getBearLiveRegionProps('info');

  const scrollToBottom = () => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }
    scroller.scrollTop = scroller.scrollHeight;
    isAtBottomRef.current = BOOLEAN_TRUE;
    setHasNewMessages(BOOLEAN_FALSE);
  };

  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }
    const atBottom = isChatScrollerAtBottom(scroller);
    isAtBottomRef.current = atBottom;
    if (atBottom) {
      setHasNewMessages(BOOLEAN_FALSE);
    }
  };

  useEffect(() => {
    const lastId = lastMessage?.id ?? null;
    const isFirstRender = lastMessageIdRef.current === null;
    const hasAppended = lastId !== null && lastId !== lastMessageIdRef.current;
    lastMessageIdRef.current = lastId;
    if (!hasAppended) {
      return;
    }
    if (isFirstRender || isAtBottomRef.current) {
      scrollToBottom();
      return;
    }
    setHasNewMessages(BOOLEAN_TRUE);
  }, [messages, lastMessage?.id]);

  return (
    <Box
      id={domId}
      data-testid={testId}
      className={cn('Bear-Chat', className)}
      style={resolveChatHeightVar(height)}
    >
      {header && <Box className="Bear-Chat__header">{header}</Box>}
      <Box ref={scrollerRef} className="Bear-Chat__messages" onScroll={handleScroll}>
        <Box className="Bear-Chat__live" {...liveProps}>
          {liveText}
        </Box>
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            showTimestamp={showTimestamps}
            showStatus={showStatus}
            showAvatar={showAvatars}
            userAvatar={userAvatar}
            botAvatar={botAvatar}
          />
        ))}
        {isTyping && !streaming && <ChatTypingIndicator text={typingText ?? labels.typingText} />}
        {errorMessage && (
          <ChatError title={errorTitle} onRetry={onRetry}>
            {errorMessage}
          </ChatError>
        )}
        {hasNewMessages && (
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="Bear-Chat__new-messages"
            onClick={scrollToBottom}
          >
            {labels.newMessagesLabel}
          </Button>
        )}
      </Box>
      {suggestions && suggestions.length > 0 && (
        <Box className="Bear-Chat__suggestions">
          <PromptSuggestions suggestions={suggestions} onSelect={onSuggestionSelect} />
        </Box>
      )}
      <Box className="Bear-Chat__composer">
        <PromptComposer
          onSubmit={onSend}
          onStop={onStop}
          onAttach={onAttach}
          isStreaming={streaming}
          disabled={disabled}
          allowAttach={allowAttach}
          placeholder={placeholder ?? labels.placeholder}
        />
        {footer}
      </Box>
    </Box>
  );
};
