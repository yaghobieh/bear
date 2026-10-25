import { FormEvent, Fragment, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { HOME_AI_FIELD_ID } from './home.const';

const ASK_LIMIT = 5;

interface AskSource {
  label: string;
  href: string;
}

interface AskResponse {
  answer?: string;
  error?: string;
  remaining?: number;
  sources?: AskSource[];
}

const renderInline = (text: string): ReactNode => {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`)/g);
  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer">
          {link[1]}
        </a>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    return <Fragment key={index}>{part}</Fragment>;
  });
};

const BearAnswer: FC<{ text: string; sources: AskSource[] }> = ({ text, sources }) => {
  const blocks = text.split(/```(?:tsx|ts|jsx|js|bash|css)?\n?/);
  return (
    <div className="home-ai__answer">
      {blocks.map((block, index) => {
        if (index % 2 === 1) return <CodeBlock key={index} code={block.replace(/```$/, '').trim()} language="tsx" />;
        return block.split('\n').filter((line) => line.trim()).map((line) => (
          <p key={`${index}-${line.slice(0, 24)}`}>{renderInline(line.replace(/\*\*/g, ''))}</p>
        ));
      })}
      {sources.length > 0 ? (
        <div className="home-ai__sources">
          {sources.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">
              {source.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export const HomeAiPrompt: FC = () => {
  const { language } = usePortalLanguage();
  const text = PORTAL_TEXT[language];
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState<AskSource[]>([]);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [remaining, setRemaining] = useState(ASK_LIMIT);

  const locked = remaining === 0;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextQuestion = question.trim();
    if (!nextQuestion || pending || locked) return;
    setPending(true);
    setError('');
    setAnswer('');
    setSources([]);
    try {
      const response = await fetch('/api/bear-ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: nextQuestion,
          page: 'Home',
          props: 'Flutter is free. Bear Grid Pro is $9 a year. Core DataTable stays free. Icons are @forgedevstack/bear-icons.',
        }),
      });
      const payload = (await response.json()) as AskResponse;
      if (typeof payload.remaining === 'number') setRemaining(payload.remaining);
      if (payload.answer) {
        setAnswer(payload.answer);
        setSources(payload.sources ?? []);
        setQuestion('');
      }
      if (payload.error) setError(payload.error);
    } catch {
      setError('The portal could not reach Bear.');
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="home-ai" aria-labelledby={HOME_AI_FIELD_ID}>
      <form className="home-ai__panel" onSubmit={onSubmit}>
        <label id={HOME_AI_FIELD_ID} htmlFor={`${HOME_AI_FIELD_ID}-input`}>
          {text.homeAiTitle}
        </label>
        <div className={pending ? 'home-ai__field is-running' : 'home-ai__field'}>
          <textarea
            id={`${HOME_AI_FIELD_ID}-input`}
            value={question}
            placeholder={text.homeAiSoon}
            disabled={locked || pending}
            maxLength={600}
            onChange={(event) => setQuestion(event.target.value)}
          />
          {pending ? (
            <div className="home-ai__running" aria-live="polite">
              <span className="home-ai__scan" />
              <span className="home-ai__running-label">
                Searching
                <i />
                <i />
                <i />
              </span>
            </div>
          ) : null}
        </div>
        <div className="home-ai__row">
          <small>{locked ? '5 questions used for this address' : `${remaining} questions left for this address`}</small>
          <button type="submit" disabled={locked || pending || question.trim().length === 0}>
            {pending ? 'Searching' : 'Ask'}
          </button>
        </div>
        {error ? <p className="home-ai__error">{error}</p> : null}
        {answer ? <BearAnswer text={answer} sources={sources} /> : null}
      </form>
    </section>
  );
};
