import type { DiffLine, DiffStats } from './DiffViewer.types';

/**
 * Simple diff algorithm (Myers-like LCS based)
 */
export function computeDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split('\n');
  const newLines = newText.split('\n');
  
  // Build LCS table
  const m = oldLines.length;
  const n = newLines.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  // Backtrack to find diff
  const result: DiffLine[] = [];
  let i = m;
  let j = n;
  const temp: DiffLine[] = [];
  
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      temp.push({
        type: 'context',
        oldLineNumber: i,
        newLineNumber: j,
        content: oldLines[i - 1],
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      temp.push({
        type: 'add',
        newLineNumber: j,
        content: newLines[j - 1],
      });
      j--;
    } else if (i > 0) {
      temp.push({
        type: 'remove',
        oldLineNumber: i,
        content: oldLines[i - 1],
      });
      i--;
    }
  }
  
  // Reverse to get correct order
  for (let k = temp.length - 1; k >= 0; k--) {
    result.push(temp[k]);
  }
  
  return result;
}

/**
 * Calculate diff statistics
 */
export function computeStats(diff: DiffLine[]): DiffStats {
  return diff.reduce(
    (acc, line) => {
      if (line.type === 'add') acc.additions++;
      else if (line.type === 'remove') acc.deletions++;
      else acc.unchanged++;
      return acc;
    },
    { additions: 0, deletions: 0, unchanged: 0 }
  );
}
