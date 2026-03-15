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
  const previewContent = hasLiveProps ? render!(liveProps) : children;

  return (
    <div className={allowOverflow ? 'mb-8 rounded-xl border border-gray-200 dark:border-gray-700' : 'mb-8 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden'}>
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>

      {hasLiveProps && editableProps && (
        <div className="px-4 pt-2 pb-1">
          <LivePropsBlock
            config={editableProps}
            values={liveProps}
            onChange={setLiveProps}
            onReset={() => setLiveProps(defaultProps)}
            defaultCollapsed={false}
          />
        </div>
      )}

      <div className="p-8 bg-white dark:bg-gray-900 flex items-center justify-center min-h-[200px]">
        <div className="w-full">{previewContent}</div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800/50">
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
            className={`border-t border-gray-200 dark:border-gray-700 transition-all ${
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
