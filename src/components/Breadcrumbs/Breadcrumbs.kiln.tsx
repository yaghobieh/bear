import { defineStories } from '@forgedevstack/kiln';
import { Breadcrumbs } from './Breadcrumbs';

export default defineStories({
  title: 'Breadcrumbs',
  component: Breadcrumbs,
  description: 'Navigation breadcrumb trail.',
  stories: [
    {
      name: 'Default',
      component: () => (
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Current' },
          ]}
        />
      ),
      code: `<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Current' },
]} />`,
      description: 'Basic breadcrumbs',
    },
    {
      name: 'Custom Separator',
      component: () => (
        <Breadcrumbs
          separator=">"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Settings' },
          ]}
        />
      ),
      code: `<Breadcrumbs separator=">" items={[...]} />`,
      description: 'With custom separator',
    },
    {
      name: 'Max Items',
      component: () => (
        <Breadcrumbs
          maxItems={3}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Category', href: '/cat' },
            { label: 'Subcategory', href: '/sub' },
            { label: 'Product', href: '/prod' },
            { label: 'Details' },
          ]}
        />
      ),
      code: `<Breadcrumbs maxItems={3} items={[...]} />`,
      description: 'Collapsed breadcrumbs',
    },
  ],
});

