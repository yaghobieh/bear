import { SEO_AUTHOR_NAME } from '@/constants/seo.const';

export interface SEOEntry {
  title: string;
  description: string;
}

export const SEO_MAP: Record<string, SEOEntry> = {
  '/': { title: 'Home', description: `Bear UI by ${SEO_AUTHOR_NAME} — 100+ beautiful, accessible React components with TypeScript, AeroCraft CSS, 550+ icons, responsive hooks, and theming.` },
  '/installation': { title: 'Installation', description: `Install Bear UI by ${SEO_AUTHOR_NAME} in your React project. npm, yarn, pnpm setup with AeroCraft CSS and TypeScript.` },
  '/changelog': { title: 'Changelog', description: `Bear UI release notes and changelog — latest updates by ${SEO_AUTHOR_NAME}.` },
  '/skills': { title: 'Skills', description: `Cursor AI skills for Bear UI development — component patterns, code review, and portal docs by ${SEO_AUTHOR_NAME}.` },
  '/whats-new': { title: "What's New", description: `What's new in Bear UI v1.2.4 — ToggleButton, FormControl, Snackbar, Bear IDs, and more by ${SEO_AUTHOR_NAME}.` },
  '/theming': { title: 'Theming', description: 'Customize Bear UI themes — colors, spacing, typography, dark mode, and custom variants via BearProvider.' },
  '/docs/forms': { title: 'Forms', description: 'Build forms with Bear UI, @forgedevstack/forge-form, and React useActionState.' },
  '/docs/cli': { title: 'CLI', description: 'Forge CLI — scaffold projects, add Bear components, and manage ForgeStack packages.' },
  '/docs/package-imports': { title: 'Package Imports', description: 'Configure package.json imports for Bear-style path aliases.' },
  '/docs/dark-mode': { title: 'Dark Mode', description: 'Bear UI dark mode with BearProvider — toggle, persist, and CSS variables.' },
  '/docs/javascript': { title: 'JavaScript', description: 'Use Bear UI in JavaScript projects with optional TypeScript.' },
  '/docs/nextjs': { title: 'Next.js', description: 'Use Bear UI in Next.js App Router with client components and transpilePackages.' },
  '/docs/directory': { title: 'Registry Directory', description: 'Discover community Bear UI registries and component blocks.' },
  '/docs/registry/github': { title: 'GitHub Registry', description: 'Publish and install Bear registry items from public GitHub repositories.' },
  '/docs/registry/mcp': { title: 'MCP Server', description: 'MCP support for Bear registries — coming soon.' },
  '/typescript': { title: 'TypeScript', description: 'Bear UI TypeScript support — full type safety, generics, and IntelliSense for all components.' },
  '/components': { title: 'Components', description: 'Browse 100+ Bear UI React components — buttons, modals, forms, charts, editors, and more.' },
  '/icons': { title: 'Icons', description: '550+ SVG icons organized by category. Search, preview, and copy imports instantly.' },
  '/hooks': { title: 'Hooks', description: '25+ React hooks — responsive breakpoints, animations, clipboard, debounce, drag-drop, and more.' },
  '/hooks/use-media-query': { title: 'useMediaQuery', description: 'Track CSS media queries with breakpoint shortcuts. Override breakpoints via BearProvider.' },
  '/templates': { title: 'Templates', description: 'Ready-made templates and starters for React apps built with Bear UI.' },
  '/roadmap': { title: 'Roadmap', description: 'Bear UI roadmap — upcoming components, features, and improvements.' },
  '/store': { title: 'Store', description: 'Bear UI premium components and templates.' },
  '/guides/responsive-ui': { title: 'Responsive UI Guide', description: 'Build responsive layouts with Bear UI — useMediaQuery, useResponsive, and breakpoint overrides.' },
  '/guides/minimize-bundle': { title: 'Minimize Bundle', description: 'Tree-shake Bear UI — import only what you need with modular CSS and selective imports.' },
  '/guides/server-rendering': { title: 'Server Rendering', description: 'Use Bear UI with SSR frameworks like Next.js and Remix.' },
  '/guides/accessibility': { title: 'Accessibility', description: 'Bear UI accessibility — WAI-ARIA patterns, keyboard navigation, and screen reader support.' },
  '/customization/overview': { title: 'Customization', description: 'Customize Bear UI — colors, typography, spacing, breakpoints, and CSS variables.' },
  '/customization/palette': { title: 'Color Palette', description: 'Customize Bear UI color palette — primary, secondary, and custom color scales.' },
  '/customization/dark-mode': { title: 'Dark Mode', description: 'Bear UI dark mode — toggle, system detection, and persistent preferences.' },
};

export const SEO_FALLBACK: SEOEntry = {
  title: 'Bear UI',
  description: 'Bear UI — React component library.',
};
