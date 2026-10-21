import { FC, useState } from 'react';
import { InkEditor } from '@forgedevstack/ink';
import '@forgedevstack/ink/styles.css';

const INK_PREVIEW_VALUE = '<p>Ink is the rich editor. Write here, then add a heading or a list.</p>';

export const InkPreview: FC = () => {
  const [value, setValue] = useState(INK_PREVIEW_VALUE);

  return (
    <InkEditor
      value={value}
      onChange={setValue}
      placeholder="Start writing..."
      minHeight={220}
    />
  );
};
