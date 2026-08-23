import type { AppShellProps } from './AppShell.types';
import { APP_SHELL_NAVBAR_WIDTH_CLASSES } from './AppShell.const';
import {
  BOOLEAN_FALSE,
  BOOLEAN_TRUE,
  COMPONENT_NAME_APP_SHELL,
  SIZE_MD,
} from '@const';
import { cn, resolveBearId, useBearId } from '@utils';

export const AppShell = (props: AppShellProps) => {
  const {
    header,
    navbar,
    aside,
    footer,
    children,
    navbarCollapsed = BOOLEAN_FALSE,
    navbarWidth = SIZE_MD,
    stickyHeader = BOOLEAN_TRUE,
    stickyFooter = BOOLEAN_FALSE,
    padding = BOOLEAN_TRUE,
    className,
    id,
    testId,
    ...rest
  } = props;

  const generatedId = useBearId(COMPONENT_NAME_APP_SHELL);
  const domId = resolveBearId(id, generatedId);

  return (
    <div
      {...rest}
      id={domId}
      data-testid={testId}
      className={cn(
        'Bear-AppShell bear-flex bear-flex-col bear-min-h-0 bear-w-full bear-bg-[var(--bear-bg-primary)] bear-text-[var(--bear-text-primary)]',
        className
      )}
    >
      {header && (
        <div
          className={cn(
            'Bear-AppShell__header bear-w-full bear-z-30 bear-bg-[var(--bear-bg-primary)] bear-border-b bear-border-[var(--bear-border-default)]',
            stickyHeader && 'bear-sticky bear-top-0'
          )}
        >
          {header}
        </div>
      )}
      <div className="Bear-AppShell__body bear-flex bear-flex-1 bear-min-h-0 bear-w-full">
        {navbar !== undefined && (
          <aside
            className={cn(
              'Bear-AppShell__navbar bear-flex-shrink-0 bear-overflow-y-auto bear-border-e bear-border-[var(--bear-border-default)] bear-bg-[var(--bear-bg-secondary)]',
              navbarCollapsed
                ? 'bear-w-0 bear-overflow-hidden bear-border-e-0'
                : APP_SHELL_NAVBAR_WIDTH_CLASSES[navbarWidth]
            )}
            aria-hidden={navbarCollapsed || undefined}
          >
            {navbar}
          </aside>
        )}
        <main
          className={cn(
            'Bear-AppShell__main bear-flex-1 bear-min-w-0 bear-overflow-auto',
            padding && 'bear-p-4 md:bear-p-6'
          )}
        >
          {children}
        </main>
        {aside && (
          <aside className="Bear-AppShell__aside bear-w-64 bear-flex-shrink-0 bear-overflow-y-auto bear-border-s bear-border-[var(--bear-border-default)] bear-bg-[var(--bear-bg-secondary)] bear-hidden lg:bear-block">
            {aside}
          </aside>
        )}
      </div>
      {footer && (
        <div
          className={cn(
            'Bear-AppShell__footer bear-w-full bear-z-20 bear-bg-[var(--bear-bg-primary)] bear-border-t bear-border-[var(--bear-border-default)]',
            stickyFooter && 'bear-sticky bear-bottom-0'
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
};
