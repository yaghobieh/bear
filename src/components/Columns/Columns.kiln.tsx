import { Columns, Column } from './Columns';
import { Card } from '../Card';

export default {
  title: 'Layout/Columns',
  description: 'CSS columns layout component for newspaper-style content flow.',
  stories: {
    Default: {
      render: () => (
        <Columns count={3} gap="md">
          <Column>
            <Card className="bear-p-4 bear-mb-4">
              <h3 className="bear-font-bold">Card 1</h3>
              <p className="bear-text-sm bear-text-zinc-500">First column content</p>
            </Card>
          </Column>
          <Column>
            <Card className="bear-p-4 bear-mb-4">
              <h3 className="bear-font-bold">Card 2</h3>
              <p className="bear-text-sm bear-text-zinc-500">This is a longer card with more content to show how columns work.</p>
            </Card>
          </Column>
          <Column>
            <Card className="bear-p-4 bear-mb-4">
              <h3 className="bear-font-bold">Card 3</h3>
              <p className="bear-text-sm bear-text-zinc-500">Third column</p>
            </Card>
          </Column>
          <Column>
            <Card className="bear-p-4 bear-mb-4">
              <h3 className="bear-font-bold">Card 4</h3>
              <p className="bear-text-sm bear-text-zinc-500">Fourth item flows to next column</p>
            </Card>
          </Column>
          <Column>
            <Card className="bear-p-4 bear-mb-4">
              <h3 className="bear-font-bold">Card 5</h3>
              <p className="bear-text-sm bear-text-zinc-500">More content here</p>
            </Card>
          </Column>
          <Column>
            <Card className="bear-p-4 bear-mb-4">
              <h3 className="bear-font-bold">Card 6</h3>
              <p className="bear-text-sm bear-text-zinc-500">Final item</p>
            </Card>
          </Column>
        </Columns>
      ),
    },
    'Auto Width': {
      render: () => (
        <Columns count="auto" minWidth={200} gap="lg">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Column key={i}>
              <Card className="bear-p-4 bear-mb-4">
                <h3 className="bear-font-bold">Item {i}</h3>
                <p className="bear-text-sm bear-text-zinc-500">
                  Auto-sizing column content
                </p>
              </Card>
            </Column>
          ))}
        </Columns>
      ),
    },
    'Two Columns': {
      render: () => (
        <Columns count={2} gap="xl">
          <Column>
            <Card className="bear-p-4 bear-mb-4">
              <h3 className="bear-font-bold">Left</h3>
              <p className="bear-text-sm">Content flows naturally</p>
            </Card>
          </Column>
          <Column>
            <Card className="bear-p-4 bear-mb-4">
              <h3 className="bear-font-bold">Right</h3>
              <p className="bear-text-sm">Like a newspaper</p>
            </Card>
          </Column>
          <Column>
            <Card className="bear-p-4 bear-mb-4">
              <h3 className="bear-font-bold">Third</h3>
              <p className="bear-text-sm">More items flow down</p>
            </Card>
          </Column>
        </Columns>
      ),
    },
    Gaps: {
      render: () => (
        <div className="bear-space-y-8">
          <div>
            <p className="bear-text-sm bear-mb-2">gap="xs"</p>
            <Columns count={4} gap="xs">
              {[1,2,3,4].map(i => <Column key={i}><Card className="bear-p-2">Item {i}</Card></Column>)}
            </Columns>
          </div>
          <div>
            <p className="bear-text-sm bear-mb-2">gap="md"</p>
            <Columns count={4} gap="md">
              {[1,2,3,4].map(i => <Column key={i}><Card className="bear-p-2">Item {i}</Card></Column>)}
            </Columns>
          </div>
          <div>
            <p className="bear-text-sm bear-mb-2">gap="xl"</p>
            <Columns count={4} gap="xl">
              {[1,2,3,4].map(i => <Column key={i}><Card className="bear-p-2">Item {i}</Card></Column>)}
            </Columns>
          </div>
        </div>
      ),
    },
  },
};



