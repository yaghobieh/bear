import type { StoryColorGroup } from './Storybook.types';

export const STORYBOOK_LOGO_SIZE = 72;

export const STORYBOOK_COLOR_GROUPS: StoryColorGroup[] = [
  {
    title: 'Primary',
    tokens: [
      { name: '50', variable: '--bear-primary-50', value: '#fdf2f8' },
      { name: '100', variable: '--bear-primary-100', value: '#fce7f3' },
      { name: '200', variable: '--bear-primary-200', value: '#fbcfe8' },
      { name: '300', variable: '--bear-primary-300', value: '#f9a8d4' },
      { name: '400', variable: '--bear-primary-400', value: '#f472b6' },
      { name: '500', variable: '--bear-primary-500', value: '#ec4899' },
      { name: '600', variable: '--bear-primary-600', value: '#db2777' },
      { name: '700', variable: '--bear-primary-700', value: '#be185d' },
      { name: '800', variable: '--bear-primary-800', value: '#9d174d' },
      { name: '900', variable: '--bear-primary-900', value: '#831843' },
      { name: '950', variable: '--bear-primary-950', value: '#500724' },
    ],
  },
  {
    title: 'Success',
    tokens: [
      { name: '50', variable: '--bear-success-50', value: '#f0fdf4' },
      { name: '500', variable: '--bear-success-500', value: '#22c55e' },
      { name: '600', variable: '--bear-success-600', value: '#16a34a' },
      { name: '700', variable: '--bear-success-700', value: '#15803d' },
    ],
  },
  {
    title: 'Warning',
    tokens: [
      { name: '50', variable: '--bear-warning-50', value: '#fffbeb' },
      { name: '500', variable: '--bear-warning-500', value: '#f59e0b' },
      { name: '600', variable: '--bear-warning-600', value: '#d97706' },
      { name: '700', variable: '--bear-warning-700', value: '#b45309' },
    ],
  },
  {
    title: 'Danger',
    tokens: [
      { name: '50', variable: '--bear-danger-50', value: '#fef2f2' },
      { name: '200', variable: '--bear-danger-200', value: '#fecaca' },
      { name: '500', variable: '--bear-danger-500', value: '#ef4444' },
      { name: '600', variable: '--bear-danger-600', value: '#dc2626' },
      { name: '700', variable: '--bear-danger-700', value: '#b91c1c' },
      { name: '800', variable: '--bear-danger-800', value: '#991b1b' },
    ],
  },
  {
    title: 'Info',
    tokens: [
      { name: '50', variable: '--bear-info-50', value: '#eff6ff' },
      { name: '500', variable: '--bear-info-500', value: '#3b82f6' },
      { name: '600', variable: '--bear-info-600', value: '#2563eb' },
      { name: '700', variable: '--bear-info-700', value: '#1d4ed8' },
    ],
  },
  {
    title: 'Secondary',
    tokens: [
      { name: '50', variable: '--bear-secondary-50', value: '#f8fafc' },
      { name: '100', variable: '--bear-secondary-100', value: '#f1f5f9' },
      { name: '200', variable: '--bear-secondary-200', value: '#e2e8f0' },
      { name: '300', variable: '--bear-secondary-300', value: '#cbd5e1' },
      { name: '400', variable: '--bear-secondary-400', value: '#94a3b8' },
      { name: '500', variable: '--bear-secondary-500', value: '#64748b' },
      { name: '600', variable: '--bear-secondary-600', value: '#475569' },
      { name: '700', variable: '--bear-secondary-700', value: '#334155' },
      { name: '800', variable: '--bear-secondary-800', value: '#1e293b' },
      { name: '900', variable: '--bear-secondary-900', value: '#0f172a' },
      { name: '950', variable: '--bear-secondary-950', value: '#020617' },
    ],
  },
  {
    title: 'Neutral',
    tokens: [
      { name: '50', variable: '--bear-neutral-50', value: '#fafafa' },
      { name: '100', variable: '--bear-neutral-100', value: '#f5f5f5' },
      { name: '200', variable: '--bear-neutral-200', value: '#e5e5e5' },
      { name: '300', variable: '--bear-neutral-300', value: '#d4d4d4' },
      { name: '400', variable: '--bear-neutral-400', value: '#a3a3a3' },
      { name: '500', variable: '--bear-neutral-500', value: '#737373' },
      { name: '600', variable: '--bear-neutral-600', value: '#525252' },
      { name: '700', variable: '--bear-neutral-700', value: '#404040' },
      { name: '800', variable: '--bear-neutral-800', value: '#262626' },
      { name: '900', variable: '--bear-neutral-900', value: '#171717' },
      { name: '950', variable: '--bear-neutral-950', value: '#0a0a0a' },
    ],
  },
  {
    title: 'Black',
    tokens: [
      { name: 'bg', variable: '--bear-storybook-bg', value: '#09090b' },
      { name: 'surface', variable: '--bear-storybook-surface', value: '#111113' },
      { name: 'border', variable: '--bear-storybook-border', value: '#27272a' },
      { name: 'text', variable: '--bear-storybook-text', value: '#fafafa' },
    ],
  },
  {
    title: 'Surfaces',
    tokens: [
      { name: 'bg-primary', variable: '--bear-bg-primary', value: '#ffffff' },
      { name: 'bg-secondary', variable: '--bear-bg-secondary', value: '#f9fafb' },
      { name: 'bg-tertiary', variable: '--bear-bg-tertiary', value: '#f3f4f6' },
      { name: 'text-primary', variable: '--bear-text-primary', value: '#111827' },
      { name: 'text-secondary', variable: '--bear-text-secondary', value: '#4b5563' },
      { name: 'text-muted', variable: '--bear-text-muted', value: '#9ca3af' },
      { name: 'border', variable: '--bear-border-default', value: '#e5e7eb' },
    ],
  },
];
