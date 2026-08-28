#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { join } from 'node:path';

const PINK = '\x1b[38;2;234;10;142m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

const BANNER = `
${PINK}${BOLD}
      /\\     /\\
     {  \`---'  }
     {  O   O  }
      ~~> V <~~
       \\  ^  /
        |___|
         BEAR
${RESET}${PINK}  React UI · npx @forgedevstack/bear${RESET}
`;

const PACKAGES = [
  { id: 'bear', name: '@forgedevstack/bear', label: 'Bear UI (components)' },
  { id: 'icons', name: '@forgedevstack/bear-icons', label: 'Bear Icons' },
  { id: 'grid', name: '@forgedevstack/grid-table', label: 'Grid Table' },
];

const ask = async (rl, question, fallback) => {
  const raw = await rl.question(`${PINK}${question}${RESET} `);
  const value = raw.trim();
  return value.length ? value : fallback;
};

const pickPackages = async (rl) => {
  console.log('\nWhat should we install?');
  PACKAGES.forEach((pkg, index) => {
    console.log(`  ${index + 1}) ${pkg.label}  (${pkg.name})`);
  });
  const raw = await ask(rl, 'Numbers (comma) or "all" [all]:', 'all');
  if (raw === 'all') {
    return PACKAGES.map((pkg) => pkg.name);
  }
  const ids = raw.split(',').map((part) => Number(part.trim()));
  return PACKAGES.filter((_, index) => ids.includes(index + 1)).map((pkg) => pkg.name);
};

const runInstall = (cwd, names) => {
  if (!names.length) {
    return;
  }
  const result = spawnSync('npm', ['install', ...names], { cwd, stdio: 'inherit' });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

const writeStarter = (dir) => {
  mkdirSync(join(dir, 'src'), { recursive: true });
  writeFileSync(join(dir, 'package.json'), `${JSON.stringify({
    name: dir.split('/').pop() || 'bear-app',
    private: true,
    type: 'module',
    scripts: { dev: 'vite', build: 'vite build' },
  }, null, 2)}\n`);
  writeFileSync(join(dir, 'index.html'), `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bear</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`);
  writeFileSync(join(dir, 'src/main.tsx'), `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BearProvider } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';
import { App } from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BearProvider>
      <App />
    </BearProvider>
  </StrictMode>,
);
`);
  writeFileSync(join(dir, 'src/App.tsx'), `import { Button, Typography } from '@forgedevstack/bear';

export const App = () => (
  <main>
    <Typography variant="h3">Bear</Typography>
    <Button>Get started</Button>
  </main>
);
`);
  writeFileSync(join(dir, 'vite.config.ts'), `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ plugins: [react()] });
`);
};

const main = async () => {
  process.stdout.write(BANNER);
  const rl = createInterface({ input, output });
  const mode = await ask(rl, 'New project or existing folder? [new/existing]:', 'new');
  const names = await pickPackages(rl);

  if (mode.startsWith('e')) {
    const folder = await ask(rl, 'Project folder [.]:', '.');
    const cwd = folder === '.' ? process.cwd() : join(process.cwd(), folder);
    if (!existsSync(cwd)) {
      console.error('Folder not found.');
      process.exit(1);
    }
    rl.close();
    runInstall(cwd, names);
    return;
  }

  const projectName = await ask(rl, 'Project name [bear-app]:', 'bear-app');
  const dir = join(process.cwd(), projectName);
  if (existsSync(dir)) {
    console.error('Folder already exists.');
    process.exit(1);
  }
  rl.close();
  writeStarter(dir);
  runInstall(dir, ['react', 'react-dom', 'vite', '@vitejs/plugin-react', ...names]);
  console.log(`\n${PINK}Created ${projectName}${RESET}\n  cd ${projectName} && npm run dev\n`);
};

main();
