import { type ChangeEvent, FC, useState, useMemo, useCallback } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { BearIcons, Chip, ComponentsIcon, SandboxIcon, StorybookIcon, Typography } from '@forgedevstack/bear';

type IconComponentType = FC<{ size?: number | string; className?: string; [key: string]: unknown }>;

const isIconComponent = (value: unknown): value is IconComponentType => typeof value === 'function';

const entriesFrom = (group: Record<string, unknown> | undefined): Array<[string, IconComponentType]> => {
  return Object.entries(group ?? {}).filter((entry): entry is [string, IconComponentType] => isIconComponent(entry[1]));
};

const ICON_CATEGORIES = {
  Product: [
    ['StorybookIcon', StorybookIcon],
    ['SandboxIcon', SandboxIcon],
    ['ComponentsIcon', ComponentsIcon],
  ] as Array<[string, IconComponentType]>,
  Action: entriesFrom(BearIcons.Action as Record<string, unknown>),
  Navigation: entriesFrom(BearIcons.Navigation as Record<string, unknown>),
  Communication: entriesFrom(BearIcons.Communication as Record<string, unknown>),
  Status: entriesFrom(BearIcons.Status as Record<string, unknown>),
  Media: entriesFrom(BearIcons.Media as Record<string, unknown>),
  Content: entriesFrom(BearIcons.Content as Record<string, unknown>),
  Editor: entriesFrom(BearIcons.Editor as Record<string, unknown>),
  File: entriesFrom(BearIcons.File as Record<string, unknown>),
  Social: entriesFrom(BearIcons.Social as Record<string, unknown>),
  Device: entriesFrom(BearIcons.Device as Record<string, unknown>),
  Commerce: entriesFrom(BearIcons.Commerce as Record<string, unknown>),
  Charts: entriesFrom((BearIcons as { Charts?: Record<string, unknown> }).Charts),
  Misc: entriesFrom(BearIcons.Misc as Record<string, unknown>),
  Bear: entriesFrom(BearIcons.Bear as Record<string, unknown>),
};

const ICON_ALL_TAB = 'All';
const CATEGORY_NAMES = Object.keys(ICON_CATEGORIES) as Array<keyof typeof ICON_CATEGORIES>;
const ICON_TABS = [ICON_ALL_TAB, ...CATEGORY_NAMES];
const DEFAULT_ICON_TAB = ICON_ALL_TAB;
const ICON_IMPORT_TEMPLATE = (name: string) => `import { ${name} } from '@forgedevstack/bear';`;

const ICON_COLORS = [
  { label: 'Default', value: '' },
  { label: 'Pink', value: 'text-pink-500' },
  { label: 'Blue', value: 'text-blue-500' },
  { label: 'Green', value: 'text-green-500' },
  { label: 'Red', value: 'text-red-500' },
  { label: 'Yellow', value: 'text-amber-500' },
  { label: 'Purple', value: 'text-purple-500' },
  { label: 'Cyan', value: 'text-cyan-500' },
];

const ICON_SIZES = [32, 40, 48, 64, 80];

const ICON_EFFECTS = [
  { id: 'none', label: 'None', className: '' },
  { id: 'spin', label: 'Spinner', className: 'animate-spin' },
  { id: 'pulse', label: 'Pulse', className: 'animate-pulse' },
  { id: 'bounce', label: 'Bounce', className: 'animate-bounce' },
];

