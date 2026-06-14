import { FC, useState } from 'react';
import { Button, Snackbar } from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { resolveSnackbarPlaygroundProps } from './SnackbarPlayground.utils';
import type { SnackbarPlaygroundProps } from './SnackbarPlayground.types';

export const SnackbarPlayground: FC<SnackbarPlaygroundProps> = (props) => {
  const { props: liveProps } = props;
  const [demoOpen, setDemoOpen] = useState(false);
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const resolved = resolveSnackbarPlaygroundProps(liveProps);

  return (
    <>
      <Button variant="primary" onClick={() => setDemoOpen(true)}>
        {t.bentoShowSnackbar}
      </Button>
      <Snackbar
        open={demoOpen}
        message={resolved.message}
        description={resolved.description}
        size={resolved.size}
        anchorOrigin={resolved.anchorOrigin}
        offsetX={resolved.offsetX}
        offsetY={resolved.offsetY}
        progress={resolved.progress}
        countdownProgress={resolved.countdownProgress}
        progressPosition={resolved.progressPosition}
        progressColor={resolved.progressColor}
        autoHideDuration={resolved.autoHideDuration}
        closeOnClickOutside={resolved.closeOnClickOutside}
        showCloseButton={resolved.showCloseButton}
        onClose={() => setDemoOpen(false)}
      />
    </>
  );
};
