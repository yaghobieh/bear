import { useState } from 'react';
import type { FC } from 'react';
import { Alert, Button, Progress, Rating, Switch, Typography } from '@forgedevstack/bear';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { HOME_SIDE_PROGRESS, HOME_SIDE_RATING } from './home.const';

export const HomeSideExamples: FC = () => {
  const { language } = usePortalLanguage();
  const text = PORTAL_TEXT[language];
  const [notifications, setNotifications] = useState(true);
  const [rating, setRating] = useState(HOME_SIDE_RATING);

  return (
    <div className="home-side">
      <div className="home-side__card">
        <Typography variant="caption" color="secondary" className="home-side__label">
          {text.homeExampleButtons}
        </Typography>
        <div className="home-side__row">
          <Button variant="primary" size="sm">{text.getStarted}</Button>
          <Button variant="outline" size="sm">{text.viewDocs}</Button>
        </div>
      </div>

      <div className="home-side__card">
        <Typography variant="caption" color="secondary" className="home-side__label">
          {text.homeExampleAlert}
        </Typography>
        <Alert variant="outlined" severity="info" title={text.homeExampleAlertTitle}>
          {text.homeExampleAlertBody}
        </Alert>
      </div>

      <div className="home-side__card">
        <Typography variant="caption" color="secondary" className="home-side__label">
          {text.homeExampleControls}
        </Typography>
        <Switch
          label={text.homeExampleNotify}
          checked={notifications}
          onCheckedChange={setNotifications}
          size="sm"
        />
        <Rating value={rating} onChange={setRating} size="sm" />
        <Progress value={HOME_SIDE_PROGRESS} size="sm" />
      </div>
    </div>
  );
};
