import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@utils';
import type { TypewriterProps } from './Typewriter.types';
import {
  DEFAULT_SPEED,
  DEFAULT_START_DELAY,
  DEFAULT_DELETE_DELAY,
  DEFAULT_DELETE_SPEED,
  DEFAULT_CURSOR_CHAR,
  DEFAULT_CURSOR_BLINK_SPEED,
  INITIAL_TEXT_INDEX,
  INITIAL_CHAR_INDEX,
} from './Typewriter.const';

/**
 * Typewriter - Animated typing text effect.
 * Supports multi-text looping, custom speeds, cursor, and theming via BearProvider.
 */
export const Typewriter: FC<TypewriterProps> = (props) => {
  const {
    text,
    speed = DEFAULT_SPEED,
    startDelay = DEFAULT_START_DELAY,
    deleteDelay = DEFAULT_DELETE_DELAY,
    deleteSpeed = DEFAULT_DELETE_SPEED,
    loop = false,
    cursor = true,
    cursorChar = DEFAULT_CURSOR_CHAR,
    cursorBlinkSpeed = DEFAULT_CURSOR_BLINK_SPEED,
    onComplete,
    onWordComplete,
    as: Tag = 'span',
    className,
    style,
    testId,
  } = props;

  const texts = Array.isArray(text) ? text : [text];
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(INITIAL_TEXT_INDEX);
  const [charIndex, setCharIndex] = useState(INITIAL_CHAR_INDEX);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const startedRef = useRef(false);

  // Cursor blink via CSS animation class (keyframe in main.css)
  useEffect(() => {
    if (!cursor) return;
    const interval = setInterval(() => setCursorVisible((v) => !v), cursorBlinkSpeed);
    return () => clearInterval(interval);
  }, [cursor, cursorBlinkSpeed]);

  const type = useCallback(() => {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        setDisplayed(currentText.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
        timerRef.current = setTimeout(type, speed);
      } else {
        onWordComplete?.(textIndex);

        if (texts.length === 1 && !loop) {
          onComplete?.();
          return;
        }

        timerRef.current = setTimeout(() => {
          setIsDeleting(true);
          type();
        }, deleteDelay);
      }
    } else {
      if (charIndex > 0) {
        setCharIndex((c) => c - 1);
        setDisplayed(currentText.slice(0, charIndex - 1));
        timerRef.current = setTimeout(type, deleteSpeed);
      } else {
        setIsDeleting(false);
        const nextIndex = textIndex + 1;

        if (nextIndex >= texts.length) {
          if (loop) {
            setTextIndex(INITIAL_TEXT_INDEX);
            timerRef.current = setTimeout(type, speed);
          } else {
            onComplete?.();
          }
        } else {
          setTextIndex(nextIndex);
          timerRef.current = setTimeout(type, speed);
        }
      }
    }
  }, [texts, textIndex, charIndex, isDeleting, speed, deleteSpeed, deleteDelay, loop, onComplete, onWordComplete]);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    timerRef.current = setTimeout(type, startDelay);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-run type when isDeleting or textIndex changes
  useEffect(() => {
    if (!startedRef.current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(type, isDeleting ? deleteSpeed : speed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isDeleting, textIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Tag
      className={cn('Bear-Typewriter', 'bear-inline', className)}
      style={style}
      data-testid={testId}
      aria-label={texts.join(', ')}
    >
      <span className="Bear-Typewriter__text">{displayed}</span>
      {cursor && (
        <span
          className={cn(
            'Bear-Typewriter__cursor',
            'bear-inline-block bear-ml-0.5',
            'bear-text-[var(--bear-primary-500)]',
          )}
          style={{ opacity: cursorVisible ? 1 : 0 }}
          aria-hidden="true"
        >
          {cursorChar}
        </span>
      )}
    </Tag>
  );
};
