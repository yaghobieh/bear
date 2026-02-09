import React, { useState } from 'react';
import { Typography, CardCompound as Card, Input, QRCode } from '@forgedevstack/bear';

const QRCodePage: React.FC = () => {
  const [value, setValue] = useState('https://forgestack.dev');

  return (
    <div className="space-y-8">
      <div>
        <Typography variant="h2" className="mb-2">QRCode</Typography>
        <Typography variant="body1" color="secondary">
          A QR code generator component for encoding URLs, text, and other data.
        </Typography>
      </div>

      {/* Interactive Example */}
      <Card>
        <Card.Header title={<Typography variant="h5">Interactive Demo</Typography>} />
        <Card.Body>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 w-full">
              <Input 
                label="QR Code Value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter URL or text..."
              />
            </div>
            <div className="flex-shrink-0 p-4 bg-white rounded-lg shadow">
              <QRCode value={value} size={150} />
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Sizes */}
      <Card>
        <Card.Header title={<Typography variant="h5">Sizes</Typography>} />
        <Card.Body>
          <div className="flex gap-6 items-end flex-wrap">
            <div className="text-center">
              <Typography variant="caption" className="mb-2 block">64px</Typography>
              <div className="p-2 bg-white rounded shadow">
                <QRCode value="https://forgestack.dev" size={64} />
              </div>
            </div>
            <div className="text-center">
              <Typography variant="caption" className="mb-2 block">128px</Typography>
              <div className="p-2 bg-white rounded shadow">
                <QRCode value="https://forgestack.dev" size={128} />
              </div>
            </div>
            <div className="text-center">
              <Typography variant="caption" className="mb-2 block">200px</Typography>
              <div className="p-2 bg-white rounded shadow">
                <QRCode value="https://forgestack.dev" size={200} />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Custom Colors */}
      <Card>
        <Card.Header title={<Typography variant="h5">Custom Colors</Typography>} />
        <Card.Body>
          <div className="flex gap-6 items-end flex-wrap">
            <div className="text-center">
              <Typography variant="caption" className="mb-2 block">Default</Typography>
              <div className="p-3 bg-white rounded shadow">
                <QRCode value="https://forgestack.dev" size={100} />
              </div>
            </div>
            <div className="text-center">
              <Typography variant="caption" className="mb-2 block">Pink</Typography>
              <div className="p-3 bg-white rounded shadow">
                <QRCode 
                  value="https://forgestack.dev" 
                  size={100}
                  fgColor="#ec4899"
                />
              </div>
            </div>
            <div className="text-center">
              <Typography variant="caption" className="mb-2 block">Gradient BG</Typography>
              <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded shadow">
                <QRCode 
                  value="https://forgestack.dev" 
                  size={100}
                  fgColor="#ffffff"
                  bgColor="transparent"
                />
              </div>
            </div>
            <div className="text-center">
              <Typography variant="caption" className="mb-2 block">Dark Theme</Typography>
              <div className="p-3 bg-neutral-900 rounded shadow">
                <QRCode 
                  value="https://forgestack.dev" 
                  size={100}
                  fgColor="#ffffff"
                  bgColor="#171717"
                />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* With Logo */}
      <Card>
        <Card.Header title={<Typography variant="h5">With Center Logo</Typography>} />
        <Card.Body>
          <Typography variant="body2" className="mb-4">
            Add a logo in the center of the QR code. Use higher error correction level for better scanning.
          </Typography>
          <div className="flex gap-6">
            <div className="p-3 bg-white rounded shadow">
              <QRCode 
                value="https://forgestack.dev" 
                size={150}
                imageUrl="/logo.svg"
                imageSize={0.25}
                level="H"
              />
            </div>
          </div>
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded text-sm overflow-x-auto mt-4">
{`<QRCode 
  value="https://forgestack.dev" 
  size={150}
  imageUrl="/logo.svg"
  imageSize={0.25}  // 25% of QR code size
  level="H"         // High error correction
/>`}
          </pre>
        </Card.Body>
      </Card>

      {/* Error Correction */}
      <Card>
        <Card.Header title={<Typography variant="h5">Error Correction Levels</Typography>} />
        <Card.Body>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Typography variant="caption" className="mb-2 block">L (7%)</Typography>
              <div className="p-2 bg-white rounded shadow inline-block">
                <QRCode value="https://forgestack.dev" size={80} level="L" />
              </div>
            </div>
            <div className="text-center">
              <Typography variant="caption" className="mb-2 block">M (15%)</Typography>
              <div className="p-2 bg-white rounded shadow inline-block">
                <QRCode value="https://forgestack.dev" size={80} level="M" />
              </div>
            </div>
            <div className="text-center">
              <Typography variant="caption" className="mb-2 block">Q (25%)</Typography>
              <div className="p-2 bg-white rounded shadow inline-block">
                <QRCode value="https://forgestack.dev" size={80} level="Q" />
              </div>
            </div>
            <div className="text-center">
              <Typography variant="caption" className="mb-2 block">H (30%)</Typography>
              <div className="p-2 bg-white rounded shadow inline-block">
                <QRCode value="https://forgestack.dev" size={80} level="H" />
              </div>
            </div>
          </div>
          <Typography variant="body2" color="secondary" className="mt-4">
            Higher error correction allows for more damage/obstruction (like logos) while remaining scannable.
          </Typography>
        </Card.Body>
      </Card>

      {/* Props */}
      <Card>
        <Card.Header title={<Typography variant="h5">Props</Typography>} />
        <Card.Body>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-neutral-900 dark:text-neutral-100">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="border-b border-neutral-200 dark:border-neutral-700">
                  <th className="text-left py-3 px-4 font-semibold">Prop</th>
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Default</th>
                  <th className="text-left py-3 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900">
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">value</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">string</td>
                  <td className="py-3 px-4 font-mono text-xs">required</td>
                  <td className="py-3 px-4">Value to encode</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">size</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">number</td>
                  <td className="py-3 px-4 font-mono text-xs">128</td>
                  <td className="py-3 px-4">Size in pixels</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">level</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">'L' | 'M' | 'Q' | 'H'</td>
                  <td className="py-3 px-4 font-mono text-xs">'M'</td>
                  <td className="py-3 px-4">Error correction level</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">bgColor</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">string</td>
                  <td className="py-3 px-4 font-mono text-xs">#ffffff</td>
                  <td className="py-3 px-4">Background color</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">fgColor</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">string</td>
                  <td className="py-3 px-4 font-mono text-xs">#000000</td>
                  <td className="py-3 px-4">Foreground color</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">includeMargin</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">boolean</td>
                  <td className="py-3 px-4 font-mono text-xs">true</td>
                  <td className="py-3 px-4">Include quiet zone margin</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">imageUrl</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">string</td>
                  <td className="py-3 px-4 font-mono text-xs">-</td>
                  <td className="py-3 px-4">Center image URL</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="py-3 px-4 font-mono text-xs text-pink-600 dark:text-pink-400">imageSize</td>
                  <td className="py-3 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">number</td>
                  <td className="py-3 px-4 font-mono text-xs">0.2</td>
                  <td className="py-3 px-4">Image size as percentage (0-1)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default QRCodePage;
