import { FC, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import { ComponentPreview } from '@/components/ComponentPreview';

const CarouselPage: FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    { id: 1, color: 'bg-bear-500', label: 'Slide 1' },
    { id: 2, color: 'bg-purple-500', label: 'Slide 2' },
    { id: 3, color: 'bg-blue-500', label: 'Slide 3' },
  ];

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Carousel</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Slideshow component for cycling through images or content.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code={`import { Carousel } from '@forgedevstack/bear';`} language="tsx" showLineNumbers={false} />
      </section>

      <ComponentPreview
        title="Basic Carousel"
        description="Simple slideshow with navigation."
        code={`<Carousel>
  <Carousel.Slide>Slide 1</Carousel.Slide>
  <Carousel.Slide>Slide 2</Carousel.Slide>
  <Carousel.Slide>Slide 3</Carousel.Slide>
</Carousel>`}
      >
        <div className="relative overflow-hidden rounded-lg">
          <div className="relative h-48">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 ${slide.color} flex items-center justify-center text-white text-2xl font-bold transition-opacity duration-300 ${
                  index === activeSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {slide.label}
              </div>
            ))}
          </div>
          <button
            onClick={() => setActiveSlide(prev => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => setActiveSlide(prev => (prev + 1) % slides.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
          >
            →
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Autoplay"
        description="Automatically cycle through slides."
        code={`<Carousel autoPlay interval={3000}>
  <Carousel.Slide>Auto 1</Carousel.Slide>
  <Carousel.Slide>Auto 2</Carousel.Slide>
  <Carousel.Slide>Auto 3</Carousel.Slide>
</Carousel>`}
      >
        <div className="flex items-center justify-center gap-3 py-8">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Autoplay enabled (3s interval)</span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="With Thumbnails"
        description="Navigation via thumbnail images."
        code={`<Carousel withThumbnails>
  <Carousel.Slide>
    <img src="..." alt="Slide 1" />
  </Carousel.Slide>
</Carousel>`}
      >
        <div className="space-y-3">
          <div className="h-32 bg-gradient-to-r from-bear-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
            Main Slide
          </div>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4].map(i => (
              <button
                key={i}
                className={`w-16 h-12 rounded ${i === 1 ? 'ring-2 ring-bear-500' : ''} bg-gradient-to-r from-bear-${i * 100 + 200} to-purple-${i * 100 + 200}`}
                style={{ background: `linear-gradient(to right, hsl(${i * 40}, 70%, 50%), hsl(${i * 40 + 30}, 70%, 50%))` }}
              />
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Fade Effect"
        description="Crossfade transition between slides."
        code={`<Carousel effect="fade" duration={500}>
  ...
</Carousel>`}
      >
        <div className="flex justify-center gap-6 py-4">
          <div className="text-center">
            <div className="mb-2 text-sm text-gray-500">slide</div>
            <div className="flex gap-1">
              <div className="w-8 h-8 bg-bear-500 rounded" />
              <div className="w-8 h-8 bg-bear-500/50 rounded -ml-2" />
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded -ml-2" />
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-sm text-gray-500">fade</div>
            <div className="relative">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="w-8 h-8 bg-bear-500/70 rounded absolute inset-0" />
            </div>
          </div>
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
              <tr><td className="px-4 py-3 font-mono text-bear-600">autoPlay</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Auto-advance slides</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">interval</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>number</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">5000</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Autoplay interval (ms)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">effect</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>slide | fade</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">slide</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Transition effect</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showArrows</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show navigation arrows</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">showDots</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">true</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show indicator dots</td></tr>
              <tr><td className="px-4 py-3 font-mono text-bear-600">withThumbnails</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400"><code>boolean</code></td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">false</td><td className="px-4 py-3 text-gray-600 dark:text-gray-400">Show thumbnails</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CarouselPage;

