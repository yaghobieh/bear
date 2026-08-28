import { NPX_BEAR_COMMAND } from '@/constants/marketing.const';

export const INSTALL_NPX_BEAR = NPX_BEAR_COMMAND;

export const INSTALL_NPM_BEAR = 'npm install @forgedevstack/bear';
export const INSTALL_YARN_BEAR = 'yarn add @forgedevstack/bear';
export const INSTALL_PNPM_BEAR = 'pnpm add @forgedevstack/bear';

export const INSTALL_NPM_BEAR_NO_ICONS = 'npm install @forgedevstack/bear --omit=optional';
export const INSTALL_YARN_BEAR_NO_ICONS = 'yarn add @forgedevstack/bear --ignore-optional';
export const INSTALL_PNPM_BEAR_NO_ICONS = 'pnpm add @forgedevstack/bear --no-optional';

export const INSTALL_NPM_ICONS = 'npm install @forgedevstack/bear-icons';
export const INSTALL_YARN_ICONS = 'yarn add @forgedevstack/bear-icons';
export const INSTALL_PNPM_ICONS = 'pnpm add @forgedevstack/bear-icons';

export const INSTALL_STYLES_CODE = `import '@forgedevstack/bear/styles.css';`;

export const INSTALL_PROVIDER_CODE = `import { BearProvider } from '@forgedevstack/bear';

function App() {
  return (
    <BearProvider>
    </BearProvider>
  );
}`;

export const INSTALL_COMPONENT_CODE = `import { Button, Card, Badge } from '@forgedevstack/bear';

function MyComponent() {
  return (
    <Card>
      <Card.Header>
        <Badge variant="success">New</Badge>
        Welcome!
      </Card.Header>
      <Card.Body>
        <p>This is a Bear UI card component.</p>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary">Learn More</Button>
      </Card.Footer>
    </Card>
  );
}`;

export const INSTALL_ICONS_FROM_BEAR_CODE = `import { SearchIcon, BearIcons } from '@forgedevstack/bear';

<SearchIcon size="md" />
<BearIcons.ChevronRight size="sm" />`;

export const INSTALL_ICONS_ONLY_CODE = `import { SearchIcon, BearIcons } from '@forgedevstack/bear-icons';

<SearchIcon size="md" />
<BearIcons.ChevronRight size="sm" />`;
