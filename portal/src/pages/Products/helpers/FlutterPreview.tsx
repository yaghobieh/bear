import type { FC } from 'react';
import { Badge, Flex, Typography } from '@forgedevstack/bear';

const SWATCHES = [
  { name: 'primary', color: '#ec4899' },
  { name: 'pressed', color: '#db2777' },
  { name: 'ink', color: '#111827' },
  { name: 'surface', color: '#ffffff' },
];

const SAMPLE = `import 'package:bear_flutter/bear_flutter.dart';

BearTheme(
  data: const BearThemeData(),
  child: BearButton(label: 'Continue'),
);`;

export const FlutterPreview: FC = () => (
  <Flex direction="column" gap={3}>
    <Flex gap={2} wrap="wrap">
      {SWATCHES.map((swatch) => (
        <Flex key={swatch.name} direction="column" gap={1}>
          <span style={{ width: 48, height: 48, borderRadius: 8, background: swatch.color, border: '1px solid #e5e7eb', display: 'block' }} />
          <Typography variant="caption">{swatch.name}</Typography>
        </Flex>
      ))}
    </Flex>
    <Badge variant="primary">bear_flutter 0.1.0</Badge>
    <pre className="text-sm overflow-auto"><code>{SAMPLE}</code></pre>
  </Flex>
);
