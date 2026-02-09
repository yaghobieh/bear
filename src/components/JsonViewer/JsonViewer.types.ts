/**
 * JsonViewer component types
 */

export interface JsonViewerProps {
  /** JSON data to display */
  data: unknown;
  /** Number of levels to expand by default (default: 2) */
  defaultExpandDepth?: number;
  /** Expand all nodes */
  expandAll?: boolean;
  /** Collapse all nodes */
  collapseAll?: boolean;
  /** Show data types */
  showDataTypes?: boolean;
  /** Show array indices */
  showArrayIndices?: boolean;
  /** Show copy button */
  showCopyButton?: boolean;
  /** Enable search */
  enableSearch?: boolean;
  /** Custom theme colors */
  theme?: JsonViewerTheme;
  /** Root name (default: 'root') */
  rootName?: string | false;
  /** Callback when a value is clicked */
  onValueClick?: (path: string[], value: unknown) => void;
  /** Callback when copied */
  onCopy?: (value: unknown) => void;
  /** Custom class name */
  className?: string;
  /** Test ID */
  testId?: string;
}

export interface JsonViewerTheme {
  background?: string;
  text?: string;
  string?: string;
  number?: string;
  boolean?: string;
  null?: string;
  key?: string;
  bracket?: string;
  punctuation?: string;
}

export interface JsonNodeProps {
  name: string | number;
  value: unknown;
  path: string[];
  depth: number;
  defaultExpandDepth: number;
  showDataTypes: boolean;
  showArrayIndices: boolean;
  onValueClick?: (path: string[], value: unknown) => void;
}
