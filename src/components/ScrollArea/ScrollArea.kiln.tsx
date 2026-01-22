import { defineStories } from '@forgedevstack/kiln';
import { ScrollArea } from './ScrollArea';

export default defineStories({
  title: 'ScrollArea',
  component: ScrollArea,
  description: 'Custom scrollable area.',
  stories: [
    {
      name: 'Vertical',
      component: () => (
        <ScrollArea style={{ height: '200px', width: '300px', border: '1px solid #ccc', padding: '8px' }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>Item {i + 1}</div>
          ))}
        </ScrollArea>
      ),
      code: `<ScrollArea className="h-48">
  {items.map(item => <div>{item}</div>)}
</ScrollArea>`,
      description: 'Vertical scrolling',
    },
    {
      name: 'Horizontal',
      component: () => (
        <ScrollArea orientation="horizontal" style={{ width: '300px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} style={{ minWidth: '100px', height: '80px', background: '#E85D04', borderRadius: '8px' }} />
            ))}
          </div>
        </ScrollArea>
      ),
      code: `<ScrollArea orientation="horizontal">...</ScrollArea>`,
      description: 'Horizontal scrolling',
    },
  ],
});

