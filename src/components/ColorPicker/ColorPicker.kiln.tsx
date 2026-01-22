import { defineStories } from '@forgedevstack/kiln';
import { ColorPicker } from './ColorPicker';

export default defineStories({
  title: 'ColorPicker',
  component: ColorPicker,
  description: 'Color selection component.',
  stories: [
    {
      name: 'Default',
      component: () => <ColorPicker value="#E85D04" />,
      code: `<ColorPicker value="#E85D04" onChange={setColor} />`,
      description: 'Basic color picker',
    },
    {
      name: 'With Presets',
      component: () => (
        <ColorPicker
          value="#3B82F6"
          presets={['#E85D04', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444']}
        />
      ),
      code: `<ColorPicker presets={['#E85D04', '#3B82F6', ...]} />`,
      description: 'Quick color selection',
    },
    {
      name: 'Disabled',
      component: () => <ColorPicker disabled value="#999999" />,
      code: `<ColorPicker disabled />`,
      description: 'Disabled state',
    },
  ],
});

