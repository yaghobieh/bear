import { useRef, useState } from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Badge,
  Input,
  Alert,
  Avatar,
  Chip,
  Spinner,
  Snackbar,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
  Switch,
  Progress,
  Typography,
  Flex,
  BearIcons,
} from '@forgedevstack/bear';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { BentoCard } from './BentoCard';
import {
  BENTO_ICONS,
  BENTO_ICON_SIZE,
  BENTO_INSTALL_COMMAND,
  BENTO_SNACKBAR_OFFSET_PX,
  BENTO_SNACKBAR_DURATION_MS,
  BENTO_SKILLS_LINK,
  BENTO_INSTALL_LINK,
} from './HomeBentoGrid.const';

export const HomeBentoGrid: FC = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const [align, setAlign] = useState('left');
  const [notifications, setNotifications] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const snackbarPanelRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bento-grid mb-20">
      <BentoCard title={t.bentoButton} className="bento-card--span-1">
        <Flex gap={2} wrap="wrap">
          <Button variant="primary" size="sm">Primary</Button>
          <Button variant="secondary" size="sm">Secondary</Button>
          <Button variant="outline" size="sm">Outline</Button>
        </Flex>
      </BentoCard>

      <BentoCard title={t.bentoToggleButton} className="bento-card--span-1">
        <ToggleButtonGroup value={align} onChange={(v) => setAlign(v as string)} exclusive size="sm">
          <ToggleButton value="left"><Typography variant="body2" component="span">{t.bentoAlignLeft}</Typography></ToggleButton>
          <ToggleButton value="center"><Typography variant="body2" component="span">{t.bentoAlignCenter}</Typography></ToggleButton>
          <ToggleButton value="right"><Typography variant="body2" component="span">{t.bentoAlignRight}</Typography></ToggleButton>
        </ToggleButtonGroup>
      </BentoCard>

      <BentoCard title={t.bentoFormControl} className="bento-card--span-1">
        <FormControl label="Email" helperText={t.bentoEmailHelper} required>
          <Input placeholder="you@example.com" size="sm" />
        </FormControl>
      </BentoCard>

      <BentoCard title={t.bentoBadge} className="bento-card--span-1">
        <Flex gap={2} wrap="wrap">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </Flex>
      </BentoCard>

      <BentoCard title={t.bentoChip} className="bento-card--span-1">
        <Flex gap={2} wrap="wrap">
          <Chip variant="filled">React</Chip>
          <Chip variant="outlined">TypeScript</Chip>
          <Chip variant="soft" color="primary">Bear UI</Chip>
        </Flex>
      </BentoCard>

      <BentoCard title={t.bentoAlert} className="bento-card--span-1">
        <Alert severity="info" title={t.bentoAlertTitle}>{t.bentoAlertBody}</Alert>
      </BentoCard>

      <BentoCard title={t.bentoAvatar} className="bento-card--span-1">
        <Flex gap={2} align="center">
          <Avatar initials="JY" size="sm" />
          <Avatar initials="BU" size="sm" />
          <Avatar initials="FS" size="sm" />
        </Flex>
      </BentoCard>

      <BentoCard title={t.bentoSwitch} className="bento-card--span-1">
        <Switch
          label={t.bentoNotifications}
          checked={notifications}
          onCheckedChange={setNotifications}
        />
      </BentoCard>

      <BentoCard title={t.bentoSpinner} className="bento-card--span-1">
        <Flex gap={3} align="center">
          <Spinner size="sm" />
          <Spinner size="md" color="var(--bear-primary-500)" />
        </Flex>
      </BentoCard>

      <BentoCard title={t.bentoProgress} className="bento-card--span-1">
        <Progress value={68} showLabel color="default" />
      </BentoCard>

      <BentoCard title={t.bentoIcons} className="bento-card--span-1">
        <Flex gap={3} align="center" className="text-gray-500 dark:text-gray-400">
          {BENTO_ICONS.map((Icon, i) => (
            <Icon key={i} size={BENTO_ICON_SIZE} />
          ))}
        </Flex>
      </BentoCard>

      <BentoCard title={t.bentoSnackbar} className="bento-card--span-2">
        <Flex direction="column" gap={2}>
          <Button size="sm" variant="secondary" onClick={() => setSnackbarOpen(true)}>
            {t.bentoShowSnackbar}
          </Button>
          <div
            ref={snackbarPanelRef}
            className="relative h-24 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 overflow-hidden"
          />
          <Snackbar
            open={snackbarOpen}
            message={t.bentoSnackbarMessage}
            description={t.bentoSnackbarDesc}
            container={snackbarPanelRef.current}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            offsetX={BENTO_SNACKBAR_OFFSET_PX}
            offsetY={BENTO_SNACKBAR_OFFSET_PX}
            autoHideDuration={BENTO_SNACKBAR_DURATION_MS}
            countdownProgress
            progressColor="default"
            closeOnClickOutside={false}
            onClose={() => setSnackbarOpen(false)}
          />
        </Flex>
      </BentoCard>

      <BentoCard title={t.bentoSkills} className="bento-card--span-1">
        <Typography variant="body2" color="muted" className="mb-2">
          {t.bentoSkillsDesc}
        </Typography>
        <Link
          to={BENTO_SKILLS_LINK}
          className="inline-flex items-center gap-1 text-xs font-medium text-pink-600 dark:text-pink-400 hover:underline"
        >
          {t.bentoLearnMore}
          <BearIcons.ArrowRightIcon size={12} />
        </Link>
      </BentoCard>

      <BentoCard title={t.bentoGettingStarted} className="bento-card--span-2">
        <Typography variant="body2" color="muted" className="mb-3">
          {t.bentoGettingStartedDesc}
        </Typography>
        <Typography variant="code" className="block bg-gray-100 dark:bg-gray-900 rounded-md px-3 py-2 text-gray-700 dark:text-gray-300">
          {BENTO_INSTALL_COMMAND}
        </Typography>
        <Link
          to={BENTO_INSTALL_LINK}
          className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-pink-600 dark:text-pink-400 hover:underline"
        >
          {t.bentoInstallGuide}
          <BearIcons.ArrowRightIcon size={12} />
        </Link>
      </BentoCard>
    </section>
  );
};
