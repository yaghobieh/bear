import { FC, useState } from 'react';
import { Button, MessageList, Typography } from '@forgedevstack/bear';
import type { MessageListMessage } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';
import {
  BASIC_CODE,
  DEMO_AUTHORS,
  DEMO_MESSAGES,
  DEMO_REPLIES,
  MESSAGE_LIST_PROPS,
  MESSAGE_TYPE_PROPS,
} from './MessageListPage.const';

const MessageListPage: FC = () => {
  const [messages, setMessages] = useState<MessageListMessage[]>(DEMO_MESSAGES);

  const addReply = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: `reply-${prev.length}`,
        author: DEMO_AUTHORS.amelia,
        content: DEMO_REPLIES[prev.length % DEMO_REPLIES.length],
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <DocPage
      title="MessageList"
      badge="New"
      description="Chat message list with consecutive-author grouping, day separators, and auto-scroll with a new-messages affordance. Built for chat platforms."
      componentName="MessageList"
    >
      <ComponentPreview
        title="Preview"
        description="Consecutive messages from the same author are grouped. Scroll up, then add a message to see the new-messages pill."
        code={BASIC_CODE}
      >
        <div className="w-full max-w-xl mx-auto flex flex-col gap-3">
          <MessageList messages={messages} currentUserId="me" height={380} />
          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={addReply}>
              Simulate incoming message
            </Button>
          </div>
        </div>
      </ComponentPreview>

      <section className="doc-section mb-10">
        <Typography variant="h4" className="doc-section__title mb-3">Notes</Typography>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>Messages must be sorted oldest-first; grouping uses <code className="doc-code-inline">groupWindowMs</code> between consecutive messages of the same author.</li>
          <li>Auto-scroll only sticks when the user is already at the bottom — otherwise the new-messages pill appears.</li>
          <li>Rendering is not virtualized in 1.2.5; virtualization for very long conversations is planned as future work.</li>
        </ul>
      </section>

      <PropsTable title="API Reference" rows={MESSAGE_LIST_PROPS} />
      <PropsTable title="MessageListMessage" rows={MESSAGE_TYPE_PROPS} showDefault={false} />
    </DocPage>
  );
};

export default MessageListPage;
