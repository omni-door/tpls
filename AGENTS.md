# Repository Guidelines

## Project Structure & Module Organization
- This is a Lerna-managed monorepo of CLI template packages under `packages/` (e.g., `tpl-component-react`, `tpl-spa-vue`, `tpl-toolkit`).
- Each package keeps source in `packages/<name>/src/`, template assets in `packages/<name>/src/templates/`, and tests in `packages/<name>/src/**/__test__/`.
- Shared scripts live in `scripts/` (release, versioning, bootstrap helpers).
- Root config includes `tsconfig.json`, `lerna.json`, `mocha.opts`, and tooling settings.

## Build, Test, and Development Commands
- `yarn initial` - initialize a new CLI template scaffold.
- `yarn new` - generate template files for a package.
- `yarn bootstrap` - install deps and bootstrap all packages via Lerna.
- `yarn test` - run Mocha tests with NYC coverage.
- `yarn lint` / `yarn lint:fix` - lint TypeScript in `packages/**/src/`.
- `yarn build` - run `build` in each package.
- `yarn release` - run release workflow (branch, lint, publish script).

## Coding Style & Naming Conventions
- Language: TypeScript; use single quotes and semicolons as shown in `packages/**/src/*.ts`.
- Keep files in package scopes (no cross-package relative imports outside `packages/`).
- Template modules live under `src/templates/` with `index.ts` exports; test files use `__test__` directories.
- Linting: ESLint via `yarn lint` (root config); prefer `yarn lint:fix` before committing.

## Testing Guidelines
- Framework: Mocha with `ts-node/register` (see `mocha.opts`).
- Test location: `packages/**/src/**/__test__/*.ts`.
- Run all tests with `yarn test`; target coverage with NYC by default.

## Commit & Pull Request Guidelines
- Commits typically follow an emoji + scoped tag prefix, e.g. `🐸  [OMNI-DOOR/TPLS]: Upgrade templates: ...`.
- Keep messages imperative and specific about which template(s) change.
- PRs should describe affected packages, include generated template output examples when relevant, and link any related issue.

## Configuration Notes
- Package dependencies and versions are managed via Lerna; update `lerna.json` or package manifests as needed.
- For template changes, verify generated output for at least one target template type (e.g., React component or SPA).
