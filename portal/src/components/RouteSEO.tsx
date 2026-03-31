import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO } from './SEO';

const SEO_MAP: Record<string, { title: string; description: string }> = {
  '/': { title: 'Home', description: 'Bear UI — 100+ beautiful, accessible React components with TypeScript, Tailwind CSS, 550+ icons, responsive hooks, and theming.' },
  '/installation': { title: 'Installation', description: 'Install Bear UI in your React project with npm or yarn. Setup guide with Tailwind CSS and TypeScript.' },
  '/theming': { title: 'Theming', description: 'Customize Bear UI themes — colors, spacing, typography, dark mode, and custom variants via BearProvider.' },
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

function getPageSEO(pathname: string): { title: string; description: string } {
  if (SEO_MAP[pathname]) return SEO_MAP[pathname];

  if (pathname.startsWith('/components/')) {
    const name = pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ?? '';
    return { title: name, description: `${name} component — usage, examples, props, and API reference.` };
  }
  if (pathname.startsWith('/hooks/')) {
    const name = pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ?? '';
    return { title: name, description: `${name} hook — usage, examples, and API.` };
  }
  if (pathname.startsWith('/api/')) {
    const name = pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ?? '';
    return { title: `${name} API`, description: `${name} API reference — all props, types, and examples.` };
  }
  if (pathname.startsWith('/customization/')) {
    const name = pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ?? '';
    return { title: name, description: `Customize ${name} in Bear UI.` };
  }

  return { title: 'Bear UI', description: 'Bear UI — React component library.' };
}

export const RouteSEO: FC = () => {
  const { pathname } = useLocation();
  const { title, description } = getPageSEO(pathname);
  return <SEO title={title} description={description} />;
};
