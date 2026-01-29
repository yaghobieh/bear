import { defineStories } from '@forgedevstack/kiln';
import { ToastProvider, useToast } from './Toast';
import { Button } from '../Button';

// Demo components that use the toast hook
const ToastDemo = () => {
  const toast = useToast();
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button onClick={() => toast.success('Success!')}>Success</Button>
      <Button onClick={() => toast.error('Error!')}>Error</Button>
      <Button onClick={() => toast.warning('Warning!')}>Warning</Button>
      <Button onClick={() => toast.info('Info!')}>Info</Button>
    </div>
  );
};

const ToastWithTitleDemo = () => {
  const toast = useToast();
  return (
    <Button onClick={() => toast.toast({ 
      title: 'Notification', 
      message: 'This toast has a title',
      severity: 'info'
    })}>
      Show Toast with Title
    </Button>
  );
};

const ToastWithActionDemo = () => {
  const toast = useToast();
  return (
    <Button onClick={() => toast.toast({ 
      message: 'File deleted', 
      severity: 'warning',
      action: <Button size="sm" variant="ghost" onClick={() => alert('Undo clicked')}>Undo</Button>
    })}>
      Show Toast with Action
    </Button>
  );
};

export default defineStories({
  title: 'Toast',
  component: ToastProvider,
  description: 'Notification messages that appear temporarily. Use ToastProvider and useToast hook.',
  stories: [
    {
      name: 'Basic Usage',
      component: () => (
        <ToastProvider>
          <ToastDemo />
        </ToastProvider>
      ),
      code: `const toast = useToast();

<Button onClick={() => toast.success('Success!')}>Success</Button>
<Button onClick={() => toast.error('Error!')}>Error</Button>`,
      description: 'Click buttons to show different toast types',
    },
    {
      name: 'With Title',
      component: () => (
        <ToastProvider>
          <ToastWithTitleDemo />
        </ToastProvider>
      ),
      code: `toast.toast({ 
  title: 'Notification', 
  message: 'This toast has a title',
  severity: 'info'
})`,
      description: 'Toast with title and message',
    },
    {
      name: 'With Action',
      component: () => (
        <ToastProvider>
          <ToastWithActionDemo />
        </ToastProvider>
      ),
      code: `toast.toast({ 
  message: 'File deleted', 
  severity: 'warning',
  action: <Button>Undo</Button>
})`,
      description: 'Toast with action button',
    },
  ],
});
