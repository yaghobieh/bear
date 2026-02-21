/**
 * ForgeStack CLI templates — shown on /templates with image, modal (CLI command / download).
 */
export interface TemplateItem {
  id: string;
  name: string;
  description: string;
  /** CLI template flag value (e.g. react, portal, server, fullstack) */
  templateId: string;
  /** Optional image URL (e.g. /templates/react.png). If not set, gradient placeholder is used. */
  image?: string;
  /** Gradient for placeholder when image is not set: [from, to] */
  gradient: [string, string];
}

export const TEMPLATES: TemplateItem[] = [
  {
    id: 'react',
    name: 'React',
    description: 'Vite + React 18 + Bear UI, Compass routing, Synapse state, optional Grid Table & Forge Query.',
    templateId: 'react',
    gradient: ['#ec4899', '#db2777'],
  },
  {
    id: 'portal',
    name: 'Portal',
    description: 'Docs/demos UI — Bear + Compass, Navbar & Footer, Home, Demos, Theme Builder, Docs, Changelog (grid-table portal style).',
    templateId: 'portal',
    image: 'https://grid-table.com/opengraph-image.png',
    gradient: ['#22c55e', '#16a34a'],
  },
  {
    id: 'server',
    name: 'Server',
    description: 'Node.js API — Harbor or Express, ready for REST or WebSockets.',
    templateId: 'server',
    gradient: ['#0ea5e9', '#0284c7'],
  },
  {
    id: 'fullstack',
    name: 'Full-Stack',
    description: 'Monorepo with React frontend and Node server (Harbor or Express).',
    templateId: 'fullstack',
    gradient: ['#8b5cf6', '#7c3aed'],
  },
];

export function getCliCommand(templateId: string, projectName = 'my-app'): string {
  return `npx create-forge ${projectName} --template ${templateId}`;
}
