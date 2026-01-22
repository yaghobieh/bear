import { defineStories } from '@forgedevstack/kiln';
import { TreeView } from './TreeView';

export default defineStories({
  title: 'TreeView',
  component: TreeView,
  description: 'Hierarchical tree structure display.',
  stories: [
    {
      name: 'Default',
      component: () => (
        <TreeView
          data={[
            { id: '1', label: 'Documents', children: [
              { id: '1-1', label: 'Projects' },
              { id: '1-2', label: 'Reports' },
            ]},
            { id: '2', label: 'Downloads' },
            { id: '3', label: 'Pictures' },
          ]}
        />
      ),
      code: `<TreeView data={[
  { id: '1', label: 'Documents', children: [...] },
  { id: '2', label: 'Downloads' },
]} />`,
      description: 'Basic tree view',
    },
    {
      name: 'Default Expanded',
      component: () => (
        <TreeView
          defaultExpanded={['1']}
          data={[
            { id: '1', label: 'Folder', children: [
              { id: '1-1', label: 'File A' },
              { id: '1-2', label: 'File B' },
            ]},
          ]}
        />
      ),
      code: `<TreeView defaultExpanded={['1']} data={[...]} />`,
      description: 'With expanded nodes',
    },
  ],
});

