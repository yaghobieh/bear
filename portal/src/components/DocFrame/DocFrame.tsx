import { FC, FormEvent, PointerEvent as ReactPointerEvent, ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BearIcons } from '@forgedevstack/bear';
import { CodeBlock } from '@/components/CodeBlock';
import { GITHUB_URL } from '@/constants/navigation.const';
import { openCodeSandbox } from '@/pages/Sandbox/openCodeSandbox';

const ASK_LIMIT = 5;
const ASK_STORAGE_PREFIX = 'bear-ask:';
const ASK_PROPS_LIMIT = 1200;

const ARIA_PATTERNS: Record<string, string> = {
  autocomplete: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/',
  button: 'https://www.w3.org/WAI/ARIA/apg/patterns/button/',
  checkbox: 'https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/',
  radio: 'https://www.w3.org/WAI/ARIA/apg/patterns/radio/',
  switch: 'https://www.w3.org/WAI/ARIA/apg/patterns/switch/',
  slider: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider/',
  tabs: 'https://www.w3.org/WAI/ARIA/apg/patterns/tabs/',
  accordion: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/',
  menu: 'https://www.w3.org/WAI/ARIA/apg/patterns/menu/',
  dropdown: 'https://www.w3.org/WAI/ARIA/apg/patterns/menu/',
  modal: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
  'alert-dialog': 'https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/',
  drawer: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/',
  tooltip: 'https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/',
  select: 'https://www.w3.org/WAI/ARIA/apg/patterns/listbox/',
  'multi-select': 'https://www.w3.org/WAI/ARIA/apg/patterns/listbox/',
  'toggle-group': 'https://www.w3.org/WAI/ARIA/apg/patterns/radio/',
  breadcrumbs: 'https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/',
};

interface AskSource {
  label: string;
  href: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const slugify = (value: string): string =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const pageSlug = (pathname: string): string => pathname.split('/').filter(Boolean).pop() ?? '';

const isComponentPage = (pathname: string): boolean =>
  pathname.startsWith('/components/') && !pathname.includes('/category/');

const componentName = (pathname: string): string =>
  pageSlug(pathname)
    .split('-')
    .filter(Boolean)
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join('');

const sourceHref = (pathname: string): string => {
  if (!isComponentPage(pathname)) return GITHUB_URL;
  return `${GITHUB_URL}/tree/main/src/components/${componentName(pathname)}`;
};

const toMarkdown = (root: HTMLElement): string => {
  const lines: string[] = [];
  root.querySelectorAll('h1, h2, h3, h4, p, li, pre').forEach((node) => {
    const text = node.textContent?.trim() ?? '';
    if (!text) return;
    if (node.tagName === 'H1') lines.push(`# ${text}`, '');
    else if (node.tagName === 'H2') lines.push(`## ${text}`, '');
    else if (node.tagName === 'H3') lines.push(`### ${text}`, '');
    else if (node.tagName === 'H4') lines.push(`#### ${text}`, '');
    else if (node.tagName === 'LI') lines.push(`- ${text}`);
    else if (node.tagName === 'PRE') lines.push('```', text, '```', '');
    else lines.push(text, '');
  });
  return lines.join('\n').trim();
};

const renderInline = (line: string): ReactNode[] =>
  line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    return part;
  });

const renderMarkdown = (source: string): ReactNode[] => {
  const lines = source.split('\n');
  const nodes: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length === 0) return;
    const items = list;
    list = [];
    nodes.push(
      <ul key={`list-${nodes.length}`}>
        {items.map((item) => <li key={item}>{renderInline(item)}</li>)}
      </ul>,
    );
  };
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flush();
      return;
    }
    const bullet = trimmed.match(/^[-*]\s+(.*)/);
    if (bullet) {
      list.push(bullet[1]);
      return;
    }
    flush();
    const heading = trimmed.match(/^(#{1,3})\s+(.*)/);
    if (heading) {
      const Tag = heading[1].length === 1 ? 'h3' : heading[1].length === 2 ? 'h4' : 'h5';
      nodes.push(<Tag key={`h-${nodes.length}`}>{renderInline(heading[2])}</Tag>);
      return;
    }
    nodes.push(<p key={`p-${nodes.length}`}>{renderInline(trimmed)}</p>);
  });
  flush();
  return nodes;
};

