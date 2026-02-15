import { useState, useMemo } from 'react';
import { CodeEditor, Typography, Card, CardBody, Button } from '@forgedevstack/bear';
import { KilnLink } from '@/components/KilnLink';
import { LinesOfCode } from '@/components/LinesOfCode';
import { THEME_PRESETS, ThemePreset } from '@/constants/navigation.const';

const SAMPLE_CODE = `import { FC, useState } from 'react';
import { Button, Card, CardBody } from '@forgedevstack/bear';

interface CounterProps {
  initial?: number;
}

/**
 * A simple counter component built with Bear UI
 */
export const Counter: FC<CounterProps> = ({ initial = 0 }) => {
  const [count, setCount] = useState(initial);

  return (
    <Card>
      <CardBody>
        <h2>Count: {count}</h2>
        <Button onClick={() => setCount(c => c + 1)}>
          Increment
        </Button>
      </CardBody>
    </Card>
  );
};
`;

const LANG_META: Record<string, { icon: string; color: string }> = {
  typescript: { icon: 'TS', color: 'bg-blue-500' },
  javascript: { icon: 'JS', color: 'bg-yellow-500' },
  python: { icon: 'PY', color: 'bg-green-500' },
  html: { icon: '<>', color: 'bg-orange-500' },
  css: { icon: '{}', color: 'bg-purple-500' },
};

const SUPPORTED_LANGS = ['typescript', 'javascript', 'python', 'html', 'css'] as const;

/** Map a ThemePreset (portal format) to CodeEditorTheme (component format) */
function presetToCustomTheme(preset: ThemePreset) {
  return {
    background: preset.colors.bg,
    foreground: preset.colors.text,
    cursor: preset.colors.text,
    selection: preset.colors.selection,
    lineNumber: preset.colors.lineNumber,
    lineNumberActive: preset.colors.text,
    gutterBackground: preset.colors.bg,
    gutterBorder: preset.colors.selection,
    tokens: {
      keyword: preset.colors.keyword,
      string: preset.colors.string,
      comment: preset.colors.comment,
      function: preset.colors.function,
      number: preset.colors.number,
      operator: preset.colors.operator,
    },
  };
}

