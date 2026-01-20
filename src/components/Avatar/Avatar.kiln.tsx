import { defineStories } from '@forgedevstack/kiln';
import { Avatar, AvatarGroup } from './Avatar';

export default defineStories({
  title: 'Avatar',
  component: Avatar,
  description: 'Avatar component displays user profile images with fallback initials and customizable sizes.',
  stories: [
    {
      name: 'Default',
      component: () => <Avatar name="John Doe" />,
      args: { name: 'John Doe' },
      code: `<Avatar name="John Doe" />`,
      description: 'Basic avatar with initials fallback',
    },
    {
      name: 'With Image',
      component: () => (
        <Avatar 
          name="Jane Smith" 
          src="https://i.pravatar.cc/150?img=5" 
        />
      ),
      args: { name: 'Jane Smith', src: 'https://i.pravatar.cc/150?img=5' },
      code: `<Avatar 
  name="Jane Smith" 
  src="https://i.pravatar.cc/150?img=5" 
/>`,
      description: 'Avatar with profile image',
    },
    {
      name: 'Sizes',
      component: () => (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Avatar name="XS" size="xs" />
          <Avatar name="SM" size="sm" />
          <Avatar name="MD" size="md" />
          <Avatar name="LG" size="lg" />
          <Avatar name="XL" size="xl" />
        </div>
      ),
      code: `<Avatar name="XS" size="xs" />
<Avatar name="SM" size="sm" />
<Avatar name="MD" size="md" />
<Avatar name="LG" size="lg" />
<Avatar name="XL" size="xl" />`,
      description: 'Available avatar sizes',
    },
    {
      name: 'Colors',
      component: () => (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Avatar name="Primary" color="primary" />
          <Avatar name="Success" color="success" />
          <Avatar name="Warning" color="warning" />
          <Avatar name="Error" color="error" />
          <Avatar name="Info" color="info" />
        </div>
      ),
      code: `<Avatar name="Primary" color="primary" />
<Avatar name="Success" color="success" />
<Avatar name="Warning" color="warning" />
<Avatar name="Error" color="error" />
<Avatar name="Info" color="info" />`,
      description: 'Color variants for avatars',
    },
    {
      name: 'Rounded',
      component: () => (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Avatar name="Full" rounded="full" />
          <Avatar name="Large" rounded="lg" />
          <Avatar name="Medium" rounded="md" />
          <Avatar name="None" rounded="none" />
        </div>
      ),
      code: `<Avatar name="Full" rounded="full" />
<Avatar name="Large" rounded="lg" />
<Avatar name="Medium" rounded="md" />
<Avatar name="None" rounded="none" />`,
      description: 'Border radius options',
    },
    {
      name: 'Avatar Group',
      component: () => (
        <AvatarGroup max={3}>
          <Avatar name="John Doe" src="https://i.pravatar.cc/150?img=1" />
          <Avatar name="Jane Smith" src="https://i.pravatar.cc/150?img=2" />
          <Avatar name="Bob Johnson" src="https://i.pravatar.cc/150?img=3" />
          <Avatar name="Alice Brown" src="https://i.pravatar.cc/150?img=4" />
          <Avatar name="Charlie Wilson" src="https://i.pravatar.cc/150?img=5" />
        </AvatarGroup>
      ),
      code: `<AvatarGroup max={3}>
  <Avatar name="John Doe" src="https://i.pravatar.cc/150?img=1" />
  <Avatar name="Jane Smith" src="https://i.pravatar.cc/150?img=2" />
  <Avatar name="Bob Johnson" src="https://i.pravatar.cc/150?img=3" />
  <Avatar name="Alice Brown" src="https://i.pravatar.cc/150?img=4" />
  <Avatar name="Charlie Wilson" src="https://i.pravatar.cc/150?img=5" />
</AvatarGroup>`,
      description: 'Grouped avatars with overflow indicator',
    },
  ],
});

