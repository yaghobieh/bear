import type { AnchorLink } from './Anchor.types';

export function collectIds(links: AnchorLink[]): string[] {
  const ids: string[] = [];
  const walk = (items: AnchorLink[]) => {
    items.forEach((item) => {
      ids.push(item.id);
      if (item.children?.length) walk(item.children);
    });
  };
  walk(links);
  return ids;
}
