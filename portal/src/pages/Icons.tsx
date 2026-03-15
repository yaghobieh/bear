import { type ChangeEvent, FC, useState, useMemo } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { LinesOfCode } from '@/components/LinesOfCode';
import { BearIcons, Typography, Tabs, TabList, Tab, TabPanel, Dropdown } from '@forgedevstack/bear';

const ICON_CATEGORIES = {
  Action: Object.entries(BearIcons.Action ?? {}),
  Navigation: Object.entries(BearIcons.Navigation ?? {}),
  Communication: Object.entries(BearIcons.Communication ?? {}),
  Status: Object.entries(BearIcons.Status ?? {}),
  Media: Object.entries(BearIcons.Media ?? {}),
  Content: Object.entries(BearIcons.Content ?? {}),
  Editor: Object.entries(BearIcons.Editor ?? {}),
  Misc: Object.entries(BearIcons.Misc ?? {}),
  Bear: Object.entries(BearIcons.Bear ?? {}),
};

const CATEGORY_NAMES = Object.keys(ICON_CATEGORIES) as Array<keyof typeof ICON_CATEGORIES>;
const VISIBLE_TAB_COUNT = 3;

const NEW_ICON_NAMES = new Set([
  'HoneycombIcon',
  'ClawIcon',
  'ForestIcon',
  'DenIcon',
  'SalmonIcon',
  'CampfireIcon',
  'PineTreeIcon',
  'MountainIcon',
]);

type IconComponentType = FC<{ size?: number | string; className?: string; [key: string]: unknown }>;