const IconPreview: FC<{
  name: string;
  IconComponent: IconComponentType;
  colorClass: string;
  iconSize: number;
  showCircle: boolean;
  effectClass: string;
}> = ({ name, IconComponent, colorClass, iconSize, showCircle, effectClass }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(ICON_IMPORT_TEMPLATE(name));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }, [name]);

  const iconEl = copied ? (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ) : (
    <IconComponent size={iconSize} className={`${colorClass || 'text-gray-600 dark:text-gray-300'} ${effectClass}`} />
  );

  return (
    <button
      onClick={handleCopy}
      className={`group relative flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all cursor-pointer
        ${copied
          ? 'border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-900/20'
          : 'border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-800/40 hover:border-pink-400 dark:hover:border-pink-500 hover:shadow-sm'
        }`}
      title={copied ? 'Copied!' : `Click to copy import for ${name}`}
    >
      <div
        className={showCircle
          ? 'flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700/60'
          : 'flex items-center justify-center'
        }
        style={{ width: iconSize + 28, height: iconSize + 28 }}
      >
        {iconEl}
      </div>
      <span className="text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-full leading-tight">
        {name.replace('Icon', '')}
      </span>
    </button>
  );
};

const Icons: FC = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<string>(DEFAULT_ICON_TAB);
  const [colorIdx, setColorIdx] = useState(0);
  const [sizeIdx, setSizeIdx] = useState(1);
  const [showCircle, setShowCircle] = useState(false);
  const [effectId, setEffectId] = useState(ICON_EFFECTS[0].id);

  const colorClass = ICON_COLORS[colorIdx]?.value ?? '';
  const iconSize = ICON_SIZES[sizeIdx] ?? 40;
  const effectClass = ICON_EFFECTS.find((effect) => effect.id === effectId)?.className ?? '';

  const filteredBySearch = useMemo(() => {
    const searchLower = search.trim().toLowerCase();
    const result: Record<string, Array<[string, IconComponentType]>> = {};
    Object.entries(ICON_CATEGORIES).forEach(([category, icons]) => {
      const categoryMatch = searchLower && category.toLowerCase().includes(searchLower);
      const filtered: Array<[string, IconComponentType]> = !searchLower
        ? (icons as Array<[string, IconComponentType]>)
        : (categoryMatch ? icons : icons.filter(([n]) => n.toLowerCase().includes(searchLower))) as Array<[string, IconComponentType]>;
      if (filtered.length > 0) result[category] = filtered;
    });
    return result;
  }, [search]);

  const categoriesToShow: Record<string, Array<[string, IconComponentType]>> = activeTab === ICON_ALL_TAB || search.trim()
    ? filteredBySearch
    : (filteredBySearch[activeTab] ? { [activeTab]: filteredBySearch[activeTab] } : {});

  const totalIcons = Object.values(ICON_CATEGORIES).flat().length;

  return (
    <div className="fade-in">
      <Typography variant="h1" className="text-gray-900 dark:text-white mb-2">Icons</Typography>
        <Typography variant="body1" className="text-gray-600 dark:text-gray-400 mb-4">
          {totalIcons}+ SVG icons across {CATEGORY_NAMES.length} categories. Click any icon to copy its import statement.
        </Typography>
        <a
          className="mb-8 inline-flex items-center rounded-lg border border-pink-500 px-3 py-1.5 text-sm font-medium text-pink-600 dark:text-pink-400"
          href="https://bundlephobia.com/package/@forgedevstack/bear-icons"
          target="_blank"
          rel="noreferrer"
        >
          Bundle size
        </a>

        <section className="mb-8 space-y-6">
          <div>
            <Typography variant="h4" className="mb-2">Icons are not in the default install</Typography>
            <Typography variant="body2" className="mb-3 text-gray-600 dark:text-gray-400">
              npm install @forgedevstack/bear includes the components except icons and charts. Add icons with the CLI.
            </Typography>
            <CodeBlock code={`npm install @forgedevstack/bear
npx @forgedevstack/bear-cli add icons

import { SearchIcon, BearIcons } from '@forgedevstack/bear-icons';

<SearchIcon size={48} className="animate-spin" />`} language="tsx" />
          </div>
          <div>
            <Typography variant="h4" className="mb-2">Install icons only</Typography>
            <Typography variant="body2" className="mb-3 text-gray-600 dark:text-gray-400">
              Use the icon library without Bear components, BearProvider, or Bear CSS.
            </Typography>
            <CodeBlock code={`npm install @forgedevstack/bear-icons

import { SearchIcon, BearIcons } from '@forgedevstack/bear-icons';

<SearchIcon size={24} />
<BearIcons.Charts.CakeIcon size={20} />`} language="tsx" />
          </div>
        </section>

      {/* Controls bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-3 rounded-lg border border-gray-200 dark:border-gray-700/60 bg-gray-50 dark:bg-gray-800/30">
        {/* Search */}
        <div className="relative w-full sm:flex-1 sm:min-w-[200px]">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <BearIcons.SearchIcon size={16} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            placeholder="Search icons..."
            className="w-full pl-8 pr-3 py-2 text-sm rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500"
          />
        </div>
        <button
          type="button"
          onClick={() => setSearch('')}
          className="px-3 py-2 text-xs font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-pink-400"
        >
          Clear
        </button>

        {/* Color */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500 dark:text-gray-400">Color</span>
          <div className="flex gap-1">
            {ICON_COLORS.map((c, i) => (
              <button
                key={c.label}
                onClick={() => setColorIdx(i)}
                title={c.label}
                className={`w-5 h-5 rounded-full border-2 transition-all ${
                  i === colorIdx ? 'border-pink-500 scale-110' : 'border-gray-300 dark:border-gray-600'
                } ${c.value ? c.value.replace('text-', 'bg-') : 'bg-gray-400 dark:bg-gray-500'}`}
              />
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500 dark:text-gray-400">Size</span>
          <div className="flex gap-1">
            {ICON_SIZES.map((s, i) => (
              <button
                key={s}
                onClick={() => setSizeIdx(i)}
                className={`px-1.5 py-0.5 text-xs rounded transition-all ${
                  i === sizeIdx
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500 dark:text-gray-400">Effect</span>
          <div className="flex gap-1">
            {ICON_EFFECTS.map((effect) => (
              <button
                key={effect.id}
                type="button"
                onClick={() => setEffectId(effect.id)}
                className={`px-2 py-0.5 text-xs rounded transition-all ${
                  effect.id === effectId
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                {effect.label}
              </button>
            ))}
          </div>
        </div>

        {/* Circle toggle */}
        <button
          onClick={() => setShowCircle(!showCircle)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md border transition-all ${
            showCircle
              ? 'border-pink-400 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
              : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-gray-400'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /></svg>
          Circle
        </button>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {ICON_TABS.map((category) => (
          <Chip
            key={category}
            variant={activeTab === category ? 'filled' : 'outlined'}
            color="primary"
            onClick={() => setActiveTab(category)}
          >
            {category}
          </Chip>
        ))}
      </div>
      <Typography variant="body2" className="mb-6 text-gray-500 dark:text-gray-400">
        {totalIcons} components
      </Typography>
      {Object.keys(categoriesToShow).length > 0 ? (
        Object.entries(categoriesToShow).map(([group, icons]) => (
          <section key={group} className="mb-8">
            {(activeTab === ICON_ALL_TAB || search.trim()) && (
              <Typography variant="h5" className="mb-3">{group}</Typography>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {icons.map(([name, IconComponent]) => (
                <IconPreview key={name} name={name} IconComponent={IconComponent} colorClass={colorClass} iconSize={iconSize} showCircle={showCircle} effectClass={effectClass} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400">
          {search.trim() ? `No icons matching "${search}"` : 'No icons.'}
        </div>
      )}

      <section className="mt-10 mb-8">
        <Typography variant="h3" className="text-gray-900 dark:text-white mb-4">Icon Props</Typography>
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700/60">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/60">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Default</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700/60">
              <tr><td className="px-4 py-3 font-mono text-pink-600">size</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number | string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">24</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Icon dimensions in pixels</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600">color</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">currentColor</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">SVG stroke color</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600">className</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>string</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Additional CSS classes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-pink-600">strokeWidth</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">2</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">SVG stroke width</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Icons;
