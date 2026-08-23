import { useEffect, useState, useCallback, useRef } from 'react';
import {
  ANCHOR_OBSERVER_THRESHOLDS,
  BOOLEAN_FALSE,
  KEY_ENTER,
  ROOT_MARGIN_BOTTOM_HALF,
  SCROLL_BEHAVIOR_SMOOTH,
  UNIT_PX,
  ZERO,
} from '@const';
import { cn } from '@utils';
import { Typography } from '../Typography';
import type { AnchorProps, AnchorLink } from './Anchor.types';
import { collectIds } from './Anchor.utils';

export const Anchor = (props: AnchorProps) => {
  const {
    links,
    offset = ZERO,
    affix = BOOLEAN_FALSE,
    affixTop = ZERO,
    targetOffset = ZERO,
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
        window.scrollTo({ top, behavior: SCROLL_BEHAVIOR_SMOOTH });
      }
      onClick?.(id);
    },
    [targetOffset, onClick]
  );

  useEffect(() => {
    if (ids.length === ZERO) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const aTop = a.boundingClientRect.top;
            const bTop = b.boundingClientRect.top;
            return Math.abs(aTop - offset) - Math.abs(bTop - offset);
          });
        if (visible.length > ZERO) {
          const first = visible[ZERO];
          const id = (first.target as HTMLElement).id;
          if (ids.includes(id)) {
            setActiveId(id);
          }
        }
      },
      {
        rootMargin: `-${offset}${UNIT_PX} ${ZERO}${UNIT_PX} ${ROOT_MARGIN_BOTTOM_HALF} ${ZERO}${UNIT_PX}`,
        threshold: ANCHOR_OBSERVER_THRESHOLDS,
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observerRef.current?.observe(el);
      }
    });

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [ids.join(','), offset]);

  const renderLink = (link: AnchorLink, isNested: boolean) => {
    const isActive = activeId === link.id;
    return (
      <div key={link.id} className={cn(isNested && 'bear-pl-4')}>
        <div
          role="button"
          tabIndex={ZERO}
          onClick={() => scrollTo(link.id)}
          onKeyDown={(e) => e.key === KEY_ENTER && scrollTo(link.id)}
          className={cn(
            'bear-py-1 bear-px-2 bear-text-sm bear-transition-colors bear-cursor-pointer bear-rounded bear-text-gray-600 dark:bear-text-zinc-400 hover:bear-text-gray-900 dark:hover:bear-text-zinc-100',
            isActive && 'bear-text-primary-500 dark:bear-text-primary-400 bear-font-medium bear-border-l-2 bear-border-primary-500 dark:bear-border-primary-400 bear-pl-3 bear--ml-0.5'
          )}
        >
          <Typography variant="body2" className={cn(isActive && 'bear-font-medium')}>
            {link.label}
          </Typography>
        </div>
        {link.children?.map((child) => renderLink(child, true))}
      </div>
    );
  };

  return (
    <nav
      className={cn('Bear-Anchor bear-flex bear-flex-col', affix && 'bear-sticky', className)}
      style={affix ? { top: affixTop } : undefined}
      data-testid={testId}
      {...rest}
    >
      {links.map((link) => renderLink(link, BOOLEAN_FALSE))}
    </nav>
  );
};

export default Anchor;
