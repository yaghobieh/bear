import type { Meta, StoryObj } from '@storybook/react';
import { BearProvider, Flex, Tab, TabList, TabPanel, Tabs, Typography } from '@forgedevstack/bear';

const meta: Meta<typeof TabList> = {
  title: 'Components/Tabs/TabList',
  component: TabList,
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
    },
    docs: {
      description: {
        component: 'TabList from @forgedevstack/bear. All public props are in Controls.',
      },
    },
  },
  args: {
    wrap: false,
  },
  argTypes: {
    wrap: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof TabList>;

export const Basic: Story = {
  render: (args) => (
    <Tabs defaultTab="one">
      <TabList {...args}>
        <Tab id="one">One</Tab>
      </TabList>
      <TabPanel tabId="one"><Typography>Panel</Typography></TabPanel>
    </Tabs>
  ),
};
