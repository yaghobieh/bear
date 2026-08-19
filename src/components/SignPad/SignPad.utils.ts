import {
  SIGN_PAD_EMPTY_SIZE,
  SIGN_PAD_TRANSPARENT_FILL,
  SIGN_PAD_UNIT_SCALE,
} from './SignPad.const';

export const resolveCanvasFill = (backgroundColor: string): string =>
  backgroundColor === 'transparent' ? SIGN_PAD_TRANSPARENT_FILL : backgroundColor;

export const fillCanvasBackground = (
  canvas: HTMLCanvasElement,
  backgroundColor: string,
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.fillStyle = resolveCanvasFill(backgroundColor);
  ctx.fillRect(SIGN_PAD_EMPTY_SIZE, SIGN_PAD_EMPTY_SIZE, canvas.width, canvas.height);
};

export const syncCanvasSize = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  backgroundColor: string,
  preserve: boolean,
): void => {
  if (canvas.width === width && canvas.height === height) {
    return;
  }

  const shouldPreserve =
    preserve && canvas.width > SIGN_PAD_EMPTY_SIZE && canvas.height > SIGN_PAD_EMPTY_SIZE;
  const snapshot = document.createElement('canvas');
  if (shouldPreserve) {
    snapshot.width = canvas.width;
    snapshot.height = canvas.height;
    snapshot.getContext('2d')?.drawImage(canvas, SIGN_PAD_EMPTY_SIZE, SIGN_PAD_EMPTY_SIZE);
  }

  canvas.width = width;
  canvas.height = height;
  fillCanvasBackground(canvas, backgroundColor);

  if (shouldPreserve) {
    canvas.getContext('2d')?.drawImage(snapshot, SIGN_PAD_EMPTY_SIZE, SIGN_PAD_EMPTY_SIZE, width, height);
  }
};

export const getCanvasPoint = (
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number,
): { x: number; y: number } => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = rect.width === SIGN_PAD_EMPTY_SIZE ? SIGN_PAD_UNIT_SCALE : canvas.width / rect.width;
  const scaleY = rect.height === SIGN_PAD_EMPTY_SIZE ? SIGN_PAD_UNIT_SCALE : canvas.height / rect.height;
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
  };
};

export const strokeCanvasSegment = (
  canvas: HTMLCanvasElement,
  from: { x: number; y: number },
  to: { x: number; y: number },
  strokeColor: string,
  strokeWidth: number,
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
};
