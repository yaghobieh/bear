import { useState } from 'react';
import { Cropper, Typography, Card, CardBody, Button } from '@forgedevstack/bear';
import type { CropArea, AspectRatioPreset } from '@forgedevstack/bear';

export default function CropperPage() {
  const [croppedUrl, setCroppedUrl] = useState<string>('');
  const [aspect, setAspect] = useState<AspectRatioPreset>('free');

  const sampleImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop';

  return (
    <div className="space-y-8 p-6">
      <div>
        <Typography variant="h2" className="mb-2">Cropper</Typography>
        <Typography variant="body1" className="text-gray-600 dark:text-gray-400">
          Image cropping component with zoom, rotation, aspect ratio presets, and grid overlay.
        </Typography>
      </div>

      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Image Cropper</Typography>
          <div className="flex gap-2 mb-4 flex-wrap">
            {(['free', '1:1', '4:3', '16:9', '3:2', '9:16'] as AspectRatioPreset[]).map((r) => (
              <Button key={r} size="sm" variant={aspect === r ? 'primary' : 'ghost'} onClick={() => setAspect(r)}>
                {r}
              </Button>
            ))}
          </div>
          <Cropper
            src={sampleImage}
            aspectRatio={aspect}
            showZoomSlider
            showRotationSlider
            showGrid
            height={450}
            onCropComplete={(crop, url) => setCroppedUrl(url)}
          />
          {croppedUrl && (
            <div className="mt-4">
              <Typography variant="subtitle2" className="mb-2">Cropped Result:</Typography>
              <img src={croppedUrl} alt="Cropped" className="max-w-xs rounded border dark:border-gray-700" />
            </div>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Circle Crop</Typography>
          <Cropper
            src={sampleImage}
            shape="circle"
            aspectRatio="1:1"
            showZoomSlider
            height={350}
            onCropComplete={(crop, url) => setCroppedUrl(url)}
          />
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Typography variant="h6" className="mb-4">Props</Typography>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-2 px-3 font-medium">Prop</th>
                  <th className="text-left py-2 px-3 font-medium">Type</th>
                  <th className="text-left py-2 px-3 font-medium">Default</th>
                  <th className="text-left py-2 px-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b dark:border-gray-700"><td className="py-2 px-3 font-mono text-xs">src</td><td className="py-2 px-3">string</td><td className="py-2 px-3">required</td><td className="py-2 px-3">Image source URL</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="py-2 px-3 font-mono text-xs">aspectRatio</td><td className="py-2 px-3">preset | number</td><td className="py-2 px-3">free</td><td className="py-2 px-3">Aspect ratio (free, 1:1, 4:3, 16:9...)</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="py-2 px-3 font-mono text-xs">shape</td><td className="py-2 px-3">rectangle | circle</td><td className="py-2 px-3">rectangle</td><td className="py-2 px-3">Crop shape</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="py-2 px-3 font-mono text-xs">showZoomSlider</td><td className="py-2 px-3">boolean</td><td className="py-2 px-3">false</td><td className="py-2 px-3">Show zoom control</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="py-2 px-3 font-mono text-xs">showRotationSlider</td><td className="py-2 px-3">boolean</td><td className="py-2 px-3">false</td><td className="py-2 px-3">Show rotation control</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="py-2 px-3 font-mono text-xs">showGrid</td><td className="py-2 px-3">boolean</td><td className="py-2 px-3">false</td><td className="py-2 px-3">Show rule-of-thirds grid</td></tr>
                <tr className="border-b dark:border-gray-700"><td className="py-2 px-3 font-mono text-xs">onCropComplete</td><td className="py-2 px-3">function</td><td className="py-2 px-3">-</td><td className="py-2 px-3">Returns crop area and data URL</td></tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
