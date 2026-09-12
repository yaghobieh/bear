from pathlib import Path
import json
import re

ROOT = Path('/Users/user/Desktop/Projects/Forge/bear')
NAV = (ROOT / 'portal/src/constants/navigation.const.ts').read_text()
EXPORTS_SRC = (ROOT / 'src/components/index.ts').read_text()
OUT = ROOT / 'portal/src/stories/kit'
RECIPES_OUT = ROOT / 'portal/src/pages/Sandbox/Sandbox.recipes.ts'

EXPORTS = set(re.findall(r'^export \{ ([A-Za-z][A-Za-z0-9]*)', EXPORTS_SRC, re.M))
SKIP_SLUGS = {'ai-chat'}
SLUG_EXPORT = {
    'fab': 'Fab',
    'hover-card': 'HoverCard',
    'context-menu': 'ContextMenu',
    'otp-input': 'OTPInput',
    'qr-code': 'QRCode',
    'json-viewer': 'JsonViewer',
    'ai-chat': None,
}

VOID = {
    'Input', 'PasswordInput', 'NumberInput', 'SearchInput', 'Textarea', 'Checkbox', 'Radio',
    'Switch', 'Slider', 'SliderRange', 'Progress', 'Spinner', 'Skeleton', 'Divider', 'Avatar',
    'Rating', 'FormSkeleton', 'CardSkeleton', 'TableSkeleton', 'ContextMeter', 'Sparkline',
    'Gauge', 'Heatmap', 'QRCode', 'ColorPicker', 'DatePicker', 'TimePicker', 'Calendar',
    'OTPInput', 'PhoneInput', 'CreditInput', 'CurrencyInput', 'TagsInput', 'MentionsInput',
    'ResizableTextarea', 'ColorSwatch', 'RingProgress', 'BearLoader', 'CloseButton',
    'CopyButton', 'ActionIcon', 'ToggleButton', 'BackTop',
}

DATA = {
    'Chart', 'BarChart', 'LineChart', 'PieChart', 'RadarChart', 'FunnelChart', 'TimelineChart',
}

