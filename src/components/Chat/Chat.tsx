import { FC, useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import { cn } from '@utils';
import { useBear } from '../../context/BearProvider';
import { Button } from '../Button';
import { Input } from '../Input';
import { Avatar } from '../Avatar';
import { Typography } from '../Typography';
import { BearIcons } from '../Icon';
import type { ChatProps, ChatBubbleProps } from './Chat.types';
import { CHAT_DEFAULTS, MESSAGE_STATUS_ICONS, SENDER_COLORS } from './Chat.const';

/**
 * ChatBubble - Single message bubble
 */
const ChatBubble: FC<ChatBubbleProps> = ({
  message,
  showTimestamp = true,
  showStatus = true,
  showAvatar = true,
  userAvatar,
  botAvatar,
}) => {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';
  const colors = SENDER_COLORS[message.sender];

  if (isSystem) {
    return (
      <div className="flex justify-center my-2">
        <Typography 
          variant="caption" 
          className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800"
          style={{ color: colors.text }}
        >
          {message.content}
        </Typography>
      </div>
    );
  }

  const avatar = isUser ? userAvatar : botAvatar;
  const statusIcon = message.status ? MESSAGE_STATUS_ICONS[message.status] : null;

  return (
    <div 
      className={cn(
        'flex gap-2 mb-3',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {showAvatar && (
        <Avatar 
          src={avatar} 
          initials={message.name?.[0] || (isUser ? 'U' : 'B')}
          size="sm"
          className="flex-shrink-0"
        />
      )}
      
      <div className={cn('flex flex-col max-w-[70%]', isUser ? 'items-end' : 'items-start')}>
        {message.name && (
          <Typography variant="caption" className="mb-1 opacity-60">
            {message.name}
          </Typography>
        )}
        
        <div 
          className={cn(
            'px-4 py-2 rounded-2xl',
            isUser ? 'rounded-br-sm' : 'rounded-bl-sm'
          )}
          style={{ 
            backgroundColor: colors.bg,
            color: colors.text,
          }}
        >
          {typeof message.content === 'string' ? (
            <Typography variant="body2">{message.content}</Typography>
          ) : (
            message.content
          )}
        </div>
        
        <div className="flex items-center gap-1 mt-1">
          {showTimestamp && message.timestamp && (
            <Typography variant="caption" className="opacity-50 text-xs">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Typography>
          )}
          {showStatus && statusIcon && isUser && (
            <span 
              className={cn(
                'text-xs',
                message.status === 'read' ? 'text-blue-500' : 'opacity-50',
                message.status === 'error' && 'text-red-500'
              )}
            >
              {statusIcon}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * TypingIndicator - Shows when someone is typing
 */
const TypingIndicator: FC<{ text?: string }> = ({ text = CHAT_DEFAULTS.TYPING_TEXT }) => (
  <div className="flex items-center gap-2 mb-3">
    <div className="flex gap-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-sm">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
    <Typography variant="caption" className="opacity-50">{text}</Typography>
  </div>
);

/**
 * Chat - Chat interface component
 * 
 * @example
 * ```tsx
 * const [messages, setMessages] = useState<ChatMessage[]>([
 *   { id: '1', content: 'Hello!', sender: 'bot', timestamp: new Date() },
 * ]);
 * 
 * <Chat
 *   messages={messages}
 *   onSend={(msg) => setMessages([...messages, { id: Date.now().toString(), content: msg, sender: 'user' }])}
 *   isTyping={false}
 *   showAvatars
 * />
 * ```
 */
export const Chat: FC<ChatProps> = ({
  messages,
  onSend,
  isLoading = false,
  placeholder = CHAT_DEFAULTS.PLACEHOLDER,
  header,
  footer,
  showTimestamps = true,
  showStatus = true,
  showAvatars = true,
  userAvatar,
  botAvatar,
  isTyping = false,
  typingText,
  className,
  height = CHAT_DEFAULTS.HEIGHT,
  testId,
  disabled = false,
}) => {
  const { mode } = useBear();
  const isDark = mode === 'dark';
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = useCallback(() => {
    if (inputValue.trim() && onSend && !disabled && !isLoading) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  }, [inputValue, onSend, disabled, isLoading]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <div 
      className={cn(
        'Bear-Chat',
        'flex flex-col rounded-xl overflow-hidden border',
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200',
        className
      )}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
      data-testid={testId}
    >
      {/* Header */}
      {header && (
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          {header}
        </div>
      )}
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
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
        
        {isTyping && <TypingIndicator text={typingText} />}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            className="flex-1"
          />
          <Button
            variant="primary"
            onClick={handleSend}
            disabled={!inputValue.trim() || disabled || isLoading}
          >
            <BearIcons.SendIcon size={18} />
          </Button>
        </div>
        
        {footer && (
          <div className="mt-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
