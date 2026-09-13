import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanel, BearProvider, Flex, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'Tabs from @forgedevstack/bear. Wrap your tree in BearProvider so theme tokens apply, then reuse Tabs anywhere below the provider. The Docs table lists the public props.',
      },
    },
  },
  subcomponents: { TabList, Tab, TabPanel },
  args: {
    defaultTab: 'one',
    variant: 'line',
  },
  argTypes: {
    variant: { control: 'select', options: ['line', 'pills', 'enclosed'] },
    onChange: { action: 'onChange' },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Basic: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab id="one">One</Tab>
        <Tab id="two">Two</Tab>
      </TabList>
      <TabPanel tabId="one"><Typography>First panel</Typography></TabPanel>
      <TabPanel tabId="two"><Typography>Second panel</Typography></TabPanel>
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
      <TabPanel tabId="a"><Typography>Alpha content</Typography></TabPanel>
      <TabPanel tabId="b"><Typography>Beta content</Typography></TabPanel>
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
          <TabPanel tabId="one"><Typography>First tabs</Typography></TabPanel>
          <TabPanel tabId="two"><Typography>More</Typography></TabPanel>
        </Tabs>
        <Tabs defaultTab="x" variant="pills">
          <TabList>
            <Tab id="x">Reuse</Tab>
            <Tab id="y">Again</Tab>
          </TabList>
          <TabPanel tabId="x"><Typography>Second tabs instance</Typography></TabPanel>
          <TabPanel tabId="y"><Typography>Same provider</Typography></TabPanel>
        </Tabs>
      </Flex>
    </BearProvider>
  ),
};