SPECIAL = {
    'Masonry': {
        'imports': ['Masonry', 'BearProvider', 'Card', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  render: () => (
    <Masonry columns={3} gap={16}>
      <Card padding="sm"><Typography>One</Typography></Card>
      <Card padding="sm"><Typography>Two</Typography></Card>
      <Card padding="sm"><Typography>Three</Typography></Card>
      <Card padding="sm"><Typography>Four</Typography></Card>
      <Card padding="sm"><Typography>Five</Typography></Card>
      <Card padding="sm"><Typography>Six</Typography></Card>
    </Masonry>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Masonry columns={{ base: 1, md: 2, lg: 3 }} gap={12}>
      <Card padding="sm"><Typography>Alpha</Typography></Card>
      <Card padding="sm"><Typography>Beta</Typography></Card>
      <Card padding="sm"><Typography>Gamma</Typography></Card>
      <Card padding="sm"><Typography>Delta</Typography></Card>
    </Masonry>
  ),
};

export const TightGap: Story = {
  render: () => (
    <Masonry columns={4} gap={8}>
      <Card padding="sm"><Typography>A</Typography></Card>
      <Card padding="sm"><Typography>B</Typography></Card>
      <Card padding="sm"><Typography>C</Typography></Card>
      <Card padding="sm"><Typography>D</Typography></Card>
    </Masonry>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={6}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse Masonry anywhere below.</Typography>
        <Masonry columns={3} gap={16}>
          <Card padding="sm"><Typography>First masonry</Typography></Card>
          <Card padding="sm"><Typography>Same provider</Typography></Card>
          <Card padding="sm"><Typography>Theme tokens apply</Typography></Card>
        </Masonry>
        <Masonry columns={2} gap={8}>
          <Card padding="sm"><Typography>Reused masonry</Typography></Card>
          <Card padding="sm"><Typography>Second instance</Typography></Card>
        </Masonry>
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Masonry</Typography>
      <Masonry columns={3} gap={16}>
        <Card padding="sm"><Typography>One</Typography></Card>
        <Card padding="sm"><Typography>Two</Typography></Card>
        <Card padding="sm"><Typography>Three</Typography></Card>
      </Masonry>
      <Masonry columns={2} gap={8}>
        <Card padding="sm"><Typography>Reuse</Typography></Card>
        <Card padding="sm"><Typography>Again</Typography></Card>
      </Masonry>''',
    },
    'Button': {
        'imports': ['Button', 'BearProvider', 'Flex', 'Typography'],
        'test': True,
        'stories': '''export const Basic: Story = {
  tags: ['smoke-test'],
  args: {
    children: 'Primary',
    variant: 'primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Primary' })).toBeVisible();
  },
};

export const Variants: Story = {
  render: () => (
    <Flex gap={2} wrap="wrap">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap={2} align="center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={2} wrap="wrap">
        <Button>First use</Button>
        <Button variant="outline">Reuse below the same provider</Button>
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Button</Typography>
      <Flex gap={2} wrap="wrap">
        <Button>Primary</Button>
        <Button variant="outline">Reuse</Button>
      </Flex>''',
    },
    'Alert': {
        'imports': ['Alert', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  args: {
    children: 'Heads up from Bear',
    severity: 'info',
  },
};

export const Severities: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Alert severity="success">Saved</Alert>
      <Alert severity="warning">Check this</Alert>
      <Alert severity="error">Failed</Alert>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={2}>
        <Alert severity="info">First use</Alert>
        <Alert severity="success">Reuse below the same provider</Alert>
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Alert</Typography>
      <Alert severity="info">First use</Alert>
      <Alert severity="success">Reuse below the same provider</Alert>''',
    },
    'Badge': {
        'imports': ['Badge', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  args: {
    children: 'New',
    variant: 'primary',
  },
};

export const Variants: Story = {
  render: () => (
    <Flex gap={2}>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={2}>
        <Badge variant="primary">First</Badge>
        <Badge variant="secondary">Reuse</Badge>
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Badge</Typography>
      <Flex gap={2}>
        <Badge variant="primary">First</Badge>
        <Badge variant="secondary">Reuse</Badge>
      </Flex>''',
    },
    'Flex': {
        'imports': ['Flex', 'BearProvider', 'Button', 'Typography'],
        'stories': '''export const Basic: Story = {
  render: () => (
    <Flex gap={3}>
      <Button>One</Button>
      <Button variant="outline">Two</Button>
    </Flex>
  ),
};

export const Column: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Typography>Stacked</Typography>
      <Button size="sm">Action</Button>
    </Flex>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Flex gap={2} wrap="wrap">
      <Button size="sm">A</Button>
      <Button size="sm">B</Button>
      <Button size="sm">C</Button>
      <Button size="sm">D</Button>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Flex gap={2}>
          <Button>Row one</Button>
          <Button variant="outline">Same provider</Button>
        </Flex>
        <Flex gap={2}>
          <Button variant="ghost">Reused Flex</Button>
          <Button>Second instance</Button>
        </Flex>
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Flex</Typography>
      <Flex gap={2}>
        <Button>Row one</Button>
        <Button variant="outline">Same provider</Button>
      </Flex>
      <Flex gap={2}>
        <Button variant="ghost">Reused Flex</Button>
        <Button>Second instance</Button>
      </Flex>''',
    },
    'Card': {
        'imports': ['Card', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  render: () => (
    <Card padding="md">
      <Typography variant="h6">Card</Typography>
      <Typography color="muted">Real Bear Card with children.</Typography>
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined" padding="sm">
      <Typography>Outlined card</Typography>
    </Card>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3} wrap="wrap">
        <Card padding="sm"><Typography>First card</Typography></Card>
        <Card padding="sm"><Typography>Reused card</Typography></Card>
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Card</Typography>
      <Flex gap={3} wrap="wrap">
        <Card padding="sm"><Typography>First card</Typography></Card>
        <Card padding="sm"><Typography>Reused card</Typography></Card>
      </Flex>''',
    },
    'Chart': {
        'imports': ['Chart', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  args: {
    type: 'bar',
    data: [{ label: 'A', value: 28 }, { label: 'B', value: 52 }, { label: 'C', value: 36 }],
    height: 180,
    showLabels: true,
  },
};

export const Line: Story = {
  render: () => (
    <Chart type="line" data={[{ label: 'A', value: 20 }, { label: 'B', value: 48 }]} height={160} showLabels />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Chart type="bar" data={[{ label: 'A', value: 22 }, { label: 'B', value: 44 }]} height={140} showLabels />
        <Chart type="line" data={[{ label: 'A', value: 18 }, { label: 'B', value: 36 }]} height={140} showLabels />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Chart</Typography>
      <Chart type="bar" data={[{ label: 'A', value: 28 }, { label: 'B', value: 52 }]} height={180} showLabels />
      <Chart type="line" data={[{ label: 'A', value: 18 }, { label: 'B', value: 36 }]} height={140} showLabels />''',
    },
    'Input': {
        'imports': ['Input', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  args: {
    placeholder: 'Search Bear',
  },
};

export const WithLabel: Story = {
  render: () => <Input label="Email" placeholder="you@forge.dev" fullWidth />,
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={2}>
        <Input placeholder="First input" />
        <Input placeholder="Reuse below the same provider" />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Input</Typography>
      <Input placeholder="First input" />
      <Input placeholder="Reuse below the same provider" />''',
    },
    'StatCard': {
        'imports': ['StatCard', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  args: {
    title: 'Users',
    value: '1.2k',
  },
};

export const Clickable: Story = {
  render: () => (
    <Flex gap={3} wrap="wrap">
      <StatCard title="Users" value="1.2k" />
      <StatCard title="Revenue" value="$48k" color="#8b5cf6" onClick={() => undefined} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3} wrap="wrap">
        <StatCard title="Users" value="1.2k" />
        <StatCard title="Sessions" value="8.4k" />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">StatCard</Typography>
      <Flex gap={3} wrap="wrap">
        <StatCard title="Users" value="1.2k" />
        <StatCard title="Sessions" value="8.4k" />
      </Flex>''',
    },
    'FormSkeleton': {
        'imports': ['FormSkeleton', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  args: {
    fields: 3,
  },
};

export const Static: Story = {
  render: () => <FormSkeleton fields={2} animation="none" />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <FormSkeleton fields={2} />
        <FormSkeleton fields={3} />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">FormSkeleton</Typography>
      <FormSkeleton fields={2} />
      <FormSkeleton fields={3} />''',
    },
    'ChatError': {
        'imports': ['ChatError', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  render: () => <ChatError title="Request failed">The model timed out.</ChatError>,
};

export const WithRetry: Story = {
  render: () => (
    <ChatError title="Request failed" onRetry={() => undefined}>
      Try again
    </ChatError>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <ChatError title="First">Timed out</ChatError>
        <ChatError title="Reuse">Same provider</ChatError>
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">ChatError</Typography>
      <ChatError title="First">Timed out</ChatError>
      <ChatError title="Reuse">Same provider</ChatError>''',
    },
    'Select': {
        'imports': ['Select', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''const OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];

export const Basic: Story = {
  render: () => <Select options={OPTIONS} placeholder="Pick a stack" />,
};

export const WithLabel: Story = {
  render: () => <Select options={OPTIONS} label="Framework" placeholder="Choose one" fullWidth />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Select options={OPTIONS} placeholder="First select" />
        <Select options={OPTIONS} placeholder="Reuse below the same provider" />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Select</Typography>
      <Select options={[{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }]} placeholder="First select" />
      <Select options={[{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }]} placeholder="Reuse" />''',
    },
    'HoverCard': {
        'imports': ['HoverCard', 'BearProvider', 'Button', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  render: () => (
    <HoverCard cardContent={<Typography>Profile, docs, and actions.</Typography>}>
      <Button variant="outline">Hover me</Button>
    </HoverCard>
  ),
};

export const Sides: Story = {
  render: () => (
    <Flex gap={3}>
      <HoverCard side="top" cardContent={<Typography>Top card</Typography>}>
        <Button size="sm">Top</Button>
      </HoverCard>
      <HoverCard side="bottom" cardContent={<Typography>Bottom card</Typography>}>
        <Button size="sm">Bottom</Button>
      </HoverCard>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3}>
        <HoverCard cardContent={<Typography>First hover</Typography>}>
          <Button>One</Button>
        </HoverCard>
        <HoverCard cardContent={<Typography>Reused hover</Typography>}>
          <Button variant="outline">Two</Button>
        </HoverCard>
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">HoverCard</Typography>
      <Flex gap={3}>
        <HoverCard cardContent={<Typography>First hover</Typography>}>
          <Button>One</Button>
        </HoverCard>
        <HoverCard cardContent={<Typography>Reused hover</Typography>}>
          <Button variant="outline">Two</Button>
        </HoverCard>
      </Flex>''',
    },
    'Fab': {
        'imports': ['Fab', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  render: () => (
    <Fab position="relative" aria-label="Add">
      +
    </Fab>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex gap={3}>
      <Fab position="relative" variant="primary" aria-label="Primary">+</Fab>
      <Fab position="relative" variant="secondary" aria-label="Secondary">+</Fab>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3}>
        <Fab position="relative" aria-label="First">+</Fab>
        <Fab position="relative" variant="outline" aria-label="Reuse">+</Fab>
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Fab</Typography>
      <Flex gap={3}>
        <Fab position="relative" aria-label="First">+</Fab>
        <Fab position="relative" variant="outline" aria-label="Reuse">+</Fab>
      </Flex>''',
    },
    'Tooltip': {
        'imports': ['Tooltip', 'BearProvider', 'Button', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  render: () => (
    <Tooltip content="Save changes">
      <Button>Hover</Button>
    </Tooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <Flex gap={3}>
      <Tooltip content="Top" position="top"><Button size="sm">Top</Button></Tooltip>
      <Tooltip content="Bottom" position="bottom"><Button size="sm">Bottom</Button></Tooltip>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3}>
        <Tooltip content="First"><Button>One</Button></Tooltip>
        <Tooltip content="Reuse"><Button variant="outline">Two</Button></Tooltip>
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Tooltip</Typography>
      <Flex gap={3}>
        <Tooltip content="First"><Button>One</Button></Tooltip>
        <Tooltip content="Reuse"><Button variant="outline">Two</Button></Tooltip>
      </Flex>''',
    },
    'Tabs': {
        'imports': ['Tabs', 'TabList', 'Tab', 'TabPanel', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  render: () => (
    <Tabs defaultTab="one">
      <TabList>
        <Tab id="one">One</Tab>
        <Tab id="two">Two</Tab>
      </TabList>
      <TabPanel id="one"><Typography>First panel</Typography></TabPanel>
      <TabPanel id="two"><Typography>Second panel</Typography></TabPanel>
    </Tabs>
  ),
};

export const Pills: Story = {
  render: () => (
    <Tabs defaultTab="a" variant="pills">
      <TabList>
        <Tab id="a">Alpha</Tab>
        <Tab id="b">Beta</Tab>
      </TabList>
      <TabPanel id="a"><Typography>Alpha content</Typography></TabPanel>
      <TabPanel id="b"><Typography>Beta content</Typography></TabPanel>
    </Tabs>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Tabs defaultTab="one">
          <TabList>
            <Tab id="one">One</Tab>
            <Tab id="two">Two</Tab>
          </TabList>
          <TabPanel id="one"><Typography>First tabs</Typography></TabPanel>
          <TabPanel id="two"><Typography>More</Typography></TabPanel>
        </Tabs>
        <Tabs defaultTab="x" variant="pills">
          <TabList>
            <Tab id="x">Reuse</Tab>
            <Tab id="y">Again</Tab>
          </TabList>
          <TabPanel id="x"><Typography>Second tabs instance</Typography></TabPanel>
          <TabPanel id="y"><Typography>Same provider</Typography></TabPanel>
        </Tabs>
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Tabs</Typography>
      <Tabs defaultTab="one">
        <TabList>
          <Tab id="one">One</Tab>
          <Tab id="two">Two</Tab>
        </TabList>
        <TabPanel id="one"><Typography>First panel</Typography></TabPanel>
        <TabPanel id="two"><Typography>Second panel</Typography></TabPanel>
      </Tabs>''',
    },
    'Accordion': {
        'imports': ['Accordion', 'AccordionItem', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  render: () => (
    <Accordion defaultOpen={['one']}>
      <AccordionItem id="one" title="What is Bear?">
        <Typography>A React UI kit with theme tokens.</Typography>
      </AccordionItem>
      <AccordionItem id="two" title="How do I reuse it?">
        <Typography>Wrap once in BearProvider, then use components anywhere below.</Typography>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion allowMultiple defaultOpen={['a']}>
      <AccordionItem id="a" title="First"><Typography>Open</Typography></AccordionItem>
      <AccordionItem id="b" title="Second"><Typography>Also open</Typography></AccordionItem>
    </Accordion>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Accordion defaultOpen={['one']}>
          <AccordionItem id="one" title="First accordion"><Typography>Content</Typography></AccordionItem>
        </Accordion>
        <Accordion defaultOpen={['two']}>
          <AccordionItem id="two" title="Reused accordion"><Typography>Same provider</Typography></AccordionItem>
        </Accordion>
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Accordion</Typography>
      <Accordion defaultOpen={['one']}>
        <AccordionItem id="one" title="What is Bear?">
          <Typography>A React UI kit with theme tokens.</Typography>
        </AccordionItem>
        <AccordionItem id="two" title="Reuse">
          <Typography>Wrap once in BearProvider.</Typography>
        </AccordionItem>
      </Accordion>''',
    },
    'Modal': {
        'imports': ['Modal', 'Button', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Bear modal">
          <Typography>Real modal body. Close and open again to reuse it.</Typography>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setIsOpen(true)}>Large modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Large" size="lg">
          <Typography>Wider dialog.</Typography>
        </Modal>
      </>
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => {
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    return (
      <BearProvider>
        <Flex gap={2}>
          <Button onClick={() => setFirst(true)}>First</Button>
          <Button variant="outline" onClick={() => setSecond(true)}>Reuse</Button>
          <Modal isOpen={first} onClose={() => setFirst(false)} title="First">
            <Typography>First modal</Typography>
          </Modal>
          <Modal isOpen={second} onClose={() => setSecond(false)} title="Reuse">
            <Typography>Second modal, same provider</Typography>
          </Modal>
        </Flex>
      </BearProvider>
    );
  },
};
''',
        'sandbox': '''      <Typography variant="h5">Modal</Typography>
      <Typography color="muted">Open the portal story for the live dialog. Here is the reuse pattern.</Typography>
      <Button>Wrap actions in BearProvider</Button>''',
        'hooks': True,
    },
    'DataTable': {
        'imports': ['DataTable', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''type Person = { id: string; name: string; role: string };

const ROWS: Person[] = [
  { id: '1', name: 'Ada', role: 'Engineer' },
  { id: '2', name: 'Grace', role: 'Lead' },
];

const COLUMNS = [
  { key: 'name', header: 'Name', accessor: (row: Person) => row.name },
  { key: 'role', header: 'Role', accessor: (row: Person) => row.role },
];

export const Basic: Story = {
  render: () => (
    <DataTable columns={COLUMNS} data={ROWS} rowKey={(row) => row.id} />
  ),
};

export const Striped: Story = {
  render: () => (
    <DataTable variant="striped" columns={COLUMNS} data={ROWS} rowKey={(row) => row.id} />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <DataTable columns={COLUMNS} data={ROWS} rowKey={(row) => row.id} />
        <DataTable variant="bordered" columns={COLUMNS} data={ROWS} rowKey={(row) => row.id} />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">DataTable</Typography>
      <DataTable
        columns={[{ key: 'name', header: 'Name', accessor: (row) => row.name }, { key: 'role', header: 'Role', accessor: (row) => row.role }]}
        data={[{ id: '1', name: 'Ada', role: 'Engineer' }, { id: '2', name: 'Grace', role: 'Lead' }]}
        rowKey={(row) => row.id}
      />''',
    },
    'Grid': {
        'imports': ['Grid', 'BearProvider', 'Card', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  render: () => (
    <Grid cols={3} gap={3}>
      <Card padding="sm"><Typography>One</Typography></Card>
      <Card padding="sm"><Typography>Two</Typography></Card>
      <Card padding="sm"><Typography>Three</Typography></Card>
    </Grid>
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <Grid cols={2} gap={4}>
      <Card padding="sm"><Typography>Left</Typography></Card>
      <Card padding="sm"><Typography>Right</Typography></Card>
    </Grid>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Grid cols={3} gap={2}>
          <Card padding="sm"><Typography>A</Typography></Card>
          <Card padding="sm"><Typography>B</Typography></Card>
          <Card padding="sm"><Typography>C</Typography></Card>
        </Grid>
        <Grid cols={2} gap={2}>
          <Card padding="sm"><Typography>Reuse</Typography></Card>
          <Card padding="sm"><Typography>Again</Typography></Card>
        </Grid>
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Grid</Typography>
      <Grid cols={3} gap={3}>
        <Card padding="sm"><Typography>One</Typography></Card>
        <Card padding="sm"><Typography>Two</Typography></Card>
        <Card padding="sm"><Typography>Three</Typography></Card>
      </Grid>
      <Grid cols={2} gap={2}>
        <Card padding="sm"><Typography>Reuse</Typography></Card>
        <Card padding="sm"><Typography>Again</Typography></Card>
      </Grid>''',
    },
    'ButtonGroup': {
        'imports': ['ButtonGroup', 'Button', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  render: () => (
    <ButtonGroup>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  ),
};

export const Outline: Story = {
  render: () => (
    <ButtonGroup variant="outline">
      <Button>Left</Button>
      <Button>Right</Button>
    </ButtonGroup>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <ButtonGroup>
          <Button>First</Button>
          <Button>Group</Button>
        </ButtonGroup>
        <ButtonGroup variant="outline">
          <Button>Reused</Button>
          <Button>Group</Button>
        </ButtonGroup>
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">ButtonGroup</Typography>
      <ButtonGroup>
        <Button>First</Button>
        <Button>Group</Button>
      </ButtonGroup>
      <ButtonGroup variant="outline">
        <Button>Reused</Button>
        <Button>Group</Button>
      </ButtonGroup>''',
    },
    'Image': {
        'imports': ['Image', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  render: () => (
    <Image src="https://picsum.photos/seed/bear/320/180" alt="Bear demo" aspectRatio="16:9" rounded="md" />
  ),
};

export const Cover: Story = {
  render: () => (
    <Image src="https://picsum.photos/seed/forge/320/180" alt="Cover" objectFit="cover" aspectRatio="4:3" rounded="lg" />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3} wrap="wrap">
        <Image src="https://picsum.photos/seed/one/200/120" alt="First" rounded="md" />
        <Image src="https://picsum.photos/seed/two/200/120" alt="Reuse" rounded="md" />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Image</Typography>
      <Flex gap={3} wrap="wrap">
        <Image src="https://picsum.photos/seed/one/200/120" alt="First" rounded="md" />
        <Image src="https://picsum.photos/seed/two/200/120" alt="Reuse" rounded="md" />
      </Flex>''',
    },
    'Chip': {
        'imports': ['Chip', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  render: () => <Chip>React</Chip>,
};

export const Variants: Story = {
  render: () => (
    <Flex gap={2} wrap="wrap">
      <Chip variant="filled" color="primary">Filled</Chip>
      <Chip variant="outlined" color="primary">Outlined</Chip>
      <Chip variant="soft" color="success">Soft</Chip>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={2}>
        <Chip color="primary">First</Chip>
        <Chip color="secondary">Reuse</Chip>
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Chip</Typography>
      <Flex gap={2}>
        <Chip color="primary">First</Chip>
        <Chip color="secondary">Reuse</Chip>
      </Flex>''',
    },
    'ActiveBar': {
        'imports': ['ActiveBar', 'BearProvider', 'Flex', 'Typography'],
        'hooks': True,
        'stories': '''const ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'docs', label: 'Docs' },
  { id: 'api', label: 'API' },
];

export const Basic: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('home');
    return (
      <ActiveBar
        items={ITEMS}
        activeId={activeId}
        onItemClick={(item) => setActiveId(item.id)}
      />
    );
  },
};

export const Underline: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('docs');
    return (
      <ActiveBar
        variant="underline"
        items={ITEMS}
        activeId={activeId}
        onItemClick={(item) => setActiveId(item.id)}
      />
    );
  },
};

export const ReuseWithProvider: Story = {
  render: () => {
    const [first, setFirst] = useState('home');
    const [second, setSecond] = useState('api');
    return (
      <BearProvider>
        <Flex direction="column" gap={4}>
          <ActiveBar items={ITEMS} activeId={first} onItemClick={(item) => setFirst(item.id)} />
          <ActiveBar variant="underline" items={ITEMS} activeId={second} onItemClick={(item) => setSecond(item.id)} />
        </Flex>
      </BearProvider>
    );
  },
};
''',
        'sandbox': '''      <Typography variant="h5">ActiveBar</Typography>
      <ActiveBar items={[{ id: 'home', label: 'Home' }, { id: 'docs', label: 'Docs' }, { id: 'api', label: 'API' }]} activeId="home" />
      <ActiveBar variant="underline" items={[{ id: 'home', label: 'Home' }, { id: 'docs', label: 'Docs' }, { id: 'api', label: 'API' }]} activeId="docs" />''',
    },
    'AppBar': {
        'imports': ['AppBar', 'BearProvider', 'Button', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  render: () => (
    <AppBar position="relative" leftContent={<Typography variant="subtitle2">Bear</Typography>} rightContent={<Button size="sm">Docs</Button>} />
  ),
};

export const Dense: Story = {
  render: () => (
    <AppBar position="relative" dense leftContent={<Typography>Dense bar</Typography>} />
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <AppBar position="relative" leftContent={<Typography>First</Typography>} />
        <AppBar position="relative" color="primary" leftContent={<Typography>Reuse</Typography>} />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">AppBar</Typography>
      <AppBar position="relative" leftContent={<Typography>First</Typography>} />
      <AppBar position="relative" color="primary" leftContent={<Typography>Reuse</Typography>} />''',
    },
    'Typography': {
        'imports': ['Typography', 'BearProvider', 'Flex'],
        'stories': '''export const Basic: Story = {
  render: () => <Typography variant="h4">Bear UI</Typography>,
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Typography variant="h5">Heading</Typography>
      <Typography>Body copy</Typography>
      <Typography color="muted">Muted</Typography>
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={2}>
        <Typography variant="h6">First use</Typography>
        <Typography color="muted">Reuse below the same provider</Typography>
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Typography</Typography>
      <Typography>First use</Typography>
      <Typography color="muted">Reuse below the same provider</Typography>''',
    },
    'Avatar': {
        'imports': ['Avatar', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  args: {
    initials: 'AL',
    alt: 'Ada Lovelace',
  },
};

export const Sizes: Story = {
  render: () => (
    <Flex gap={2} align="center">
      <Avatar size="sm" initials="AL" />
      <Avatar size="md" initials="GH" />
      <Avatar size="lg" initials="AT" />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={2}>
        <Avatar initials="F" alt="First" />
        <Avatar initials="R" alt="Reuse" />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Avatar</Typography>
      <Flex gap={2}>
        <Avatar initials="F" alt="First" />
        <Avatar initials="R" alt="Reuse" />
      </Flex>''',
    },
    'Checkbox': {
        'imports': ['Checkbox', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  args: {
    label: 'Subscribe',
  },
};

export const States: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Disabled" disabled />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={2}>
        <Checkbox label="First" />
        <Checkbox label="Reuse" defaultChecked />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Checkbox</Typography>
      <Checkbox label="First" />
      <Checkbox label="Reuse" defaultChecked />''',
    },
    'Switch': {
        'imports': ['Switch', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  args: {
    label: 'Dark mode',
  },
};

export const States: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={2}>
        <Switch label="First" />
        <Switch label="Reuse" defaultChecked />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Switch</Typography>
      <Switch label="First" />
      <Switch label="Reuse" defaultChecked />''',
    },
    'Progress': {
        'imports': ['Progress', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  args: {
    value: 48,
  },
};

export const Values: Story = {
  render: () => (
    <Flex direction="column" gap={2}>
      <Progress value={20} />
      <Progress value={70} />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={2}>
        <Progress value={32} />
        <Progress value={84} />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Progress</Typography>
      <Progress value={32} />
      <Progress value={84} />''',
    },
    'Spinner': {
        'imports': ['Spinner', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <Flex gap={3} align="center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Flex>
  ),
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex gap={3}>
        <Spinner />
        <Spinner />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Spinner</Typography>
      <Flex gap={3}><Spinner /><Spinner /></Flex>''',
    },
    'Pagination': {
        'imports': ['Pagination', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  args: {
    page: 2,
    count: 8,
    onChange: () => undefined,
  },
};

export const ManyPages: Story = {
  render: () => <Pagination page={5} count={20} onChange={() => undefined} />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <Pagination page={1} count={5} onChange={() => undefined} />
        <Pagination page={3} count={5} onChange={() => undefined} />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Pagination</Typography>
      <Pagination page={1} count={5} onChange={() => undefined} />
      <Pagination page={3} count={5} onChange={() => undefined} />''',
    },
    'PromptSuggestions': {
        'imports': ['PromptSuggestions', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''const ITEMS = [
  { id: 'plan', label: 'Draft a plan' },
  { id: 'cite', label: 'Cite sources' },
  { id: 'fix', label: 'Fix the types' },
];

export const Basic: Story = {
  args: {
    suggestions: ITEMS,
  },
};

export const Selected: Story = {
  render: () => <PromptSuggestions suggestions={ITEMS} selectedId="cite" />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <PromptSuggestions suggestions={ITEMS} />
        <PromptSuggestions suggestions={ITEMS} selectedId="plan" />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">PromptSuggestions</Typography>
      <PromptSuggestions suggestions={[{ id: 'plan', label: 'Draft a plan' }, { id: 'cite', label: 'Cite sources' }]} />
      <PromptSuggestions suggestions={[{ id: 'plan', label: 'Draft a plan' }, { id: 'cite', label: 'Cite sources' }]} selectedId="plan" />''',
    },
    'MessageActions': {
        'imports': ['MessageActions', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''export const Basic: Story = {
  render: () => <MessageActions onCopy={() => undefined} onRetry={() => undefined} />,
};

export const ReuseWithProvider: Story = {
  render: () => (
    <BearProvider>
      <Flex direction="column" gap={3}>
        <MessageActions onCopy={() => undefined} />
        <MessageActions onRetry={() => undefined} />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">MessageActions</Typography>
      <MessageActions onCopy={() => undefined} />
      <MessageActions onRetry={() => undefined} />''',
    },
    'Breadcrumbs': {
        'imports': ['Breadcrumbs', 'BearProvider', 'Flex', 'Typography'],
        'test': True,
        'stories': '''const ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Components' },
  { label: 'Breadcrumbs' },
];

export const Basic: Story = {
  tags: ['smoke-test'],
  args: {
    items: ITEMS,
    showHomeIcon: true,
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Breadcrumb')).toBeVisible();
    await expect(canvas.getByText('Breadcrumbs')).toBeVisible();
  },
};

export const Compact: Story = {
  args: {
    items: ITEMS,
    showHomeIcon: false,
    size: 'sm',
  },
};

export const ReuseWithProvider: Story = {
  args: {
    items: ITEMS,
    showHomeIcon: true,
  },
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Breadcrumbs {...args} />
        <Breadcrumbs items={ITEMS} size="sm" />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Breadcrumbs</Typography>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Components' }, { label: 'Breadcrumbs' }]} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Reuse' }]} size="sm" />''',
    },
    'Timeline': {
        'imports': ['Timeline', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''const ITEMS = [
  { title: 'Shipped', time: '09:00', description: 'First release' },
  { title: 'Review', time: '11:00', description: 'Design review', active: true },
  { title: 'Done', time: '16:00', description: 'Closed' },
];

export const Basic: Story = {
  args: {
    items: ITEMS,
  },
};

export const Alternate: Story = {
  args: {
    items: ITEMS,
    position: 'alternate',
  },
};

export const ReuseWithProvider: Story = {
  args: {
    items: ITEMS,
  },
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Timeline {...args} />
        <Timeline items={ITEMS} size="sm" />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Timeline</Typography>
      <Timeline items={[{ title: 'Shipped', time: '09:00' }, { title: 'Review', time: '11:00', active: true }]} />
      <Timeline items={[{ title: 'Reuse', time: '16:00' }]} />''',
    },
    'Stepper': {
        'imports': ['Stepper', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''const STEPS = [
  { label: 'Account' },
  { label: 'Details' },
  { label: 'Done' },
];

export const Basic: Story = {
  args: {
    steps: STEPS,
    activeStep: 1,
  },
};

export const Vertical: Story = {
  args: {
    steps: STEPS,
    activeStep: 0,
    orientation: 'vertical',
  },
};

export const ReuseWithProvider: Story = {
  args: {
    steps: STEPS,
    activeStep: 1,
  },
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Stepper {...args} />
        <Stepper steps={STEPS} activeStep={2} />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Stepper</Typography>
      <Stepper steps={[{ label: 'Account' }, { label: 'Details' }, { label: 'Done' }]} activeStep={1} />
      <Stepper steps={[{ label: 'One' }, { label: 'Two' }]} activeStep={0} />''',
    },
    'BottomNavigation': {
        'imports': ['BottomNavigation', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''const ITEMS = [
  { id: 'home', label: 'Home', icon: <Typography>•</Typography> },
  { id: 'search', label: 'Search', icon: <Typography>•</Typography> },
  { id: 'more', label: 'More', icon: <Typography>•</Typography> },
];

export const Basic: Story = {
  args: {
    items: ITEMS,
    value: 'home',
  },
};

export const AlwaysLabels: Story = {
  args: {
    items: ITEMS,
    value: 'search',
    showLabels: 'always',
  },
};

export const ReuseWithProvider: Story = {
  args: {
    items: ITEMS,
    value: 'home',
  },
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <BottomNavigation {...args} />
        <BottomNavigation items={ITEMS} value="more" />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">BottomNavigation</Typography>
      <BottomNavigation items={[{ id: 'home', label: 'Home', icon: <Typography>•</Typography> }, { id: 'more', label: 'More', icon: <Typography>•</Typography> }]} value="home" />''',
    },
    'Dock': {
        'imports': ['Dock', 'BearProvider', 'Flex', 'Typography'],
        'stories': '''const ITEMS = [
  { id: 'home', label: 'Home', icon: <Typography>H</Typography> },
  { id: 'search', label: 'Search', icon: <Typography>S</Typography> },
  { id: 'more', label: 'More', icon: <Typography>M</Typography> },
];

export const Basic: Story = {
  args: {
    items: ITEMS,
    position: 'bottom',
  },
};

export const Top: Story = {
  args: {
    items: ITEMS,
    position: 'top',
  },
};

export const ReuseWithProvider: Story = {
  args: {
    items: ITEMS,
  },
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={4}>
        <Dock {...args} />
        <Dock items={ITEMS} position="top" />
      </Flex>
    </BearProvider>
  ),
};
''',
        'sandbox': '''      <Typography variant="h5">Dock</Typography>
      <Dock items={[{ id: 'home', label: 'Home', icon: <Typography>H</Typography> }, { id: 'more', label: 'More', icon: <Typography>M</Typography> }]} />''',
    },
}

pairs = re.findall(
    r"path:\s*'([^']+)'[,\s]*label:\s*'([^']+)'|label:\s*'([^']+)'[,\s]*path:\s*'([^']+)'",
    NAV,
)
rows = []
for a, b, c, d in pairs:
    rows.append((a, b) if a else (d, c))


def slug_to_export(slug: str) -> str | None:
    if slug in SKIP_SLUGS:
        return None
    if slug in SLUG_EXPORT:
        return SLUG_EXPORT[slug]
    pascal = ''.join(part[:1].upper() + part[1:] for part in slug.split('-') if part)
    if pascal in EXPORTS:
        return pascal
    lowered = {name.lower(): name for name in EXPORTS}
    return lowered.get(pascal.lower())


def default_stories(name: str) -> str:
    if name in DATA:
        return f'''export const Basic: Story = {{
  args: {{
    data: [{{ label: 'A', value: 28 }}, {{ label: 'B', value: 52 }}],
  }},
}};

export const AnotherExample: Story = {{
  args: {{
    data: [{{ label: 'Q1', value: 40 }}, {{ label: 'Q2', value: 64 }}],
  }},
}};

export const ReuseWithProvider: Story = {{
  args: {{
    data: [{{ label: 'A', value: 22 }}, {{ label: 'B', value: 44 }}],
  }},
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={{4}}>
        <{name} {{...args}} />
        <{name} data={{[{{ label: 'A', value: 18 }}, {{ label: 'B', value: 36 }}]}} />
      </Flex>
    </BearProvider>
  ),
}};
'''
    if name in VOID:
        return f'''export const Basic: Story = {{
  args: {{}},
}};

export const AnotherExample: Story = {{
  render: (args) => (
    <Flex direction="column" gap={{3}}>
      <{name} {{...args}} />
      <{name} {{...args}} />
    </Flex>
  ),
}};

export const ReuseWithProvider: Story = {{
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={{4}}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse {name} anywhere below.</Typography>
        <{name} {{...args}} />
        <{name} {{...args}} />
      </Flex>
    </BearProvider>
  ),
}};
'''
    return f'''export const Basic: Story = {{
  args: {{}},
  render: (args) => (
    <{name} {{...args}}>
      <Typography>{name}</Typography>
    </{name}>
  ),
}};

export const AnotherExample: Story = {{
  render: (args) => (
    <Flex gap={{3}} wrap="wrap">
      <{name} {{...args}}>
        <Typography>First</Typography>
      </{name}>
      <{name}>
        <Typography>Second</Typography>
      </{name}>
    </Flex>
  ),
}};

export const ReuseWithProvider: Story = {{
  render: (args) => (
    <BearProvider>
      <Flex direction="column" gap={{4}}>
        <Typography variant="subtitle2">Wrap once in BearProvider, then reuse {name} anywhere below.</Typography>
        <{name} {{...args}}>
          <Typography>First use</Typography>
        </{name}>
        <{name}>
          <Typography>Second use</Typography>
        </{name}>
      </Flex>
    </BearProvider>
  ),
}};
'''


def default_sandbox(name: str) -> str:
    if name in DATA:
        return f'''      <Typography variant="h5">{name}</Typography>
      <{name} data={{[{{ label: 'A', value: 22 }}, {{ label: 'B', value: 44 }}]}} />
      <{name} data={{[{{ label: 'A', value: 18 }}, {{ label: 'B', value: 36 }}]}} />'''
    if name in VOID:
        return f'''      <Typography variant="h5">{name}</Typography>
      <{name} />
      <{name} />'''
    return f'''      <Typography variant="h5">{name}</Typography>
      <{name}><Typography>First use</Typography></{name}>
      <{name}><Typography>Second use</Typography></{name}>'''


def imports_for(name: str, extra: list[str]) -> str:
    names = []
    for item in [name, *extra, 'BearProvider', 'Flex', 'Typography']:
        if item not in names:
            names.append(item)
    return ', '.join(names)


def header(name: str, label: str, imports: str, hooks: bool, test: bool = False) -> str:
    hook_import = "import { useState } from 'react';\n" if hooks else ''
    test_import = "import { expect, within } from '@storybook/test';\n" if test else ''
    return f'''import type {{ Meta, StoryObj }} from '@storybook/react';
{hook_import}{test_import}import {{ {imports} }} from '@forgedevstack/bear';

const meta: Meta<typeof {name}> = {{
  title: 'Components/{name}',
  component: {name},
  tags: ['autodocs'],
  parameters: {{
    controls: {{
      expanded: true,
    }},
    docs: {{
      description: {{
        component: '{label} from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse {name} anywhere below the provider. The Docs table lists the public props.',
      }},
    }},
  }},
}};

export default meta;

type Story = StoryObj<typeof {name}>;

'''


def sandbox_app(name: str, imports: list[str], inner: str) -> str:
    names = []
    for item in [*imports, 'BearProvider', 'Flex', 'Typography']:
        if item not in names:
            names.append(item)
    joined = ', '.join(names)
    return f'''import {{ {joined} }} from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export default function App() {{
  return (
    <BearProvider>
      <Flex direction="column" gap={{4}} style={{{{ padding: 24 }}}}>
{inner}
      </Flex>
    </BearProvider>
  );
}}
'''


if OUT.exists():
    for stale in OUT.glob('*.stories.tsx'):
        stale.unlink()
OUT.mkdir(parents=True, exist_ok=True)

seen_paths = set()
used_files = set()
written = 0
recipes: dict[str, str] = {}
recipe_paths: dict[str, str] = {}

for path, label in rows:
    if not path.startswith('/components/') or '/category/' in path or path == '/components':
        continue
    if path in seen_paths:
        continue
    seen_paths.add(path)
    slug = path.rsplit('/', 1)[-1]
    name = slug_to_export(slug)
    if not name:
        continue
    file_stem = name
    n = 2
    while file_stem in used_files:
        file_stem = f'{name}{n}'
        n += 1
    used_files.add(file_stem)
    special = SPECIAL.get(name)
    if special:
        extra = [item for item in special['imports'] if item != name]
        hooks = bool(special.get('hooks'))
        test = bool(special.get('test'))
        stories = special['stories']
        inner = special['sandbox']
    else:
        extra = ['Flex', 'Typography']
        hooks = False
        test = False
        stories = default_stories(name)
        inner = default_sandbox(name)
    body = header(name, label, imports_for(name, extra), hooks, test) + stories
    (OUT / f'{file_stem}.stories.tsx').write_text(body)
    recipes[name] = sandbox_app(name, [name, *extra], inner)
    recipe_paths[path] = name
    written += 1

RECIPES_OUT.write_text(
    "export const SANDBOX_RECIPES: Record<string, string> = "
    + json.dumps(recipes, indent=2)
    + ';\n\nexport const SANDBOX_RECIPE_PATHS: Record<string, string> = '
    + json.dumps(recipe_paths, indent=2)
    + ';\n'
)

print('wrote', written, 'kit stories and', len(recipes), 'sandbox recipes')
