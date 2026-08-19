import type { PropRow } from '@/components/PropsTable';
import type { ConfirmDemoSettledResult } from './ModalsProvider.types';

export const MODALS_PROVIDER_TITLE = 'ModalsProvider';
export const MODALS_PROVIDER_BADGE = 'New';
export const MODALS_PROVIDER_IMPORT_NAME = 'ModalsProvider, useModals';
export const MODALS_PROVIDER_DEMO_GAP = 3 as const;
export const MODALS_PROVIDER_BODY_VARIANT = 'body2';
export const MODALS_PROVIDER_DANGER_VARIANT = 'danger';
export const MODALS_PROVIDER_PRIMARY_VARIANT = 'primary';

export const CONFIRM_DEMO_CONFIRMED: ConfirmDemoSettledResult = 'confirmed';
export const CONFIRM_DEMO_CANCELLED: ConfirmDemoSettledResult = 'cancelled';

export const CONFIRM_RESULT_TEXT_KEY: Record<ConfirmDemoSettledResult, string> = {
  [CONFIRM_DEMO_CONFIRMED]: 'modalsProviderConfirmed',
  [CONFIRM_DEMO_CANCELLED]: 'modalsProviderCancelled',
};

export const MODALS_PROVIDER_OPEN_CODE = `const { open, close } = useModals();

<Button onClick={() => open({
  title: 'Settings',
  children: <Typography>Opened with modals.open</Typography>,
})}>
  Open modal
</Button>`;

export const MODALS_PROVIDER_CONFIRM_CODE = `const { confirm } = useModals();

const accepted = await confirm({
  title: 'Delete item?',
  description: 'This cannot be undone.',
});`;

export const MODALS_PROVIDER_STACK_CODE = `const { open, confirm } = useModals();

open({
  title: 'First modal',
  children: (
    <Button onClick={() => confirm({ title: 'Delete item?' })}>
      Open confirm
    </Button>
  ),
});`;

export const MODALS_PROVIDER_PROPS: PropRow[] = [
  { name: 'children', type: 'ReactNode', description: 'App tree that can call useModals' },
  { name: 'translations', type: 'Partial<{ confirm: string; cancel: string }>', description: 'Default confirm and cancel labels' },
  { name: 'id', type: 'string', description: 'DOM id on the host' },
  { name: 'testId', type: 'string', description: 'data-testid on the host' },
];

export const MODALS_PROVIDER_METHOD_ROWS: PropRow[] = [
  { name: 'open(options)', type: 'string', description: 'Push a Modal onto the stack and return its id' },
  { name: 'confirm(options)', type: 'Promise<boolean>', description: 'Push a confirm Modal; resolves true on confirm' },
  { name: 'close(id?)', type: 'void', description: 'Close the given id, or the top modal' },
  { name: 'closeAll()', type: 'void', description: 'Close every stacked modal and reject pending confirms' },
];

export const MODALS_PROVIDER_OPEN_OPTION_ROWS: PropRow[] = [
  { name: 'children', type: 'ReactNode', description: 'Modal body' },
  { name: 'title', type: 'string', description: 'Header title' },
  { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: 'md', description: 'Modal size' },
  { name: 'footer', type: 'ReactNode', description: 'Footer slot' },
  { name: 'showCloseButton', type: 'boolean', default: 'true', description: 'Show the header close button' },
  { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Close when the backdrop is clicked' },
  { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Close on Escape' },
  { name: 'onClose', type: '() => void', description: 'Called after the modal is dismissed' },
  { name: 'id', type: 'string', description: 'Optional stack id; generated when omitted' },
  { name: 'testId', type: 'string', description: 'data-testid on the Modal' },
];

export const MODALS_PROVIDER_CONFIRM_OPTION_ROWS: PropRow[] = [
  { name: 'title', type: 'string', description: 'Confirm heading' },
  { name: 'description', type: 'ReactNode', description: 'Body copy or node' },
  { name: 'confirmText', type: 'string', description: 'Confirm button label' },
  { name: 'cancelText', type: 'string', description: 'Cancel button label' },
  { name: 'confirmVariant', type: 'BearVariant', default: 'danger', description: 'Confirm button variant' },
  { name: 'onConfirm', type: '() => void | Promise<void>', description: 'Runs before the promise resolves true' },
  { name: 'onCancel', type: '() => void', description: 'Called when the confirm is dismissed' },
  { name: 'id', type: 'string', description: 'Optional stack id; generated when omitted' },
  { name: 'testId', type: 'string', description: 'data-testid on the Modal' },
];
