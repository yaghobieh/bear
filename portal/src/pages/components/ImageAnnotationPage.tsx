import React, { useState } from 'react';
import { Typography, CardCompound as Card, ImageAnnotation } from '@forgedevstack/bear';
import type { Annotation } from '@forgedevstack/bear';
import { PropsTable } from '@/components/PropsTable';
import { LinesOfCode } from '@/components/LinesOfCode';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';

const PROPS = [
  { name: 'src', type: 'string', description: 'Image source URL (required)' },
  { name: 'alt', type: 'string', description: 'Alt text' },
  { name: 'annotations', type: 'Annotation[]', description: 'Current annotations (required)' },
  { name: 'onChange', type: '(annotations: Annotation[]) => void', description: 'Called when annotations change' },
  { name: 'editable', type: 'boolean', default: 'true', description: 'Allow adding new annotations' },
  { name: 'pinColor', type: 'string', default: "'#ec4899'", description: 'Default pin color' },
  { name: 'pinSize', type: 'number', default: '24', description: 'Pin size in px' },
  { name: 'renderPopover', type: '(annotation: Annotation) => ReactNode', description: 'Custom popover content per annotation' },
];

const ANNOTATION_PROPS = [
  { name: 'id', type: 'string', description: 'Unique identifier' },
  { name: 'x', type: 'number', description: 'X position (0–100 %)' },
  { name: 'y', type: 'number', description: 'Y position (0–100 %)' },
  { name: 'text', type: 'string', description: 'Annotation text' },
  { name: 'color', type: 'string', description: 'Override pin color' },
];

const ImageAnnotationPage: React.FC = () => {
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];
  const [annotations, setAnnotations] = useState<Annotation[]>([
    { id: 'demo-1', x: 30, y: 40, text: 'Mountain peak' },
    { id: 'demo-2', x: 65, y: 70, text: 'Lake' },
  ]);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Typography variant="h1">ImageAnnotation</Typography>
          <LinesOfCode lines={114} />
        </div>
        <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400">
          {t.imageAnnotationDesc}
        </Typography>
      </div>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.interactive}</Typography>} />
        <Card.Body>
          <ImageAnnotation
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop"
            alt="Mountain landscape"
            annotations={annotations}
            onChange={setAnnotations}
          />
          <Typography variant="caption" className="mt-2 block text-gray-500">
            Click on the image to add pins. Hover over a pin to see its label. {annotations.length} annotations.
          </Typography>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.customPopover}</Typography>} />
        <Card.Body>
          <ImageAnnotation
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop"
            alt="Mountain landscape"
            annotations={[
              { id: 'c-1', x: 25, y: 35, text: 'Summit', color: '#3b82f6' },
              { id: 'c-2', x: 70, y: 65, text: 'Base camp', color: '#10b981' },
            ]}
            editable={false}
            renderPopover={(ann) => (
              <div className="text-xs space-y-1">
                <div className="font-semibold text-white">{ann.text}</div>
                <div className="text-gray-300">Position: ({ann.x.toFixed(0)}%, {ann.y.toFixed(0)}%)</div>
              </div>
            )}
          />
        </Card.Body>
      </Card>

      <PropsTable title="ImageAnnotation Props" rows={PROPS} />
      <PropsTable title="Annotation Object" rows={ANNOTATION_PROPS} showDefault={false} />
    </div>
  );
};

export default ImageAnnotationPage;
