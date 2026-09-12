import { SANDBOX_PACKAGE_JSON, SANDBOX_STARTER_APP } from './Sandbox.const';

export const SANDBOX_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bear sandbox</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

export const SANDBOX_INDEX_JS = `import { createRoot } from 'react-dom/client';
import App from './App';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
}
`;

export const buildSandboxFiles = (appSource: string = SANDBOX_STARTER_APP) => ({
  'package.json': {
    content: SANDBOX_PACKAGE_JSON,
  },
  'public/index.html': {
    content: SANDBOX_HTML,
  },
  'src/index.js': {
    content: SANDBOX_INDEX_JS,
  },
  'src/App.js': {
    content: appSource,
  },
});
