import { FC, useState } from 'react';
import { Flex, Switch, SwitchGroup, BearIcons } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import {
  SWITCH_PROPS,
  SWITCH_GROUP_PROPS,
  SWITCH_PLAN_OPTIONS,
  SWITCH_VIEW_OPTIONS,
  SWITCH_THEME_ICON_SIZE_PX,
  CODE_SWITCH_THEME,
} from './Switch.const';

const SwitchPage: FC = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const [checked, setChecked] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [plan, setPlan] = useState('pro');
  const [view, setView] = useState('list');

  return (
    <DocPage title="Switch" description={t.switchDesc} componentName="Switch">
      <ComponentPreview
        title={t.basic}
        description="Simple toggle switch."
        code={`const [checked, setChecked] = useState(false);

<Switch checked={checked} onCheckedChange={setChecked} />`}
      >
        <Flex justify="center">
          <Switch checked={checked} onCheckedChange={setChecked} />
        </Flex>
      </ComponentPreview>

      <ComponentPreview
        title={t.withLabel}
        description="Switch with label text."
        code={`<Switch label="Enable notifications" checked={notifications} onCheckedChange={setNotifications} />`}
      >
        <Flex direction="column" gap={4} align="start" className="mx-auto max-w-xs">
          <Switch label="Enable notifications" checked={notifications} onCheckedChange={setNotifications} />
          <Switch label="Dark mode" checked={darkMode} onCheckedChange={setDarkMode} />
        </Flex>
      </ComponentPreview>

      <ComponentPreview
        title={t.sizes}
        description="Available switch sizes."
        code={`<Switch size="sm" label="Small" />
<Switch size="md" label="Medium" />
<Switch size="lg" label="Large" />`}
      >
        <Flex direction="column" gap={4} align="start" className="mx-auto max-w-xs">
          <Switch size="sm" label="Small switch" defaultChecked />
          <Switch size="md" label="Medium switch" defaultChecked />
          <Switch size="lg" label="Large switch" defaultChecked />
        </Flex>
      </ComponentPreview>

      <ComponentPreview
        title={t.withIcons}
        description="Switch with Bear Sun and Moon icons."
        code={CODE_SWITCH_THEME}
      >
        <Flex direction="column" gap={4} align="start" className="mx-auto max-w-xs">
          <Switch
            label="Theme mode"
            checkedIcon={<BearIcons.MoonIcon size={SWITCH_THEME_ICON_SIZE_PX} />}
            uncheckedIcon={<BearIcons.SunIcon size={SWITCH_THEME_ICON_SIZE_PX} />}
            defaultChecked
          />
        </Flex>
      </ComponentPreview>

      <ComponentPreview
        title={t.verticalOrientation}
        description="Label below the track."
        code={`<Switch label="Airplane mode" orientation="vertical" checked={checked} onCheckedChange={setChecked} />`}
      >
        <Flex justify="center">
          <Switch label="Airplane mode" orientation="vertical" checked={checked} onCheckedChange={setChecked} />
        </Flex>
      </ComponentPreview>

      <ComponentPreview
        title={t.threeOptions}
        description="SwitchGroup for 3-way selection."
        code={`<SwitchGroup value={plan} onChange={setPlan} options={SWITCH_PLAN_OPTIONS} />`}
      >
        <Flex direction="column" gap={4} align="center">
          <SwitchGroup value={plan} onChange={setPlan} options={[...SWITCH_PLAN_OPTIONS]} />
          <SwitchGroup
            value={view}
            onChange={setView}
            orientation="vertical"
            options={[...SWITCH_VIEW_OPTIONS]}
          />
        </Flex>
      </ComponentPreview>

      <ComponentPreview
        title={t.disabled}
        description="Disabled switch states."
        code={`<Switch label="Disabled off" disabled />
<Switch label="Disabled on" disabled defaultChecked />`}
      >
        <Flex direction="column" gap={4} align="start" className="mx-auto max-w-xs">
          <Switch label="Disabled off" disabled />
          <Switch label="Disabled on" disabled defaultChecked />
        </Flex>
      </ComponentPreview>

      <PropsTable title={`Switch ${t.props}`} rows={SWITCH_PROPS} />
      <PropsTable title={`SwitchGroup ${t.props}`} rows={SWITCH_GROUP_PROPS} />
    </DocPage>
  );
};

export default SwitchPage;
