import type { MessageListMessage } from '@forgedevstack/bear';
import type { PropRow } from '@/components/PropsTable';

const MS_PER_MINUTE = 60 * 1000;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const now = Date.now();

export const DEMO_AUTHORS = {
  amelia: { id: 'amelia', name: 'Amelia Stone' },
  noah: { id: 'noah', name: 'Noah Reed' },
  me: { id: 'me', name: 'You' },
};

export const DEMO_MESSAGES: MessageListMessage[] = [
  {
    id: 'm1',
    author: DEMO_AUTHORS.amelia,
    content: 'Hey team, the 1.2.5 build is green.',
    timestamp: new Date(now - MS_PER_DAY - 8 * MS_PER_MINUTE),
  },
  {
    id: 'm2',
    author: DEMO_AUTHORS.amelia,
    content: 'Portal docs are updated too.',
    timestamp: new Date(now - MS_PER_DAY - 7 * MS_PER_MINUTE),
  },
  {
    id: 'm3',
    author: DEMO_AUTHORS.noah,
    content: 'Nice. Did the MessageList land?',
    timestamp: new Date(now - MS_PER_DAY - 5 * MS_PER_MINUTE),
  },
  {
    id: 'm4',
    author: DEMO_AUTHORS.me,
    content: 'Yes — grouping, day separators, and auto-scroll.',
    timestamp: new Date(now - 9 * MS_PER_MINUTE),
  },
  {
    id: 'm5',
    author: DEMO_AUTHORS.me,
    content: 'Virtualization is in 1.2.6 via the virtualized prop.',
    timestamp: new Date(now - 8 * MS_PER_MINUTE),
  },
  {
    id: 'm6',
    author: DEMO_AUTHORS.noah,
    content: 'Scroll up and press the button below to see the "new messages" pill.',
    timestamp: new Date(now - 2 * MS_PER_MINUTE),
  },
];

export const DEMO_REPLIES = [
  'Shipping it!',
  'One more sanity pass and we are done.',
  'Dark mode looks great too.',
  'Toast now supports pauseOnHover.',
];

export const MESSAGE_LIST_PROPS: PropRow[] = [
  { name: 'messages', type: 'MessageListMessage[]', description: 'Messages in chronological order (oldest first)' },
  { name: 'currentUserId', type: 'string', description: 'Author id rendered right-aligned as own messages' },
  { name: 'groupWindowMs', type: 'number', default: '300000', description: 'Max gap between messages of one author to stay grouped' },
  { name: 'showDaySeparators', type: 'boolean', default: 'true', description: 'Render day separator rows' },
  { name: 'showAvatars', type: 'boolean', default: 'true', description: 'Show author avatars' },
  { name: 'showTimestamps', type: 'boolean', default: 'true', description: 'Show group timestamps' },
  { name: 'autoScroll', type: 'boolean', default: 'true', description: 'Stick to bottom when new messages arrive' },
  { name: 'virtualized', type: 'boolean', description: 'Windowed rendering; auto-enabled above the message threshold' },
  { name: 'height', type: 'number | string', default: '400', description: 'Height of the scrollable area' },
  { name: 'renderMessage', type: '(message) => ReactNode', description: 'Custom message content renderer' },
  { name: 'emptyState', type: 'ReactNode', description: 'Content when there are no messages' },
  { name: 'formatDayLabel', type: '(date) => string', description: 'Custom day separator label' },
  { name: 'formatTimestamp', type: '(date) => string', description: 'Custom timestamp label' },
  { name: 'translations', type: 'Partial<MessageListTranslations>', description: 'Replace user-facing strings' },
  { name: 'onNewMessagesClick', type: '() => void', description: 'Called when the new-messages pill is clicked' },
  { name: 'id', type: 'string', description: 'DOM id — Bear_message_list_* when omitted' },
  { name: 'testId', type: 'string', description: 'data-testid' },
  { name: 'className', type: 'string', description: 'Additional CSS class' },
];

export const MESSAGE_TYPE_PROPS: PropRow[] = [
  { name: 'id', type: 'string', description: 'Unique message identifier' },
  { name: 'author', type: 'MessageListAuthor', description: 'Author — { id, name, avatar? }' },
  { name: 'content', type: 'ReactNode', description: 'Message content' },
  { name: 'timestamp', type: 'Date', description: 'Used for grouping and day separators' },
];

export const BASIC_CODE = `import { MessageList } from '@forgedevstack/bear';

<MessageList
  messages={messages}
  currentUserId="me"
  height={380}
  onNewMessagesClick={() => markAsRead()}
/>`;
