import React, { useState } from 'react';
import { Typography, CardCompound as Card, FloatingChat } from '@forgedevstack/bear';
import type { ChatMessage } from '@forgedevstack/bear';

const FloatingChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    setIsTyping(true);
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `Thanks for your message! This is a demo response.`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div>
        <Typography variant="h1" className="mb-4">FloatingChat</Typography>
        <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400">
          Floating chat widget bubble for customer support or chat interfaces.
        </Typography>
      </div>

      {/* Live Demo Note */}
      <Card>
        <Card.Header title={<Typography variant="h5">Live Demo</Typography>} />
        <Card.Body>
          <Typography variant="body2" className="mb-4">
            Look at the bottom-right corner of this page! Click the chat bubble to open the floating chat.
          </Typography>
          <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
            <Typography variant="body2" className="text-pink-700 dark:text-pink-300">
              The FloatingChat component renders in a portal at the bottom of the page.
            </Typography>
          </div>
        </Card.Body>
      </Card>

      {/* Usage */}
      <Card>
        <Card.Header title={<Typography variant="h5">Usage</Typography>} />
        <Card.Body>
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto">
{`import { FloatingChat } from '@forgedevstack/bear';

<FloatingChat
  messages={messages}
  onSend={handleSend}
  title="Support"
  subtitle="We typically reply in a few minutes"
  position="bottom-right"
  badgeCount={2}
  welcomeMessage="Hi! How can we help?"
/>`}
          </pre>
        </Card.Body>
      </Card>

      {/* Props */}
      <Card>
        <Card.Header title={<Typography variant="h5">Props</Typography>} />
        <Card.Body>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-neutral-900 dark:text-neutral-100">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="text-left py-3 px-4 font-semibold">Prop</th>
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Default</th>
                  <th className="text-left py-3 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900">
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">title</td>
                  <td className="py-3 px-4 font-mono text-xs">string</td>
                  <td className="py-3 px-4 font-mono text-xs">"Chat"</td>
                  <td className="py-3 px-4">Header title</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">position</td>
                  <td className="py-3 px-4 font-mono text-xs">'bottom-right' | 'bottom-left'</td>
                  <td className="py-3 px-4 font-mono text-xs">'bottom-right'</td>
                  <td className="py-3 px-4">Position on screen</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">badgeCount</td>
                  <td className="py-3 px-4 font-mono text-xs">number</td>
                  <td className="py-3 px-4 font-mono text-xs">-</td>
                  <td className="py-3 px-4">Unread message count</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">welcomeMessage</td>
                  <td className="py-3 px-4 font-mono text-xs">string</td>
                  <td className="py-3 px-4 font-mono text-xs">"Hi! How can we help?"</td>
                  <td className="py-3 px-4">Initial bot message</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">defaultOpen</td>
                  <td className="py-3 px-4 font-mono text-xs">boolean</td>
                  <td className="py-3 px-4 font-mono text-xs">false</td>
                  <td className="py-3 px-4">Initial open state</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      {/* Floating Chat Widget */}
      <FloatingChat
        messages={messages}
        onSend={handleSend}
        isTyping={isTyping}
        title="Bear Support"
        subtitle="We're here to help!"
        position="bottom-right"
        poweredBy="Bear UI"
      />
    </div>
  );
};

export default FloatingChatPage;
