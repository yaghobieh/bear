import React from 'react';
import { Typography, CardCompound as Card, GlowCard, BearIcons } from '@forgedevstack/bear';
import { LinesOfCode } from '@/components/LinesOfCode';
import { PropsTable } from '@/components/PropsTable';
import { ComponentPreview } from '@/components/ComponentPreview';
import type { EditablePropsConfig } from '@/components/PropsControls/PropsControls.types';
import { usePortalLanguage } from '@/hooks/usePortalLanguage';
import { PORTAL_TEXT } from '@/constants/portal-i18n.const';

const PROPS = [
  { name: 'effect', type: "'ambient' | 'border' | 'spotlight' | 'pulse' | 'wave'", default: "'ambient'", description: 'Glow effect style' },
  { name: 'glowColor', type: 'string', default: "'#ec4899'", description: 'Glow color (CSS color value)' },
  { name: 'glowIntensity', type: 'number', default: '40', description: 'Glow intensity (0–100, controls blur/spread)' },
  { name: 'followMouse', type: 'boolean', default: 'true', description: 'Whether glow follows the mouse position' },
  { name: 'borderRadius', type: 'number | string', default: '12', description: 'Border radius' },
  { name: 'borderWidth', type: 'number', default: '2', description: "Border width for 'border' effect (px)" },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable glow animation' },
  { name: 'children', type: 'ReactNode', description: 'Card content' },
  { name: 'className', type: 'string', description: 'Additional CSS classes' },
  { name: 'style', type: 'CSSProperties', description: 'Inline styles' },
];

const PLAYGROUND_CONFIG: EditablePropsConfig = {
  effect: { type: 'select', default: 'ambient', options: [
    { value: 'ambient', label: 'Ambient' },
    { value: 'border', label: 'Border' },
    { value: 'spotlight', label: 'Spotlight' },
    { value: 'pulse', label: 'Pulse' },
    { value: 'wave', label: 'Wave' },
  ]},
  glowColor: { type: 'string', default: '#ec4899', placeholder: '#ec4899' },
  glowIntensity: { type: 'number', default: 40, min: 10, max: 100 },
  borderWidth: { type: 'number', default: 2, min: 1, max: 6 },
  borderRadius: { type: 'number', default: 12, min: 0, max: 32 },
  followMouse: { type: 'boolean', default: true },
  disabled: { type: 'boolean', default: false },
};

