import { defineStories } from '@forgedevstack/kiln';
import { AppBar } from './AppBar';

export default defineStories({
  title: 'AppBar',
  component: AppBar,
  description: 'Top navigation bar.',
  stories: [
    {
      name: 'Default',
      component: () => (
        <AppBar>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <span style={{ fontWeight: 'bold' }}>My App</span>
            <nav style={{ display: 'flex', gap: '1rem' }}>
              <a href="#">Home</a>
              <a href="#">About</a>
            </nav>
          </div>
        </AppBar>
      ),
      code: `<AppBar>
  <h1>My App</h1>
  <nav>...</nav>
</AppBar>`,
      description: 'Basic app bar',
    },
    {
      name: 'Primary Color',
      component: () => (
        <AppBar color="primary">
          <span style={{ fontWeight: 'bold', color: 'white' }}>Primary App Bar</span>
        </AppBar>
      ),
      code: `<AppBar color="primary">...</AppBar>`,
      description: 'Colored app bar',
    },
    {
      name: 'Transparent',
      component: () => (
        <AppBar color="transparent">
          <span>Transparent App Bar</span>
        </AppBar>
      ),
      code: `<AppBar color="transparent">...</AppBar>`,
      description: 'Transparent style',
    },
  ],
});

