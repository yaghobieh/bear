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
  },
] as const;

export const MCP_CONFIG_EXAMPLE = `npm install @forgedevstack/forge-mcp

import { createMcpServer, textResult } from '@forgedevstack/forge-mcp';

const { start } = createMcpServer({
  name: 'bear-ui',
  version: '1.3.5',
  tools: [
    {
      name: 'list-components',
      description: 'List Bear UI components',
      inputSchema: { type: 'object', properties: {} },
      handler: () => textResult('Button, Alert, Chart, Map'),
    },
  ],
});

start();`;

export const MCP_CLIENT_COMMANDS = {
  cursor: `{
  "mcpServers": {
    "bear-ui": {
      "command": "node",
      "args": ["server.js"]
    }
  }
}`,
  vscode: `{
  "servers": {
    "bear-ui": {
      "command": "node",
      "args": ["server.js"]
    }
  }
}`,
  codex: `codex mcp add bear-ui -- node server.js`,
  opencode: `{
  "mcp": {
    "bear-ui": { "command": "node", "args": ["server.js"] }
  }
}`,
  claude: `claude mcp add bear-ui -- node server.js`,
} as const;

export type McpClientId = keyof typeof MCP_CLIENT_COMMANDS;
