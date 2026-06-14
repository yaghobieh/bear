import { FC } from 'react';
import { List, ListItem } from '@forgedevstack/bear';
import { DocPage } from '@/components/DocPage';
import { ComponentPreview } from '@/components/ComponentPreview';
import { PropsTable } from '@/components/PropsTable';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { DOCS_TEXT } from '@/constants/docs-i18n.const';

const LIST_PROPS = [
  { name: 'variant', type: "'default' | 'bordered' | 'divided' | 'laminated'", default: 'default', description: 'List visual style' },
  { name: 'size', type: 'BearSize', default: 'md', description: 'Typography size' },
  { name: 'hoverable', type: 'boolean', default: 'false', description: 'Hover styles on items' },
  { name: 'dense', type: 'boolean', default: 'false', description: 'Compact item spacing' },
  { name: 'disablePadding', type: 'boolean', default: 'false', description: 'Remove vertical padding' },
  { name: 'className', type: 'string', description: 'Additional root classes' },
  { name: 'testId', type: 'string', description: 'data-testid on the list' },
];

const LIST_ITEM_PROPS = [
  { name: 'primary', type: 'ReactNode', description: 'Primary text' },
  { name: 'secondary', type: 'ReactNode', description: 'Secondary text' },
  { name: 'leading', type: 'ReactNode', description: 'Leading icon or avatar' },
  { name: 'trailing', type: 'ReactNode', description: 'Trailing action or badge' },
  { name: 'clickable', type: 'boolean', description: 'Enable hover and pointer cursor' },
  { name: 'selected', type: 'boolean', description: 'Selected state styling' },
  { name: 'disabled', type: 'boolean', description: 'Disabled state' },
];

const ListPage: FC = () => {
  const { language } = usePortalLanguage();
  const t = DOCS_TEXT[language];

  return (
    <DocPage title="List" description={t.listDesc} componentName="List">
      <ComponentPreview
        title={t.basic}
        description="Simple list with items."
        code={`<List>
  <ListItem primary="Inbox" secondary="You have 3 new messages" />
  <ListItem primary="Drafts" />
  <ListItem primary="Sent" secondary="Last sent: 2 days ago" />
</List>`}
      >
        <div className="max-w-sm mx-auto">
          <List variant="divided">
            <ListItem primary="Inbox" secondary="You have 3 new messages" clickable />
            <ListItem primary="Drafts" clickable />
            <ListItem primary="Sent" secondary="Last sent: 2 days ago" clickable />
          </List>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title={t.withIcons}
        description="List items with leading content."
        code={`<List>
  <ListItem leading={<span>📥</span>} primary="Inbox" />
  <ListItem leading={<span>📤</span>} primary="Sent" />
  <ListItem leading={<span>⚙️</span>} primary="Settings" />
</List>`}
      >
        <div className="max-w-sm mx-auto">
          <List variant="divided">
            <ListItem leading={<span>📥</span>} primary="Inbox" clickable />
            <ListItem leading={<span>📤</span>} primary="Sent" clickable />
            <ListItem leading={<span>⚙️</span>} primary="Settings" clickable />
          </List>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title={t.laminated}
        description="Card-style list items with shadow and spacing."
        code={`<List variant="laminated">
  <ListItem primary="Inbox" secondary="3 new messages" />
  <ListItem primary="Drafts" />
  <ListItem primary="Sent" secondary="Last sent yesterday" />
</List>`}
      >
        <div className="max-w-sm mx-auto">
          <List variant="laminated">
            <ListItem primary="Inbox" secondary="3 new messages" clickable />
            <ListItem primary="Drafts" clickable />
            <ListItem primary="Sent" secondary="Last sent yesterday" clickable />
          </List>
        </div>
      </ComponentPreview>

      <PropsTable title={`List ${t.props}`} rows={LIST_PROPS} />
      <PropsTable title={`ListItem ${t.props}`} rows={LIST_ITEM_PROPS} />
    </DocPage>
  );
};

export default ListPage;
