import { defineStories } from '@forgedevstack/kiln';
import { Image } from './Image';

export default defineStories({
  title: 'Image',
  component: Image,
  description: 'Enhanced image with lazy loading and fallback.',
  stories: [
    {
      name: 'Default',
      component: () => <Image src="https://placehold.co/200x150" alt="Placeholder" />,
      code: `<Image src="/photo.jpg" alt="Description" />`,
      description: 'Basic image',
    },
    {
      name: 'Object Fit',
      component: () => (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Image src="https://placehold.co/100" alt="Cover" fit="cover" width={100} height={80} />
          <Image src="https://placehold.co/100" alt="Contain" fit="contain" width={100} height={80} />
        </div>
      ),
      code: `<Image fit="cover" />
<Image fit="contain" />`,
      description: 'Different fit modes',
    },
    {
      name: 'With Fallback',
      component: () => <Image src="/broken.jpg" fallbackSrc="https://placehold.co/200x150" alt="Fallback" />,
      code: `<Image src="/broken.jpg" fallbackSrc="/placeholder.jpg" />`,
      description: 'Fallback on error',
    },
  ],
});

