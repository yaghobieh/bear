/**
 * Simplified QR Code generator utilities
 * Note: For production, consider using a dedicated library like 'qrcode'
 * This is a basic implementation for demonstration purposes
 */

interface QRMatrix {
  size: number;
  modules: boolean[][];
}

// Get version based on data length and error correction level
function getVersion(dataLength: number, level: string): number {
  // Simplified version calculation - use version 2 for small data, scale up
  const baseCaps = [17, 32, 53, 78, 106, 134, 154, 192, 230];
  const levelFactor = level === 'L' ? 1 : level === 'M' ? 0.85 : level === 'Q' ? 0.65 : 0.5;
  
  for (let v = 1; v <= 9; v++) {
    if (dataLength <= baseCaps[v - 1] * levelFactor) return v;
  }
  return 9;
}


// Generate QR matrix from text
export function generateQRMatrix(text: string, level: string = 'M'): QRMatrix {
  const version = getVersion(text.length, level);
  const size = version * 4 + 17;
  const modules: boolean[][] = Array(size).fill(null).map(() => Array(size).fill(false));
  
  // Add finder patterns (top-left, top-right, bottom-left)
  const addFinderPattern = (row: number, col: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const pr = row + r;
        const pc = col + c;
        if (pr >= 0 && pr < size && pc >= 0 && pc < size) {
          const isOuter = r === -1 || r === 7 || c === -1 || c === 7;
          const isInner = r >= 1 && r <= 5 && c >= 1 && c <= 5;
          const isCore = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          modules[pr][pc] = !isOuter && (isCore || !isInner);
        }
      }
    }
  };
  
  addFinderPattern(0, 0);
  addFinderPattern(0, size - 7);
  addFinderPattern(size - 7, 0);
  
  // Add timing patterns
  for (let i = 8; i < size - 8; i++) {
    modules[6][i] = i % 2 === 0;
    modules[i][6] = i % 2 === 0;
  }
  
  // Add alignment pattern for version >= 2
  if (version >= 2) {
    const alignPos = size - 7;
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        const pr = alignPos + r;
        const pc = alignPos + c;
        if (pr >= 0 && pr < size && pc >= 0 && pc < size) {
          const isOuter = Math.abs(r) === 2 || Math.abs(c) === 2;
          const isCenter = r === 0 && c === 0;
          modules[pr][pc] = isOuter || isCenter;
        }
      }
    }
  }
  
  // Encode data in remaining modules
  // This is a simplified approach - real QR codes use more complex encoding
  const dataBytes = new TextEncoder().encode(text);
  let dataIndex = 0;
  let bitIndex = 0;
  
  // Fill data area with encoded data
  for (let col = size - 1; col >= 1; col -= 2) {
    if (col === 6) col = 5; // Skip timing pattern column
    
    for (let row = 0; row < size; row++) {
      for (let c = 0; c < 2; c++) {
        const x = col - c;
        const y = (col + 1) % 4 < 2 ? size - 1 - row : row;
        
        // Skip reserved areas
        if (isReserved(y, x, size, version)) continue;
        
        // Get data bit
        if (dataIndex < dataBytes.length) {
          const bit = (dataBytes[dataIndex] >> (7 - bitIndex)) & 1;
          modules[y][x] = bit === 1;
          bitIndex++;
          if (bitIndex === 8) {
            bitIndex = 0;
            dataIndex++;
          }
        } else {
          // Random fill for remaining modules
          modules[y][x] = (y + x) % 2 === 0;
        }
      }
    }
  }
  
  // Apply mask pattern 0 (checkerboard)
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!isReserved(row, col, size, version)) {
        if ((row + col) % 2 === 0) {
          modules[row][col] = !modules[row][col];
        }
      }
    }
  }
  
  return { size, modules };
}

// Check if position is reserved (finder patterns, timing, etc.)
function isReserved(row: number, col: number, size: number, version: number): boolean {
  // Finder patterns + separators
  if (row <= 8 && col <= 8) return true;
  if (row <= 8 && col >= size - 8) return true;
  if (row >= size - 8 && col <= 8) return true;
  
  // Timing patterns
  if (row === 6 || col === 6) return true;
  
  // Alignment pattern (for version >= 2)
  if (version >= 2) {
    const alignPos = size - 7;
    if (Math.abs(row - alignPos) <= 2 && Math.abs(col - alignPos) <= 2) return true;
  }
  
  return false;
}

// Convert matrix to SVG path
export function matrixToSvgPath(matrix: QRMatrix, cellSize: number, margin: number): string {
  const { size, modules } = matrix;
  let path = '';
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (modules[row][col]) {
        const x = margin + col * cellSize;
        const y = margin + row * cellSize;
        path += `M${x},${y}h${cellSize}v${cellSize}h-${cellSize}z`;
      }
    }
  }
  
  return path;
}
