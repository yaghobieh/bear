import { FC } from 'react';
import {
  Typography,
  Card,
  CardBody,
  CodeBlock,
} from '@forgedevstack/bear';

const Overview: FC = () => (
  <div className="fade-in">
    <Typography variant="h3" className="mb-4 font-bold text-gray-900 dark:text-white">
      Component API Overview
    </Typography>
    <Typography variant="body1" className="mb-8 text-gray-600 dark:text-gray-400 max-w-2xl">
      Bear components use well-typed props, TypeScript generics where needed, and consistent patterns across the library.
    </Typography>

    <Card variant="outlined" className="mb-8">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">Consistent Props</Typography>
        <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">
          Most components support: size (sm | md | lg), variant, disabled, className, and standard HTML attributes.
        </Typography>
        <CodeBlock
          code={`<Button size="md" variant="primary" disabled={false} />
<Input size="lg" variant="outlined" className="w-full" />`}
          language="tsx"
          showLineNumbers={false}
        />
      </CardBody>
    </Card>

    <Card variant="outlined" className="mb-8">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">TypeScript Generics</Typography>
        <Typography variant="body2" className="mb-4 text-gray-600 dark:text-gray-400">
          Select, DataTable, and similar components use generics for option/value types.
        </Typography>
        <CodeBlock
          code={`<Select<{ id: string; name: string }>
  options={items}
  getOptionLabel={(o) => o.name}
  value={selected}
/>`}
          language="tsx"
          showLineNumbers={false}
        />
      </CardBody>
    </Card>

    <Card variant="outlined" className="mb-8">
      <CardBody>
        <Typography variant="h5" className="mb-3 font-semibold">Component Categories</Typography>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Category</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Examples</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-3 font-medium">Layout</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Grid, Flex, Container, Paper, Divider</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Inputs</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Button, Input, FormField, Select, Checkbox, Switch</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Display</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Typography, Card, Avatar, Badge, List</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Overlay</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Modal, Drawer, Tooltip, Popover, Dropdown</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Feedback</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">Alert, Toast, Spinner, Skeleton, Progress</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  </div>
);

export default Overview;
