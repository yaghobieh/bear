import { FC } from 'react';
import { ContextMenu, BearIcons, Typography, Flex } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';

const TRIGGER_CLASS =
  'inline-flex items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800/50 select-none';

const PROPS = [
  { name: 'items', type: 'ContextMenuEntry[]', description: 'Menu items, dividers, and nested children' },
  { name: 'children', type: 'ReactNode', description: 'Trigger area — right-click to open' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the context menu' },
  { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when menu opens or closes' },
  { name: 'id', type: 'string', description: 'Bear_context_menu_* when omitted' },
  { name: 'testId', type: 'string', description: 'data-testid on the trigger wrapper' },
];

const ContextMenuPage: FC = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage
      title="Context Menu"
      badge="New"
      description={t.contextMenuDesc}
      componentName="ContextMenu"
    >
      <ComponentPreview
        title={t.basic}
        description={t.rightClickHint}
        code={`<ContextMenu
  items={[
    { id: 'copy', label: 'Copy', onClick: () => {} },
    { id: 'paste', label: 'Paste', onClick: () => {} },
    { id: 'cut', label: 'Cut', onClick: () => {} },
  ]}
>
  <div className="trigger-area">Right-click here</div>
</ContextMenu>`}
      >
        <Flex justify="center">
          <ContextMenu
            items={[
              { id: 'copy', label: t.copy, onClick: () => {} },
              { id: 'paste', label: t.paste, onClick: () => {} },
              { id: 'cut', label: t.cut, onClick: () => {} },
            ]}
          >
            <div className={TRIGGER_CLASS}>
              <Typography variant="body2" color="muted">{t.contextMenuRightClick}</Typography>
            </div>
          </ContextMenu>
        </Flex>
      </ComponentPreview>

      <ComponentPreview
        title={t.contextMenuWithSubmenus}
        description={t.rightClickHint}
        code={`<ContextMenu
  items={[
    { id: 'new', label: 'New', children: [
      { id: 'file', label: 'File', onClick: () => {} },
      { id: 'folder', label: 'Folder', onClick: () => {} },
    ]},
    { id: 'open', label: 'Open', onClick: () => {} },
  ]}
>
  <div>Right-click here</div>
</ContextMenu>`}
      >
        <Flex justify="center">
          <ContextMenu
            items={[
              {
                id: 'new',
                label: 'New',
                children: [
                  { id: 'file', label: t.newFile, onClick: () => {} },
                  { id: 'folder', label: t.newFolder, onClick: () => {} },
                ],
              },
              { id: 'open', label: t.open, onClick: () => {} },
            ]}
          >
            <div className={TRIGGER_CLASS}>
              <Typography variant="body2" color="muted">{t.contextMenuRightClick}</Typography>
            </div>
          </ContextMenu>
        </Flex>
      </ComponentPreview>

      <ComponentPreview
        title={t.contextMenuIconsShortcuts}
        description={t.rightClickHint}
        code={`<ContextMenu
  items={[
    { id: 'copy', label: 'Copy', icon: <CopyIcon />, shortcut: '⌘C' },
    { id: 'paste', label: 'Paste', icon: <PasteIcon />, shortcut: '⌘V' },
  ]}
>
  <div>Right-click here</div>
</ContextMenu>`}
      >
        <Flex justify="center">
          <ContextMenu
            items={[
              { id: 'copy', label: t.copy, icon: <BearIcons.CopyIcon size={16} />, shortcut: '⌘C', onClick: () => {} },
              { id: 'paste', label: t.paste, icon: <BearIcons.ClipboardIcon size={16} />, shortcut: '⌘V', onClick: () => {} },
              { id: 'cut', label: t.cut, icon: <BearIcons.ScissorsIcon size={16} />, shortcut: '⌘X', onClick: () => {} },
            ]}
          >
            <div className={TRIGGER_CLASS}>
              <Typography variant="body2" color="muted">{t.contextMenuRightClick}</Typography>
            </div>
          </ContextMenu>
        </Flex>
      </ComponentPreview>

      <ComponentPreview
        title={t.contextMenuDestructive}
        description={t.rightClickHint}
        code={`<ContextMenu
  items={[
    { id: 'edit', label: 'Edit', onClick: () => {} },
    { id: 'delete', label: 'Delete', danger: true, onClick: () => {} },
  ]}
>
  <div>Right-click here</div>
</ContextMenu>`}
      >
        <Flex justify="center">
          <ContextMenu
            items={[
              { id: 'profile', label: t.profile, onClick: () => {} },
              { id: 'billing', label: t.billing, onClick: () => {} },
              { id: 'divider', type: 'divider' },
              { id: 'delete', label: t.delete, danger: true, onClick: () => {} },
            ]}
          >
            <div className={TRIGGER_CLASS}>
              <Typography variant="body2" color="muted">{t.contextMenuRightClick}</Typography>
            </div>
          </ContextMenu>
        </Flex>
      </ComponentPreview>

      <PropsTable title={t.props} rows={PROPS} />
    </DocPage>
  );
};

export default ContextMenuPage;
