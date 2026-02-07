import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { EmojiPicker, Popover } from '@forgedevstack/bear';

const EmojiPickerPage: FC = () => {
  const [emoji, setEmoji] = useState('');

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">EmojiPicker</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Curated emoji picker with Bear emojis. Categories: Smileys, Gestures, Symbols, Objects, Nature.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { EmojiPicker } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic"
        description="Click an emoji to select."
        code={`<EmojiPicker onSelect={(emoji) => console.log(emoji)} />`}
      >
        <div className="flex flex-col gap-4 items-start">
          <EmojiPicker onSelect={(e) => setEmoji(e)} />
          {emoji && <p className="text-sm text-gray-600 dark:text-gray-400">Selected: {emoji}</p>}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="In Popover"
        description="Trigger emoji picker from a button."
        code={`<Popover content={<EmojiPicker onSelect={setEmoji} />}>
  <Button>Pick emoji</Button>
</Popover>`}
      >
        <div className="flex gap-2 items-center">
          <Popover content={<EmojiPicker onSelect={(e) => setEmoji(e)} />}>
            <button className="px-4 py-2 rounded-lg bg-bear-500 text-white text-sm hover:bg-bear-600">Pick emoji</button>
          </Popover>
          <span className="text-2xl">{emoji || '...'}</span>
        </div>
      </ComponentPreview>
    </div>
  );
};

export default EmojiPickerPage;
