import { useState } from 'react';
import type { FC } from 'react';
import { Chat, Typography } from '@forgedevstack/bear';
import type { ChatMessage } from '@forgedevstack/bear';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { HOME_AI_CHAT_HEIGHT, HOME_AI_FIELD_ID, HOME_AI_GIF_ID, HOME_AI_GIF_PROMPT } from './home.const';

const HomeAiGif: FC<{ note: string }> = ({ note }) => (
  <div className="home-ai-gif">
    <div className="home-ai-gif__stage" aria-hidden="true">
      <span className="home-ai-gif__card home-ai-gif__card--button" />
      <span className="home-ai-gif__card home-ai-gif__card--alert" />
      <span className="home-ai-gif__card home-ai-gif__card--chart" />
    </div>
    <Typography variant="caption" color="inherit" component="p">
      {note}
    </Typography>
    <pre className="home-ai-gif__prompt">{HOME_AI_GIF_PROMPT}</pre>
  </div>
);

export const HomeAiPrompt: FC = () => {
  const { language } = usePortalLanguage();
  const text = PORTAL_TEXT[language];
  const [showGif, setShowGif] = useState(false);

  const messages: ChatMessage[] = [
    {
      id: 'soon',
      sender: 'bot',
      name: 'Bear',
      content: text.homeAiTitle,
    },
    ...(showGif
      ? [{
          id: HOME_AI_GIF_ID,
          sender: 'bot' as const,
          name: 'Bear',
          content: <HomeAiGif note={text.homeAiGifNote} />,
        }]
      : []),
  ];

  return (
    <section className="home-ai" aria-labelledby={HOME_AI_FIELD_ID}>
      <Typography id={HOME_AI_FIELD_ID} variant="h3" component="h2" className="home-ai__title">
        {text.homeAiTitle}
      </Typography>
      <Chat
        id={`${HOME_AI_FIELD_ID}-chat`}
        height={HOME_AI_CHAT_HEIGHT}
        disabled
        messages={messages}
        placeholder={text.homeAiSoon}
        suggestions={[{ id: HOME_AI_GIF_ID, label: text.homeAiGif }]}
        onSuggestionSelect={() => setShowGif(true)}
        showTimestamps={false}
        showStatus={false}
      />
    </section>
  );
};