const GlowCardPage: React.FC = () => {
  const { language } = usePortalLanguage();
  const t = PORTAL_TEXT[language];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Typography variant="h1">GlowCard</Typography>
          <LinesOfCode lines={165} />
        </div>
        <Typography variant="body1" className="text-neutral-600 dark:text-neutral-400">
          {t.glowCardDesc}
        </Typography>
      </div>

      <ComponentPreview
        title={t.playground}
        description="Try all props live — hover the card to see the glow effect."
        code={`<GlowCard effect="ambient" glowColor="#ec4899" glowIntensity={40} className="p-6">
  <h3>Card content</h3>
</GlowCard>`}
        editableProps={PLAYGROUND_CONFIG}
        render={(props) => (
          <GlowCard
            effect={props.effect as 'ambient' | 'border' | 'spotlight' | 'pulse' | 'wave'}
            glowColor={String(props.glowColor)}
            glowIntensity={Number(props.glowIntensity)}
            borderWidth={Number(props.borderWidth)}
            borderRadius={Number(props.borderRadius)}
            followMouse={props.followMouse as boolean}
            disabled={props.disabled as boolean}
            className="p-8 max-w-md mx-auto"
          >
            <Typography variant="h4" className="mb-2">Hover me</Typography>
            <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
              Move your mouse around to see the glow follow your cursor. Change the effect type to see different animations.
            </Typography>
          </GlowCard>
        )}
      />

      <Card>
        <Card.Header title={<Typography variant="h5">{t.ambientDefault}</Typography>} />
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlowCard glowColor="#ec4899" glowIntensity={50} className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <BearIcons.HeartIcon size={20} className="text-pink-500" />
                <Typography variant="h5">Pink Glow</Typography>
              </div>
              <Typography variant="body2" className="text-gray-500">Soft radial gradient that follows your cursor with a warm pink hue.</Typography>
            </GlowCard>
            <GlowCard glowColor="#7c3aed" glowIntensity={55} className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <BearIcons.StarIcon size={20} className="text-violet-500" />
                <Typography variant="h5">Violet Glow</Typography>
              </div>
              <Typography variant="body2" className="text-gray-500">Rich purple ambient effect with stronger intensity spread.</Typography>
            </GlowCard>
            <GlowCard glowColor="#059669" glowIntensity={60} className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <BearIcons.CheckCircleIcon size={20} className="text-emerald-600" />
                <Typography variant="h5">Emerald Glow</Typography>
              </div>
              <Typography variant="body2" className="text-gray-500">High intensity for a wider, more prominent glow spread.</Typography>
            </GlowCard>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.borderEffect}</Typography>} />
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlowCard effect="border" glowColor="#2563eb" glowIntensity={60} borderWidth={3} className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <BearIcons.ZapIcon size={20} className="text-blue-600" />
                <Typography variant="h5">Blue Border</Typography>
              </div>
              <Typography variant="body2" className="text-gray-500">Glow only appears along the border edge — like a laser tracing the card.</Typography>
            </GlowCard>
            <GlowCard effect="border" glowColor="#ea580c" glowIntensity={70} borderWidth={3} className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <BearIcons.WarningIcon size={20} className="text-orange-600" />
                <Typography variant="h5">Orange Border</Typography>
              </div>
              <Typography variant="body2" className="text-gray-500">Warm orange border highlight with 3px width and high intensity.</Typography>
            </GlowCard>
            <GlowCard effect="border" glowColor="#dc2626" glowIntensity={80} borderWidth={4} className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <BearIcons.AlertCircleIcon size={20} className="text-red-600" />
                <Typography variant="h5">Red Border</Typography>
              </div>
              <Typography variant="body2" className="text-gray-500">Intense red border with thicker 4px width for strong emphasis.</Typography>
            </GlowCard>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.spotlightEffect}</Typography>} />
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlowCard effect="spotlight" glowColor="#ec4899" glowIntensity={50} className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <BearIcons.SearchIcon size={20} className="text-pink-500" />
                <Typography variant="h5">Spotlight Pink</Typography>
              </div>
              <Typography variant="body2" className="text-gray-500">Focused beam with a tight radial gradient — like a flashlight on the card surface.</Typography>
            </GlowCard>
            <GlowCard effect="spotlight" glowColor="#0891b2" glowIntensity={50} className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <BearIcons.VisibilityIcon size={20} className="text-cyan-600" />
                <Typography variant="h5">Spotlight Cyan</Typography>
              </div>
              <Typography variant="body2" className="text-gray-500">Cool spotlight that reveals content with a turquoise glow beam.</Typography>
            </GlowCard>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.pulseEffect}</Typography>} />
        <Card.Body>
          <Typography variant="caption" className="block mb-4 text-gray-500">
            Continuous pulsing glow with shadow, inner radial gradient, and border ring — all breathing in rhythm on hover.
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlowCard effect="pulse" glowColor="#7c3aed" glowIntensity={50} className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <BearIcons.ActivityIcon size={20} className="text-violet-500" />
                <Typography variant="h5">Pulsing Violet</Typography>
              </div>
              <Typography variant="body2" className="text-gray-500">Rhythmic breathing glow that draws the eye to this card.</Typography>
            </GlowCard>
            <GlowCard effect="pulse" glowColor="#059669" glowIntensity={60} className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <BearIcons.RefreshIcon size={20} className="text-emerald-600" />
                <Typography variant="h5">Pulsing Emerald</Typography>
              </div>
              <Typography variant="body2" className="text-gray-500">Higher intensity pulse with wider glow spread and green tones.</Typography>
            </GlowCard>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header title={<Typography variant="h5">{t.waveEffect}</Typography>} />
        <Card.Body>
          <Typography variant="caption" className="block mb-4 text-gray-500">
            A horizontal light sweep that continuously washes across the card on hover — great for loading states or premium feel.
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlowCard effect="wave" glowColor="#3b82f6" glowIntensity={50} className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <BearIcons.WifiIcon size={20} className="text-blue-500" />
                <Typography variant="h5">Blue Wave</Typography>
              </div>
              <Typography variant="body2" className="text-gray-500">A smooth horizontal light beam sweeping across the card surface.</Typography>
            </GlowCard>
            <GlowCard effect="wave" glowColor="#f59e0b" glowIntensity={60} className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <BearIcons.StarIcon size={20} className="text-amber-500" />
                <Typography variant="h5">Golden Wave</Typography>
              </div>
              <Typography variant="body2" className="text-gray-500">Warm golden wave with a premium, luxurious feel.</Typography>
            </GlowCard>
          </div>
        </Card.Body>
      </Card>

      <PropsTable title="GlowCard Props" rows={PROPS} />
    </div>
  );
};

export default GlowCardPage;
