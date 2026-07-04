#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORTAL="$ROOT/portal"

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║     Bear Pre-Commit Quality Check        ║"
echo "╚══════════════════════════════════════════╝"
echo ""

LINT_EXIT=0
TYPECHECK_EXIT=0
UNITTEST_EXIT=0
E2E_EXIT=0

# ── 1. ESLint ────────────────────────────────────────────────────────────────
echo "► Step 1/4 — ESLint (code review gates)"
LINT_OUTPUT=$(cd "$ROOT" && npx eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 30 2>&1) || LINT_EXIT=$?
if [ $LINT_EXIT -ne 0 ]; then
  echo "  ✗ ESLint failed"
  echo "$LINT_OUTPUT" | tail -20
else
  echo "  ✓ ESLint passed"
fi

LINT_JSON=$(node -e "
const o = '$LINT_OUTPUT'.replace(/'/g, '');
const errors = (o.match(/error/gi) || []).length;
const warnings = (o.match(/warning/gi) || []).length;
console.log(JSON.stringify({ exitCode: $LINT_EXIT, errorCount: errors, warningCount: warnings }));
" 2>/dev/null || echo '{"exitCode":'"$LINT_EXIT"',"errorCount":0,"warningCount":0}')

# ── 2. TypeScript check ──────────────────────────────────────────────────────
echo ""
echo "► Step 2/4 — TypeScript type-check"
TYPECHECK_OUTPUT=$(cd "$PORTAL" && npm run type-check 2>&1) || TYPECHECK_EXIT=$?
if [ $TYPECHECK_EXIT -ne 0 ]; then
  echo "  ✗ TypeScript errors found"
  echo "$TYPECHECK_OUTPUT" | tail -15
else
  echo "  ✓ TypeScript clean"
fi

TC_OUTPUT_ESCAPED=$(echo "$TYPECHECK_OUTPUT" | head -30 | sed 's/"/\\"/g; s/\n/\\n/g')
TC_JSON='{"exitCode":'"$TYPECHECK_EXIT"',"output":"'"$TC_OUTPUT_ESCAPED"'"}'

# ── 3. Unit tests ────────────────────────────────────────────────────────────
echo ""
echo "► Step 3/4 — Vitest unit tests"
UNITTEST_OUTPUT=$(cd "$ROOT" && npx vitest run --reporter=verbose 2>&1) || UNITTEST_EXIT=$?
if echo "$UNITTEST_OUTPUT" | grep -q "No test files found"; then
  UNITTEST_EXIT=0
  echo "  ○ No unit test files yet (skipped)"
elif [ $UNITTEST_EXIT -ne 0 ]; then
  echo "  ✗ Unit tests failed"
  echo "$UNITTEST_OUTPUT" | tail -15
else
  echo "  ✓ Unit tests passed"
fi

SUMMARY_LINE=$(echo "$UNITTEST_OUTPUT" | grep -E "Tests?.*passed" | tail -1 | sed 's/"/\\"/g' || echo "")
UT_JSON='{"exitCode":'"$UNITTEST_EXIT"',"output":"'"$SUMMARY_LINE"'"}'

# ── 4. Playwright sanity + dark-mode + interactions ──────────────────────────
echo ""
echo "► Step 4/4 — Playwright sanity (render + interactions + dark mode)"
E2E_OUTPUT=$(cd "$PORTAL" && npx playwright test --config=e2e/playwright.config.cjs 2>&1) || E2E_EXIT=$?
if [ $E2E_EXIT -ne 0 ]; then
  echo "  ✗ Playwright tests failed"
  echo "$E2E_OUTPUT" | tail -20
else
  echo "  ✓ Playwright tests passed"
fi

# ── Generate sanity report ───────────────────────────────────────────────────
echo ""
echo "► Generating Sanity report..."
node "$PORTAL/e2e/scripts/generate-report.mjs" \
  --lint "$LINT_JSON" \
  --typecheck "$TC_JSON" \
  --unittest "$UT_JSON" || true

# ── Summary ──────────────────────────────────────────────────────────────────
echo ""
echo "╔══════════════════════════════════════════╗"
echo "║              Summary                     ║"
echo "╚══════════════════════════════════════════╝"
[ $LINT_EXIT -eq 0 ]      && echo "  ✓ ESLint"        || echo "  ✗ ESLint"
[ $TYPECHECK_EXIT -eq 0 ] && echo "  ✓ TypeScript"    || echo "  ✗ TypeScript"
[ $UNITTEST_EXIT -eq 0 ]  && echo "  ✓ Unit Tests"    || echo "  ✗ Unit Tests"
[ $E2E_EXIT -eq 0 ]       && echo "  ✓ Playwright E2E" || echo "  ✗ Playwright E2E"
echo ""

TOTAL_EXIT=$(( LINT_EXIT + TYPECHECK_EXIT + UNITTEST_EXIT + E2E_EXIT ))
if [ $TOTAL_EXIT -ne 0 ]; then
  echo "  ❌ Pre-commit checks FAILED. Fix the issues above before committing."
  echo ""
  exit 1
fi

echo "  ✅ All checks passed. Proceeding with commit."
echo ""
