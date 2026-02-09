import { FC, useMemo } from 'react';
import { cn } from '@utils';
import type { QRCodeProps } from './QRCode.types';
import { QRCODE_DEFAULTS } from './QRCode.const';
import { generateQRMatrix, matrixToSvgPath } from './QRCode.utils';

/**
 * QRCode - QR code generator component
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <QRCode value="https://forgestack.dev" />
 * 
 * // Custom styling
 * <QRCode 
 *   value="Hello World"
 *   size={200}
 *   fgColor="#ec4899"
 *   bgColor="transparent"
 * />
 * 
 * // With center logo
 * <QRCode 
 *   value="https://forgestack.dev"
 *   imageUrl="/logo.png"
 *   imageSize={0.25}
 *   level="H"
 * />
 * ```
 */
export const QRCode: FC<QRCodeProps> = ({
  value,
  size = QRCODE_DEFAULTS.SIZE,
  level = QRCODE_DEFAULTS.LEVEL,
  bgColor = QRCODE_DEFAULTS.BG_COLOR,
  fgColor = QRCODE_DEFAULTS.FG_COLOR,
  includeMargin = QRCODE_DEFAULTS.INCLUDE_MARGIN,
  imageUrl,
  imageSize = QRCODE_DEFAULTS.IMAGE_SIZE,
  className,
  style,
  testId,
}) => {
  const qrData = useMemo(() => {
    if (!value) return null;
    
    const matrix = generateQRMatrix(value, level);
    const margin = includeMargin ? 4 : 0;
    const totalModules = matrix.size + margin * 2;
    const cellSize = size / totalModules;
    const path = matrixToSvgPath(matrix, cellSize, margin * cellSize);
    
    return { matrix, path, cellSize, margin, totalModules };
  }, [value, level, size, includeMargin]);

  if (!qrData) return null;

  const imageDimension = size * imageSize;
  const imageOffset = (size - imageDimension) / 2;

  return (
    <svg
      className={cn('Bear-QRCode', className)}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={style}
      data-testid={testId}
    >
      {/* Background */}
      <rect width={size} height={size} fill={bgColor} />
      
      {/* QR Code modules */}
      <path d={qrData.path} fill={fgColor} />
      
      {/* Center image */}
      {imageUrl && (
        <g>
          {/* White background for image */}
          <rect
            x={imageOffset - 4}
            y={imageOffset - 4}
            width={imageDimension + 8}
            height={imageDimension + 8}
            fill={bgColor}
            rx={4}
          />
          <image
            href={imageUrl}
            x={imageOffset}
            y={imageOffset}
            width={imageDimension}
            height={imageDimension}
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      )}
    </svg>
  );
};

export default QRCode;
