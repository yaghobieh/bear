import { FC, useEffect, useState, useCallback, useRef } from 'react';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { AnchorProps, AnchorLink } from './Anchor.types';
import {
  ROOT_CLASS,
  DEFAULT_OFFSET,
  DEFAULT_AFFIX_TOP,
  DEFAULT_TARGET_OFFSET,
  ROOT_CLASSES,
  LINK_CLASSES,
  ACTIVE_LINK_CLASSES,
  NESTED_LINK_INDENT,
} from './Anchor.const';

function collectIds(links: AnchorLink[]): string[] {
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

export const Anchor: FC<AnchorProps> = (props) => {
  const {
    links,
    offset = DEFAULT_OFFSET,
    affix = false,
    affixTop = DEFAULT_AFFIX_TOP,
    targetOffset = DEFAULT_TARGET_OFFSET,
    onClick,
    className,
    testId,
    ...rest
  } = props;

  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const ids = collectIds(links);

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - targetOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      onClick?.(id);
    },
    [targetOffset, onClick]
  );

  useEffect(() => {
    if (ids.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const aTop = a.boundingClientRect.top;
            const bTop = b.boundingClientRect.top;
            return Math.abs(aTop - offset) - Math.abs(bTop - offset);
          });
        if (visible.length > 0) {
          const first = visible[0];
          const id = (first.target as HTMLElement).id;
          if (ids.includes(id)) setActiveId(id);
        }
      },
      { rootMargin: `-${offset}px 0px -50% 0px`, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [ids.join(','), offset]);

  const renderLink = (link: AnchorLink, isNested: boolean) => {
    const isActive = activeId === link.id;
    return (
      <div key={link.id} className={cn(isNested && NESTED_LINK_INDENT)}>
        <div
          role="button"
          tabIndex={0}
          onClick={() => scrollTo(link.id)}
          onKeyDown={(e) => e.key === 'Enter' && scrollTo(link.id)}
          className={cn(LINK_CLASSES, isActive && ACTIVE_LINK_CLASSES)}
        >
          <Typography variant="body2" className={cn(isActive && 'bear-font-medium')}>
            {link.label}
          </Typography>
        </div>
        {link.children?.map((child) => renderLink(child, true))}
      </div>
    );
  };

  const rootClasses = cn(ROOT_CLASS, ROOT_CLASSES, affix && 'bear-sticky', className);

  return (
    <nav
      className={rootClasses}
      style={affix ? { top: affixTop } : undefined}
      data-testid={testId}
      {...rest}
    >
      {links.map((link) => renderLink(link, false))}
    </nav>
  );
};

export default Anchor;