const IconPreview: FC<{
  name: string;
  IconComponent: IconComponentType;
  isNew?: boolean;
}> = ({ name, IconComponent, isNew }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`import { ${name} } from '@forgedevstack/bear';`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        Bear-IconPreview bear-relative bear-p-4 bear-rounded-lg bear-border bear-transition-all
        hover:bear-border-pink-500 hover:bear-shadow-md
        ${copied
          ? 'bear-border-green-500 bear-bg-green-50 dark:bear-bg-green-900/20'
          : 'bear-border-gray-200 dark:bear-border-zinc-700 bear-bg-white dark:bear-bg-zinc-800'
        }
      `}
      title={copied ? 'Copied!' : `Click to copy import for ${name}`}
    >
      {isNew && (
        <span className="bear-absolute bear-top-1 bear-right-1 bear-px-1.5 bear-py-0.5 bear-text-[10px] bear-font-semibold bear-rounded bear-bg-pink-500 bear-text-white">
          New
        </span>
      )}
      <div className="bear-flex bear-flex-col bear-items-center bear-gap-2">
        <IconComponent size={24} className="bear-text-gray-600 dark:bear-text-gray-400" />
        <span className="bear-text-xs bear-text-gray-500 dark:bear-text-gray-400 bear-truncate bear-max-w-full">
          {name.replace('Icon', '')}
        </span>
      </div>
    </button>
  );
};

const Icons: FC = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredBySearch = useMemo(() => {
    const searchLower = search.trim().toLowerCase();
    const result: Record<string, Array<[string, IconComponentType]>> = {};

    Object.entries(ICON_CATEGORIES).forEach(([category, icons]) => {
      const categoryMatchesSearch = searchLower && category.toLowerCase().includes(searchLower);
      const filtered: Array<[string, IconComponentType]> = !searchLower
        ? (icons as Array<[string, IconComponentType]>)
        : (categoryMatchesSearch ? icons : icons.filter(([name]) => name.toLowerCase().includes(searchLower))) as Array<[string, IconComponentType]>;
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
  const newIconsList = useMemo(
    () => Object.entries(ICON_CATEGORIES).flatMap(([cat, icons]) =>
      icons.filter(([name]) => NEW_ICON_NAMES.has(name)).map(([name, IconComponent]) => ({ category: cat, name, IconComponent: IconComponent as IconComponentType }))
    ),
    []
  );

  return (
    <div className="fade-in">
      <div className="bear-flex bear-items-center bear-gap-3 bear-mb-4">
        <Typography variant="h1" className="bear-text-gray-900 dark:bear-text-white">
          Icons
        </Typography>
        <LinesOfCode lines={350} />
      </div>
      
      <Typography variant="body1" className="bear-text-gray-600 dark:bear-text-gray-400 bear-mb-6">
        Bear UI includes {totalIcons}+ SVG icons organized by category. Search by name or category, then click any icon to copy its import.
      </Typography>

      {newIconsList.length > 0 && (
        <section className="bear-mb-10 bear-p-4 bear-rounded-xl bear-border bear-border-pink-200 dark:bear-border-pink-800/50 bear-bg-pink-50/50 dark:bear-bg-pink-950/20">
          <Typography variant="h3" className="bear-text-gray-900 dark:bear-text-white bear-mb-2 bear-flex bear-items-center bear-gap-2">
            What&apos;s new
            <span className="bear-px-2 bear-py-0.5 bear-text-xs bear-font-semibold bear-rounded bear-bg-pink-500 bear-text-white">
              {newIconsList.length} icons
            </span>
          </Typography>
          <Typography variant="body2" className="bear-text-gray-600 dark:bear-text-gray-400 bear-mb-4">
            New Bear-themed icons: nature, camp, and brand. Use <code className="bear-px-1 bear-py-0.5 bear-rounded bear-bg-gray-200 dark:bear-bg-zinc-700 bear-text-sm">@forgedevstack/bear/icons</code> for icons-only imports.
          </Typography>
          <div className="bear-grid bear-grid-cols-4 sm:bear-grid-cols-6 md:bear-grid-cols-8 bear-gap-3">
            {newIconsList.map(({ category, name, IconComponent }) => (
              <IconPreview key={`${category}-${name}`} name={name} IconComponent={IconComponent} isNew />
            ))}
          </div>
        </section>
      )}

      <section className="bear-mb-8">
        <Typography variant="h3" className="bear-text-gray-900 dark:bear-text-white bear-mb-4">
          Usage
        </Typography>
        <CodeBlock
          code={`import { BearIcons, SearchIcon, HomeIcon } from '@forgedevstack/bear';
// Or icons-only (smaller bundle):
// import { BearIcons } from '@forgedevstack/bear/icons';

<SearchIcon size={24} className="text-pink-500" />
<HomeIcon size="lg" />

<BearIcons.SearchIcon size={24} />
<BearIcons.Bear.HoneycombIcon size={32} />

// Categories: Action, Navigation, Communication, Status, Media,
// Content, Editor, Misc, Bear (Honeycomb, Claw, Forest, Den, …)`}
          language="tsx"
        />
      </section>

      <div className="bear-mb-6">
        <div className="bear-relative bear-max-w-md bear-mb-6">
          <span className="bear-absolute bear-left-3 bear-top-1/2 -bear-translate-y-1/2 bear-pointer-events-none bear-text-gray-400">
            <BearIcons.SearchIcon size={18} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            placeholder="Search by name or category (e.g. bear, search, arrow)..."
            className="bear-w-full bear-pl-10 bear-pr-9 bear-py-2.5 bear-text-sm bear-rounded-lg bear-border bear-border-gray-200 dark:bear-border-zinc-700 bear-bg-white dark:bear-bg-zinc-800 bear-text-gray-900 dark:bear-text-gray-100 bear-placeholder-gray-400 focus:bear-outline-none focus:bear-ring-2 focus:bear-ring-pink-500/30 focus:bear-border-pink-500"
          />
          {search.trim() && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="bear-absolute bear-right-2 bear-top-1/2 -bear-translate-y-1/2 bear-p-1 bear-rounded bear-text-gray-400 hover:bear-text-gray-600 dark:hover:bear-text-gray-300"
              aria-label="Clear search"
            >
              <BearIcons.CloseIcon size={16} />
            </button>
          )}
        </div>

        <Tabs value={activeTab} defaultTab="all" onChange={setActiveTab} variant="pills" className="bear-mb-6">
          <TabList className="bear-flex bear-flex-wrap bear-items-center bear-gap-1 bear-border-b bear-border-gray-200 dark:bear-border-zinc-700 bear-pb-0">
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
                    className={`bear-flex bear-items-center bear-gap-2 bear-px-4 bear-py-2 bear-text-sm bear-font-medium bear-rounded-md bear-transition-colors bear-border-0 bear-cursor-pointer
                      ${activeTab !== 'all' && !(CATEGORY_NAMES as readonly string[]).slice(0, VISIBLE_TAB_COUNT - 1).includes(activeTab)
                        ? 'bear-bg-white dark:bear-bg-gray-700 bear-text-gray-900 dark:bear-text-white bear-shadow-sm'
                        : 'bear-text-gray-600 dark:bear-text-gray-400 hover:bear-text-gray-900 dark:hover:bear-text-white bear-bg-transparent'
                      }`}
                  >
                    <BearIcons.MoreHorizIcon size={18} />
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

          <TabPanel tabId="all" className="bear-pt-4">
            {Object.entries(categoriesToShow).length === 0 ? (
              <div className="bear-text-center bear-py-12 bear-text-gray-500 dark:bear-text-gray-400">
                {search.trim() ? `No icons found matching "${search}"` : 'No icons in this view.'}
              </div>
            ) : (
              Object.entries(categoriesToShow).map(([category, icons]) => (
                <section key={category} className="bear-mb-10">
                  <Typography variant="h4" className="bear-text-gray-900 dark:bear-text-white bear-mb-3 bear-flex bear-items-center bear-gap-2">
                    {category}
                    <span className="bear-text-sm bear-font-normal bear-text-gray-500">({icons.length})</span>
                  </Typography>
                  <div className="bear-grid bear-grid-cols-4 sm:bear-grid-cols-6 md:bear-grid-cols-8 lg:bear-grid-cols-10 bear-gap-3">
                    {icons.map(([name, IconComponent]) => (
                      <IconPreview key={name} name={name} IconComponent={IconComponent} isNew={NEW_ICON_NAMES.has(name)} />
                    ))}
                  </div>
                </section>
              ))
            )}
          </TabPanel>

          {Object.keys(ICON_CATEGORIES).map((category) => (
            <TabPanel key={category} tabId={category} className="bear-pt-4">
              {categoriesToShow[category] ? (
                <div className="bear-grid bear-grid-cols-4 sm:bear-grid-cols-6 md:bear-grid-cols-8 lg:bear-grid-cols-10 bear-gap-3">
                  {categoriesToShow[category].map(([name, IconComponent]) => (
                    <IconPreview key={name} name={name} IconComponent={IconComponent} isNew={NEW_ICON_NAMES.has(name)} />
                  ))}
                </div>
              ) : (
                <div className="bear-text-center bear-py-12 bear-text-gray-500 dark:bear-text-gray-400">
                  {search.trim() ? `No icons found in ${category} matching "${search}"` : `No icons in ${category}.`}
                </div>
              )}
            </TabPanel>
          ))}
        </Tabs>
      </div>

      <section className="bear-mb-12">
        <Typography variant="h3" className="bear-text-gray-900 dark:bear-text-white bear-mb-4">
          Icon Props
        </Typography>
        <div className="bear-overflow-x-auto">
          <table className="bear-w-full bear-text-left bear-text-sm">
            <thead className="bear-bg-gray-50 dark:bear-bg-zinc-800">
              <tr>
                <th className="bear-px-4 bear-py-3 bear-font-medium bear-text-gray-900 dark:bear-text-white">Prop</th>
                <th className="bear-px-4 bear-py-3 bear-font-medium bear-text-gray-900 dark:bear-text-white">Type</th>
                <th className="bear-px-4 bear-py-3 bear-font-medium bear-text-gray-900 dark:bear-text-white">Default</th>
                <th className="bear-px-4 bear-py-3 bear-font-medium bear-text-gray-900 dark:bear-text-white">Description</th>
              </tr>
            </thead>
            <tbody className="bear-divide-y bear-divide-gray-200 dark:bear-divide-zinc-700">
              <tr>
                <td className="bear-px-4 bear-py-3 bear-font-mono bear-text-pink-600">size</td>
                <td className="bear-px-4 bear-py-3 bear-text-gray-600 dark:bear-text-gray-400">
                  <code>number | string</code>
                </td>
                <td className="bear-px-4 bear-py-3 bear-text-gray-600 dark:bear-text-gray-400">24</td>
                <td className="bear-px-4 bear-py-3 bear-text-gray-600 dark:bear-text-gray-400">Icon size in pixels</td>
              </tr>
              <tr>
                <td className="bear-px-4 bear-py-3 bear-font-mono bear-text-pink-600">color</td>
                <td className="bear-px-4 bear-py-3 bear-text-gray-600 dark:bear-text-gray-400">
                  <code>string</code>
                </td>
                <td className="bear-px-4 bear-py-3 bear-text-gray-600 dark:bear-text-gray-400">currentColor</td>
                <td className="bear-px-4 bear-py-3 bear-text-gray-600 dark:bear-text-gray-400">Icon color (any valid CSS color)</td>
              </tr>
              <tr>
                <td className="bear-px-4 bear-py-3 bear-font-mono bear-text-pink-600">className</td>
                <td className="bear-px-4 bear-py-3 bear-text-gray-600 dark:bear-text-gray-400">
                  <code>string</code>
                </td>
                <td className="bear-px-4 bear-py-3 bear-text-gray-600 dark:bear-text-gray-400">-</td>
                <td className="bear-px-4 bear-py-3 bear-text-gray-600 dark:bear-text-gray-400">Additional CSS classes</td>
              </tr>
              <tr>
                <td className="bear-px-4 bear-py-3 bear-font-mono bear-text-pink-600">strokeWidth</td>
                <td className="bear-px-4 bear-py-3 bear-text-gray-600 dark:bear-text-gray-400">
                  <code>number</code>
                </td>
                <td className="bear-px-4 bear-py-3 bear-text-gray-600 dark:bear-text-gray-400">2</td>
                <td className="bear-px-4 bear-py-3 bear-text-gray-600 dark:bear-text-gray-400">SVG stroke width</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Icons;
