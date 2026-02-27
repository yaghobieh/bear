import { FC } from 'react';
import {
  Typography,
  Card,
  CardBody,
  CodeBlock,
  AspectRatio,
} from '@forgedevstack/bear';
import { ComponentPreview } from '@/components/ComponentPreview';

const AspectRatioPage: FC = () => (
  <div className="fade-in">
    <Typography variant="h3" className="mb-4 font-bold text-gray-900 dark:text-white">
      AspectRatio
    </Typography>
    <Typography variant="body1" className="mb-8 text-gray-600 dark:text-gray-400">
      Maintain a fixed aspect ratio for images, videos, or any content. Uses padding-bottom technique.
    </Typography>

    <section className="mb-8">
      <Typography variant="h5" className="mb-4 font-semibold">Import</Typography>
      <CodeBlock code="import { AspectRatio } from '@forgedevstack/bear';" language="tsx" showLineNumbers={false} />
    </section>

    <ComponentPreview
      title="16:9 with image"
      description="Classic video/landscape ratio."
      code={`<AspectRatio ratio={16/9}>
  <img src="..." alt="" className="w-full h-full object-cover" />
</AspectRatio>`}
    >
      <div className="max-w-md mx-auto">
        <AspectRatio ratio={16 / 9}>
          <div className="w-full h-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-medium">
            16:9
          </div>
        </AspectRatio>
      </div>
    </ComponentPreview>

    <ComponentPreview
      title="4:3 ratio"
      description="Traditional display ratio."
      code={`<AspectRatio ratio={4/3}>
  <div className="bg-gray-200">Content</div>
</AspectRatio>`}
    >
      <div className="max-w-md mx-auto">
        <AspectRatio ratio={4 / 3}>
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400">
            4:3
          </div>
        </AspectRatio>
      </div>
    </ComponentPreview>

    <ComponentPreview
      title="1:1 square"
      description="Square aspect ratio for avatars or thumbnails."
      code={`<AspectRatio ratio={1}>
  <div className="rounded-full bg-bear-500">1:1</div>
</AspectRatio>`}
    >
      <div className="max-w-xs mx-auto">
        <AspectRatio ratio={1}>
          <div className="w-full h-full bg-bear-500 flex items-center justify-center text-white font-medium rounded-lg">
            1:1
          </div>
        </AspectRatio>
      </div>
    </ComponentPreview>

    <ComponentPreview
      title="With maxWidth"
      description="Constrain maximum width."
      code={`<AspectRatio ratio={16/9} maxWidth={320}>
  <img src="..." alt="" />
</AspectRatio>`}
    >
      <div className="mx-auto">
        <AspectRatio ratio={16 / 9} maxWidth={320}>
          <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-medium">
            max 320px
          </div>
        </AspectRatio>
      </div>
    </ComponentPreview>

    <ComponentPreview
      title="Video placeholder"
      description="Placeholder for embedded video."
      code={`<AspectRatio ratio={16/9}>
  <div className="bg-gray-800 flex items-center justify-center">
    <span className="text-white">Video</span>
  </div>
</AspectRatio>`}
    >
      <div className="max-w-md mx-auto">
        <AspectRatio ratio={16 / 9}>
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
            Video placeholder
          </div>
        </AspectRatio>
      </div>
    </ComponentPreview>

    <Card variant="outlined" className="mt-8">
      <CardBody>
        <Typography variant="h5" className="mb-4 font-semibold">Props</Typography>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium">Prop</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Default</th>
                <th className="px-4 py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">ratio</td><td>number</td><td>16/9</td><td>Width/height (e.g. 16/9, 4/3, 1)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">maxWidth</td><td>string | number</td><td>-</td><td>Max width constraint (px or CSS value)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">children</td><td>ReactNode</td><td>-</td><td>Content inside the ratio container</td></tr>
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  </div>
);

export default AspectRatioPage;
