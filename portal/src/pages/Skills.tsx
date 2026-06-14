import { FC, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { CodeBlock } from '@/components/CodeBlock';
import {
  AI_MODEL_PROMPT_FORMATS,
  BEAR_SKILLS,
  SKILLS_EXAMPLE_PROMPTS,
  SKILLS_INSTALL_CMD,
  formatExamplePrompt,
  formatSkillInvoke,
} from '@/constants/skills.const';

const CopyPromptButton: FC<{ text: string; label?: string }> = ({ text, label = 'Copy' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [text]);

  return (
    <Button size="sm" variant="outline" onClick={handleCopy}>
      {copied ? 'Copied!' : label}
    </Button>
  );
};

const SkillsPage: FC = () => (
  <DocPage
    title="Skills"
    badge="New"
    description="Give your AI assistant deep knowledge of Bear UI components, patterns, and best practices — similar to how shadcn/ui skills work for their registry."
  >
    <section className="doc-section mb-10">
      <Typography variant="h4" className="doc-section__title mb-3">Install</Typography>
      <Typography variant="body2" color="muted" className="mb-4 leading-relaxed">
        Bear skills ship inside the repo under <code className="doc-code-inline">bear/.cursor/skills/</code>.
        Open the Bear project in Cursor — skills activate automatically when you reference them or use{' '}
        <code className="doc-code-inline">/bear-code-review</code>.
      </Typography>
      <CodeBlock code={SKILLS_INSTALL_CMD} language="bash" showLineNumbers={false} />
    </section>

    <section className="doc-section mb-10">
      <Typography variant="h4" className="doc-section__title mb-3">What&apos;s included</Typography>
      <div className="grid gap-3">
        {BEAR_SKILLS.map((skill) => (
          <div
            key={skill.slug}
            className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4"
          >
            <div className="flex items-center justify-between gap-3 mb-1">
              <Typography variant="body2" className="font-mono font-semibold text-pink-600 dark:text-pink-400">
                {skill.name}
              </Typography>
              <Typography variant="caption" color="muted">skill</Typography>
            </div>
            <Typography variant="body2" color="muted" className="mb-3">{skill.description}</Typography>
            <Typography variant="caption" className="font-mono block mb-3 text-gray-600 dark:text-gray-400">
              {skill.invoke}
            </Typography>
            <div className="flex flex-wrap gap-2">
              {AI_MODEL_PROMPT_FORMATS.map((model) => (
                <CopyPromptButton
                  key={`${skill.slug}-${model.id}`}
                  text={formatSkillInvoke(skill, model.id)}
                  label={`Copy for ${model.label}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="doc-section mb-10">
      <Typography variant="h4" className="doc-section__title mb-3">Example prompts</Typography>
      <Typography variant="body2" color="muted" className="mb-4">
        Copy prompts formatted for your AI tool:
      </Typography>
      <div className="space-y-3">
        {SKILLS_EXAMPLE_PROMPTS.map((prompt) => (
          <div
            key={prompt}
            className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4"
          >
            <Typography variant="body2" className="mb-3 italic text-gray-700 dark:text-gray-300">
              &ldquo;{prompt}&rdquo;
            </Typography>
            <div className="flex flex-wrap gap-2">
              {AI_MODEL_PROMPT_FORMATS.map((model) => (
                <CopyPromptButton
                  key={`${prompt}-${model.id}`}
                  text={formatExamplePrompt(prompt, model.id)}
                  label={model.label}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="doc-section mb-10">
      <Typography variant="h4" className="doc-section__title mb-3">How it works</Typography>
      <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <li><strong>Project detection</strong> — Skills activate when working in the Bear repo with <code className="doc-code-inline">.cursor/skills/</code> present.</li>
        <li><strong>Pattern enforcement</strong> — Assistant follows Bear layout: types in <code className="doc-code-inline">*.types.ts</code>, hooks in <code className="doc-code-inline">hooks/</code>, SVG in <code className="doc-code-inline">helpers/</code>.</li>
        <li><strong>Code review</strong> — Use <code className="doc-code-inline">/bear-code-review</code> to audit components before merge.</li>
        <li><strong>Portal docs</strong> — New components get <code className="doc-code-inline">DocPage</code>, <code className="doc-code-inline">ComponentPreview</code>, and <code className="doc-code-inline">PropsTable</code>.</li>
      </ol>
    </section>

    <section className="doc-section">
      <Typography variant="h4" className="doc-section__title mb-3">Learn more</Typography>
      <ul className="space-y-2 text-sm">
        <li>
          <Link to="/changelog" className="doc-link">Changelog</Link> — release notes
        </li>
        <li>
          <a href="https://ui.shadcn.com/docs/skills" target="_blank" rel="noopener noreferrer" className="doc-link">
            shadcn/ui Skills
          </a> — inspiration for this workflow
        </li>
        <li>
          <a href="https://github.com/yaghobieh/bear/tree/main/.cursor/skills" target="_blank" rel="noopener noreferrer" className="doc-link">
            Bear skills on GitHub
          </a>
        </li>
      </ul>
    </section>
  </DocPage>
);

export default SkillsPage;
