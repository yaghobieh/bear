import { FC, useRef, useState } from 'react';
import { Button, Drawer, Typography, Flex } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';
import { DRAWER_SIDES, DRAWER_SIZES, DRAWER_PROPS, DRAWER_SIDE_LABELS, DRAWER_TITLE_PREFIX } from './Drawer.const';
import type { DrawerDemoProps } from './Drawer.types';

const DrawerDemo: FC<DrawerDemoProps> = (props) => {
  const { side = 'right', size = 'md', container, openEffect, closeEffect } = props;
  const [open, setOpen] = useState(false);
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];
  const sideLabel = DRAWER_SIDE_LABELS[side];

  return (
    <>
      <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
        {t.drawerOpen} ({sideLabel}{openEffect ? ` · ${openEffect}` : ''}{closeEffect ? `/${closeEffect}` : ''})
      </Button>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        title={`${DRAWER_TITLE_PREFIX}${sideLabel}`}
        side={side}
        size={size}
        container={container}
        openEffect={openEffect}
        closeEffect={closeEffect}
      >
        <Typography variant="body2" color="muted">
          Portaled with createPortal. Press Escape or click the backdrop to close.
        </Typography>
      </Drawer>
    </>
  );
};

const DrawerPage: FC = () => {
  const portalPanelRef = useRef<HTMLDivElement>(null);
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title="Drawer" description={t.drawerDesc} componentName="Drawer">
      <ComponentPreview
        title={t.basic}
        description="Default right-side drawer portaled to document.body."
        code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open drawer</Button>

<Drawer
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Settings"
  side="right"
  size="md"
>
  <p>Drawer content</p>
</Drawer>`}
      >
        <Flex justify="center">
          <DrawerDemo />
        </Flex>
      </ComponentPreview>

      <ComponentPreview
        title={t.drawerSides}
        description="Open from any edge."
        code={`<Drawer side="left" ... />
<Drawer side="right" ... />
<Drawer side="top" ... />
<Drawer side="bottom" ... />`}
      >
        <Flex gap={2} wrap="wrap" justify="center">
          {DRAWER_SIDES.map((side) => (
            <DrawerDemo key={side} side={side} size="sm" />
          ))}
        </Flex>
      </ComponentPreview>

      <ComponentPreview
        title={t.drawerSizes}
        description="sm, md, lg, and xl widths/heights."
        code={`<Drawer size="sm" />
<Drawer size="md" />
<Drawer size="lg" />
<Drawer size="xl" />`}
      >
        <Flex gap={2} wrap="wrap" justify="center">
          {DRAWER_SIZES.map((size) => (
            <DrawerDemo key={size} size={size} />
          ))}
        </Flex>
      </ComponentPreview>

      <ComponentPreview
        title={t.drawerPortal}
        description="Mount inside a panel instead of document.body — same API as Snackbar container."
        code={`const panelRef = useRef<HTMLDivElement>(null);

<div ref={panelRef} className="relative h-48 overflow-hidden rounded-lg border" />
<Drawer
  isOpen={open}
  onClose={() => setOpen(false)}
  container={panelRef.current}
  side="left"
  size="sm"
>
  Panel content
</Drawer>`}
      >
        <Flex direction="column" gap={2} align="center">
          <div
            ref={portalPanelRef}
            className="relative w-full max-w-md h-48 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 overflow-hidden"
          />
          <DrawerDemo side="left" size="sm" container={portalPanelRef.current} />
        </Flex>
      </ComponentPreview>

      <ComponentPreview
        title={t.drawerEffects}
        description={t.drawerEffectsDesc}
        code={`<Drawer openEffect="slide-down" closeEffect="fade" />
<Drawer effect={{ open: 'scale', close: 'slide-down' }} />`}
      >
        <Flex gap={2} wrap="wrap" justify="center">
          <DrawerDemo openEffect="slide-down" closeEffect="fade" />
          <DrawerDemo openEffect="scale" closeEffect="slide-down" />
          <DrawerDemo openEffect="fade" closeEffect="scale" />
          <DrawerDemo openEffect="none" closeEffect="none" />
        </Flex>
      </ComponentPreview>

      <PropsTable title={t.props} rows={DRAWER_PROPS} />
    </DocPage>
  );
};

export default DrawerPage;
