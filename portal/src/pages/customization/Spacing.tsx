import { FC } from 'react';
import { Typography, Card, CardBody, CodeBlock } from '@forgedevstack/bear';

const Spacing: FC = () => {
  return (
    <div className="fade-in">
      <Typography variant="h1" className="mb-4">
        Spacing
      </Typography>
      <Typography variant="body1" color="secondary" className="mb-8">
        Bear uses bear-p-*, bear-m-*, and bear-gap-* utility classes. Values map to a spacing scale (0.25rem base).
      </Typography>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          Utility Classes
        </Typography>
        <Typography variant="body2" className="mb-4">
          Padding, margin, and gap utilities follow the bear- prefix for scoped styling.
        </Typography>
        <CodeBlock
          code={`<div className="bear-p-4 bear-m-2 bear-gap-3">
  <span className="bear-p-2">Item</span>
  <span className="bear-p-2">Item</span>
</div>`}
          language="tsx"
        />
      </section>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          Spacing Scale
        </Typography>
        <Card className="mb-4">
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 font-medium">Token</th>
                    <th className="text-left py-2 font-medium">Value</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  {[
                    [0, '0'],
                    [1, '0.25rem'],
                    [2, '0.5rem'],
                    [3, '0.75rem'],
                    [4, '1rem'],
                    [5, '1.25rem'],
                    [6, '1.5rem'],
                    [8, '2rem'],
                    [10, '2.5rem'],
                    [12, '3rem'],
                    [16, '4rem'],
                    [20, '5rem'],
                    [24, '6rem'],
                    [32, '8rem'],
                  ].map(([token, value]) => (
                    <tr key={String(token)} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2 font-mono">{token}</td>
                      <td className="py-2">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </section>

      <section className="mb-12">
        <Typography variant="h4" className="mb-4">
          CSS Variables
        </Typography>
        <CodeBlock
          code={`/* Theme spacing (--bear-spacing-*) */
--bear-spacing-1: 0.25rem;
--bear-spacing-4: 1rem;
--bear-spacing-8: 2rem;`}
          language="css"
        />
      </section>
    </div>
  );
};

export default Spacing;
