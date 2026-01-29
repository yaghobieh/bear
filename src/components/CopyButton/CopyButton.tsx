import { FC, useState, useCallback } from 'react';
import { CopyButtonProps } from './CopyButton.types';
import { cn } from '@utils';

const CopyIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export const CopyButton: FC<CopyButtonProps> = ({
  value,
  children,
  onCopy,
  timeout = 2000,
  size = 'md',
  variant = 'default',
  className,
  copiedText = 'Copied!',
  copyText = 'Copy',
  showText = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onCopy?.(value);
      setTimeout(() => setCopied(false), timeout);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [value, onCopy, timeout]);

  const sizeClasses = {
    sm: { button: 'bear-p-1', icon: 'bear-w-3.5 bear-h-3.5', text: 'bear-text-xs' },
    md: { button: 'bear-p-1.5', icon: 'bear-w-4 bear-h-4', text: 'bear-text-sm' },
    lg: { button: 'bear-p-2', icon: 'bear-w-5 bear-h-5', text: 'bear-text-base' },
  };

  const variantClasses = {
    default: 'bear-bg-zinc-700 hover:bear-bg-zinc-600 bear-text-zinc-300',
    ghost: 'bear-bg-transparent hover:bear-bg-zinc-700 bear-text-zinc-400 hover:bear-text-zinc-300',
    outline: 'bear-bg-transparent bear-border bear-border-zinc-600 hover:bear-bg-zinc-700 bear-text-zinc-400 hover:bear-text-zinc-300',
  };

  if (children) {
    return (
      <button onClick={handleCopy} className={className}>
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'bear-inline-flex bear-items-center bear-gap-1.5 bear-rounded bear-transition-all',
        sizeClasses[size].button,
        variantClasses[variant],
        copied && 'bear-text-green-400',
        className
      )}
      title={copied ? copiedText : copyText}
    >
      {copied ? (
        <CheckIcon className={sizeClasses[size].icon} />
      ) : (
        <CopyIcon className={sizeClasses[size].icon} />
      )}
      {showText && (
        <span className={sizeClasses[size].text}>
          {copied ? copiedText : copyText}
        </span>
      )}
    </button>
  );
};

