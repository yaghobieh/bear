import { useState } from 'react';
import {
  ApprovalCard,
  ArtifactCard,
  ChatError,
  CitationList,
  ContextMeter,
  Flex,
  MessageActions,
  ModelSelect,
  PromptComposer,
  PromptSuggestions,
  StreamingMessage,
  ThinkingBlock,
  ToolCall,
  Typography,
} from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';
import { DocPage } from '@/components/DocPage';
import { PropsTable } from '@/components/PropsTable';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import {
  AI_CHAT_CITATIONS,
  AI_CHAT_CODE,
  AI_CHAT_CONTEXT_MAX,
  AI_CHAT_CONTEXT_USED,
  AI_CHAT_MODELS,
  AI_CHAT_SUGGESTIONS,
  AI_KIT_PROPS,
} from './AiChatPage.const';
import { resolveAiChatSuggestionLabel } from './AiChatPage.utils';

const AiChatPage = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const [draft, setDraft] = useState('');
  const [model, setModel] = useState(AI_CHAT_MODELS[0].id);

  return (
    <DocPage title="AI chat kit" badge="New" description={t.aiChatDesc} componentName="PromptComposer">
      <ComponentPreview title={t.aiChatComposer} description={t.aiChatDesc} code={AI_CHAT_CODE}>
        <Flex direction="column" gap={3} className="w-full">
          <PromptSuggestions
            suggestions={AI_CHAT_SUGGESTIONS}
            onSelect={(id) => setDraft(resolveAiChatSuggestionLabel(AI_CHAT_SUGGESTIONS, id))}
          />
          <PromptComposer value={draft} onChange={setDraft} onSubmit={() => setDraft('')} allowAttach />
        </Flex>
      </ComponentPreview>

      <ComponentPreview title={t.aiChatStreaming} description={t.aiChatStreaming} code={AI_CHAT_CODE}>
        <Flex direction="column" gap={3} className="w-full">
          <ThinkingBlock defaultOpen isStreaming>
            Checking sources and drafting a reply.
          </ThinkingBlock>
          <StreamingMessage content="Bear owns the chat surfaces. Your app owns the model loop." isStreaming />
          <MessageActions onCopy={() => undefined} onRetry={() => undefined} onGood={() => undefined} onBad={() => undefined} />
          <ChatError onRetry={() => undefined}>The model timed out.</ChatError>
        </Flex>
      </ComponentPreview>

      <ComponentPreview title={t.aiChatTools} description={t.aiChatTools} code={AI_CHAT_CODE}>
        <Flex direction="column" gap={3} className="w-full">
          <Flex align="center" justify="between" gap={3}>
            <ModelSelect models={AI_CHAT_MODELS} value={model} onChange={setModel} />
            <ContextMeter used={AI_CHAT_CONTEXT_USED} max={AI_CHAT_CONTEXT_MAX} />
          </Flex>
          <ToolCall name="searchDocs" kind="search" status="success" output="Found Chat and PromptComposer." />
          <CitationList citations={AI_CHAT_CITATIONS} />
          <ApprovalCard title="Apply the suggested edit" onApprove={() => undefined} onReject={() => undefined}>
            Replace the single-line input with PromptComposer.
          </ApprovalCard>
          <ArtifactCard title="composer.tsx" kind="code">
            <Typography variant="code">{'<PromptComposer onSubmit={send} />'}</Typography>
          </ArtifactCard>
        </Flex>
      </ComponentPreview>

      <PropsTable title={t.props} rows={AI_KIT_PROPS} />
    </DocPage>
  );
};

export default AiChatPage;
