export const CODE_BASIC = `<Tabs value={activeTab} defaultTab="overview" onChange={setActiveTab} variant="line">
  <TabList>
    <Tab id="overview">Overview</Tab>
    <Tab id="features">Features</Tab>
    <Tab id="pricing">Pricing</Tab>
  </TabList>
  <TabPanel tabId="overview">Overview content</TabPanel>
  <TabPanel tabId="features">Features content</TabPanel>
  <TabPanel tabId="pricing">Pricing content</TabPanel>
</Tabs>`;

export const CODE_LIMIT = `<Tabs value={activeTab} defaultTab="overview" onChange={setActiveTab} variant="pills">
  <TabList maxVisibleTabs={5}>
    <Tab id="overview">Overview</Tab>
    ... (8 tabs total)
  </TabList>
  <TabPanel tabId="overview">...</TabPanel>
  {/* TabPanel for each id */}
</Tabs>`;

export const CODE_WRAP = `<TabList wrap>
  <Tab id="a">Tab A</Tab>
  <Tab id="b">Tab B</Tab>
  ...
</TabList>`;

export const CODE_PILLS = `<Tabs defaultTab="1" variant="pills">
  <TabList>
    <Tab id="1">Pills 1</Tab>
    <Tab id="2">Pills 2</Tab>
  </TabList>
  <TabPanel tabId="1">Content 1</TabPanel>
  <TabPanel tabId="2">Content 2</TabPanel>
</Tabs>`;

export const CODE_DISABLED = `<Tab id="active">Active</Tab>
<Tab id="disabled" disabled>Disabled</Tab>`;
