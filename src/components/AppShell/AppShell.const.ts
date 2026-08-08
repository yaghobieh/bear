import type { AppShellNavbarWidth } from './AppShell.types';

export const APP_SHELL_ROOT_CLASS = 'Bear-AppShell';

export const APP_SHELL_DEFAULT_NAVBAR_COLLAPSED = false;

export const APP_SHELL_DEFAULT_NAVBAR_WIDTH: AppShellNavbarWidth = 'md';

export const APP_SHELL_DEFAULT_STICKY_HEADER = true;

export const APP_SHELL_DEFAULT_STICKY_FOOTER = false;

export const APP_SHELL_DEFAULT_PADDING = true;

export const APP_SHELL_BASE_CLASSES =
  'bear-flex bear-flex-col bear-min-h-0 bear-w-full bear-bg-[var(--bear-bg-primary)] bear-text-[var(--bear-text-primary)]';

export const APP_SHELL_BODY_CLASSES = `${APP_SHELL_ROOT_CLASS}__body bear-flex bear-flex-1 bear-min-h-0 bear-w-full`;

export const APP_SHELL_HEADER_CLASSES = `${APP_SHELL_ROOT_CLASS}__header bear-w-full bear-z-30 bear-bg-[var(--bear-bg-primary)] bear-border-b bear-border-[var(--bear-border-default)]`;

export const APP_SHELL_HEADER_STICKY_CLASS = 'bear-sticky bear-top-0';

export const APP_SHELL_NAVBAR_BASE_CLASSES = `${APP_SHELL_ROOT_CLASS}__navbar bear-flex-shrink-0 bear-overflow-y-auto bear-border-e bear-border-[var(--bear-border-default)] bear-bg-[var(--bear-bg-secondary)]`;

export const APP_SHELL_NAVBAR_WIDTH_CLASSES: Record<AppShellNavbarWidth, string> = {
  sm: 'bear-w-56',
  md: 'bear-w-64',
  lg: 'bear-w-72',
};

export const APP_SHELL_NAVBAR_COLLAPSED_CLASS = 'bear-w-0 bear-overflow-hidden bear-border-e-0';

export const APP_SHELL_MAIN_CLASSES = `${APP_SHELL_ROOT_CLASS}__main bear-flex-1 bear-min-w-0 bear-overflow-auto`;

export const APP_SHELL_MAIN_PADDING_CLASS = 'bear-p-4 md:bear-p-6';

export const APP_SHELL_ASIDE_CLASSES = `${APP_SHELL_ROOT_CLASS}__aside bear-w-64 bear-flex-shrink-0 bear-overflow-y-auto bear-border-s bear-border-[var(--bear-border-default)] bear-bg-[var(--bear-bg-secondary)] bear-hidden lg:bear-block`;

export const APP_SHELL_FOOTER_CLASSES = `${APP_SHELL_ROOT_CLASS}__footer bear-w-full bear-z-20 bear-bg-[var(--bear-bg-primary)] bear-border-t bear-border-[var(--bear-border-default)]`;

export const APP_SHELL_FOOTER_STICKY_CLASS = 'bear-sticky bear-bottom-0';
