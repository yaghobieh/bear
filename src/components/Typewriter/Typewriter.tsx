import { FC, useState, useEffect, useCallback, useRef, useMemo } from 'react';
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

  const texts = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(INITIAL_TEXT_INDEX);
  const [charIndex, setCharIndex] = useState(INITIAL_CHAR_INDEX);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const textIndexRef = useRef(textIndex);
  const charIndexRef = useRef(charIndex);
  const isDeletingRef = useRef(isDeleting);

  textIndexRef.current = textIndex;
  charIndexRef.current = charIndex;
  isDeletingRef.current = isDeleting;

  // Cursor blink via CSS animation class (keyframe in main.css)
  useEffect(() => {
    if (!cursor) return;
    const interval = setInterval(() => setCursorVisible((v) => !v), cursorBlinkSpeed);
    return () => clearInterval(interval);
  }, [cursor, cursorBlinkSpeed]);

  const type = useCallback(() => {
    const ti = textIndexRef.current;
    const ci = charIndexRef.current;
    const deleting = isDeletingRef.current;
    const currentText = texts[ti];

    if (!deleting) {
      if (ci < currentText.length) {
        const next = ci + 1;
        setDisplayed(currentText.slice(0, next));
        setCharIndex(next);
        charIndexRef.current = next;
        timerRef.current = setTimeout(type, speed);
      } else {
        onWordComplete?.(ti);

        if (texts.length === 1 && !loop) {
          onComplete?.();
          return;
        }

        timerRef.current = setTimeout(() => {
          setIsDeleting(true);
          isDeletingRef.current = true;
          type();
        }, deleteDelay);
      }
    } else {
      if (ci > 0) {
        const next = ci - 1;
        setCharIndex(next);
        charIndexRef.current = next;
        setDisplayed(currentText.slice(0, next));
        timerRef.current = setTimeout(type, deleteSpeed);
      } else {
        setIsDeleting(false);
        isDeletingRef.current = false;
        const nextIndex = ti + 1;

        if (nextIndex >= texts.length) {
          if (loop) {
            setTextIndex(INITIAL_TEXT_INDEX);
            textIndexRef.current = INITIAL_TEXT_INDEX;
            setCharIndex(INITIAL_CHAR_INDEX);
            charIndexRef.current = INITIAL_CHAR_INDEX;
            timerRef.current = setTimeout(type, speed);
          } else {
            onComplete?.();
          }
        } else {
          setTextIndex(nextIndex);
          textIndexRef.current = nextIndex;
          setCharIndex(INITIAL_CHAR_INDEX);
          charIndexRef.current = INITIAL_CHAR_INDEX;
          timerRef.current = setTimeout(type, speed);
        }
      }
    }
  }, [texts, speed, deleteSpeed, deleteDelay, loop, onComplete, onWordComplete]);

  // Start typing after startDelay. No guard so React Strict Mode re-run still schedules.
  useEffect(() => {
    timerRef.current = setTimeout(type, startDelay);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
