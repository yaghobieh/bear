import { defineStories } from '@forgedevstack/kiln';
import { useState } from 'react';
import { RichEditor } from './RichEditor';

const FullFeaturedDemo = () => {
  const [value, setValue] = useState('<p>Start editing here...</p>');
  return (
    <RichEditor
      value={value}
      onChange={setValue}
      placeholder="Start typing..."
    />
  );
};

const SimpleDemo = () => {
  const [value, setValue] = useState('');
  return (
    <RichEditor
      value={value}
      onChange={setValue}
      toolbar={['bold', 'italic', 'underline', 'strikethrough']}
      placeholder="Format your text..."
    />
  );
};

const HeadingsListsDemo = () => {
  const [value, setValue] = useState('');
  return (
    <RichEditor
      value={value}
      onChange={setValue}
      toolbar={[
        'headingDropdown',
        'divider',
        'bulletList', 'orderedList',
        'divider',
        'bold', 'italic'
      ]}
      placeholder="Write your article..."
    />
  );
};

const ColorsDemo = () => {
  const [value, setValue] = useState('<p>Try changing <span style="color: #ec4899;">text colors</span> and <span style="background-color: #fef08a;">highlights</span>!</p>');
  return (
    <RichEditor
      value={value}
      onChange={setValue}
      toolbar={[
        'bold', 'italic', 'underline',
        'divider',
        'textColor', 'highlightColor',
      ]}
    />
  );
};

const AlignmentDemo = () => {
  const [value, setValue] = useState('<p>Left aligned text</p><p style="text-align: center;">Center aligned text</p><p style="text-align: right;">Right aligned text</p>');
  return (
    <RichEditor
      value={value}
      onChange={setValue}
      toolbar={[
        'alignLeft', 'alignCenter', 'alignRight', 'alignJustify',
        'divider',
        'bold', 'italic'
      ]}
    />
  );
};

const ReadOnlyDemo = () => (
  <RichEditor
    value="<h2>Welcome!</h2><p>This is <strong>read-only</strong> content with <em>formatting</em>.</p><ul><li>Feature one</li><li>Feature two</li></ul>"
    readOnly
  />
);

const DisabledDemo = () => (
  <RichEditor
    value="<p>This content is <strong>disabled</strong> and cannot be edited.</p>"
    disabled
  />
);

export default defineStories({
  title: 'Form/RichEditor',
  description: 'WYSIWYG rich text editor with formatting toolbar, heading styles, colors, lists, links, and image support.',
  stories: [
    {
      name: 'Full Featured',
      component: FullFeaturedDemo,
      description: 'Complete editor with all formatting options.',
      code: `const [value, setValue] = useState('<p>Start editing...</p>');

<RichEditor
  value={value}
  onChange={setValue}
  placeholder="Start typing..."
/>`,
    },
    {
      name: 'Simple Formatting',
      component: SimpleDemo,
      description: 'Minimal toolbar with basic text formatting.',
      code: `<RichEditor
  toolbar={['bold', 'italic', 'underline', 'strikethrough']}
  placeholder="Format your text..."
/>`,
    },
    {
      name: 'Headings & Lists',
      component: HeadingsListsDemo,
      description: 'Heading dropdown with bullet and numbered lists.',
      code: `<RichEditor
  toolbar={[
    'headingDropdown',
    'divider',
    'bulletList', 'orderedList',
    'divider',
    'bold', 'italic'
  ]}
/>`,
    },
    {
      name: 'Text & Highlight Colors',
      component: ColorsDemo,
      description: 'Color pickers for text and background.',
      code: `<RichEditor
  toolbar={[
    'bold', 'italic', 'underline',
    'divider',
    'textColor', 'highlightColor',
  ]}
/>`,
    },
    {
      name: 'Alignment',
      component: AlignmentDemo,
      description: 'Text alignment options.',
      code: `<RichEditor
  toolbar={[
    'alignLeft', 'alignCenter', 'alignRight', 'alignJustify',
    'divider',
    'bold', 'italic'
  ]}
/>`,
    },
    {
      name: 'Read-Only',
      component: ReadOnlyDemo,
      description: 'Display rich content without editing.',
      code: `<RichEditor
  value="<h2>Welcome!</h2><p>Read-only content...</p>"
  readOnly
/>`,
    },
    {
      name: 'Disabled',
      component: DisabledDemo,
      description: 'Completely disabled editor.',
      code: `<RichEditor
  value="<p>Disabled content...</p>"
  disabled
/>`,
    },
  ],
});

