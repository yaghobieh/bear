import { defineStories } from '@forgedevstack/kiln';
import { Statistic } from './Statistic';

export default defineStories({
  title: 'Statistic',
  component: Statistic,
  description: 'Display key metrics and statistics.',
  stories: [
    {
      name: 'Default',
      component: () => <Statistic label="Total Users" value="1,234" />,
      code: `<Statistic label="Total Users" value="1,234" />`,
      description: 'Basic statistic',
    },
    {
      name: 'With Trend',
      component: () => <Statistic label="Revenue" value="$45,678" trend="+12.5%" trendColor="success" />,
      code: `<Statistic label="Revenue" value="$45,678" trend="+12.5%" />`,
      description: 'With trend indicator',
    },
    {
      name: 'Multiple',
      component: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <Statistic label="Users" value="8,234" />
          <Statistic label="Orders" value="892" />
          <Statistic label="Revenue" value="$45K" />
        </div>
      ),
      code: `<Statistic label="Users" value="8,234" />`,
      description: 'Dashboard layout',
    },
  ],
});