export default function CodeEditorPage() {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [language, setLanguage] = useState<typeof SUPPORTED_LANGS[number]>('typescript');
  const [activePreset, setActivePreset] = useState<ThemePreset>(THEME_PRESETS[0]);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  const lineCount = useMemo(() => code.split('\n').length, [code]);
  const charCount = useMemo(() => code.length, [code]);

  const customTheme = useMemo(() => presetToCustomTheme(activePreset), [activePreset]);

  const isLightPreset = activePreset.id === 'bear-light';

  return (
    <div className="fade-in">
      {/* Title row — same pattern as Highlight: Title + KilnLink + LinesOfCode */}
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CodeEditor</h1>
        <KilnLink path="/code-editor" />
        <LinesOfCode lines={lineCount} />
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Syntax-highlighted code editor with line numbers, auto-indent, bracket pairing, and theming.
        Zero dependencies — built entirely with Bear UI.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { title: 'Syntax Highlighting', desc: 'Keyword, string, comment coloring' },
          { title: 'Line Numbers', desc: 'Toggleable with active line highlight' },
          { title: 'Auto-Indent', desc: 'Smart indentation on Enter' },
          { title: 'Bracket Pairing', desc: 'Auto-close brackets and quotes' },
          { title: 'Theme Support', desc: 'Dark/Light + custom presets' },
          { title: 'Read-Only Mode', desc: 'Display code without editing' },
          { title: 'ThemeProvider', desc: 'Works with useBear hook' },
          { title: 'Zero Dependencies', desc: 'No external libraries needed' },
        ].map((f) => (
          <div
            key={f.title}
            className="p-3 rounded-lg bg-[var(--bear-bg-secondary)] border border-[var(--bear-border-primary)]"
          >
            <p className="text-xs font-semibold text-[var(--bear-text-primary)] mb-0.5">{f.title}</p>
            <p className="text-[11px] text-[var(--bear-text-secondary)]">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Interactive Editor */}
      <Card>
        <CardBody>
          {/* Editor header: title + stats left, theme selector right */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Typography variant="h6">Interactive Editor</Typography>
              <span className="text-xs text-[var(--bear-text-secondary)] font-mono">
                {lineCount} lines &middot; {charCount} chars
              </span>
            </div>

            {/* Theme dropdown — applies only to this editor */}
            <div className="relative">
              <button
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border border-[var(--bear-border-primary)] bg-[var(--bear-bg-secondary)] text-[var(--bear-text-primary)] hover:bg-[var(--bear-bg-primary)] transition-colors"
              >
                <span
                  className="w-3 h-3 rounded-full border border-gray-400/30"
                  style={{ background: activePreset.colors.keyword }}
                />
                {activePreset.name}
                <svg
                  className={`w-3 h-3 transition-transform ${showThemeDropdown ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showThemeDropdown && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-[var(--bear-bg-primary)] rounded-lg shadow-xl border border-[var(--bear-border-primary)] z-50 overflow-hidden">
                  {THEME_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setActivePreset(preset);
                        setShowThemeDropdown(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors
                        ${
                          activePreset.id === preset.id
                            ? 'bg-[var(--bear-primary-500)]/10 text-[var(--bear-primary-500)]'
                            : 'text-[var(--bear-text-primary)] hover:bg-[var(--bear-bg-secondary)]'
                        }`}
                    >
                      <span className="flex gap-0.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: preset.colors.bg }} />
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: preset.colors.keyword }} />
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: preset.colors.string }} />
                      </span>
                      {preset.name}
                      {activePreset.id === preset.id && (
                        <svg
                          className="w-3.5 h-3.5 ml-auto text-[var(--bear-primary-500)]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Language tabs */}
          <div className="flex items-center gap-1.5 mb-4 flex-wrap">
            {SUPPORTED_LANGS.map((lang) => (
              <Button
                key={lang}
                size="sm"
                variant={language === lang ? 'primary' : 'ghost'}
                onClick={() => setLanguage(lang)}
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center text-[8px] font-bold text-white ${LANG_META[lang].color}`}
                  >
                    {LANG_META[lang].icon}
                  </span>
                  {lang}
                </span>
              </Button>
            ))}
          </div>

          {/* Editor */}
          <CodeEditor
            value={code}
            onChange={setCode}
            language={language}
            theme={isLightPreset ? 'light' : 'dark'}
            customTheme={customTheme}
            showLineNumbers
            highlightActiveLine
            height={350}
            autoCloseBrackets
            autoIndent
          />
        </CardBody>
      </Card>

      {/* Read-Only Mode */}
      <div className="mt-8">
        <Card>
          <CardBody>
            <Typography variant="h6" className="mb-4">Read-Only Mode</Typography>
            <CodeEditor
              value={`const greeting = "Hello, Bear UI!";\nconsole.log(greeting);`}
              language="javascript"
              theme={isLightPreset ? 'light' : 'dark'}
              customTheme={customTheme}
              readOnly
              height={100}
            />
          </CardBody>
        </Card>
      </div>

      {/* Usage */}
      <div className="mt-8">
        <Card>
          <CardBody>
            <Typography variant="h6" className="mb-4">Usage</Typography>
            <pre className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm overflow-x-auto border border-gray-200 dark:border-gray-700">
{`import { CodeEditor } from '@forgedevstack/bear';

function MyEditor() {
  const [code, setCode] = useState('');

  return (
    <CodeEditor
      value={code}
      onChange={setCode}
      language="typescript"
      theme="dark"
      showLineNumbers
      highlightActiveLine
      autoCloseBrackets
      autoIndent
      height={400}
    />
  );
}`}
            </pre>
          </CardBody>
        </Card>
      </div>

      {/* Custom Theme */}
      <div className="mt-8">
        <Card>
          <CardBody>
            <Typography variant="h6" className="mb-4">Custom Theme</Typography>
            <Typography variant="body2" className="text-[var(--bear-text-secondary)] mb-4">
              Use the <code className="px-1 py-0.5 rounded bg-[var(--bear-bg-secondary)] text-[var(--bear-primary-500)] text-xs font-mono">customTheme</code> prop to override individual colors, or select from built-in presets.
            </Typography>
            <pre className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-sm overflow-x-auto border border-gray-200 dark:border-gray-700">
{`<CodeEditor
  value={code}
  onChange={setCode}
  language="typescript"
  theme="dark"
  customTheme={{
    background: '#282a36',
    foreground: '#f8f8f2',
    cursor: '#f8f8f0',
    selection: '#44475a',
    lineNumber: '#6272a4',
    lineNumberActive: '#f8f8f2',
    gutterBackground: '#282a36',
    gutterBorder: '#44475a',
    tokens: {
      keyword: '#ff79c6',
      string: '#f1fa8c',
      comment: '#6272a4',
      function: '#50fa7b',
      number: '#bd93f9',
      operator: '#ff79c6',
    },
  }}
/>`}
            </pre>
          </CardBody>
        </Card>
      </div>

      {/* Props */}
      <section className="mt-8 mb-12">
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">value</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">required</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Code content</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">onChange</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>(v: string) =&gt; void</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Called when value changes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">language</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>CodeEditorLanguage</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">"typescript"</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Language for syntax highlighting</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">theme</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>"dark" | "light"</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">"dark"</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Base color theme</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">customTheme</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>Partial&lt;CodeEditorTheme&gt;</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Override individual theme colors</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">placeholder</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">"Start typing..."</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Placeholder text when empty</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showLineNumbers</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show line numbers gutter</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">highlightActiveLine</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Highlight the active line</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">readOnly</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Disable editing</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">autoCloseBrackets</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Auto-close brackets and quotes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">autoIndent</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Smart indentation on Enter</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">wordWrap</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Enable word wrapping</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">height</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string | number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">auto</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Editor height</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">fontSize</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">14</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Font size in pixels</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">tabSize</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">2</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Tab size in spaces</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">className</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Custom CSS class</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">testId</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Test ID for testing</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
