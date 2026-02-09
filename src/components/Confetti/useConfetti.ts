import { useState, useCallback } from 'react';
import type { UseConfettiReturn } from './Confetti.types';

/**
 * useConfetti - Hook to control confetti programmatically
 * 
 * @example
 * ```tsx
 * const { fire, stop, isActive } = useConfetti();
 * 
 * <Confetti active={isActive} onComplete={stop} />
 * <Button onClick={fire}>Celebrate!</Button>
 * ```
 */
export const useConfetti = (): UseConfettiReturn => {
  const [isActive, setIsActive] = useState(false);

  const fire = useCallback(() => {
    setIsActive(true);
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  return { fire, stop, isActive };
};
