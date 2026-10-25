import type { FC } from 'react';
import { Badge, Typography } from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { EDITOR_COPY, EDITOR_SHOTS } from './HomeEditorNote.const';

export const HomeEditorNote: FC = () => {
  const { language } = usePortalLanguage();
  const copy = EDITOR_COPY[language];

  return (
    <section className="home-products">
      <Badge variant="primary">{copy.soon}</Badge>
      <Typography variant="h2" className="home-products__title">{copy.title}</Typography>
      <Typography variant="body1" color="secondary" className="home-products__lead">{copy.body}</Typography>
      <div className="home-products__grid">
        {EDITOR_SHOTS.map((shot) => (
          <img key={shot.src} src={shot.src} alt={shot.alt} className="w-full rounded-xl border border-gray-200 dark:border-gray-800" />
        ))}
      </div>
    </section>
  );
};
