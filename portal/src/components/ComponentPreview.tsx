import { FC, ReactNode, useState, useCallback, useMemo } from 'react';
import { CodeBlock } from './CodeBlock';
import { LivePropsBlock } from './LivePropsBlock/LivePropsBlock';
import { Button, BearIcons } from '@forgedevstack/bear';
import type { EditablePropsConfig, LiveProps } from './PropsControls/PropsControls.types';

interface ComponentPreviewProps {
  title: string;
  description?: string;
  code: string;
  children?: ReactNode;
  language?: string;
  defaultShowCode?: boolean;
  /** When true, allows overflow (e.g. for dropdowns that need to extend outside). Default false. */
  allowOverflow?: boolean;
  /** Optional: config for live prop controls. When set, use `render` instead of `children`. */
  editableProps?: EditablePropsConfig;
  /** Optional: render the preview with live prop values. Use with `editableProps`. */
  render?: (props: LiveProps) => ReactNode;
}

function getDefaultLiveProps(config: EditablePropsConfig): LiveProps {
  const out: LiveProps = {};
  for (const [key, spec] of Object.entries(config)) {
    out[key] = spec.default;
  }
  return out;
}

export const ComponentPreview: FC<ComponentPreviewProps> = ({
  title,
  description,
  code,
  children,
  language = 'tsx',
  defaultShowCode = false,
  allowOverflow = false,
  editableProps,
  render,
}) => {
  const [showCode, setShowCode] = useState(defaultShowCode);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const defaultProps = useMemo(
    () => (editableProps ? getDefaultLiveProps(editableProps) : {}),
    [editableProps]
  );
  const [liveProps, setLiveProps] = useState<LiveProps>(defaultProps);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const hasLiveProps = Boolean(editableProps && render);
  const previewContent = render ? render(liveProps) : children;

  return (
    <div className={allowOverflow ? 'doc-preview mb-10' : 'doc-preview mb-10 overflow-hidden'}>
      {(title || description) && (
        <div className="doc-preview__header mb-4">
          {title && <h3 className="doc-preview__title">{title}</h3>}
          {description && <p className="doc-preview__desc">{description}</p>}
        </div>
      )}

      {hasLiveProps && editableProps && (
        <div className="px-4 pt-2 pb-1 border border-b-0 border-zinc-200 dark:border-zinc-800 rounded-t-xl bg-white dark:bg-zinc-950">
          <LivePropsBlock
            config={editableProps}
            values={liveProps}
            onChange={setLiveProps}
            onReset={() => setLiveProps(defaultProps)}
            defaultCollapsed={false}
          />
        </div>
      )}

      <div className={`doc-preview__stage ${hasLiveProps && editableProps ? 'rounded-t-none border-t-0' : ''} rounded-t-xl border border-b-0 border-zinc-200 dark:border-zinc-800`}>
        <div className="doc-preview__stage-inner">{previewContent}</div>
      </div>

      <div className="doc-preview__code mt-0 rounded-b-xl border border-t-0 border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-50 dark:bg-zinc-900/80">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCode(!showCode)}
            leftIcon={<BearIcons.CodeIcon size={16} />}
          >
            {showCode ? 'Hide code' : 'View code'}
          </Button>

          {showCode && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(!expanded)}
                title={expanded ? 'Collapse' : 'Expand'}
                leftIcon={expanded ? <BearIcons.FullscreenExitIcon size={14} /> : <BearIcons.FullscreenIcon size={14} />}
              >
                <span className="hidden sm:inline">{expanded ? 'Collapse' : 'Expand'}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                leftIcon={copied ? <BearIcons.CheckIcon size={14} /> : <BearIcons.CopyIcon size={14} />}
              >
                {copied ? (
                  <span className="text-green-600 dark:text-green-400">Copied!</span>
                ) : (
                  <span className="hidden sm:inline">Copy code</span>
                )}
              </Button>
            </div>
          )}
        </div>

        {showCode && (
          <div 
            className={`border-t border-zinc-200 dark:border-zinc-800 transition-all ${
              expanded ? 'max-h-none' : 'max-h-80 overflow-y-auto'
            }`}
          >
            <CodeBlock code={code} language={language} showLineNumbers />
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentPreview;
