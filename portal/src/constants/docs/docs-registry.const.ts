export const FORGE_REGISTRY_SCHEMA = 'https://forgedevstack.com/schema/registry.json';

export const REGISTRY_JSON_EXAMPLE = `{
  "$schema": "${FORGE_REGISTRY_SCHEMA}",
  "name": "acme-bear-kit",
  "homepage": "https://github.com/acme/bear-kit",
  "items": [
    {
      "name": "dashboard-layout",
      "type": "registry:item",
      "title": "Dashboard Layout",
      "description": "AppBar + Sidebar shell using Bear components.",
      "files": [
        {
          "path": "layouts/DashboardLayout.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}`;

export const REGISTRY_INSTALL_CMD = `npx forge-cli add acme/bear-kit/dashboard-layout
npx forge-cli add acme/bear-kit/dashboard-layout#v1.0.0`;

export const REGISTRY_VALIDATE_CMD = 'npx forge-cli registry validate acme/bear-kit';

export const REGISTRY_DIRECTORY_LINKS = [
  {
    name: '@forgedevstack/bear',
    descKey: 'registryLinkBearDesc',
    href: 'https://github.com/yaghobieh/bear',
    external: true,
  },
  {
    name: 'GitHub registries',
    descKey: 'registryLinkGithubDesc',
    href: '/docs/registry/github',
    external: false,
  },
  {
    name: 'MCP Server',
    descKey: 'registryLinkMcpDesc',
    href: '/docs/registry/mcp',
    external: false,
    badgeKey: 'soon',
  },
] as const;

export const MCP_CONFIG_EXAMPLE = `{
  "registries": {
    "@acme": "https://acme.com/r/{name}.json"
  }
}`;

export const MCP_CLIENT_COMMANDS = {
  cursor: 'npx forge-cli mcp init --client cursor',
  vscode: 'npx forge-cli mcp init --client vscode',
  codex: 'npx forge-cli mcp init --client codex',
  opencode: 'npx forge-cli mcp init --client opencode',
  claude: 'npx forge-cli mcp init --client claude',
} as const;

export type McpClientId = keyof typeof MCP_CLIENT_COMMANDS;
