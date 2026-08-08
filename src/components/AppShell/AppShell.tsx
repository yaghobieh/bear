import { FC } from 'react';
import type { AppShellProps } from './AppShell.types';
import {
  APP_SHELL_ASIDE_CLASSES,
  APP_SHELL_BASE_CLASSES,
  APP_SHELL_BODY_CLASSES,
  APP_SHELL_DEFAULT_NAVBAR_COLLAPSED,
  APP_SHELL_DEFAULT_NAVBAR_WIDTH,
  APP_SHELL_DEFAULT_PADDING,
  APP_SHELL_DEFAULT_STICKY_FOOTER,
  APP_SHELL_DEFAULT_STICKY_HEADER,
  APP_SHELL_FOOTER_CLASSES,
  APP_SHELL_FOOTER_STICKY_CLASS,
  APP_SHELL_HEADER_CLASSES,
  APP_SHELL_HEADER_STICKY_CLASS,
  APP_SHELL_MAIN_CLASSES,
  APP_SHELL_MAIN_PADDING_CLASS,
  APP_SHELL_NAVBAR_BASE_CLASSES,
  APP_SHELL_NAVBAR_COLLAPSED_CLASS,
  APP_SHELL_NAVBAR_WIDTH_CLASSES,
  APP_SHELL_ROOT_CLASS,
} from './AppShell.const';
import { cn, resolveBearId, useBearId } from '@utils';

export const AppShell: FC<AppShellProps> = (props) => {
  const {
    header,
    navbar,
    aside,
    footer,
    children,
    navbarCollapsed = APP_SHELL_DEFAULT_NAVBAR_COLLAPSED,
    navbarWidth = APP_SHELL_DEFAULT_NAVBAR_WIDTH,
    stickyHeader = APP_SHELL_DEFAULT_STICKY_HEADER,
    stickyFooter = APP_SHELL_DEFAULT_STICKY_FOOTER,
    padding = APP_SHELL_DEFAULT_PADDING,
    className,
    id,
    testId,
    ...rest
  } = props;

  const generatedId = useBearId('AppShell');
  const domId = resolveBearId(id, generatedId);

  return (
    <div
      {...rest}
      id={domId}
      data-testid={testId}
      className={cn(APP_SHELL_ROOT_CLASS, APP_SHELL_BASE_CLASSES, className)}
    >
      {header && (
        <div
          className={cn(
            APP_SHELL_HEADER_CLASSES,
            stickyHeader && APP_SHELL_HEADER_STICKY_CLASS
          )}
        >
          {header}
        </div>
      )}
      <div className={APP_SHELL_BODY_CLASSES}>
        {navbar !== undefined && (
          <aside
            className={cn(
              APP_SHELL_NAVBAR_BASE_CLASSES,
              navbarCollapsed
                ? APP_SHELL_NAVBAR_COLLAPSED_CLASS
                : APP_SHELL_NAVBAR_WIDTH_CLASSES[navbarWidth]
            )}
            aria-hidden={navbarCollapsed || undefined}
          >
            {navbar}
          </aside>
        )}
        <main
          className={cn(
            APP_SHELL_MAIN_CLASSES,
            padding && APP_SHELL_MAIN_PADDING_CLASS
          )}
        >
          {children}
        </main>
        {aside && <aside className={APP_SHELL_ASIDE_CLASSES}>{aside}</aside>}
      </div>
      {footer && (
        <div
          className={cn(
            APP_SHELL_FOOTER_CLASSES,
            stickyFooter && APP_SHELL_FOOTER_STICKY_CLASS
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
};
