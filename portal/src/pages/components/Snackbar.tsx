import { FC, useRef, useState } from 'react';
import { Button, Snackbar, BearIcons } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';
import type { EditablePropsConfig } from '@/components/PropsControls/PropsControls.types';
import { SnackbarPlayground } from './SnackbarPlayground';

const PROPS = [
  { name: 'open', type: 'boolean', description: 'Whether the snackbar is visible' },
  { name: 'message', type: 'ReactNode', description: 'Primary message content' },
  { name: 'description', type: 'ReactNode', description: 'Secondary description below the message' },
  { name: 'action', type: 'ReactNode', description: 'Optional action button or link' },
  { name: 'autoHideDuration', type: 'number | null', default: '6000', description: 'Auto-dismiss after X milliseconds; null disables auto-hide' },
  { name: 'onClose', type: '() => void', description: 'Called on auto-hide, close button, or click outside' },
  { name: 'showCloseButton', type: 'boolean', default: 'true', description: 'Show Bear CloseButton when onClose is provided' },
  { name: 'closeOnClickOutside', type: 'boolean', default: 'true', description: 'Dismiss when clicking outside the snackbar' },
  { name: 'anchorOrigin', type: "{ vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' }", default: 'bottom center', description: 'Screen position' },
  { name: 'offsetX', type: 'number', default: '24', description: 'Horizontal offset in pixels' },
  { name: 'offsetY', type: 'number', default: '24', description: 'Vertical offset in pixels' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Padding size' },
  { name: 'progress', type: 'number | null', description: 'Static progress value 0–100 using Bear Progress' },
  { name: 'countdownProgress', type: 'boolean', default: 'false', description: 'Animate Progress with autoHideDuration countdown' },
  { name: 'progressPosition', type: "'top' | 'bottom'", default: "'bottom'", description: 'Progress bar placement' },
  { name: 'progressColor', type: "'default' | 'success' | 'warning' | 'danger' | 'info'", default: "'default'", description: 'Bear Progress color variant (primary palette)' },
  { name: 'container', type: 'Element | DocumentFragment | null', default: 'document.body', description: 'Portal mount target' },
  { name: 'id', type: 'string', description: 'DOM id — Bear_snackbar_* when omitted' },
  { name: 'testId', type: 'string', description: 'data-testid' },
  { name: 'className', type: 'string', description: 'Additional CSS classes on the surface' },
];

const PLAYGROUND_CONFIG: EditablePropsConfig = {
  message: { type: 'string', default: 'Changes saved', placeholder: 'Message' },
  description: { type: 'string', default: 'Your profile was updated successfully.', placeholder: 'Description' },
  vertical: {
    type: 'select',
    default: 'bottom',
    options: [
      { value: 'top', label: 'Top' },
      { value: 'bottom', label: 'Bottom' },
    ],
  },
  horizontal: {
    type: 'select',
    default: 'center',
    options: [
      { value: 'left', label: 'Left' },
      { value: 'center', label: 'Center' },
      { value: 'right', label: 'Right' },
    ],
  },
  offsetX: { type: 'number', default: 24, min: 0, max: 120 },
  offsetY: { type: 'number', default: 24, min: 0, max: 120 },
  size: {
    type: 'select',
    default: 'md',
    options: [
      { value: 'sm', label: 'Small' },
      { value: 'md', label: 'Medium' },
      { value: 'lg', label: 'Large' },
    ],
  },
  countdownProgress: { type: 'boolean', default: true },
  showProgress: { type: 'boolean', default: true },
  progress: { type: 'number', default: 65, min: 0, max: 100 },
  progressPosition: {
    type: 'select',
    default: 'bottom',
    options: [
      { value: 'top', label: 'Top' },
      { value: 'bottom', label: 'Bottom' },
    ],
  },
  progressColor: {
    type: 'select',
    default: 'default',
    options: [
      { value: 'default', label: 'Primary' },
      { value: 'success', label: 'Success' },
      { value: 'warning', label: 'Warning' },
      { value: 'danger', label: 'Danger' },
      { value: 'info', label: 'Info' },
    ],
  },
  autoHideDuration: { type: 'number', default: 6000, min: 1000, max: 15000 },
  showCloseButton: { type: 'boolean', default: true },
  closeOnClickOutside: { type: 'boolean', default: true },
};

const SnackbarPage: FC = () => {
  const [containerOpen, setContainerOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <DocPage
      title="Snackbar"
      badge="New"
      icon={<BearIcons.SnackbarIcon size={22} className="text-pink-500" />}
      description="Display brief messages with Bear Progress, theme colors, auto-hide timer, CloseButton dismiss, and click-outside support."
      componentName="Snackbar"
    >
      <ComponentPreview
        title="Live props"
        description="Progress uses Bear Progress with theme colors. Auto-closes after autoHideDuration. Dismiss via close icon or click outside."
        code={`<Snackbar
  open={open}
  message="Changes saved"
  description="Your profile was updated."
  autoHideDuration={6000}
  countdownProgress
  progressColor="default"
  showCloseButton
  closeOnClickOutside
  onClose={() => setOpen(false)}
/>`}
        editableProps={PLAYGROUND_CONFIG}
        render={(props) => <SnackbarPlayground props={props} />}
      />

      <ComponentPreview
        title="Custom container"
        description="Portal into a specific panel instead of document.body."
        code={`<div ref={panelRef} className="relative h-40" />
<Snackbar container={panelRef.current} open={open} message="Saved to panel" />`}
        render={() => (
          <>
            <Button variant="secondary" onClick={() => setContainerOpen(true)}>Show in panel</Button>
            <div
              ref={panelRef}
              className="relative h-40 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 overflow-hidden"
            />
            <Snackbar
              open={containerOpen}
              message="Saved inside panel"
              description="Mounted via container prop"
              container={panelRef.current}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              offsetX={16}
              offsetY={16}
              onClose={() => setContainerOpen(false)}
              autoHideDuration={4000}
              countdownProgress
              progressColor="default"
              closeOnClickOutside={false}
            />
          </>
        )}
      />

      <PropsTable title="API Reference" rows={PROPS} />
    </DocPage>
  );
};

export default SnackbarPage;
