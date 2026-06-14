import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../../../');
const SANITY_DIR = path.join(ROOT, 'Sanity');
const REPORT_JSON = path.join(SANITY_DIR, 'playwright-report.json');

function getVersion() {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  return pkg.version ?? 'unknown';
}

function getBranch() {
  try {
    return fs.readFileSync(path.join(ROOT, '.git/HEAD'), 'utf8').replace('ref: refs/heads/', '').trim();
  } catch {
    return 'unknown';
  }
}

function getDate() {
  return new Date().toISOString().split('T')[0];
}

function statusIcon(passed) {
  return passed ? '✅' : '❌';
}

function parsePlaywrightReport() {
  if (!fs.existsSync(REPORT_JSON)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(REPORT_JSON, 'utf8'));
}

function buildGatesSection(lintOutput) {
  const gates = [
    { id: 'G1', name: 'No magic strings/numbers', autoCheck: false },
    { id: 'G2', name: 'No `as` casts on LiveProps', autoCheck: false },
    { id: 'G3', name: 'No HTML comments in JSX', autoCheck: true, lintKey: 'no-html-comments' },
    { id: 'G4', name: 'No bare `<>` for layout', autoCheck: false },
    { id: 'G5', name: 'Bear primitives only (no raw div/span)', autoCheck: false },
    { id: 'G6', name: 'Keymap over chained conditions', autoCheck: false },
    { id: 'G7', name: 'One component per `.tsx`', autoCheck: false },
    { id: 'G8', name: 'SVGs in helper files', autoCheck: false },
    { id: 'G9', name: 'All user-visible text translated', autoCheck: false },
    { id: 'G10', name: '1 const + 1 types file per folder', autoCheck: false },
  ];

  const lintPassed = lintOutput?.exitCode === 0;
  const lintErrors = lintOutput?.errorCount ?? 0;
  const lintWarnings = lintOutput?.warningCount ?? 0;

  let rows = '| Gate | Rule | Status | Notes |\n';
  rows += '|------|------|--------|-------|\n';

  for (const gate of gates) {
    const status = gate.autoCheck
      ? statusIcon(lintPassed)
      : '🔍 Manual';
    const notes = gate.autoCheck && !lintPassed ? `${lintErrors} error(s), ${lintWarnings} warning(s)` : '';
    rows += `| **${gate.id}** | ${gate.name} | ${status} | ${notes} |\n`;
  }

  const overallLint = lintPassed ? '✅ ESLint passed' : `❌ ESLint failed (${lintErrors} errors, ${lintWarnings} warnings)`;

  return `## Code Review Gates (Static Analysis)\n\n${overallLint}\n\n${rows}`;
}

function buildPlaywrightSection(report) {
  if (!report) {
    return '## Playwright Sanity\n\n> No Playwright report found. Run `npm run test:e2e` first.\n';
  }

  const suites = report.suites ?? [];
  const allTests = [];

  function collectTests(suite) {
    for (const spec of suite.specs ?? []) {
      for (const test of spec.tests ?? []) {
        allTests.push({
          title: spec.title,
          status: test.status,
          duration: test.results?.[0]?.duration ?? 0,
        });
      }
    }
    for (const child of suite.suites ?? []) {
      collectTests(child);
    }
  }

  for (const suite of suites) {
    collectTests(suite);
  }

  const sanity = allTests.filter((t) => t.title.startsWith('[sanity]'));
  const interactions = allTests.filter((t) => t.title.startsWith('[interaction]'));
  const darkMode = allTests.filter((t) => t.title.startsWith('[dark-mode]'));

  const summary = (tests) => {
    const passed = tests.filter((t) => t.status === 'expected').length;
    const failed = tests.filter((t) => t.status === 'unexpected').length;
    const skipped = tests.filter((t) => t.status === 'skipped').length;
    return { passed, failed, skipped, total: tests.length };
  };

  const sanitySum = summary(sanity);
  const interactSum = summary(interactions);
  const darkSum = summary(darkMode);

  const failedTests = allTests.filter((t) => t.status === 'unexpected');

  let section = `## Playwright Sanity Results\n\n`;
  section += `| Suite | Passed | Failed | Skipped | Total |\n`;
  section += `|-------|--------|--------|---------|-------|\n`;
  section += `| Page Render (sanity) | ${sanitySum.passed} | ${sanitySum.failed} | ${sanitySum.skipped} | ${sanitySum.total} |\n`;
  section += `| Click Interactions | ${interactSum.passed} | ${interactSum.failed} | ${interactSum.skipped} | ${interactSum.total} |\n`;
  section += `| Dark Mode | ${darkSum.passed} | ${darkSum.failed} | ${darkSum.skipped} | ${darkSum.total} |\n`;

  if (failedTests.length > 0) {
    section += `\n### Failed Tests\n\n`;
    for (const t of failedTests) {
      section += `- ❌ \`${t.title}\`\n`;
    }
  }

  return section;
}

function buildTypeCheckSection(typeCheckOutput) {
  const passed = typeCheckOutput?.exitCode === 0;
  const errors = typeCheckOutput?.output ?? '';
  return `## TypeScript Check\n\n${statusIcon(passed)} ${passed ? 'No type errors' : `Type errors found:\n\`\`\`\n${errors.slice(0, 2000)}\n\`\`\``}\n`;
}

function buildUnitTestSection(testOutput) {
  if (!testOutput) return '## Unit Tests\n\n> Not run\n';
  const passed = testOutput.exitCode === 0;
  const summary = testOutput.output?.match(/Tests.+/)?.[0] ?? '';
  return `## Unit Tests (Vitest)\n\n${statusIcon(passed)} ${passed ? `Passed — ${summary}` : `Failed\n\`\`\`\n${testOutput.output?.slice(0, 1000)}\n\`\`\``}\n`;
}

function main() {
  const args = process.argv.slice(2);
  const data = {};

  for (let i = 0; i < args.length; i += 2) {
    if (args[i] && args[i + 1]) {
      try {
        data[args[i].replace('--', '')] = JSON.parse(args[i + 1]);
      } catch {
        data[args[i].replace('--', '')] = { raw: args[i + 1] };
      }
    }
  }

  const version = getVersion();
  const branch = getBranch();
  const date = getDate();
  const playwrightReport = parsePlaywrightReport();

  const overallPassed =
    (data.lint?.exitCode === 0) &&
    (data.typecheck?.exitCode === 0) &&
    (data.unittest?.exitCode === 0) &&
    (!playwrightReport || (playwrightReport.stats?.unexpected ?? 0) === 0);

  const report = `# Bear Portal Sanity Report — release/${version}

**Date:** ${date}
**Branch:** ${branch}
**Version:** ${version}
**Overall Status:** ${statusIcon(overallPassed)} ${overallPassed ? 'PASSED' : 'FAILED'}

---

${buildGatesSection(data.lint)}

---

${buildTypeCheckSection(data.typecheck)}

---

${buildUnitTestSection(data.unittest)}

---

${buildPlaywrightSection(playwrightReport)}

---

*Generated by \`portal/e2e/scripts/generate-report.mjs\`*
`;

  if (!fs.existsSync(SANITY_DIR)) {
    fs.mkdirSync(SANITY_DIR, { recursive: true });
  }

  const filename = path.join(SANITY_DIR, `sanity-release-${version}.md`);
  fs.writeFileSync(filename, report, 'utf8');
  console.log(`✅ Sanity report written to: ${filename}`);
}

main();
