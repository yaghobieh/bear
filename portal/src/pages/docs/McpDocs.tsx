import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CodeBlock } from '@/components/CodeBlock';

const SERVER = `import { createMcpServer, textResult } from '@forgedevstack/forge-mcp';

const { start } = createMcpServer({
  name: 'bear-ui',
  version: '1.3.5',
  tools: [
    {
      name: 'bear-docs',
      description: 'Look up a Bear component or guide',
      inputSchema: {
        type: 'object',
        properties: { topic: { type: 'string' } },
        required: ['topic'],
      },
      handler: ({ topic }) => textResult(\`See https://bearui.com and https://bearui.com/llms.txt for \${topic}\`),
    },
  ],
});

start();`;

const CURSOR_CONFIG = `{
  "mcpServers": {
    "bear-ui": {
      "type": "stdio",
      "command": "node",
      "args": ["bear-mcp.mjs"]
    }
  }
}`;

const VSCODE_SETTINGS = `{
  "chat.mcp.enabled": true,
  "chat.mcp.discovery.enabled": true
}`;

const ZED_CONFIG = `{
  "bear-ui": {
    "command": {
      "path": "node",
      "args": ["bear-mcp.mjs"],
      "env": {}
    }
  }
}`;

const RULE = `## Use Bear docs for Bear questions

- Read https://bearui.com/llms.txt and open only the linked pages you need.
- Prefer imports from @forgedevstack/bear.
- Button color comes from variant or BearProvider customVariants.
- Do not answer Harbor, Grid Table, Rail, Calendar, Ink, or Torch questions from this server.`;

const McpDocsPage: FC = () => (
  <article className="fade-in">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">MCP</h1>
    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
      Connect an editor to a local Bear MCP server so questions about components resolve against these docs. The server is a small script you run with @forgedevstack/forge-mcp. It speaks stdio, the same transport used by Cursor, VS Code, Windsurf, JetBrains, Zed, and Claude Code.
    </p>

    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Server script</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Save this as bear-mcp.mjs next to the editor config. Install the helper with npm install @forgedevstack/forge-mcp. The tool should point at <Link className="text-pink-600 dark:text-pink-400" to="/docs/llms">llms.txt</Link> and the page for the component being asked about.
      </p>
      <CodeBlock code={SERVER} language="ts" showLineNumbers={false} />
    </section>

    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">VS Code, Cursor, and Windsurf</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Open MCP settings and add a stdio server. Cursor and Windsurf use mcpServers. VS Code uses the same shape in its MCP configuration, then turns MCP on in settings.json.
      </p>
      <CodeBlock code={CURSOR_CONFIG} language="json" showLineNumbers={false} />
      <div className="mt-4">
        <CodeBlock code={VSCODE_SETTINGS} language="json" showLineNumbers={false} />
      </div>
    </section>

    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">JetBrains IDEs</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Settings, Tools, AI Assistant, Model Context Protocol. Add a server named Bear UI. Command: node. Arguments: bear-mcp.mjs. Apply, then start the server from the MCP tool window.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Zed</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Run agent: add context server and paste a custom server. The command is node and the argument is the script path.
      </p>
      <CodeBlock code={ZED_CONFIG} language="json" showLineNumbers={false} />
    </section>

    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Claude Code</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Add the server to the current project, or pass -s user so every project on the machine can see it.
      </p>
      <CodeBlock
        code={`claude mcp add bear-ui -- node bear-mcp.mjs
claude mcp add bear-ui -s user -- node bear-mcp.mjs`}
        language="bash"
        showLineNumbers={false}
      />
    </section>

    <section className="mb-12">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Ask the agent to use it</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        A saved rule tells the agent to open the docs index before it answers. In Cursor that file can live in .cursor/rules. In VS Code it can live in .github/instructions.
      </p>
      <CodeBlock code={RULE} language="md" showLineNumbers={false} />
    </section>
  </article>
);

export default McpDocsPage;
