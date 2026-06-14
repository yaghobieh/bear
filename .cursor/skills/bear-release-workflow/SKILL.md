---
name: bear-release-workflow
description: Bear release workflow — version bump, CHANGELOG, build, portal, npm publish. Use when preparing a Bear release such as 1.2.4.
---

# Bear Release Workflow

## Package

- Name: `@forgedevstack/bear`
- Scope: `@forgedevstack/*`
- Version in `package.json` — set target version **before** push (CI auto-bumps patch on main)

## Pre-release checklist

1. All new components registered in `src/components/index.ts`
2. Portal pages and nav updated
3. `CHANGELOG.md` section for target version
4. `npm run build` passes
5. `cd portal && npm run build` passes (if portal changed)

## CHANGELOG format

```markdown
## [1.2.4] - YYYY-MM-DD

### Added
- ...

### Changed
- ...

### Fixed
- ...

### Migration
- ...
```

## Version bump

```bash
npm version 1.2.4 --no-git-tag-version
```

Or edit `package.json` manually.

## Publish (ForgeStack CI)

Push to `main` triggers `.github/workflows/publish.yml`:

1. `npm ci` → `npm run build`
2. Auto patch bump (unless version already set for release)
3. Tag `release: v{VERSION}`
4. `npm publish --access public --provenance`

Requires `NPM_TOKEN` secret.

## Manual publish (emergency)

```bash
npm login
npm publish --access public
```

## Portal

- Lives at `bear/portal/`
- Deploys to Vercel
- Kiln stories at `/kiln/*` in production
