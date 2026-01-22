import { defineStories } from '@forgedevstack/kiln';
import { Pagination } from './Pagination';

export default defineStories({
  title: 'Pagination',
  component: Pagination,
  description: 'Navigate through pages of content.',
  stories: [
    {
      name: 'Default',
      component: () => <Pagination count={10} page={1} />,
      code: `<Pagination count={10} page={1} onChange={setPage} />`,
      description: 'Basic pagination',
    },
    {
      name: 'With First/Last',
      component: () => <Pagination count={20} page={5} showFirstLast />,
      code: `<Pagination count={20} showFirstLast />`,
      description: 'First and last buttons',
    },
    {
      name: 'Variants',
      component: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Pagination count={10} variant="text" />
          <Pagination count={10} variant="outlined" />
          <Pagination count={10} variant="contained" />
        </div>
      ),
      code: `<Pagination variant="text" />
<Pagination variant="outlined" />`,
      description: 'Different styles',
    },
  ],
});

