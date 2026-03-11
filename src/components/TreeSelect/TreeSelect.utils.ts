import type { TreeNode } from './TreeSelect.types';

export const flattenNodes = (nodes: TreeNode[]): TreeNode[] =>
  nodes.reduce<TreeNode[]>((acc, n) => {
    acc.push(n);
    if (n.children) acc.push(...flattenNodes(n.children));
    return acc;
  }, []);

export const findNodeById = (nodes: TreeNode[], id: string): TreeNode | undefined => {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.children) {
      const found = findNodeById(n.children, id);
      if (found) return found;
    }
  }
  return undefined;
};

export const filterNodes = (nodes: TreeNode[], query: string): TreeNode[] => {
  const lower = query.toLowerCase();
  return nodes.reduce<TreeNode[]>((acc, node) => {
    const children = node.children ? filterNodes(node.children, query) : [];
    if (node.label.toLowerCase().includes(lower) || children.length > 0) {
      acc.push({ ...node, children: children.length > 0 ? children : node.children });
    }
    return acc;
  }, []);
};

export const collectAllIds = (nodes: TreeNode[]): Set<string> => {
  const set = new Set<string>();
  for (const n of nodes) {
    set.add(n.id);
    if (n.children) collectAllIds(n.children).forEach((id) => set.add(id));
  }
  return set;
};
