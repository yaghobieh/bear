import { FC } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const ImageGalleryPage: FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        ImageGallery
        <span className="px-2 py-0.5 text-xs font-medium bg-bear-100 dark:bg-bear-900/30 text-bear-700 dark:text-bear-300 rounded-md">
          New
        </span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Responsive image grid with optional lightbox for full-screen viewing.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { ImageGallery } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Grid"
        description="Default responsive grid layout."
        code={`<ImageGallery
  images={[
    { src: '/img1.jpg', alt: 'Image 1' },
    { src: '/img2.jpg', alt: 'Image 2' },
    { src: '/img3.jpg', alt: 'Image 3' },
  ]}
/>`}
      >
        <div className="grid grid-cols-3 gap-3 w-full max-w-md">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-square bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            />
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Custom Columns"
        description="Configure number of columns."
        code={`<ImageGallery
  images={images}
  columns={4}
  gap={8}
  rounded
/>`}
      >
        <div className="grid grid-cols-4 gap-2 w-full max-w-md">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="aspect-square bg-gradient-to-br from-bear-200 to-bear-400 dark:from-bear-700 dark:to-bear-900 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
            />
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="No Lightbox"
        description="Grid without lightbox interaction."
        code={`<ImageGallery
  images={images}
  enableLightbox={false}
/>`}
      >
        <div className="grid grid-cols-3 gap-3 w-full max-w-md">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-square bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-lg cursor-default"
            />
          ))}
        </div>
      </ComponentPreview>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Prop</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Default</th>
                <th className="px-4 py-3 font-medium text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td className="px-4 py-3 font-mono text-bear-600">images</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>GalleryImage[]</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Array of image objects</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">columns</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">3</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Number of grid columns</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">gap</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">12</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Gap between images (px)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">rounded</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Rounded corners on thumbnails</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">enableLightbox</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Enable click-to-expand lightbox</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">thumbnailHeight</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Fixed thumbnail height (px)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ImageGalleryPage;
