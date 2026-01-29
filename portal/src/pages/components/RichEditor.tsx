import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';
import { KilnLink } from '@/components/KilnLink';
import { LinesOfCode } from '@/components/LinesOfCode';
import { RichEditor, Button, Card } from '@forgedevstack/bear';

const RichEditorPage: FC = () => {
  const [basicValue, setBasicValue] = useState('<p>Start editing here...</p>');
  const [customHeightValue, setCustomHeightValue] = useState('');
  const [formValue, setFormValue] = useState('');
  const [htmlOutput, setHtmlOutput] = useState('<p>Type to see HTML output...</p>');
  const [colorValue, setColorValue] = useState('<p>Try changing <span style="color: #ec4899;">text colors</span> and <span style="background-color: #fef08a;">highlights</span>!</p>');

  return (
    <div className="fade-in">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">RichEditor</h1>
        <KilnLink path="/rich-editor" />
        <LinesOfCode lines={500} />
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        A full-featured WYSIWYG rich text editor with formatting toolbar, heading styles, colors, lists, links, and image paste support.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock
          code={`import { RichEditor } from '@forgedevstack/bear';`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      <ComponentPreview
        title="Full Featured Editor"
        description="Complete editor with heading dropdown, text/highlight colors, formatting, lists, and more."
        code={`const [value, setValue] = useState('<p>Start editing...</p>');

<RichEditor
  value={value}
  onChange={setValue}
  placeholder="Start typing..."
/>`}
      >
        <RichEditor
          value={basicValue}
          onChange={setBasicValue}
          placeholder="Start typing..."
        />
      </ComponentPreview>

      <ComponentPreview
        title="Text & Highlight Colors"
        description="Change text color and add highlights to your content."
        code={`<RichEditor
  value={value}
  onChange={setValue}
  toolbar={[
    'headingDropdown',
    'divider',
    'bold', 'italic', 'underline',
    'divider',
    'textColor', 'highlightColor',
  ]}
/>`}
      >
        <RichEditor
          value={colorValue}
          onChange={setColorValue}
          toolbar={[
            'headingDropdown',
            'divider',
            'bold', 'italic', 'underline',
            'divider',
            'textColor', 'highlightColor',
          ]}
        />
      </ComponentPreview>

      <ComponentPreview
        title="Custom Height"
        description="Control the editor's minimum and maximum height for different use cases."
        code={`<RichEditor
  value={value}
  onChange={setValue}
  minHeight={200}
  maxHeight={400}
  placeholder="Write something..."
/>`}
      >
        <RichEditor
          value={customHeightValue}
          onChange={setCustomHeightValue}
          minHeight={200}
          maxHeight={400}
          placeholder="Write something long..."
        />
      </ComponentPreview>

      <ComponentPreview
        title="Simple Text Formatting"
        description="A minimal toolbar with just text formatting options."
        code={`<RichEditor
  toolbar={['bold', 'italic', 'underline', 'strikethrough']}
  placeholder="Format your text..."
/>`}
      >
        <RichEditor
          toolbar={['bold', 'italic', 'underline', 'strikethrough']}
          placeholder="Format your text..."
        />
      </ComponentPreview>

      <ComponentPreview
        title="Headings & Lists"
        description="Use the dropdown to select H1-H5 headings or paragraph text, plus bullet and numbered lists."
        code={`<RichEditor
  toolbar={[
    'headingDropdown',
    'divider',
    'bulletList', 'orderedList',
    'divider',
    'bold', 'italic'
  ]}
  placeholder="Write your article..."
/>`}
      >
        <RichEditor
          toolbar={[
            'headingDropdown',
            'divider',
            'bulletList', 'orderedList',
            'divider',
            'bold', 'italic'
          ]}
          placeholder="Write your article..."
        />
      </ComponentPreview>

      <ComponentPreview
        title="Code & Quotes"
        description="For technical documentation with code blocks, blockquotes, and links."
        code={`<RichEditor
  toolbar={[
    'bold', 'italic',
    'divider',
    'code', 'blockquote',
    'divider',
    'link'
  ]}
  placeholder="Write technical docs..."
/>`}
      >
        <RichEditor
          toolbar={[
            'bold', 'italic',
            'divider',
            'code', 'blockquote',
            'divider',
            'link'
          ]}
          placeholder="Write technical docs..."
        />
      </ComponentPreview>

      <ComponentPreview
        title="Image Paste Support"
        description="Paste images directly from clipboard (Ctrl+V). Images are embedded as base64."
        code={`<RichEditor
  allowImagePaste={true}
  placeholder="Paste an image from clipboard..."
/>`}
      >
        <RichEditor
          allowImagePaste={true}
          placeholder="Paste an image from clipboard (Ctrl+V)..."
          minHeight={200}
        />
      </ComponentPreview>

      <ComponentPreview
        title="HTML Output Preview"
        description="See the HTML output as you type. Useful for debugging or learning."
        code={`const [value, setValue] = useState('');

<RichEditor value={value} onChange={setValue} />
<CodeBlock code={value} language="html" />`}
      >
        <div className="space-y-4">
          <RichEditor
            value={htmlOutput}
            onChange={setHtmlOutput}
            placeholder="Type to see HTML..."
            minHeight={100}
          />
          <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">HTML Output:</p>
            <pre className="text-xs text-gray-800 dark:text-gray-200 overflow-x-auto whitespace-pre-wrap break-all font-mono">
              {htmlOutput}
            </pre>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="In a Form"
        description="Use the editor as part of a form with other components."
        code={`<form onSubmit={handleSubmit}>
  <label>Article Content</label>
  <RichEditor
    value={formValue}
    onChange={setFormValue}
    minHeight={150}
  />
  <Button type="submit">Publish</Button>
</form>`}
      >
        <Card className="p-4">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Published!'); }}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Article Title
              </label>
              <input 
                type="text" 
                placeholder="Enter title..." 
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content
              </label>
              <RichEditor
                value={formValue}
                onChange={setFormValue}
                minHeight={150}
                placeholder="Write your article content..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" type="button">Save Draft</Button>
              <Button type="submit">Publish</Button>
            </div>
          </form>
        </Card>
      </ComponentPreview>

      <ComponentPreview
        title="Read-Only Mode"
        description="Display rich content without editing capability."
        code={`<RichEditor
  value="<h2>Welcome!</h2><p>This is <strong>read-only</strong> content.</p>"
  readOnly
/>`}
      >
        <RichEditor
          value="<h2>Welcome!</h2><p>This is <strong>read-only</strong> content with <em>formatting</em>. You can use this to display rich text without editing.</p><ul><li>Feature one</li><li>Feature two</li><li>Feature three</li></ul>"
          readOnly
        />
      </ComponentPreview>

      <ComponentPreview
        title="Disabled State"
        description="Completely disabled editor - no interaction allowed."
        code={`<RichEditor
  value="<p>This content is <strong>disabled</strong>.</p>"
  disabled
/>`}
      >
        <RichEditor
          value="<p>This content is <strong>disabled</strong> and cannot be edited.</p>"
          disabled
        />
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Default</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Controlled HTML content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">defaultValue</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">''</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Initial HTML content (uncontrolled)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">(value: string) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Called when content changes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">placeholder</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">'Start typing...'</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Placeholder text when empty</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">disabled</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Completely disables the editor</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">readOnly</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Allows viewing but not editing</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">minHeight</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">string | number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">150</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Minimum editor height in pixels</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">maxHeight</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">string | number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Maximum height (enables scroll)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">toolbar</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">ToolbarOption[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">full toolbar</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Toolbar buttons to display</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">allowImagePaste</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Enable pasting images from clipboard</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600 dark:text-pink-400">className</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Additional CSS classes</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Toolbar Options</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Customize the toolbar by passing an array of these options:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { option: 'headingDropdown', description: 'H1-H6 & paragraph dropdown' },
            { option: 'bold', description: 'Bold text' },
            { option: 'italic', description: 'Italic text' },
            { option: 'underline', description: 'Underlined text' },
            { option: 'strikethrough', description: 'Strikethrough' },
            { option: 'textColor', description: 'Text color picker' },
            { option: 'highlightColor', description: 'Highlight color picker' },
            { option: 'alignLeft', description: 'Align left' },
            { option: 'alignCenter', description: 'Align center' },
            { option: 'alignRight', description: 'Align right' },
            { option: 'alignJustify', description: 'Justify text' },
            { option: 'bulletList', description: 'Bulleted list' },
            { option: 'orderedList', description: 'Numbered list' },
            { option: 'indent', description: 'Increase indent' },
            { option: 'outdent', description: 'Decrease indent' },
            { option: 'blockquote', description: 'Quote block' },
            { option: 'code', description: 'Code block' },
            { option: 'link', description: 'Insert link' },
            { option: 'image', description: 'Insert image' },
            { option: 'clearFormat', description: 'Clear formatting' },
            { option: 'divider', description: 'Visual separator' },
          ].map(({ option, description }) => (
            <div key={option} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <code className="text-sm text-pink-600 dark:text-pink-400 font-mono">'{option}'</code>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Keyboard Shortcuts</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          These shortcuts work even when the toolbar is hidden:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { keys: 'Ctrl/Cmd + B', action: 'Bold' },
            { keys: 'Ctrl/Cmd + I', action: 'Italic' },
            { keys: 'Ctrl/Cmd + U', action: 'Underline' },
            { keys: 'Ctrl/Cmd + V', action: 'Paste (with image support)' },
          ].map(({ keys, action }) => (
            <div key={keys} className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <kbd className="px-2 py-1 text-xs font-mono rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {keys}
              </kbd>
              <span className="text-sm text-gray-600 dark:text-gray-400">{action}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Example Toolbar Configurations</h2>
        <CodeBlock
          code={`// Full featured (default)
toolbar={[
  'headingDropdown',
  'divider',
  'bold', 'italic', 'underline', 'strikethrough',
  'divider',
  'textColor', 'highlightColor',
  'divider',
  'bulletList', 'orderedList',
  'divider',
  'blockquote', 'code', 'link'
]}

// Simple formatting
toolbar={['bold', 'italic', 'underline']}

// Blog post - headings and lists
toolbar={[
  'headingDropdown',
  'divider',
  'bold', 'italic',
  'divider',
  'bulletList', 'orderedList'
]}

// Colors only
toolbar={['textColor', 'highlightColor']}

// No toolbar - keyboard shortcuts only
toolbar={[]}`}
          language="tsx"
          title="Toolbar Configurations"
        />
      </section>
    </div>
  );
};

export default RichEditorPage;
