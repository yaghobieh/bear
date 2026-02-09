import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@utils';
import type { ConfettiProps, ConfettiPiece } from './Confetti.types';
import { CONFETTI_DEFAULTS, CONFETTI_COLORS, CONFETTI_SHAPES, CONFETTI_SIZE_RANGE } from './Confetti.const';

/**
 * Confetti - Celebration confetti effect 🎉
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const [showConfetti, setShowConfetti] = useState(false);
 * <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />
 * <Button onClick={() => setShowConfetti(true)}>Celebrate!</Button>
 * 
 * // Custom colors and position
 * <Confetti 
 *   active={true}
 *   colors={['#ff0000', '#00ff00', '#0000ff']}
 *   originX={0.5}
 *   originY={0.3}
 * />
 * ```
 */
export const Confetti: FC<ConfettiProps> = ({
  active = false,
  count = CONFETTI_DEFAULTS.COUNT,
  duration = CONFETTI_DEFAULTS.DURATION,
  colors = CONFETTI_COLORS as unknown as string[],
  originX = CONFETTI_DEFAULTS.ORIGIN_X,
  originY = CONFETTI_DEFAULTS.ORIGIN_Y,
  spread = CONFETTI_DEFAULTS.SPREAD,
  velocity = CONFETTI_DEFAULTS.VELOCITY,
  gravity = CONFETTI_DEFAULTS.GRAVITY,
  autoHide = CONFETTI_DEFAULTS.AUTO_HIDE,
  onComplete,
  className,
  testId,
}) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);

  // Generate random confetti pieces
  const generatePieces = useCallback(() => {
    const newPieces: ConfettiPiece[] = [];
    const spreadRad = (spread * Math.PI) / 180;

    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * spreadRad;
      const speed = velocity * (0.5 + Math.random() * 0.5);
      
      newPieces.push({
        id: i,
        x: originX * 100,
        y: originY * 100,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: CONFETTI_SIZE_RANGE.min + Math.random() * (CONFETTI_SIZE_RANGE.max - CONFETTI_SIZE_RANGE.min),
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        },
        rotationSpeed: (Math.random() - 0.5) * 20,
        shape: CONFETTI_SHAPES[Math.floor(Math.random() * CONFETTI_SHAPES.length)],
      });
    }
    
    return newPieces;
  }, [count, colors, originX, originY, spread, velocity]);

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;

    if (elapsed >= duration && autoHide) {
      setIsVisible(false);
      setPieces([]);
      onComplete?.();
      return;
    }

    setPieces(prevPieces => 
      prevPieces.map(piece => ({
        ...piece,
        x: piece.x + piece.velocity.x * 0.1,
        y: piece.y + piece.velocity.y * 0.1,
        rotation: piece.rotation + piece.rotationSpeed,
        velocity: {
          x: piece.velocity.x * 0.99,
          y: piece.velocity.y + gravity,
        },
      }))
    );

    animationRef.current = requestAnimationFrame(animate);
  }, [duration, gravity, autoHide, onComplete]);

  // Start/stop animation based on active prop
  useEffect(() => {
    if (active) {
      setIsVisible(true);
      setPieces(generatePieces());
      startTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active, generatePieces, animate]);

  // Render shape
  const renderShape = (piece: ConfettiPiece) => {
    const style = {
      position: 'absolute' as const,
      left: `${piece.x}%`,
      top: `${piece.y}%`,
      width: piece.size,
      height: piece.size,
      transform: `rotate(${piece.rotation}deg)`,
      backgroundColor: piece.shape !== 'triangle' ? piece.color : 'transparent',
      borderRadius: piece.shape === 'circle' ? '50%' : 0,
      borderLeft: piece.shape === 'triangle' ? `${piece.size / 2}px solid transparent` : undefined,
      borderRight: piece.shape === 'triangle' ? `${piece.size / 2}px solid transparent` : undefined,
      borderBottom: piece.shape === 'triangle' ? `${piece.size}px solid ${piece.color}` : undefined,
      opacity: 0.9,
    };

    return <div key={piece.id} style={style} />;
  };

  if (!isVisible || pieces.length === 0) return null;

  return (
    <div
      className={cn(
        'Bear-Confetti',
        'bear-fixed bear-inset-0 bear-pointer-events-none bear-overflow-hidden',
        className
      )}
      style={{ zIndex: 99999 }}
      data-testid={testId}
    >
      {pieces.map(renderShape)}
    </div>
  );
};

export default Confetti;
