export const TABS_EXAMPLE = `<Tabs value={activeTab} defaultTab="overview" onChange={setActiveTab} variant="pills">
  <TabList maxVisibleTabs={5}>
    <Tab id="overview">Overview</Tab>
    <Tab id="features">Features</Tab>
    <Tab id="pricing">Pricing</Tab>
  </TabList>
  <TabPanel tabId="overview">Overview content</TabPanel>
  <TabPanel tabId="features">Features content</TabPanel>
  <TabPanel tabId="pricing">Pricing content</TabPanel>
</Tabs>`;
