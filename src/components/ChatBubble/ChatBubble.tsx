import { COMPONENT_NAME_CHAT_BUBBLE } from '@const';
import { resolveBearId, useBearId } from '@utils';
import {
  CHAT_BUBBLE_DEFAULT_SHOW_AVATAR,
  CHAT_BUBBLE_DEFAULT_SHOW_STATUS,
  CHAT_BUBBLE_DEFAULT_SHOW_TIMESTAMP,
} from './ChatBubble.const';
import type { ChatBubbleProps } from './ChatBubble.types';
import { isChatSystemSender } from './ChatBubble.utils';
import { ChatBubbleSystem } from './helpers/ChatBubbleSystem';
import { ChatBubbleThread } from './helpers/ChatBubbleThread';

export const ChatBubble = (props: ChatBubbleProps) => {
  const {
    id,
    showTimestamp = CHAT_BUBBLE_DEFAULT_SHOW_TIMESTAMP,
    showStatus = CHAT_BUBBLE_DEFAULT_SHOW_STATUS,
    showAvatar = CHAT_BUBBLE_DEFAULT_SHOW_AVATAR,
    ...rest
  } = props;

  const generatedId = useBearId(COMPONENT_NAME_CHAT_BUBBLE);
  const domId = resolveBearId(id, generatedId);

  if (isChatSystemSender(rest.message.sender)) {
    return <ChatBubbleSystem id={domId} testId={rest.testId} message={rest.message} className={rest.className} />;
  }

  return (
    <ChatBubbleThread
      {...rest}
      id={domId}
      domId={domId}
      showTimestamp={showTimestamp}
      showStatus={showStatus}
      showAvatar={showAvatar}
    />
  );
};
