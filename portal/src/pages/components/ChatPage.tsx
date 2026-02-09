import React, { useState } from 'react';
import { Typography, CardCompound as Card, Chat } from '@forgedevstack/bear';
import type { ChatMessage } from '@forgedevstack/bear';

const initialMessages: ChatMessage[] = [
  { id: '1', content: 'Hello! How can I help you today?', sender: 'bot', timestamp: new Date(Date.now() - 60000) },
  { id: '2', content: 'Hi! I need help with the Chat component.', sender: 'user', timestamp: new Date(Date.now() - 30000), status: 'read' },
  { id: '3', content: 'Of course! The Chat component provides a full-featured chat interface. What would you like to know?', sender: 'bot', timestamp: new Date() },
];

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent',
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `Thanks for your message! You said: "${content}"`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div>
        <Typography variant="h1" className="mb-4">Chat</Typography>
        <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400">
          Full-featured chat interface with message bubbles, avatars, typing indicators, and more.
        </Typography>
      </div>

      {/* Interactive Demo */}
      <Card>
        <Card.Header title={<Typography variant="h5">Interactive Demo</Typography>} />
        <Card.Body>
          <Chat
            messages={messages}
            onSend={handleSend}
            isTyping={isTyping}
            showAvatars
            showTimestamps
            showStatus
            height={400}
          />
        </Card.Body>
      </Card>

      {/* Usage */}
      <Card>
        <Card.Header title={<Typography variant="h5">Usage</Typography>} />
        <Card.Body>
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto">
{`import { Chat } from '@forgedevstack/bear';
import type { ChatMessage } from '@forgedevstack/bear';

const [messages, setMessages] = useState<ChatMessage[]>([]);

<Chat
  messages={messages}
  onSend={(content) => {
    setMessages([...messages, {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    }]);
  }}
  isTyping={false}
  showAvatars
  showTimestamps
  height={400}
/>`}
          </pre>
        </Card.Body>
      </Card>

      {/* Message Types */}
      <Card>
        <Card.Header title={<Typography variant="h5">Message Types</Typography>} />
        <Card.Body>
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto">
{`interface ChatMessage {
  id: string;
  content: string | ReactNode;
  sender: 'user' | 'bot' | 'system';
  timestamp?: Date;
  avatar?: string;
  name?: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
}`}
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
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">messages</td>
                  <td className="py-3 px-4 font-mono text-xs">ChatMessage[]</td>
                  <td className="py-3 px-4 font-mono text-xs">required</td>
                  <td className="py-3 px-4">Array of chat messages</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">onSend</td>
                  <td className="py-3 px-4 font-mono text-xs">(message: string) =&gt; void</td>
                  <td className="py-3 px-4 font-mono text-xs">-</td>
                  <td className="py-3 px-4">Callback when user sends message</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">isTyping</td>
                  <td className="py-3 px-4 font-mono text-xs">boolean</td>
                  <td className="py-3 px-4 font-mono text-xs">false</td>
                  <td className="py-3 px-4">Show typing indicator</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">showAvatars</td>
                  <td className="py-3 px-4 font-mono text-xs">boolean</td>
                  <td className="py-3 px-4 font-mono text-xs">true</td>
                  <td className="py-3 px-4">Show message avatars</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">height</td>
                  <td className="py-3 px-4 font-mono text-xs">number | string</td>
                  <td className="py-3 px-4 font-mono text-xs">400</td>
                  <td className="py-3 px-4">Chat container height</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChatPage;
