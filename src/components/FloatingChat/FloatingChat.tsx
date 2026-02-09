import { FC, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@utils';
import { useBear } from '../../context/BearProvider';
import { Button } from '../Button';
import { Avatar } from '../Avatar';
import { Typography } from '../Typography';
import { Badge } from '../Badge';
import { BearIcons } from '../Icon';
import { Chat } from '../Chat';
import type { FloatingChatProps } from './FloatingChat.types';
import { FLOATING_CHAT_DEFAULTS, CHAT_WINDOW_SIZE } from './FloatingChat.const';

/**
 * FloatingChat - Floating chat widget bubble
 * 
 * @example
 * ```tsx
 * <FloatingChat
 *   messages={messages}
 *   onSend={handleSend}
 *   title="Support"
 *   subtitle="We're here to help!"
 *   position="bottom-right"
 *   badgeCount={2}
 * />
 * ```
 */
export const FloatingChat: FC<FloatingChatProps> = ({
  messages,
  onSend,
  isLoading = false,
  isTyping = false,
  title = FLOATING_CHAT_DEFAULTS.TITLE,
  subtitle = FLOATING_CHAT_DEFAULTS.SUBTITLE,
  avatar,
  position = FLOATING_CHAT_DEFAULTS.POSITION,
  bottom = FLOATING_CHAT_DEFAULTS.BOTTOM,
  side = FLOATING_CHAT_DEFAULTS.SIDE,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  trigger,
  badgeCount,
  header,
  welcomeMessage = FLOATING_CHAT_DEFAULTS.WELCOME_MESSAGE,
  poweredBy,
  className,
  testId,
}) => {
  const { mode } = useBear();
  const isDark = mode === 'dark';
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  const isOpen = controlledOpen ?? internalOpen;

  const handleToggle = useCallback(() => {
    const newOpen = !isOpen;
    setIsAnimating(true);
    setInternalOpen(newOpen);
    onOpenChange?.(newOpen);
    setTimeout(() => setIsAnimating(false), 300);
  }, [isOpen, onOpenChange]);

  const handleClose = useCallback(() => {
    setIsAnimating(true);
    setInternalOpen(false);
    onOpenChange?.(false);
    setTimeout(() => setIsAnimating(false), 300);
  }, [onOpenChange]);

  // Add welcome message if empty
  const displayMessages = messages.length === 0 && welcomeMessage
    ? [{ id: 'welcome', content: welcomeMessage, sender: 'bot' as const, timestamp: new Date() }]
    : messages;

  const positionStyles = {
    bottom: `${bottom}px`,
    [position === 'bottom-right' ? 'right' : 'left']: `${side}px`,
  };

  const chatWindowStyles = {
    bottom: `${bottom + 70}px`,
    [position === 'bottom-right' ? 'right' : 'left']: `${side}px`,
    width: CHAT_WINDOW_SIZE.width,
    height: CHAT_WINDOW_SIZE.height,
  };

  const content = (
    <div className={cn('Bear-FloatingChat', className)} data-testid={testId}>
      {/* Chat Window */}
      {(isOpen || isAnimating) && (
        <div
          className={cn(
            'fixed z-50 rounded-2xl overflow-hidden shadow-2xl',
            'transition-all duration-300 ease-out',
            isOpen && !isAnimating 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          )}
          style={chatWindowStyles}
        >
          {/* Custom Header or Default */}
          {header ? (
            <div className={cn(
              'px-4 py-3',
              isDark ? 'bg-gray-800' : 'bg-[var(--bear-primary-500)]'
            )}>
              {header}
            </div>
          ) : (
            <div 
              className={cn(
                'px-4 py-3 flex items-center gap-3',
                'bg-[var(--bear-primary-500)] text-white'
              )}
            >
              <Avatar 
                src={avatar} 
                initials={title[0]} 
                size="sm" 
                className="ring-2 ring-white/20"
              />
              <div className="flex-1">
                <Typography variant="subtitle2" className="text-white font-semibold">
                  {title}
                </Typography>
                <Typography variant="caption" className="text-white/70">
                  {subtitle}
                </Typography>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="!text-white hover:!bg-white/10"
              >
                <BearIcons.XIcon size={18} />
              </Button>
            </div>
          )}
          
          {/* Chat Body */}
          <Chat
            messages={displayMessages}
            onSend={onSend}
            isLoading={isLoading}
            isTyping={isTyping}
            showAvatars={false}
            height={CHAT_WINDOW_SIZE.height - 140}
            className="!rounded-none !border-0"
          />
          
          {/* Powered by */}
          {poweredBy && (
            <div className="px-3 py-2 text-center border-t border-gray-200 dark:border-gray-700">
              <Typography variant="caption" className="opacity-50">
                Powered by {poweredBy}
              </Typography>
            </div>
          )}
        </div>
      )}

      {/* Trigger Button */}
      <div className="fixed z-50" style={positionStyles}>
        {trigger ? (
          <div onClick={handleToggle}>{trigger}</div>
        ) : (
          <div className="relative">
            <Button
              variant="primary"
              onClick={handleToggle}
              className={cn(
                '!w-14 !h-14 !rounded-full !p-0 shadow-lg',
                'transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
            >
              {isOpen ? (
                <BearIcons.XIcon size={24} />
              ) : (
                <BearIcons.ChatIcon size={24} />
              )}
            </Button>
            
            {/* Badge */}
            {!isOpen && badgeCount && badgeCount > 0 && (
              <Badge
                variant="danger"
                size="sm"
                className="absolute -top-1 -right-1 !min-w-[20px] !h-5"
              >
                {badgeCount > 99 ? '99+' : badgeCount}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Render in portal
  if (typeof document === 'undefined') return null;
  return createPortal(content, document.body);
};

export default FloatingChat;
