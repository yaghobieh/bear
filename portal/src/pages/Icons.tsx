import { type ChangeEvent, FC, useState, useMemo } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { KilnLink } from '@/components/KilnLink';
import { LinesOfCode } from '@/components/LinesOfCode';
import { Input, BearIcons, Typography } from '@forgedevstack/bear';

// Get all icons from BearIcons categories
const ICON_CATEGORIES = {
  Action: Object.entries(BearIcons.Action),
  Navigation: Object.entries(BearIcons.Navigation),
  Communication: Object.entries(BearIcons.Communication),
  Status: Object.entries(BearIcons.Status),
  Media: Object.entries(BearIcons.Media),
  Content: Object.entries(BearIcons.Content),
  Editor: Object.entries(BearIcons.Editor),
  Misc: Object.entries(BearIcons.Misc),
};

// Icon preview component
const IconPreview: FC<{ name: string; IconComponent: FC<{ size?: number | string; className?: string }> }> = ({ name, IconComponent }) => {
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
        Bear-IconPreview bear-p-4 bear-rounded-lg bear-border bear-transition-all
        hover:bear-border-pink-500 hover:bear-shadow-md
        ${copied 
          ? 'bear-border-green-500 bear-bg-green-50 dark:bear-bg-green-900/20' 
          : 'bear-border-gray-200 dark:bear-border-zinc-700 bear-bg-white dark:bear-bg-zinc-800'
        }
      `}
      title={copied ? 'Copied!' : `Click to copy import for ${name}`}
    >
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
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = useMemo(() => {
    const searchLower = search.toLowerCase();
    const result: Record<string, Array<[string, FC<{ size?: number | string; className?: string }>]>> = {};

    Object.entries(ICON_CATEGORIES).forEach(([category, icons]) => {
      const filtered = icons.filter(([name]) => 
        name.toLowerCase().includes(searchLower)
      ) as Array<[string, FC<{ size?: number | string; className?: string }>]>;
      
      if (filtered.length > 0 && (!activeCategory || activeCategory === category)) {
        result[category] = filtered;
      }
    });

    return result;
  }, [search, activeCategory]);

  const totalIcons = Object.values(ICON_CATEGORIES).flat().length;

  return (
    <div className="fade-in">
      <div className="bear-flex bear-items-center bear-gap-3 bear-mb-4">
        <Typography variant="h1" className="bear-text-gray-900 dark:bear-text-white">
          Icons
        </Typography>
        <KilnLink path="/icons" />
        <LinesOfCode lines={350} />
      </div>
      
      <Typography variant="body1" className="bear-text-gray-600 dark:bear-text-gray-400 bear-mb-8">
        Bear UI includes {totalIcons}+ SVG icons organized by category. Click any icon to copy its import.
      </Typography>

      <section className="bear-mb-8">
        <Typography variant="h3" className="bear-text-gray-900 dark:bear-text-white bear-mb-4">
          Usage
        </Typography>
        <CodeBlock
          code={`import { BearIcons, SearchIcon, HomeIcon } from '@forgedevstack/bear';

// Use individual icons
<SearchIcon size={24} className="text-pink-500" />
<HomeIcon size="lg" />

// Or use the BearIcons namespace
<BearIcons.SearchIcon size={24} />
<BearIcons.Action.AddCircleIcon size={32} />

// Available categories
// BearIcons.Action, BearIcons.Navigation, BearIcons.Communication,
// BearIcons.Status, BearIcons.Media, BearIcons.Content,
// BearIcons.Editor, BearIcons.Misc`}
          language="tsx"
        />
      </section>

      <div className="bear-flex bear-flex-col sm:bear-flex-row bear-gap-4 bear-mb-8">
        <div className="bear-flex-1">
          <Input
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            placeholder="Search icons..."
            className="bear-w-full"
          />
        </div>
        
        <div className="bear-flex bear-gap-2 bear-flex-wrap">
          <button
            onClick={() => setActiveCategory(null)}
            className={`bear-px-3 bear-py-2 bear-text-sm bear-rounded-lg bear-transition-colors
              ${!activeCategory 
                ? 'bear-bg-pink-500 bear-text-white' 
                : 'bear-bg-gray-100 dark:bear-bg-zinc-800 bear-text-gray-600 dark:bear-text-gray-400 hover:bear-bg-gray-200 dark:hover:bear-bg-zinc-700'
              }`}
          >
            All ({totalIcons})
          </button>
          {Object.keys(ICON_CATEGORIES).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`bear-px-3 bear-py-2 bear-text-sm bear-rounded-lg bear-transition-colors
                ${activeCategory === category 
                  ? 'bear-bg-pink-500 bear-text-white' 
                  : 'bear-bg-gray-100 dark:bear-bg-zinc-800 bear-text-gray-600 dark:bear-text-gray-400 hover:bear-bg-gray-200 dark:hover:bear-bg-zinc-700'
                }`}
            >
              {category} ({ICON_CATEGORIES[category as keyof typeof ICON_CATEGORIES].length})
            </button>
          ))}
        </div>
      </div>

      {Object.entries(filteredCategories).map(([category, icons]) => (
        <section key={category} className="bear-mb-12">
          <Typography variant="h4" className="bear-text-gray-900 dark:bear-text-white bear-mb-4 bear-flex bear-items-center bear-gap-2">
            {category}
            <span className="bear-text-sm bear-font-normal bear-text-gray-500">({icons.length})</span>
          </Typography>
          <div className="bear-grid bear-grid-cols-4 sm:bear-grid-cols-6 md:bear-grid-cols-8 lg:bear-grid-cols-10 bear-gap-3">
            {icons.map(([name, IconComponent]) => (
              <IconPreview key={name} name={name} IconComponent={IconComponent} />
            ))}
          </div>
        </section>
      ))}

      {Object.keys(filteredCategories).length === 0 && (
        <div className="bear-text-center bear-py-12 bear-text-gray-500 dark:bear-text-gray-400">
          No icons found matching "{search}"
        </div>
      )}

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
