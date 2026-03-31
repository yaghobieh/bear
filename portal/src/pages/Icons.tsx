import { type ChangeEvent, FC, useState, useMemo, useCallback } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { BearIcons, Typography, Tabs, TabList, Tab, TabPanel, Dropdown } from '@forgedevstack/bear';

const ICON_CATEGORIES = {
  Action: Object.entries(BearIcons.Action ?? {}),
  Navigation: Object.entries(BearIcons.Navigation ?? {}),
  Communication: Object.entries(BearIcons.Communication ?? {}),
  Status: Object.entries(BearIcons.Status ?? {}),
  Media: Object.entries(BearIcons.Media ?? {}),
  Content: Object.entries(BearIcons.Content ?? {}),
  Editor: Object.entries(BearIcons.Editor ?? {}),
  File: Object.entries(BearIcons.File ?? {}),
  Social: Object.entries(BearIcons.Social ?? {}),
  Device: Object.entries(BearIcons.Device ?? {}),
  Commerce: Object.entries(BearIcons.Commerce ?? {}),
  Misc: Object.entries(BearIcons.Misc ?? {}),
  Bear: Object.entries(BearIcons.Bear ?? {}),
};

const CATEGORY_NAMES = Object.keys(ICON_CATEGORIES) as Array<keyof typeof ICON_CATEGORIES>;
const VISIBLE_TAB_COUNT = 5;

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

const ICON_SIZES = [16, 20, 24, 32, 40];

type IconComponentType = FC<{ size?: number | string; className?: string; [key: string]: unknown }>;

const IconPreview: FC<{
  name: string;
  IconComponent: IconComponentType;
  colorClass: string;
  iconSize: number;
  showCircle: boolean;
}> = ({ name, IconComponent, colorClass, iconSize, showCircle }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(`import { ${name} } from '@forgedevstack/bear';`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }, [name]);

  const iconEl = copied ? (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ) : (
    <IconComponent size={iconSize} className={colorClass || 'text-gray-600 dark:text-gray-300'} />
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
      <div className={showCircle
        ? 'flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700/60'
        : 'flex items-center justify-center'
      }>
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
  const [activeTab, setActiveTab] = useState<string>('all');
  const [colorIdx, setColorIdx] = useState(0);
  const [sizeIdx, setSizeIdx] = useState(2);
  const [showCircle, setShowCircle] = useState(false);

  const colorClass = ICON_COLORS[colorIdx]?.value ?? '';
  const iconSize = ICON_SIZES[sizeIdx] ?? 24;

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

  const categoriesToShow: Record<string, Array<[string, IconComponentType]>> = activeTab === 'all'
    ? filteredBySearch
    : filteredBySearch[activeTab]
      ? { [activeTab]: filteredBySearch[activeTab] }
      : {};

  const totalIcons = Object.values(ICON_CATEGORIES).flat().length;

  return (
    <div className="fade-in">
      <Typography variant="h1" className="text-gray-900 dark:text-white mb-2">Icons</Typography>
      <Typography variant="body1" className="text-gray-600 dark:text-gray-400 mb-8">
        {totalIcons}+ SVG icons across {CATEGORY_NAMES.length} categories. Click any icon to copy its import statement.
      </Typography>

      <section className="mb-8">
        <CodeBlock
          code={`import { SearchIcon, HomeIcon, BearIcons } from '@forgedevstack/bear';

<SearchIcon size={24} className="text-pink-500" />
<BearIcons.Social.GithubIcon size={20} />
<BearIcons.Commerce.ShoppingCartIcon size={32} />`}
          language="tsx"
        />
      </section>

      {/* Controls bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-3 rounded-lg border border-gray-200 dark:border-gray-700/60 bg-gray-50 dark:bg-gray-800/30">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <BearIcons.SearchIcon size={16} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            placeholder="Search icons..."
            className="w-full pl-8 pr-8 py-2 text-sm rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500"
          />
          {search.trim() && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Clear search"
            >
              <BearIcons.CloseIcon size={14} />
            </button>
          )}
        </div>

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

      {/* Category tabs + grid */}
      <Tabs value={activeTab} defaultTab="all" onChange={setActiveTab} variant="pills">
        <TabList className="flex flex-wrap items-center gap-1 border-b border-gray-200 dark:border-gray-700/60 pb-0 mb-4">
          <Tab id="all">All ({totalIcons})</Tab>
          {CATEGORY_NAMES.slice(0, VISIBLE_TAB_COUNT - 1).map((category) => (
            <Tab key={category} id={category}>
              {category} ({ICON_CATEGORIES[category].length})
            </Tab>
          ))}
          {CATEGORY_NAMES.length > VISIBLE_TAB_COUNT - 1 && (
            <Dropdown
              placement="bottom-start"
              closeOnSelect
              trigger={
                <button
                  type="button"
                  role="tab"
                  aria-haspopup="listbox"
                  aria-label="More categories"
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors border-0 cursor-pointer
                    ${activeTab !== 'all' && !(CATEGORY_NAMES as readonly string[]).slice(0, VISIBLE_TAB_COUNT - 1).includes(activeTab)
                      ? 'bg-pink-500 text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-transparent'
                    }`}
                >
                  More
                  <BearIcons.ChevronDownIcon size={14} />
                </button>
              }
              items={CATEGORY_NAMES.slice(VISIBLE_TAB_COUNT - 1).map((category) => ({
                key: category,
                label: `${category} (${ICON_CATEGORIES[category].length})`,
                onClick: () => setActiveTab(category),
              }))}
            />
          )}
        </TabList>

        <TabPanel tabId="all" className="pt-2">
          {Object.entries(categoriesToShow).length === 0 ? (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              {search.trim() ? `No icons found matching "${search}"` : 'No icons available.'}
            </div>
          ) : (
            Object.entries(categoriesToShow).map(([category, icons]) => (
              <section key={category} className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Typography variant="h4" className="text-gray-900 dark:text-white">
                    {category}
                  </Typography>
                  <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                    {icons.length}
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                  {icons.map(([name, IconComponent]) => (
                    <IconPreview key={name} name={name} IconComponent={IconComponent} colorClass={colorClass} iconSize={iconSize} showCircle={showCircle} />
                  ))}
                </div>
              </section>
            ))
          )}
        </TabPanel>

        {Object.keys(ICON_CATEGORIES).map((category) => (
          <TabPanel key={category} tabId={category} className="pt-2">
            {categoriesToShow[category] ? (
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                {categoriesToShow[category].map(([name, IconComponent]) => (
                  <IconPreview key={name} name={name} IconComponent={IconComponent} colorClass={colorClass} iconSize={iconSize} showCircle={showCircle} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                {search.trim() ? `No icons found in ${category} matching "${search}"` : `No icons in ${category}.`}
              </div>
            )}
          </TabPanel>
        ))}
      </Tabs>

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
