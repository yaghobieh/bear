import type { ReactNode } from 'react';

export interface SandboxExample {
  label: string;
  path: string;
  category: string;
  code: string;
  preview: ReactNode;
}

export interface SandboxExampleGroup {
  category: string;
  items: SandboxExample[];
}

export interface SandboxFileMap {
  [path: string]: string;
}
