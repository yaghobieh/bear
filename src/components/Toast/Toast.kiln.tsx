import { defineStories } from '@forgedevstack/kiln';
import { Toast } from './Toast';

export default defineStories({
  title: 'Toast',
  component: Toast,
  description: 'Notification messages that appear temporarily.',
  stories: [
    {
      name: 'Default',
      component: () => <Toast message="This is a toast message" />,
      code: `<Toast message="This is a toast message" />`,
      description: 'Basic toast',
    },
    {
      name: 'Variants',
      component: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Toast variant="success" message="Success message" />
          <Toast variant="error" message="Error message" />
          <Toast variant="warning" message="Warning message" />
          <Toast variant="info" message="Info message" />
        </div>
      ),
      code: `<Toast variant="success" message="Success!" />
<Toast variant="error" message="Error!" />`,
      description: 'Different toast types',
    },
    {
      name: 'With Action',
      component: () => (
        <Toast 
          message="File deleted" 
          action={<button style={{ color: '#E85D04', fontWeight: 'bold' }}>Undo</button>}
        />
      ),
      code: `<Toast message="Deleted" action={<Button>Undo</Button>} />`,
      description: 'Toast with action button',
    },
  ],
});

