import { defineStories } from '@forgedevstack/kiln';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

export default defineStories({
  title: 'Tabs',
  component: Tabs,
  description: 'Tabbed navigation component for organizing content into sections.',
  stories: [
    {
      name: 'Default',
      component: () => (
        <Tabs defaultTab="tab1">
          <TabList>
            <Tab id="tab1">Tab 1</Tab>
            <Tab id="tab2">Tab 2</Tab>
            <Tab id="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel tabId="tab1">
            <p>Content for Tab 1</p>
          </TabPanel>
          <TabPanel tabId="tab2">
            <p>Content for Tab 2</p>
          </TabPanel>
          <TabPanel tabId="tab3">
            <p>Content for Tab 3</p>
          </TabPanel>
        </Tabs>
      ),
      code: `<Tabs defaultTab="tab1">
  <TabList>
    <Tab id="tab1">Tab 1</Tab>
    <Tab id="tab2">Tab 2</Tab>
    <Tab id="tab3">Tab 3</Tab>
  </TabList>
  <TabPanel tabId="tab1">Content for Tab 1</TabPanel>
  <TabPanel tabId="tab2">Content for Tab 2</TabPanel>
  <TabPanel tabId="tab3">Content for Tab 3</TabPanel>
</Tabs>`,
      description: 'Basic tabs with line variant',
    },
    {
      name: 'Pills Variant',
      component: () => (
        <Tabs defaultTab="tab1" variant="pills">
          <TabList>
            <Tab id="tab1">Overview</Tab>
            <Tab id="tab2">Features</Tab>
            <Tab id="tab3">Pricing</Tab>
          </TabList>
          <TabPanel tabId="tab1">
            <p>Overview content</p>
          </TabPanel>
          <TabPanel tabId="tab2">
            <p>Features content</p>
          </TabPanel>
          <TabPanel tabId="tab3">
            <p>Pricing content</p>
          </TabPanel>
        </Tabs>
      ),
      code: `<Tabs defaultTab="tab1" variant="pills">
  <TabList>
    <Tab id="tab1">Overview</Tab>
    <Tab id="tab2">Features</Tab>
  </TabList>
  ...
</Tabs>`,
      description: 'Tabs with pill-shaped buttons',
    },
    {
      name: 'Enclosed Variant',
      component: () => (
        <Tabs defaultTab="tab1" variant="enclosed">
          <TabList>
            <Tab id="tab1">General</Tab>
            <Tab id="tab2">Security</Tab>
            <Tab id="tab3">Notifications</Tab>
          </TabList>
          <TabPanel tabId="tab1">
            <p>General settings content</p>
          </TabPanel>
          <TabPanel tabId="tab2">
            <p>Security settings content</p>
          </TabPanel>
          <TabPanel tabId="tab3">
            <p>Notification settings content</p>
          </TabPanel>
        </Tabs>
      ),
      code: `<Tabs defaultTab="tab1" variant="enclosed">
  ...
</Tabs>`,
      description: 'Tabs with enclosed/boxed style',
    },
    {
      name: 'With Disabled Tab',
      component: () => (
        <Tabs defaultTab="tab1">
          <TabList>
            <Tab id="tab1">Active</Tab>
            <Tab id="tab2" disabled>Disabled</Tab>
            <Tab id="tab3">Another</Tab>
          </TabList>
          <TabPanel tabId="tab1">
            <p>Active tab content</p>
          </TabPanel>
          <TabPanel tabId="tab3">
            <p>Another tab content</p>
          </TabPanel>
        </Tabs>
      ),
      code: `<Tab id="tab2" disabled>Disabled</Tab>`,
      description: 'Tab with disabled state',
    },
  ],
});

