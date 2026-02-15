import type { CSSProperties } from 'react';
import type { TransitionName } from './Transition.types';

/** Default transition duration (ms) */
export const DEFAULT_DURATION = 300;

/** Default easing */
export const DEFAULT_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

interface TransitionStyles {
  enter: CSSProperties;
  enterActive: CSSProperties;
  exit: CSSProperties;
  exitActive: CSSProperties;
}

/** Built-in transition presets */
export const TRANSITION_PRESETS: Record<TransitionName, TransitionStyles> = {
  fade: {
    enter: { opacity: 0 },
    enterActive: { opacity: 1 },
    exit: { opacity: 1 },
    exitActive: { opacity: 0 },
  },
  'slide-up': {
    enter: { opacity: 0, transform: 'translateY(16px)' },
    enterActive: { opacity: 1, transform: 'translateY(0)' },
    exit: { opacity: 1, transform: 'translateY(0)' },
    exitActive: { opacity: 0, transform: 'translateY(16px)' },
  },
  'slide-down': {
    enter: { opacity: 0, transform: 'translateY(-16px)' },
    enterActive: { opacity: 1, transform: 'translateY(0)' },
    exit: { opacity: 1, transform: 'translateY(0)' },
    exitActive: { opacity: 0, transform: 'translateY(-16px)' },
  },
  'slide-left': {
    enter: { opacity: 0, transform: 'translateX(-16px)' },
    enterActive: { opacity: 1, transform: 'translateX(0)' },
    exit: { opacity: 1, transform: 'translateX(0)' },
    exitActive: { opacity: 0, transform: 'translateX(-16px)' },
  },
  'slide-right': {
    enter: { opacity: 0, transform: 'translateX(16px)' },
    enterActive: { opacity: 1, transform: 'translateX(0)' },
    exit: { opacity: 1, transform: 'translateX(0)' },
    exitActive: { opacity: 0, transform: 'translateX(16px)' },
  },
  scale: {
    enter: { opacity: 0, transform: 'scale(0.9)' },
    enterActive: { opacity: 1, transform: 'scale(1)' },
    exit: { opacity: 1, transform: 'scale(1)' },
    exitActive: { opacity: 0, transform: 'scale(0.9)' },
  },
  'scale-y': {
    enter: { opacity: 0, transform: 'scaleY(0)' },
    enterActive: { opacity: 1, transform: 'scaleY(1)' },
    exit: { opacity: 1, transform: 'scaleY(1)' },
    exitActive: { opacity: 0, transform: 'scaleY(0)' },
  },
  'scale-x': {
    enter: { opacity: 0, transform: 'scaleX(0)' },
    enterActive: { opacity: 1, transform: 'scaleX(1)' },
    exit: { opacity: 1, transform: 'scaleX(1)' },
    exitActive: { opacity: 0, transform: 'scaleX(0)' },
  },
  rotate: {
    enter: { opacity: 0, transform: 'rotate(-90deg)' },
    enterActive: { opacity: 1, transform: 'rotate(0)' },
    exit: { opacity: 1, transform: 'rotate(0)' },
    exitActive: { opacity: 0, transform: 'rotate(90deg)' },
  },
  flip: {
    enter: { opacity: 0, transform: 'perspective(400px) rotateY(-90deg)' },
    enterActive: { opacity: 1, transform: 'perspective(400px) rotateY(0)' },
    exit: { opacity: 1, transform: 'perspective(400px) rotateY(0)' },
    exitActive: { opacity: 0, transform: 'perspective(400px) rotateY(90deg)' },
  },
  collapse: {
    enter: { height: '0px', overflow: 'hidden', opacity: 0 },
    enterActive: { height: 'auto', overflow: 'hidden', opacity: 1 },
    exit: { height: 'auto', overflow: 'hidden', opacity: 1 },
    exitActive: { height: '0px', overflow: 'hidden', opacity: 0 },
  },
};
