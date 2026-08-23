import { ZERO } from '@const';
import type { TreeNode } from './TreeSelect.types';

export const flattenNodes = (nodes: TreeNode[]): TreeNode[] =>
  nodes.reduce<TreeNode[]>((accumulator, node) => {
    accumulator.push(node);
    if (node.children) accumulator.push(...flattenNodes(node.children));
    return accumulator;
  }, []);

export const findNodeById = (nodes: TreeNode[], id: string): TreeNode | undefined => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return undefined;
};

export const filterNodes = (nodes: TreeNode[], query: string): TreeNode[] => {
  const lower = query.toLowerCase();
  return nodes.reduce<TreeNode[]>((accumulator, node) => {
    const children = node.children ? filterNodes(node.children, query) : [];
    if (node.label.toLowerCase().includes(lower) || children.length > ZERO) {
      accumulator.push({ ...node, children: children.length > ZERO ? children : node.children });
    }
    return accumulator;
  }, []);
};

export const collectAllIds = (nodes: TreeNode[]): Set<string> => {
  const ids = new Set<string>();
  for (const node of nodes) {
    ids.add(node.id);
    if (node.children) collectAllIds(node.children).forEach((childId) => ids.add(childId));
  }
  return ids;
};
