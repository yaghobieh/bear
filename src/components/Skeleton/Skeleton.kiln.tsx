import { defineStories } from '@forgedevstack/kiln';
import { Skeleton } from './Skeleton';

export default defineStories({
  title: 'Skeleton',
  component: Skeleton,
  description: 'Loading placeholder for content.',
  stories: [
    {
      name: 'Default',
      component: () => <Skeleton width={200} height={20} />,
      code: `<Skeleton width={200} height={20} />`,
      description: 'Basic skeleton',
    },
    {
      name: 'Variants',
      component: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Skeleton variant="text" width={200} />
          <Skeleton variant="circular" width={50} height={50} />
          <Skeleton variant="rectangular" width={200} height={100} />
        </div>
      ),
      code: `<Skeleton variant="text" />
<Skeleton variant="circular" width={50} height={50} />
<Skeleton variant="rectangular" />`,
      description: 'Different shapes',
    },
    {
      name: 'Card Layout',
      component: () => (
        <div style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
          <Skeleton variant="circular" width={48} height={48} />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
          </div>
        </div>
      ),
      code: `<Skeleton variant="circular" />
<Skeleton variant="text" />`,
      description: 'Loading card',
    },
  ],
});

