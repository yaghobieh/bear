import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, Tab, TabList, TabPanel, Tabs, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof TabPanel> = {
  title: 'Components/Tabs/TabPanel',
  component: TabPanel,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'TabPanel from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    tabId: 'one',
    children: 'First panel',
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof TabPanel>;

export const Basic: Story = {
  render: (args) => (
    <Tabs defaultTab="one">
      <TabList>
        <Tab id="one">One</Tab>
      </TabList>
      <TabPanel {...args} />
    </Tabs>
  ),
};