const Answer: FC<{ text: string; sources: AskSource[] }> = ({ text, sources }) => {
  const parts: Array<{ type: 'md' | 'code'; lang: string; text: string }> = [];
  const fence = /```([a-zA-Z0-9]*)\n([\s\S]*?)```/g;
  let last = 0;
  let match: RegExpExecArray | null = fence.exec(text);
  while (match) {
    if (match.index > last) parts.push({ type: 'md', lang: '', text: text.slice(last, match.index) });
    parts.push({ type: 'code', lang: match[1] || 'tsx', text: match[2].trim() });
    last = match.index + match[0].length;
    match = fence.exec(text);
  }
  if (last < text.length) parts.push({ type: 'md', lang: '', text: text.slice(last) });

  return (
    <div className="doc-chat__answer">
      <p className="doc-chat__success">
        <BearIcons.CheckCircleIcon size={16} />
        Answer
      </p>
      {parts.map((part, index) => (
        part.type === 'code'
          ? <CodeBlock key={index} code={part.text} language={part.lang} showLineNumbers={false} />
          : <div key={index}>{renderMarkdown(part.text)}</div>
      ))}
      {sources.length > 0 ? (
        <div className="doc-chat__sources">
          {sources.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export const DocFrame: FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const bare = location.pathname === '/' || location.pathname === '/storybook' || location.pathname.startsWith('/products');
  const [toc, setToc] = useState<TocItem[]>([]);
  const [markdown, setMarkdown] = useState('');
  const [showMarkdown, setShowMarkdown] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [mode, setMode] = useState<'ask' | 'run'>('ask');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState<AskSource[]>([]);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [remaining, setRemaining] = useState(ASK_LIMIT);
  const [chatBox, setChatBox] = useState<{ width: number; height: number } | null>(null);

  const onResizeStart = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const popup = event.currentTarget.parentElement;
    if (!popup) return;
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = popup.getBoundingClientRect().width;
    const startHeight = popup.getBoundingClientRect().height;
    const move = (pointer: PointerEvent) => {
      setChatBox({
        width: Math.min(640, Math.max(280, startWidth + pointer.clientX - startX)),
        height: Math.min(720, Math.max(260, startHeight + pointer.clientY - startY)),
      });
    };
    const stop = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', stop);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', stop);
  };

  const slug = pageSlug(location.pathname);
  const name = componentName(location.pathname);
  const componentPage = isComponentPage(location.pathname);
  const ariaHref = ARIA_PATTERNS[slug] ?? 'https://www.w3.org/WAI/ARIA/apg/';
  const title = name || slug || 'Bear';

  useEffect(() => {
    setShowMarkdown(false);
    setMarkdown('');
    setChatOpen(false);
    setError('');
    const stored = window.sessionStorage.getItem(`${ASK_STORAGE_PREFIX}${location.pathname}`);
    if (!stored) {
      setQuestion('');
      setAnswer('');
    } else {
      try {
        const saved = JSON.parse(stored) as { question?: string; answer?: string };
        setQuestion(saved.question ?? '');
        setAnswer(saved.answer ?? '');
      } catch {
        setQuestion('');
        setAnswer('');
      }
    }
    const collect = () => {
      const root = document.querySelector('[data-doc-body]');
      if (!root) return;
      const used = new Set<string>();
      const items: TocItem[] = [];
      root.querySelectorAll('h2, h3').forEach((heading) => {
        const text = heading.textContent?.trim() ?? '';
        if (!text) return;
        const base = heading.id || slugify(text) || 'section';
        let id = base;
        let suffix = 2;
        while (used.has(id)) {
          id = `${base}-${suffix}`;
          suffix += 1;
        }
        used.add(id);
        heading.id = id;
        items.push({ id, text, level: heading.tagName === 'H3' ? 3 : 2 });
      });
      setToc(items);
    };
    collect();
    const root = document.querySelector('[data-doc-body]');
    if (!root) return;
    const observer = new MutationObserver(() => collect());
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 480);
      const offset = 140;
      let current = '';
      toc.forEach((item) => {
        const heading = document.getElementById(item.id);
        if (!heading) return;
        if (heading.getBoundingClientRect().top <= offset) current = item.id;
      });
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [toc]);

  const openChat = (nextMode: 'ask' | 'run') => {
    const heading = document.querySelector('[data-doc-body] h1')?.textContent?.trim() || title;
    const prompt = nextMode === 'run'
      ? `Show a runnable Bear example for ${heading}. Import from @forgedevstack/bear.`
      : `How do I use ${heading} in Bear?`;
    setMode(nextMode);
    setQuestion(prompt);
    setChatOpen(true);
    setError('');
    if (nextMode === 'run') openCodeSandbox(location.pathname);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextQuestion = question.trim();
    if (!nextQuestion || pending || remaining === 0) return;
    setPending(true);
    setError('');
    setAnswer('');
    try {
      const response = await fetch('/api/bear-ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: nextQuestion,
          page: `${location.pathname} ${title}`,
          props: document.querySelector('[data-doc-body]')?.textContent?.replace(/\s+/g, ' ').trim().slice(0, ASK_PROPS_LIMIT) ?? '',
        }),
      });
      const payload = (await response.json()) as { answer?: string; error?: string; remaining?: number; sources?: AskSource[] };
      if (typeof payload.remaining === 'number') setRemaining(payload.remaining);
      if (payload.answer) {
        setAnswer(payload.answer);
        setSources(payload.sources ?? []);
        window.sessionStorage.setItem(
          `${ASK_STORAGE_PREFIX}${location.pathname}`,
          JSON.stringify({ question: nextQuestion, answer: payload.answer }),
        );
      }
      if (payload.error) setError(payload.error);
    } catch {
      setError('The portal could not reach Bear.');
    } finally {
      setPending(false);
    }
  };

  const toggleMarkdown = () => {
    const root = document.querySelector('[data-doc-body]');
    if (!(root instanceof HTMLElement)) return;
    if (showMarkdown) {
      setShowMarkdown(false);
      return;
    }
    setMarkdown(toMarkdown(root));
    setShowMarkdown(true);
  };

  const feedbackHref = `${GITHUB_URL}/issues/new?title=${encodeURIComponent(`Docs feedback: ${title}`)}`;
  const openExternal = (href: string) => window.open(href, '_blank', 'noopener,noreferrer');

  if (bare) return <>{children}</>;

  return (
    <div className="doc-shell">
      <div className="doc-shell__main min-w-0">
        {componentPage ? (
        <div className="doc-tools">
          <button type="button" className="doc-tool" onClick={toggleMarkdown}>
            {showMarkdown ? <BearIcons.VisibilityIcon size={14} /> : <BearIcons.FileTextIcon size={14} />}
            {showMarkdown ? 'View rendered' : 'View as Markdown'}
          </button>
          <button type="button" className="doc-tool" onClick={() => openExternal(feedbackHref)}>
            <BearIcons.MessageCircleIcon size={14} />
            Feedback
          </button>
          <button type="button" className="doc-tool" onClick={() => openExternal(sourceHref(location.pathname))}>
            <BearIcons.GithubIcon size={14} />
            Source
          </button>
          <button type="button" className="doc-tool" onClick={() => openExternal(ariaHref)}>
            <BearIcons.AccessibilityIcon size={14} />
            WAI-ARIA
          </button>
          <div className="doc-ai">
            <button
              type="button"
              className={`doc-ai__launcher ${chatOpen ? 'is-open' : ''}`}
              aria-label="Ask about this"
              aria-expanded={chatOpen}
              onClick={() => (chatOpen ? setChatOpen(false) : openChat('ask'))}
            >
              <BearIcons.SparklesIcon size={28} className="doc-ai__flare" />
              <BearIcons.BearFaceIcon size={22} />
            </button>
            {chatOpen ? (
              <form className="doc-ai__popup" style={chatBox ?? undefined} onSubmit={onSubmit}>
                <div className="doc-ai__head">
                  <BearIcons.BearFaceIcon size={28} />
                  <div>
                    <strong>Ask Bear</strong>
                    <span>{remaining === 0 ? '5 questions used' : `${remaining} left`}</span>
                  </div>
                  <button type="button" className="doc-ai__close" aria-label="Close" onClick={() => setChatOpen(false)}>
                    <BearIcons.CloseIcon size={14} />
                  </button>
                </div>
                <div className="doc-ai__suggestions">
                  {[`Which props does ${title} take?`, `How do I use ${title} in Bear?`, `Can you show a ${title} example?`].map((suggestion) => (
                    <button key={suggestion} type="button" onClick={() => setQuestion(suggestion)}>{suggestion}</button>
                  ))}
                </div>
                <textarea
                  value={question}
                  maxLength={600}
                  disabled={pending || remaining === 0}
                  aria-label="Question"
                  onChange={(event) => setQuestion(event.target.value)}
                />
                <div className="doc-ai__actions">
                  <button type="button" className={mode === 'run' ? 'is-active' : ''} onClick={() => openChat('run')}>
                    <BearIcons.PlayIcon size={14} />
                    Run an example
                  </button>
                  <button type="submit" disabled={pending || remaining === 0 || question.trim().length === 0}>
                    <BearIcons.SendIcon size={14} />
                    {pending ? 'Searching' : 'Ask'}
                  </button>
                </div>
                {error ? <p className="doc-chat__error">{error}</p> : null}
                {answer ? <Answer text={answer} sources={sources} /> : null}
                <button type="button" className="doc-ai__resize" aria-label="Resize chat" onPointerDown={onResizeStart}>
                  <BearIcons.FullscreenIcon size={14} />
                </button>
              </form>
            ) : null}
          </div>
          <button type="button" className="doc-tool" onClick={() => openChat('run')}>
            <BearIcons.PlayIcon size={14} />
            Run an example
          </button>
        </div>
        ) : null}

        <div data-doc-body className={showMarkdown ? 'doc-source-hidden' : undefined}>
          {children}
          {componentPage ? (
            <>
              <section className="doc-extra">
                <h2>Accessibility</h2>
                <p>
                  {name} follows the WAI-ARIA authoring practices. Keyboard support, focus, and labels are documented in the accessibility guide.
                </p>
                <p>
                  <a href={ariaHref} target="_blank" rel="noopener noreferrer">WAI-ARIA pattern</a>
                  {' · '}
                  <Link to="/guides/accessibility">Bear accessibility</Link>
                </p>
              </section>
              <section className="doc-extra">
                <h2>API</h2>
                <p>Props for {name}, including className, style, and the component-specific props.</p>
                <p>
                  <Link to={`/api/${slug}`}>{name} API</Link>
                  {' · '}
                  <Link to="/api/overview">All component APIs</Link>
                </p>
              </section>
            </>
          ) : null}
        </div>
        {showMarkdown ? <pre className="doc-markdown">{markdown}</pre> : null}
      </div>
      <nav className="doc-toc" aria-label="On this page">
        <p>On this page</p>
        {toc.length === 0 ? <span>No sections</span> : (
          <ol>
            {toc.map((item) => (
              <li key={item.id} className={item.level === 3 ? 'is-nested' : ''}>
                <a href={`#${item.id}`} className={item.id === activeId ? 'is-active' : ''} aria-current={item.id === activeId ? 'location' : undefined}>{item.text}</a>
              </li>
            ))}
          </ol>
        )}
      </nav>
      {showTop ? (
        <button type="button" className="doc-back-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <BearIcons.ArrowUpIcon size={18} />
        </button>
      ) : null}
    </div>
  );
};
