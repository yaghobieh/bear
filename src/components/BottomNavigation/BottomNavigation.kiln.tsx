import { defineStories } from '@forgedevstack/kiln';
import { BottomNavigation } from './BottomNavigation';

export default defineStories({
  title: 'BottomNavigation',
  component: BottomNavigation,
  description: 'Mobile bottom navigation bar.',
  stories: [
    {
      name: 'Default',
      component: () => (
        <BottomNavigation
          items={[
            { icon: <span>🏠</span>, label: 'Home' },
            { icon: <span>🔍</span>, label: 'Search' },
            { icon: <span>❤️</span>, label: 'Favorites' },
            { icon: <span>👤</span>, label: 'Profile' },
          ]}
          activeItem={0}
        />
      ),
      code: `<BottomNavigation items={[
  { icon: <HomeIcon />, label: 'Home' },
  { icon: <SearchIcon />, label: 'Search' },
]} activeItem={0} />`,
      description: 'Basic bottom nav',
    },
    {
      name: 'Without Labels',
      component: () => (
        <BottomNavigation
          showLabels={false}
          items={[
            { icon: <span>🏠</span>, label: 'Home' },
            { icon: <span>🔍</span>, label: 'Search' },
            { icon: <span>❤️</span>, label: 'Favorites' },
          ]}
          activeItem={1}
        />
      ),
      code: `<BottomNavigation showLabels={false} items={[...]} />`,
      description: 'Icons only',
    },
  ],
});

