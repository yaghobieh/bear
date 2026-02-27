/**
 * ForgeStack CLI templates — shown on /templates and /store
 */
export interface TemplateItem {
  id: string;
  name: string;
  description: string;
  /** CLI template flag value (e.g. react, portal, server, fullstack) */
  templateId: string;
  /** Optional image URL. If not set, gradient placeholder is used. */
  image?: string;
  /** Gradient for placeholder: [from, to] */
  gradient: [string, string];
  /** Category tag */
  category?: 'template' | 'starter' | 'design';
  /** Whether this is a premium/paid template */
  premium?: boolean;
  /** Screenshot image for store cards */
  screenshot?: string;
  /** Store details page URL */
  storeUrl?: string;
  /** Live preview URL */
  previewUrl?: string;
}

export const TEMPLATES: TemplateItem[] = [
  {
    id: 'react',
    name: 'React + Bear UI',
    description: 'Vite + React 18 + Bear UI, Compass routing, Synapse state, optional Grid Table & Forge Query.',
    templateId: 'react',
    gradient: ['#ec4899', '#db2777'],
    category: 'template',
    screenshot: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=60',
    storeUrl: '/store?item=react',
    previewUrl: '/components/button',
  },
  {
    id: 'portal',
    name: 'Documentation Portal',
    description: 'Docs/demos UI — Bear + Compass, Navbar & Footer, Home, Demos, Theme Builder, Docs, Changelog.',
    templateId: 'portal',
    image: 'https://grid-table.com/opengraph-image.png',
    gradient: ['#22c55e', '#16a34a'],
    category: 'template',
    screenshot: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=60',
    storeUrl: '/store?item=portal',
    previewUrl: '/',
  },
  {
    id: 'server',
    name: 'Node.js Server',
    description: 'Node.js API — Harbor or Express, ready for REST or WebSockets.',
    templateId: 'server',
    gradient: ['#0ea5e9', '#0284c7'],
    category: 'template',
    screenshot: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=60',
    storeUrl: '/store?item=server',
    previewUrl: '/guides/server-rendering',
  },
  {
    id: 'fullstack',
    name: 'Full-Stack Monorepo',
    description: 'Monorepo with React frontend + Node server (Harbor or Express), shared types.',
    templateId: 'fullstack',
    gradient: ['#8b5cf6', '#7c3aed'],
    category: 'template',
    screenshot: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=60',
    storeUrl: '/store?item=fullstack',
    previewUrl: '/components/data-table',
  },
  {
    id: 'dashboard',
    name: 'Admin Dashboard',
    description: 'React admin dashboard with Bear UI — sidebar, charts, data tables, auth flow, dark mode.',
    templateId: 'dashboard',
    gradient: ['#f97316', '#ea580c'],
    category: 'template',
    screenshot: 'https://images.unsplash.com/photo-1551281044-8f8d7f1f4f3f?auto=format&fit=crop&w=1200&q=60',
    storeUrl: '/store?item=dashboard',
    previewUrl: '/components/chart',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Storefront',
    description: 'Product catalog, cart, checkout, user auth — built with Bear UI + Forge Query.',
    templateId: 'ecommerce',
    gradient: ['#14b8a6', '#0d9488'],
    category: 'template',
    screenshot: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=1200&q=60',
    storeUrl: '/store?item=ecommerce',
    previewUrl: '/components/card',
  },
  {
    id: 'blog',
    name: 'Blog & CMS',
    description: 'Markdown-powered blog with admin panel, rich editor, image upload, and Bear theming.',
    templateId: 'blog',
    gradient: ['#a855f7', '#9333ea'],
    category: 'template',
    screenshot: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=60',
    storeUrl: '/store?item=blog',
    previewUrl: '/components/rich-editor',
  },
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Modern landing page with hero, features, pricing, testimonials, and CTA — fully responsive.',
    templateId: 'landing',
    gradient: ['#ef4444', '#dc2626'],
    category: 'template',
    screenshot: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=60',
    storeUrl: '/store?item=landing',
    previewUrl: '/components/typography',
  },
  {
    id: 'saas',
    name: 'SaaS Starter',
    description: 'Full SaaS boilerplate — auth, billing, team management, settings, API keys dashboard.',
    templateId: 'saas',
    gradient: ['#3b82f6', '#2563eb'],
    category: 'starter',
    screenshot: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=60',
    storeUrl: '/store?item=saas',
    previewUrl: '/components/form',
  },
  {
    id: 'mobile-first',
    name: 'Mobile-First PWA',
    description: 'Progressive web app with offline support, bottom navigation, and responsive Bear components.',
    templateId: 'mobile-first',
    gradient: ['#f59e0b', '#d97706'],
    category: 'starter',
    screenshot: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=60',
    storeUrl: '/store?item=mobile-first',
    previewUrl: '/components/bottom-navigation',
  },
  {
    id: 'design-system',
    name: 'Design System Kit',
    description: 'Pre-built design tokens, component catalog, Storybook-like playground using Bear components.',
    templateId: 'design-system',
    gradient: ['#6366f1', '#4f46e5'],
    category: 'design',
    screenshot: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=60',
    storeUrl: '/store?item=design-system',
    previewUrl: '/customization/overview',
  },
  {
    id: 'dark-theme',
    name: 'Dark Theme Kit',
    description: 'Premium dark theme preset with custom palette, gradient accents, and glassmorphism effects.',
    templateId: 'dark-theme',
    gradient: ['#1e293b', '#0f172a'],
    category: 'design',
    screenshot: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=60',
    storeUrl: '/store?item=dark-theme',
    previewUrl: '/customization/dark-mode',
  },
];

export function getCliCommand(templateId: string, projectName = 'my-app'): string {
  return `npx create-forge ${projectName} --template ${templateId}`;
}

/** Store categories for /store page */
export interface StoreCategory {
  id: string;
  label: string;
  items: TemplateItem[];
}

export const STORE_CATEGORIES: StoreCategory[] = [
  { id: 'all', label: 'All', items: TEMPLATES },
  { id: 'templates', label: 'Templates', items: TEMPLATES.filter(t => t.category === 'template') },
  { id: 'starter-kits', label: 'Starter Kits', items: TEMPLATES.filter(t => t.category === 'starter') },
  { id: 'design-kits', label: 'Design Kits', items: TEMPLATES.filter(t => t.category === 'design') },
];
